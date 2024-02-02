export interface UserType {
    _id?: string;
    email: string,
    password: string;
    name: string;
    role?: "admin" | "author" | "reader";
}

export interface PostType {
    _id: string;
    title: string;
    content: string;
    authorId: UserType ;
    commentIds: CommentType[];
    views: number;
    status: "draft" | "publish";
    createdAt: string;
    updateAt: string;
}
export interface CommentType {
    _id: string;
    comment: string;
    userid: UserType; // Reference to _id of TypeUser
    repCommentIds: CommentType[]; // Array of unique _ids in TypeComment
}

