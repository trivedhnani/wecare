import React from "react";
import Post from "./post.component";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { selectPostsLiked } from "../../../redux/like/like.selectors";
import { createStructuredSelector } from "reselect";
const PostField = ({ posts, postsLiked, onClick, ...othetProps }) => {
  let likedPostsId = null;

  if (postsLiked) {
    likedPostsId = postsLiked.map((post) => post.id);
  }
  // console.log(likedPostsId);
  return (
    <Grid container direction="column" spacing={3}>
      {posts.map((post) => (
        <Grid item key={post.id}>
          <Post
            post={post}
            id={post.id}
            onClick
            isLiked={likedPostsId ? likedPostsId.includes(post.id) : false}
          />
        </Grid>
      ))}
    </Grid>
  );
};
const mapStateToProps = (state) =>
  createStructuredSelector({
    postsLiked: selectPostsLiked,
  });
export default connect(mapStateToProps)(PostField);
