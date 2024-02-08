import { Schema, model } from "mongoose";
import { UserType } from "../interfaces";
import findOrCreate from "mongoose-findorcreate";


const userSchema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, default: "1"},
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

userSchema.plugin(findOrCreate)
const UserModel = model<UserType>("User", userSchema);

export default UserModel;
