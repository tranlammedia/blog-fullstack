import { Schema, Types, model } from "mongoose";
import { PostType } from "../interfaces";

const postSchema = new Schema<PostType>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorId: { type: Schema.Types.ObjectId, ref: "User" },
        views: { type: Number, default: 0, required: true},
        createdAt: { type: Date, default: Date.now },
    }
);

const PostModel = model("Post", postSchema);

export default PostModel;
