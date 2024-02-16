import { Request, Response } from "express";
import PostModel from "../models/Post";
import { Types } from "mongoose";
import { PostType } from "../interfaces";

interface ExtendedRequest extends Request {
    user?: any;
    isAuthenticated?: () => boolean;
}

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await PostModel.find()
            .populate("authorId")
            .sort({ createdAt: -1 });

        if (posts.length < 1) {
            res.status(404).json({
                success: false,
                error: "Không có bài viết nào được tìm thấy.",
            });
        } else {
            res.status(200).json({
                success: true,
                data: posts,
            });
        }
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
        res.status(500).json({
            succcess: false,
            error: "Đã xảy ra lỗi server khi lấy danh sách bài viết.",
        });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        // Kiểm tra xem userId có hợp lệ không
        if (!Types.ObjectId.isValid(postId)) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid postId parameter" });
        }
        // tìm post
        const currentPost: PostType | null = await PostModel.findByIdAndUpdate(
            postId,
            { $inc: { views: 1 } },
            { new: true }
        ).populate("authorId");

        // nếu không tồn tại
        if (!currentPost) {
            return res
                .status(404)
                .json({ success: false, error: "Post not found" });
        }
        const prevPost: PostType[] | null = await PostModel.find({
            createdAt: { $lt: currentPost.createdAt },
        })
            .sort({ createdAt: -1 })
            .limit(1)
            .populate("authorId");
        const nextPost: PostType[] | null = await PostModel.find({
            createdAt: { $gt: currentPost.createdAt },
        })
            .sort({ createdAt: 1 })
            .limit(1);
        // if (prevPost.length) {
        //     console.log(prevPost);
        // }
        // console.log(nextPost[0]);
        // console.log([prevPost[0], currentPost, nextPost[0]]);
        // nếu tìm thấy

        res.status(200).json({
            success: true,
            data: [prevPost[0], currentPost, nextPost[0]],
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const createPost = async (req: ExtendedRequest, res: Response) => {
    try {
        const postBody = req.body;
        console.log(req.user._id);
        if (!req.user?._id)
            return res
                .status(403)
                .json({ success: false, error: "Unauthorized" });

        if (!postBody.title || !postBody.content)
            return res.status(400).json({
                success: false,
                error: "title, content and authorId are required fields",
            });

        const newPost: PostType = new PostModel({
            ...postBody,
            authorId: req.user._id,
        });
        await PostModel.create(newPost);

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
    // const postIndex = POSTS.findIndex((p) => p.id === postId);

    // if (postIndex === -1) {
    //     return res.status(404).json({ error: "Post not found" });
    // }

    // const updatedPost = { ...posts[postIndex], ...req.body };
    // posts[postIndex] = updatedPost;

    // res.json(updatedPost);
};

export const deletePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
    // posts = posts.filter((p) => p.id !== postId);

    res.json({ message: "Post deleted successfully" });
};
