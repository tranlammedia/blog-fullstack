import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

import connectDatabase from "./config/database";
import { POSTS, TypePost } from "./config/data";
import { PostType, UserType } from "./interfaces";
import PostModel from "./models/Post";
import UserModel from "./models/User";

interface ExtendedRequest extends Request {
  user?:  any
}

dotenv.config();

const app = express();
const PORT: string = process.env.PORT || "3001";
const URL_DATABASE = process.env.URL_DATABASE || "localhost:4000";
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || "seccret";

app.use(
    cors({
        origin: "http://localhost:3000", // Replace with your actual client origin
        credentials: true,
    })
);
app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json({ limit: "50mb" }));

connectDatabase(URL_DATABASE);

let posts: Array<TypePost> = POSTS;

function generateToken(user: UserType) {
    try {
        const token = jwt.sign({name: user.name, role: user.role}, SECRET_JWT_KEY, { expiresIn: "1h" });
        return token;
    } catch (error) {
        return error;
    }
}

function authenticateToken(req: ExtendedRequest, res: Response, next: Function) {

    const token = req.header("Authorization");
    if (!token) return res.sendStatus(401); // chua dang nhap authentication

    jwt.verify(token, SECRET_JWT_KEY, (err, user) => {

        if (err) return res.sendStatus(403); // co token nhung khong co quyen

        req.user = user;
        next();
    });
}

function authenticateAdmin(req: ExtendedRequest, res: Response, next: Function) {
  const {user} = req;
  if(user.role !== 'admin') return res.sendStatus(403); // co token nhung khong co quyen
  
  next();
}

// Get all posts
app.get("/api/posts", async (req: Request, res: Response) => {
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
            console.log(prevPost);
        }
        console.log(nextPost[0]);
        console.log([prevPost[0], currentPost, nextPost[0]]);
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
});

// Create a new post
app.post("/api/post", async (req: Request, res: Response) => {
    try {
        const { title, content, status } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                error: "title, content and authorId are required fields",
            });
        }

        const newPost: PostType = new PostModel({
            title,
            content,
            authorId: "65ae1c4c889d65dc86bd4940",
            // commentIds, // default
            // views, // default
            status,
            // createdAt, // default
            // updateAt, // default
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

// user login
app.post("/api/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // find user in database
    try {
      const user: UserType | null = await UserModel.findOne({
        name: username,
      });
      // console.log(user)

        if (!user) return res.sendStatus(401);
        // generate token
        const token = generateToken(user);
        res.setHeader('Authorization', token)
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

// authorization
app.get("/api/auth", authenticateToken, authenticateAdmin, async (req: ExtendedRequest, res: Response) => {
  console.log(req.user)
  return res.sendStatus(200)
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
