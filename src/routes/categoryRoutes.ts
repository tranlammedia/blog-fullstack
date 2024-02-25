import express from "express";
import * as categoryController from "../controllers/categoryController";
import authenticateToken from "../middlewares/authenticateToken";

const router = express.Router();

router.get("/", authenticateToken, categoryController.getAllCategory);
router.get("/count-posts", categoryController.getPostCountByCategory);
router.post("/", authenticateToken, categoryController.createCategory);
router.put("/:id", authenticateToken, categoryController.updateCategory);
router.delete("/:id", authenticateToken, categoryController.deleteCategory);

export default router;
