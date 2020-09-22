import React from "react";
import {
  Modal,
  TextField,
  InputAdornment,
  IconButton,
  Popover,
  Button,
} from "@material-ui/core";
import InsertEmoticonRoundedIcon from "@material-ui/icons/InsertEmoticonRounded";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
class PostEdit extends React.Component {
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
    // AddPostAyncStart(data);
  };
  render() {
    return (
      <Modal open={true}>
        <from>
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
        </from>
      </Modal>
    );
  }
}
export default PostEdit;
