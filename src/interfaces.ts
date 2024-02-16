import { Types } from "mongoose";

interface TypeUser {
    _id?: Types.ObjectId;
    email: string;
    password: string;
    username: string;
    name: string;
    role: "admin" | "author" | "reader";
    id_gg?: string;
    id_github?: string;
    createdAt: Date;
    updateAt: Date;
}
interface TypePost {
    _id?: Types.ObjectId;
    title: string;
    content: string;
    description: string;
    featureImageUrl: string;
    authorId: Types.ObjectId; // Reference to _id of TypeUser
    categoryIds: Types.ObjectId[];
    tagIds: Types.ObjectId[];
    commentIds: Types.ObjectId[];
    views: number;
    status: "draft" | "publish";
    createdAt: Date;
    updateAt: Date;
}

interface TypeCategory {
    _id?: Types.ObjectId;
    name: string;
    description: string;
    parentCategory?: Types.ObjectId; // Tham chiếu đến _id của category cha (nếu có)
}

interface TypeTag {
    _id?: Types.ObjectId;
    name: string;
}

interface TypeComment {
    _id?: Types.ObjectId;
    comment: string;
    userid: Types.ObjectId; // Reference to _id of TypeUser
    repCommentId?: Types.ObjectId[]; // Array of unique _ids in TypeComment
}

export interface UserType extends TypeUser, Document {}
export interface PostType extends TypePost, Document {}
export interface CategoryType extends TypeCategory, Document {}
export interface TagType extends TypeTag, Document {}
export interface CommentType extends TypeComment, Document {}
