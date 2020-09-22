import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  CardMedia,
  CardActions,
  Button,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "emoji-mart/css/emoji-mart.css";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import ThumbUpRoundedIcon from "@material-ui/icons/ThumbUpRounded";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import CommentField from "./commentField.component";
import PostEdit from "../Account/postEdit.component";
const styles = (theme) => ({
  root: {
    maxWidth: "90%",
  },
  title: {
    fontWeight: "bold",
  },
  media: {
    height: 300,
    // paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-around",
  },
});
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      isLiked: this.props.isLiked,
      isCommenting: false,
      isSharing: false,
      comments: this.props.comments,
    };
  }
  componentDidMount() {
    // const { isLiked, id, post } = this.props;
    // this.setState({
    //   isLiked,
    //   comments: post.comments,
    // });
  }
  likeAsync = async () => {
    const { id } = this.props;
    return await axios({
      method: "PATCH",
      url: `/api/post/${id}/like`,
    });
  };
  handleLike = async (event) => {
    try {
      const { id } = this.props;
      const res = await this.likeAsync();
      await this.setState({
        isLiked: res.data.data.liked,
      });
      const el = document.querySelector(`#likesCount_${id}`);
      if (this.state.isLiked) {
        el.textContent = `${el.textContent.split(" ")[0] * 1 + 1} Likes`;
      } else {
        el.textContent = `${el.textContent.split(" ")[0] * 1 - 1} Likes`;
      }
    } catch (err) {
      console.log(err);
    }
  };
  handleComment = (event) => {
    this.setState({
      isCommenting: !this.state.isCommenting,
    });
  };
  handleShare = (event) => {
    this.setState({
      isSharing: !this.state.isSharing,
    });
  };
  render() {
    const { classes, post, id } = this.props;
    return (
      <div className={classes.root}>
        <Card>
          <CardHeader
            avatar={
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            }
            title={
              <Typography variant="body1" className={classes.title}>
                {post.user.name}
              </Typography>
            }
          ></CardHeader>
          {post.image ? (
            <CardMedia
              className={classes.media}
              title="image"
              image={`/images/posts/${post.image}`}
            ></CardMedia>
          ) : null}
          {post.caption ? (
            <CardContent>
              <Typography variant="body1">{post.caption}</Typography>
            </CardContent>
          ) : null}
          <CardContent>
            <Typography variant="subtitle2" id={`likesCount_${id}`}>
              {post.likes} Likes
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              variant="text"
              onClick={this.handleLike}
              startIcon={
                <ThumbUpRoundedIcon
                  color={this.state.isLiked ? "primary" : "action"}
                />
              }
            >
              Like
            </Button>
            <Button
              variant="text"
              onClick={this.handleComment}
              startIcon={
                <CommentRoundedIcon
                  color={this.state.isCommenting ? "primary" : "action"}
                />
              }
            >
              Comment
            </Button>
            <Button
              variant="text"
              onClick={this.handleShare}
              startIcon={
                <ShareRoundedIcon
                  color={this.state.isSharing ? "primary" : "action"}
                />
              }
            >
              Share
            </Button>
          </CardActions>
          {this.state.isCommenting ? (
            <CommentField postId={id} userName={post.user.name} />
          ) : null}
        </Card>
        {/* {this.props.onClick ? <PostEdit /> : null} */}
      </div>
    );
  }
}

export default withStyles(styles)(Post);
