import UserPostsTypes from "./userPosts.types";
import axios from "axios";
export const getUserPostsStart = () => ({
  type: UserPostsTypes.GET_POSTS_BY_USER_START,
});
export const getUserPostsSuccess = (posts) => ({
  type: UserPostsTypes.GET_POSTS_BY_USER_SUCCESS,
  payload: posts,
});
export const getUserPostsFailure = (message) => ({
  type: UserPostsTypes.GET_POSTS_BY_USER_FAILURE,
  payload: message,
});
export const getPostsByUserAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(getUserPostsStart());
      const res = await axios({
        method: "GET",
        url: "/api/users/post",
      });
      dispatch(getUserPostsSuccess(res.data.data.posts));
    } catch (err) {
      // console.log(err);
      dispatch(getUserPostsFailure(err.message));
    }
  };
};
