import express, { Request, Response } from "express";
import { PORT } from "./config/constants";
import { POSTS, TypePost } from "./config/data";

const app = express();

let posts: Array<TypePost> = POSTS

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Get all posts
app.get("/api/posts", (req: Request, res: Response) => {
  res.json(posts);
});

// Get a specific post by ID
app.get("/api/posts/:id", (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

// Create a new post
app.post("/api/posts", (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  const newPost: TypePost = { id: "post"+(POSTS.length + 1).toString(), title, content, author };
  POSTS.push(newPost);

  res.status(201).json(newPost);
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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
