import { model, Schema } from "mongoose";
import { IComment } from "./types";
import { userSchema } from "./user";

export const commentSchema = new Schema<IComment>({
  title: String,
  description: {
    type: String,
    require: true,
  },
  createdBy: {
    type: userSchema,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
	postId: {
		type: String,
		required: true
	}
});

export const CommentModel = model<IComment>("comment", commentSchema);
