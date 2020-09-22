import UserPostsTypes from "./userPosts.types";
const INITIAL_STATE = {
  posts: null,
  isFetchingPosts: false,
  errorMessage: undefined,
};
const postByUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserPostsTypes.GET_POSTS_BY_USER_START:
      return {
        ...state,
        isFetchingPosts: true,
      };
    case UserPostsTypes.GET_POSTS_BY_USER_SUCCESS:
      return {
        ...state,
        isFetchingPosts: false,
        posts: action.payload,
      };
    case UserPostsTypes.GET_POSTS_BY_USER_FAILURE:
      return {
        ...state,
        isFetchingPosts: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
export default postByUserReducer;
