import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { SECRET_JWT_KEY } from "../config/constants";

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
    if (!token) return res.sendStatus(401); // chua dang nhap authentication

    jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // co token nhung khong co quyen

        req.user = user;
        next();
    });
};

export default authenticateToken;
