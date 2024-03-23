import { Request, Response } from "express";
import PostModel from "../models/Post";
import { Types } from "mongoose";
import { PostType } from "../interfaces";

interface ExtendedRequest extends Request {
    user?: any;
    isAuthenticated?: () => boolean;
}

export const getPostsForReader = async (req: Request, res: Response) => {
    const pageParam = req.query.page;
    const perPageParam = req.query.perpage;
    const categoryIdParam = req.query.categoryId;
    const tagIdParam = req.query.tagId;
    const search = req.query.search;
    const sortParam = req.query.sortby;

    const page = pageParam ? parseInt(pageParam as string, 10) : 1; // Trang hiện tại, mặc định là trang 1
    let perPage = perPageParam ? parseInt(perPageParam as string, 10) : 10;

    perPage = perPage > 50 ? 50 : perPage;

    const queryFilter = {
        status: "publish",
        ...(categoryIdParam ? { categoryIds: categoryIdParam } : {}),
        ...(tagIdParam ? { tagIds: tagIdParam } : {}),
    };
    if (search) {
        queryFilter["title"] = { $regex: new RegExp(search as string, "i") }; // Tìm kiếm theo tiêu đề, không phân biệt chữ hoa chữ thường
    }

    let querySort;
    if (sortParam) {
        querySort = {
            [sortParam as string]: -1,
        };
    } else {
        querySort = { createdAt: -1 };
    }

    try {
        const totalPosts = await PostModel.countDocuments(queryFilter);
        const totalPages = Math.ceil(totalPosts / perPage);

        const posts = await PostModel.find(queryFilter)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate(["authorId", "categoryIds", "tagIds"])
            .sort(querySort);

        res.status(200).json({
            totalPages: totalPages,
            page: page,
            data: posts,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
        res.status(500).json({
            succcess: false,
            error: "Đã xảy ra lỗi server khi lấy danh sách bài viết.",
        });
    }
};

export const getPostsForAdmin = async (req: ExtendedRequest, res: Response) => {
    const user = req.user;
    const pageParam = req.query.page;
    const perPageParam = req.query.perpage;
    const page = pageParam ? parseInt(pageParam as string, 10) : 1; // Trang hiện tại, mặc định là trang 1
    let perPage = perPageParam ? parseInt(perPageParam as string, 10) : 10;

    perPage = perPage > 50 ? 50 : perPage;

    try {
        let query = {};
        if (user.role == "admin") {
            query = {};
        } else if (user.role == "author") {
            query = { authorId: user._id };
        } else {
            return res
                .status(403)
                .json({ success: false, error: "Unauthorized" });
        }
        const totalPosts = await PostModel.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / perPage);

        const posts = await PostModel.find(query)
            // { authorId: "65c5d5b74ecd1e313908c091" }
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate(["authorId", "categoryIds", "tagIds"])
            .sort({ updateAt: -1 });

        if (posts.length < 1) {
            res.status(404).json({
                success: false,
                error: "Không có bài viết nào được tìm thấy.",
            });
        } else {
            res.status(200).json({
                totalPages: totalPages,
                page: page,
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
        ).populate(["authorId", "categoryIds", "tagIds"]);

        // nếu không tồn tại
        if (!currentPost) {
            return res
                .status(404)
                .json({ success: false, error: "Post not found" });
        }
        const prevPost: PostType[] | null = await PostModel.find({
            status: "publish",
            createdAt: { $lt: currentPost.createdAt },
        })
            .sort({ createdAt: -1 })
            .limit(1)
            .populate("authorId");
        const nextPost: PostType[] | null = await PostModel.find({
            status: "publish",
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
    try {
        const postId = req.params.id; // Lấy id của bài viết cần cập nhật từ URL
        const postBody = req.body; // Dữ liệu mới của bài viết
        // Kiểm tra xem postId có tồn tại không
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId }, // Điều kiện tìm kiếm
            { $set: { ...postBody, updateAt: Date.now() } }, // Dữ liệu cập nhật
            { new: true } // Tùy chọn để trả về bản ghi đã cập nhật
        );
        if (!updatedPost) {
            return res
                .status(404)
                .json({ success: false, error: "Post not found" });
        }
        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const postId = req.params.id;
    console.log(postId);
    if (!Types.ObjectId.isValid(postId)) {
        return res
            .status(400)
            .json({ success: false, error: "Invalid postId parameter" });
    }
    try {
        // Xóa bài viết từ trong cơ sở dữ liệu
        const deletedPost = await PostModel.findByIdAndDelete(postId);

        // Kiểm tra xem bài viết có tồn tại không
        if (!deletedPost) {
            return res
                .status(404)
                .json({ success: false, error: "Post not found" });
        }

        // Trả về thông báo xóa thành công
        res.json({
            success: true,
            message: "Post deleted successfully",
            data: deletedPost,
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error deleting post:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};
