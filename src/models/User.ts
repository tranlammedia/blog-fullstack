import { Schema, model } from "mongoose";
import { UserType } from "../interfaces";


const userSchema = new Schema<UserType>(
    {
        name: { type: String, required: true },
        role: {
            type: String,
            enum: ["admin", "author", "reader"],
            required: true,
        },
    },
    { timestamps: true }
);

const UserModel = model<UserType>("User", userSchema);

export default UserModel;