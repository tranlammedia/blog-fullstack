import express from "express";
import * as tagController from "../controllers/tagController";
import authenticateToken from "../middlewares/authenticateToken";

const router = express.Router();

router.get("/", authenticateToken, tagController.getAllTag);
router.post("/", authenticateToken, tagController.createTag);
router.put("/:id", authenticateToken, tagController.updateTag);
router.delete("/:id", authenticateToken, tagController.deleteTag);

export default router;
