import { Schema, model } from "mongoose";
import { UserType } from "../interfaces";

const userSchema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "author", "reader"],
        default: "reader",
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
});

const UserModel = model("User", userSchema);

export default UserModel;
