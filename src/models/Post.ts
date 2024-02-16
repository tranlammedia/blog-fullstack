import { Schema, Types, model } from "mongoose";
import { PostType } from "../interfaces";

const postSchema = new Schema<PostType>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        description: {type: String, required: true},
        featureImageUrl: {type: String},
        categoryIds: { type: [Schema.Types.ObjectId], ref: "Category" },
        authorId: { type: Schema.Types.ObjectId, ref: "User" },
        commentIds: {type: [Schema.Types.ObjectId], required: true, default: [] },
        views: { type: Number, required: true, default: 0},
        status: {type: String, required: true},
        createdAt: { type: Date, required: true, default: Date.now },
        updateAt: { type: Date, required: true, default: Date.now },
    }
);

const PostModel = model("Post", postSchema);

export default PostModel;
