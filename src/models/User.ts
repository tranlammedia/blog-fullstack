import { Schema, model } from "mongoose";
import { UserType } from "../interfaces";

const userSchema = new Schema<UserType>({
    name: { type: String, default: null },
    email: { type: String, default: null },
    username: { type: String, default: null },
    password: { type: String, default: null},
    role: {
        type: String,
        enum: ["admin", "author", "reader"],
        default: "reader",
    },
    id_gg: {type: String},
    id_github: {type: String},
    createdAt: { type: Date, required: true, default: Date.now },
    updateAt: { type: Date, required: true, default: Date.now },
});

userSchema.index({ email: 1, username: 1 }, { unique: true });

const UserModel = model<UserType>("User", userSchema);

export default UserModel;
