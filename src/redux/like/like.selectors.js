import { createSelector } from "reselect";
const selectLiked = (state) => state.postsLiked;
export const selectPostsLiked = createSelector(
  [selectLiked],
  (posts) => posts.postsLiked
);
export const selectIsFetchingLikes = createSelector(
  [selectLiked],
  (posts) => !!posts.postsLiked
);
