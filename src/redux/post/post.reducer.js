import PostActionTypes from "./post.type";
const INITIAL_STATE = {
  posts: null,
  isFetching: false,
  errorMessage: undefined,
  isAdding: false,
};
const postReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case PostActionTypes.FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      };
    }
    case PostActionTypes.FETCH_POSTS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case PostActionTypes.ADD_POST_START: {
      return {
        ...state,
        isAdding: true,
      };
    }
    case PostActionTypes.ADD_POST_FAILURE: {
      return {
        ...state,
        isAdding: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
export default postReducer;
