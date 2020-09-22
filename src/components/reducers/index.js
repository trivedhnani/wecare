import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "../../redux/post/post.reducer";
import likeReducer from "../../redux/like/like.reducer";
import postByUserReducer from '../../redux/postsByUser/userPosts.reducer';
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post: postReducer,
  postsLiked: likeReducer,
  postsByUser:postByUserReducer
});
