import LikeActionTypes from "./like.types";
const INITIAL_STATE = {
  postsLiked: null,
  isLoading: false,
  errorMessage: undefined,
};
const likeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LikeActionTypes.GET_LIKES: {
      return {
        ...state,
        postsLiked: null,
        isLoading: true,
      };
    }
    case LikeActionTypes.GET_LIKES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        postsLiked: action.payload,
      };
    }
    case LikeActionTypes.GET_LIKES_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default likeReducer;
