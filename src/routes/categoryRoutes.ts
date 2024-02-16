import express from "express";
import * as categoryController from "../controllers/categoryController";
import authenticateToken from "../middlewares/authenticateToken";

const router = express.Router();

router.get("/", authenticateToken, categoryController.getAllCategory);
router.post("/", authenticateToken, categoryController.createCategory);

export default router;
