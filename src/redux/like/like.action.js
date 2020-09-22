import LikeActionTypes from "./like.types";
import axios from "axios";
export const getLikesStart = () => ({
  type: LikeActionTypes.GET_LIKES,
});
export const getLikesSuccess = (posts) => ({
  type: LikeActionTypes.GET_LIKES_SUCCESS,
  payload: posts,
});
export const getLikesFailure = (err) => ({
  type: LikeActionTypes.GET_LIKES_FAILURE,
  payload: err,
});
export const getLikesAync = () => {
  return async (dispatch) => {
    try {
      dispatch(getLikesStart());
      const res = await axios({
        method: "GET",
        url: "/api/users/postsLiked",
      });
      // console.log("postsLiked", res);
      dispatch(getLikesSuccess(res.data.data.posts.postsLiked));
    } catch (err) {
      // console.log(err.stack);
      dispatch(getLikesFailure(err.message));
    }
  };
};
