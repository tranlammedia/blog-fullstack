import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { SECRET_JWT_KEY } from "../config/constants";
import UserModel from "../models/User";

interface ExtendedRequest extends Request {
    user?: any;
    isAuthenticated?: () => boolean;
}

const authenticateToken = (
    req: ExtendedRequest,
    res: Response,
    next: Function
) => {
    const token = req.header("Authorization");
    // console.log(token);
    if (!token) return res.status(401).json({ success: false, error: "Token not provided" }); // chua dang nhap authentication

    jwt.verify(token, SECRET_JWT_KEY, async (err, user) => {
        if (err) return res.status(403).json({ success: false, error: "Unauthorized" }); // co token nhung khong co quyen
        
        const userDB = await UserModel.findById(user._id)
        if (!userDB) return res.status(404).json({ success: false, error: "User not found"})
        
        const {_id, name, username, email, role} = userDB
        req.user = {_id, name, username, email, role};

        next();
    });
};

export default authenticateToken;
