import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Types } from "mongoose";

import connectDatabase from "./config/database";
import { POSTS, TypePost } from "./config/data";
import { PostType, UserType } from "./interfaces";
import PostModel from "./models/Post";
import UserModel from "./models/User";

dotenv.config();

const app = express();
const PORT: string = process.env.PORT || "3001";
const URL_DATABASE = process.env.URL_DATABASE || "localhost:4000";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

connectDatabase(URL_DATABASE);

let posts: Array<TypePost> = POSTS;

// Get all posts
app.get("/api/posts", async (req: Request, res: Response) => {
    try {
        const posts = await PostModel.find().populate("authorId");

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
});

// Get a specific post by ID
app.get("/api/post/:id", async (req: Request, res: Response) => {
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
        if (prevPost.length) {
            console.log(prevPost)
            
        }
            console.log(nextPost[0])
        console.log([prevPost[0], currentPost, nextPost[0] ])
        // nếu tìm thấy

        res.status(200).json({
            success: true,
            data: [prevPost[0], currentPost, nextPost[0] ],
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});

// Create a new post
app.post("/api/post", async (req: Request, res: Response) => {
    try {
        const { title, content, authorId } = req.body;

        if (!title || !content || !authorId) {
            return res.status(400).json({
                success: false,
                error: "title, content and authorId are required fields",
            });
        }

        const newPost: PostType = new PostModel({ title, content, authorId });

        await PostModel.create(newPost);

        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});

// Update a post by ID
app.put("/api/posts/:id", (req: Request, res: Response) => {
    const postId = req.params.id;
    const postIndex = POSTS.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = { ...posts[postIndex], ...req.body };
    posts[postIndex] = updatedPost;

    res.json(updatedPost);
});

// Delete a post by ID
app.delete("/api/posts/:id", (req: Request, res: Response) => {
    const postId = req.params.id;
    posts = posts.filter((p) => p.id !== postId);

    res.json({ message: "Post deleted successfully" });
});

// Get a specific user by ID
app.get("/api/user/:id", async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        // Kiểm tra xem userId có hợp lệ không
        if (!Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid userId parameter" });
        }
        // tìm user
        const user: UserType | null = await UserModel.findById(userId);

        // nếu không tồn tại
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: "User not found" });
        }

        // mếu tìm thấy
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});

// create a new user
app.post("/api/user", async (req: Request, res: Response) => {
    const { name, role } = req.body;
    console.log(req.body);
    if (!name || !role) {
        return res.status(400).json({
            success: false,
            error: "Name and role are required fields",
        });
    }
    const newUser: UserType = new UserModel({ name, role });
    await UserModel.create(newUser);

    res.status(201).json({ success: true, data: newUser });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
