import { Types } from "mongoose";

export interface TypeUser {
    _id?: Types.ObjectId;
    email: string,
    password: string;
    name: string;
    role: "admin" | "author" | "reader";
    createdAt: Date;
    updateAt: Date;
}
export interface TypePost {
    _id?: Types.ObjectId;
    title: string;
    content: string;
    authorId: Types.ObjectId; // Reference to _id of TypeUser
    commentIds: CommentType[];
    views: number;
    status: "draft" | "publish";
    createdAt: Date;
    updateAt: Date;
}

export interface TypeComment {
    _id?: Types.ObjectId;
    comment: string;
    userid: Types.ObjectId; // Reference to _id of TypeUser
    repCommentId?: Types.ObjectId[]; // Array of unique _ids in TypeComment
}

export interface UserType extends TypeUser, Document {}
export interface PostType extends TypePost, Document {}
export interface CommentType extends TypeComment, Document {}
