import { Schema, model } from "mongoose";
import { TagType } from "../interfaces";

const TagSchema = new Schema<TagType>({
    name: { type: String, required: true },
});

const TagModel = model<TagType>("Tag", TagSchema);

export default TagModel;
