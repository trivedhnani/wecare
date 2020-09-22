import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  TextField,
  Fab,
  Chip,
  Typography,
  InputAdornment,
  IconButton,
  Popover,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddPhotoAlternateRoundedIcon from "@material-ui/icons/AddPhotoAlternateRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import InsertEmoticonRoundedIcon from "@material-ui/icons/InsertEmoticonRounded";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { connect } from "react-redux";
import { AddPostAyncStart } from "../../../redux/post/post.action";
const styles = (theme) => ({
  root: {
    maxWidth: "90%",
  },
  title: {
    fontWeight: "bold",
  },
  fab: {
    marginTop: 15,
    boxShadow: "none",
    cursor: "pointer",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  uploadButtonWrappaer: {
    position: "relative",
    overflow: "hidden",
    display: "inline-block",
  },
  fileInput: {
    position: "absolute",
    opacity: 0,
    left: 0,
    top: 0,
    marginTop: 15,
    cursor: "pointer",
  },
  chip: {
    marginTop: 15,
    marginLeft: 20,
  },
  flexItems: {
    display: "flex",
    justifyContent: "space-between",
  },
  fileInputBlock: {
    display: "flex",
    justifyContent: "space-between",
  },
  emoji: {
    position: "absolute",
    right: 0,
  },
});
class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      fileName: "",
      renderEmoji: false,
      anchorEl: null,
    };
  }
  updateText = (event) => {
    this.setState(
      {
        text: event.target.value,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  updateImage = (event) => {
    const path = event.target.value.split("\\");
    const fileName = path[path.length - 1];
    this.setState({
      fileName,
    });
  };
  deleteImage = (event) => {
    document.querySelector("#fileInput").value = "";
    this.setState({
      fileName: "",
    });
  };
  handleEmoji = async (event, reason = "backDropClick") => {
    await this.setState({
      renderEmoji: !this.state.renderEmoji,
    });
    console.log(this.state);
  };
  addEmoji = (event) => {
    let codePoints = event.unified.split("-");
    codePoints = codePoints.map((el) => `0x${el}`);
    const emoji = String.fromCodePoint(...codePoints);
    this.setState({
      text: this.state.text + emoji,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { AddPostAyncStart } = this.props;
    const data = new FormData();
    data.append("caption", this.state.text);
    data.append("photo", document.getElementById("fileInput").files[0]);
    AddPostAyncStart(data);
    this.setState({
      text: "",
      fileName: "",
      renderEmoji: false,
      anchorEl: null,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          }
          title={
            <Typography variant="body1" className={classes.title}>
              Create Post
            </Typography>
          }
        ></CardHeader>
        <CardContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              placeholder="What's on your mind, User?"
              fullWidth
              value={this.state.text}
              onChange={this.updateText}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleEmoji}>
                      <InsertEmoticonRoundedIcon id="emoticonIcon" />
                    </IconButton>
                    <Popover
                      open={this.state.renderEmoji}
                      onClose={this.handleEmoji}
                      anchorEl={document.querySelector("#emoticonIcon")}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Picker onSelect={this.addEmoji} />
                    </Popover>
                  </InputAdornment>
                ),
              }}
            />

            <div className={classes.flexItems}>
              <div className={classes.fileInputBlock}>
                <div className={classes.uploadButtonWrappaer}>
                  <Fab variant="extended" size="small" className={classes.fab}>
                    <AddPhotoAlternateRoundedIcon
                      className={classes.extendedIcon}
                    />
                    Photo
                  </Fab>
                  <input
                    type="file"
                    id="fileInput"
                    className={classes.fileInput}
                    accept="image/*"
                    name="photo"
                    onInput={this.updateImage}
                    name="photo"
                  />
                </div>
                {this.state.fileName.length === 0 ? null : (
                  <Chip
                    variant="outlined"
                    label={this.state.fileName}
                    onDelete={this.deleteImage}
                    className={classes.chip}
                  />
                )}
              </div>

              <Fab
                variant="extended"
                size="small"
                className={classes.fab}
                disabled={
                  !(
                    this.state.text.length > 0 || this.state.fileName.length > 0
                  )
                }
                type="submit"
              >
                <DoneRoundedIcon className={classes.extendedIcon} />
                Post
              </Fab>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}
const mapDispatchStateToProps = (dispatch) => ({
  AddPostAyncStart: (data) => dispatch(AddPostAyncStart(data)),
});
export default withStyles(styles)(
  connect(null, mapDispatchStateToProps)(CreatePost)
);
