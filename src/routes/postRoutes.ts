import express from "express";
import * as postController from "../controllers/postController";
import authenticateToken from "../middlewares/authenticateToken";

const router = express.Router();

router.get("/", postController.getPostsForReader);
router.get("/manage",authenticateToken, postController.getPostsForAdmin);
router.get("/:id", postController.getPostById);
router.post("/", authenticateToken, postController.createPost);
router.put("/:id", authenticateToken, postController.updatePost);
router.delete("/:id", authenticateToken, postController.deletePost);

export default router;
