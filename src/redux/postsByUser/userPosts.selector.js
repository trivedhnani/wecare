import { createSelector } from "reselect";
const posts = (state) => state.postsByUser;
export const selectPostsByUser = createSelector(
  [posts],
  (posts) => posts.posts
);
export const selectIsLoadingPostsByUser = createSelector(
  [posts],
  (posts) => !!posts.posts
);
