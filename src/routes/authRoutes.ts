import express from "express";
import * as authController from "../controllers/authController";
import authenticateToken from "../middlewares/authenticateToken";

const router = express.Router();

// check login success
router.get("/success", authenticateToken, authController.loginSuccess);
router.get("/failed", authController.loginFailed);

// user login email and password
router.post("/login", authController.loginWithEmailAndPassword);

// google
router.get("/google", authController.googleAuth);
router.get("/google/callback", authController.googleAuthCallback);

// github
router.get("/github", authController.githubAuth);
router.get("/github/callback",authController.githubAuthCallback);

export default router;
