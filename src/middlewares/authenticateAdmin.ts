import { Request, Response } from "express";

interface ExtendedRequest extends Request {
    user?: any;
    isAuthenticated?: () => boolean;
}

const authenticateAdmin = (
    req: ExtendedRequest,
    res: Response,
    next: Function
) => {
    const { user } = req;
    if (user.role !== "admin") return res.sendStatus(403); // co token nhung khong co quyen

    next();
};

export default authenticateAdmin;
