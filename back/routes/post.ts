import { Router } from "express";
import { PostControllers } from "../controllers/post";
import { tokenAuth } from "../middleware/auth";
import { ApiRoutes } from "../types";

export const postRouter = Router();

postRouter.get(ApiRoutes.getPostsBySearch({}), PostControllers.getPostsBySearch);
postRouter.post(
  ApiRoutes.postPostsRelatedByTags({}),
  PostControllers.postPostsRelatedByTags
);
postRouter.get(ApiRoutes.getPosts({}), PostControllers.getPosts);
postRouter.post(ApiRoutes.postPost({}), tokenAuth, PostControllers.postPost);
postRouter.get(ApiRoutes.getPostDetails({}), PostControllers.getPostDetails);
postRouter.post(
  ApiRoutes.postPostComment({}),
  tokenAuth,
  PostControllers.postPostComment
);
postRouter.patch(ApiRoutes.patchPost({}), tokenAuth, PostControllers.patchPost);
postRouter.delete(
  ApiRoutes.deletePost({}),
  tokenAuth,
  PostControllers.deletePost
);
postRouter.patch(
  ApiRoutes.patchLikePost({}),
  tokenAuth,
  PostControllers.patchLikePost
);
