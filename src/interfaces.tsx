export interface UserType {
    _id?: string;
    email: string;
    password?: string;
    name: string;
    username: string;
    role?: "admin" | "author" | "reader";
    id_gg?: string;
    id_github?: string;
}

export interface PostType {
    _id: string;
    title: string;
    content: string;
    description: string;
    featureImageUrl?: string;
    authorId: UserType;
    categoryIds: CategoryType[] | [string];
    tagIds: TagType[] | [string];
    commentIds: CommentType[] | [string];
    views: number;
    status: "draft" | "publish";
    createdAt: string;
    updateAt: string;
}

export interface CategoryType {
    _id: string;
    name: string;
    description: string;
    parentCategory?: CategoryType; // Tham chiếu đến _id của category cha (nếu có)
}

export interface TagType {
    _id: string;
    name: string;
}

export interface CommentType {
    _id: string;
    comment: string;
    userid: UserType; // Reference to _id of TypeUser
    repCommentIds: CommentType[]; // Array of unique _ids in TypeComment
}
