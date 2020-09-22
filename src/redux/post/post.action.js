import PostActionTypes from "./post.type";
import axios from "axios";
export const fetchPostsStart = () => ({
  type: PostActionTypes.FETCH_POSTS_START,
});
export const fetchPostStartAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchPostsStart());
      const res = await axios.get("/api/post");
      //   console.log("data", res.data.data.posts);
      dispatch(fetchPostsSuccess(res.data.data.posts));
    } catch (err) {
      dispatch(fetchPostsFailure(err.message));
    }
  };
};
export const fetchPostsSuccess = (posts) => ({
  type: PostActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});
export const fetchPostsFailure = (err) => ({
  type: PostActionTypes.FETCH_POSTS_FAILURE,
  payload: err,
});
export const AddPostAyncStart = (data) => {
  return async (dispatch) => {
    try {
      dispatch(AddPostStart());
      const res = await axios({
        method: "POST",
        url: "/api/post",
        data,
      });
      dispatch(fetchPostStartAsync());
    } catch (err) {
      dispatch(AddPostFailure(err.message));
    }
  };
};
export const AddPostStart = () => ({
  type: PostActionTypes.ADD_POST_START,
});
export const AddPostFailure = (err) => ({
  type: PostActionTypes.ADD_POST_FAILURE,
  payload: err,
});
export const AddLikeAsync = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PATCH",
        url: `/api/post/${data.postId}/like`,
      });
    } catch (err) {
      dispatch(AddLikeFailure(err.message));
    }
  };
};
export const AddLikeFailure = (err) => ({
  type: PostActionTypes.ADD_LIKE_ERROR,
  payload: err,
});
