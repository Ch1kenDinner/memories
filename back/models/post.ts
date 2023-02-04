import { model, Schema } from "mongoose";
import { commentSchema } from "./comment";
import { IPost } from "./types";
import { userSchema } from "./user";

export const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
  },
  description: String,
  createdBy: {
    type: userSchema,
    default: {},
  },
  tags: [String],
  image: {
    require: [true, "Image require"],
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [commentSchema],
		default: []
  },
});

export const PostModel = model<IPost>("Post", postSchema);
