import express from "express";
import * as postController from "../controllers/postController";
import authenticateToken from "../middlewares/authenticateToken";

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", authenticateToken, postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export default router;
