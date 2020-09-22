import React from "react";
import {
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Grid,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import Comment from "./comment.component";
import axios from "axios";
const styles = (theme) => ({
  root: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
  },
  comment: {
    display: "flex",
    direction: "row",
  },
  avatar: {
    marginRight: 5,
    marginLeft: 5,
  },
  text: {
    marginRight: 10,
    marginLeft: 5,
  },
});
class CommentField extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      comments: [],
      isCommentsLoading: false,
    };
  }
  componentDidMount() {
    this.getComments();
  }
  updateText = (event) => {
    this.setState({
      text: event.target.value,
    });
  };
  getComments = async (event) => {
    const { postId } = this.props;
    this.setState({
      isCommentsLoading: true,
    });
    try {
      const res = await axios({
        method: "GET",
        url: `/api/post/${postId}/comment`,
      });
      this.setState({
        comments: res.data.data.comments,
        isCommentsLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };
  addComment = async (event) => {
    try {
      event.preventDefault();
      const { postId, userName } = this.props;
      const res = await axios({
        method: "POST",
        url: `/api/post/${postId}/comment`,
        data: { text: this.state.text },
      });
      await this.getComments();
      await this.setState({
        text: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { classes } = this.props;
    const { comments } = this.state;
    return (
      <Grid container className={classes.root} spacing={2} direction="column">
        <Grid item>
          <form onSubmit={this.addComment}>
            <div className={classes.comment}>
              <Avatar className={classes.avatar}>
                <AccountCircleIcon />
              </Avatar>
              <TextField
                placeholder="What's on your mind, User?"
                fullWidth
                value={this.state.text}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className={classes.text}
                onChange={this.updateText}
              />
            </div>
          </form>
        </Grid>
        {comments.length === 0 ? (
          <Grid item>
            <Typography variant="body2">No comments yet</Typography>
          </Grid>
        ) : (
          comments.map((comment) => {
            return (
              <Grid item key={comment["_id"].toString()}>
                <Comment comment={comment} />
              </Grid>
            );
          })
        )}
      </Grid>
    );
  }
}
export default withStyles(styles)(CommentField);
