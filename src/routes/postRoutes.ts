import express from "express";
import * as postController from "../controllers/postController";

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/api/posts/:id", postController.deletePost);

export default router;
