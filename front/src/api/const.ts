export const ApiRoutes = {
  getPosts: ({ limit = ":limit", page = ":page" }) => `/posts/${limit}/${page}`,
  getPostsBySearch: ({ limit = ":limit", page = ":page", searchQuery = "" }) =>
    searchQuery
      ? `/posts/${limit}/${page}/?search=${searchQuery}`
      : `/posts/${limit}/${page}`,
  getPostDetails: ({ postId = ":postId" }) => `/post/${postId}`,
  postPost: ({}) => "/post",
  postPostComment: ({ postId = ":postId" }) => `/post/${postId}/postComment`,
  postPostsRelatedByTags: ({}) => `/posts/related`,
  patchPost: ({ postId = ":postId" }) => `/post/${postId}`,
  deletePost: ({ postId = ":postId" }) => `/post/${postId}`,
  postSignUp: ({}) => "/signup",
  postSignIn: ({}) => "/signin",
  patchLikePost: ({ postId = ":postId" }) => `/post/${postId}/like`,
};
