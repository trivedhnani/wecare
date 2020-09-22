import { createSelector } from "reselect";
const selectPost = (state) => state.post;
const selecAuth = (state) => state.auth;
const selectUser = createSelector([selecAuth], (auth) => auth.user.id);
export const selectPostsData = createSelector(
  [selectPost],
  (post) => post.posts
);
export const selectIsPostsFetching = createSelector(
  [selectPost],
  (post) => post.isFetching
);
export const selectPostsLoaded = createSelector(
  [selectPost],
  (post) => !!post.posts
);
export const selectPostsByUser = createSelector(
  [selectPostsData, selectUser],
  (allPosts, id) => allPosts.filter((post) => post.user.id === id)
);
