import { Schema, model } from "mongoose";
import { CategoryType } from "../interfaces";

const categorySchema = new Schema<CategoryType>({
    name: { type: String, required: true },
    description: { type: String, default: "" },
    parentCategory: { type: Schema.Types.ObjectId, ref: "Category" }, // Tham chiếu đến chính collection Category
});

const CategoryModel = model<CategoryType>("Category", categorySchema);

export default CategoryModel;
