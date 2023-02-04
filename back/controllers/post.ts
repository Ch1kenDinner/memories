import { Types } from "mongoose";
import { CommentModel } from "../models/comment";
import { PostModel } from "../models/post";
import { IComment, IPost } from "../models/types";
import { UserModel } from "../models/user";
import { IControllers } from "./types";

export const PostControllers = {
  getPostsBySearch: async (req, res): Promise<{ posts: IPost[] }> => {
    const query = req.query;

    const reg = new RegExp(query.search, "i");
    const posts = await PostModel.find({
      $or: [{ title: { $regex: reg } }, { tags: { $regex: reg } }],
    });

    return res.json({ posts });
  },
  getPostDetails: async (req, res): Promise<{ post: IPost }> => {
    const { postId } = req.params;

    const post = await PostModel.findById(postId);

    if (!post) return res.status(404).json({ mess: "Post not found" });

    return res.json({ post });
  },
  postPostsRelatedByTags: async (req, res): Promise<{ posts: IPost[] }> => {
    const { tags } = req.body;

    const posts = await PostModel.find({ tags: { $in: tags } });

    return res.json({ posts });
  },
  getPosts: async (
    req,
    res
  ): Promise<{ posts: IPost[]; pageCount: number }> => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const query = req.query;

    const postsStartIndex = (page - 1) * limit;

    const postsLen = await PostModel.countDocuments({});
    const posts = await PostModel.find().limit(limit).skip(postsStartIndex);

    if ((page - 1) * limit > postsLen)
      return res.status(401).json({ mess: "Page count too big" });

    const pageCount = Math.ceil(postsLen / limit);

    return res.status(200).json({ pageCount, posts });
  },
  postPost: async (req, res): Promise<{ post: IPost }> => {
    const { body } = req;

    const user = await UserModel.findById(req.userId);
    const post = new PostModel({ ...body, createdBy: user });

    try {
      post.save();
      return res.status(200).json({ post });
    } catch (err) {
      return res.status(402).json({ message: err });
    }
  },
  patchPost: async (req, res): Promise<{ post: IPost }> => {
    const { postId } = req.params;
    const { body } = req;
    if (!Types.ObjectId.isValid(postId))
      return res.status(404).json({ mess: "Post id not exist" });
    try {
      const post = await PostModel.findByIdAndUpdate(postId, body.post, { new: true });
      return res.status(200).json({ post });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  },
  deletePost: async (req, res): Promise<void> => {
    const { postId } = req.params;

    await PostModel.findByIdAndDelete(postId);
    res.status(200);
  },
  patchLikePost: async (req, res): Promise<{ post: IPost }> => {
    const { postId } = req.params;

    let updatedPost;
    let updatedLikes;
    const post = await PostModel.findById(postId);

    if (!post) return res.status(404).json({ mess: "Post not found" });

    const likeIndex = post.likes?.findIndex((el) => el == req.userId);
    if (likeIndex !== -1) {
      updatedLikes = post.likes?.slice();
      updatedLikes.splice(likeIndex, 1);
    } else {
      updatedLikes = post.likes ? [...post.likes, req.userId] : [req.userId];
    }
    updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        likes: updatedLikes,
      },
      { new: true }
    );
    return res.status(200).json({ post: updatedPost });
  },
  postPostComment: async (req, res): Promise<{ post: IPost }> => {
    const { postId } = req.params;
    const { comment } = req.body;

    const post = await PostModel.findById(postId);
    if (!post) res.status(404).json({ mess: "Post not found" });

    const user = await UserModel.findById(req.userId);
    if (!user) res.status(404).json({ mess: "User not found" });

    const newCommentData: IComment = {
      ...comment,
      createdBy: user,
      postId: post?._id,
    };
    const newComment = await CommentModel.create(newCommentData);

    const updatedPost = await PostModel.findByIdAndUpdate(
      post?.id,
      {
        comments: post?.comments
          ? [...post?.comments, newComment]
          : [newComment],
      },
      { new: true }
    );

    return res.json({ post: updatedPost });
  },
} satisfies IControllers;
