import { Request, Response } from "express";
import passport from "passport";
import bcrypt from 'bcrypt';

import { URL_CLIENT } from "../config/constants";
import generateToken from "../functions/generateToken";
import { UserType } from "../interfaces";
import UserModel from "../models/User";

interface ExtendedRequest extends Request {
    user?: object;
    isAuthenticated?: () => boolean;
}

export const loginSuccess = async (req: ExtendedRequest, res: Response) => {
    
    res.status(200).json({ success: true, data: req.user });
};

export const loginFailed = async (req: ExtendedRequest, res: Response) => {};

export const loginWithEmailAndPassword = async (
    req: Request,
    res: Response
) => {
    const { email, password } = req.body;
    console.log(email, password);
    // find user in database
    try {
        const user: UserType | null = await UserModel.findOne({ email });

        // Tài khoản không tồn tại
        if (!user)
            return res
                .status(404)
                .json({ success: false, error: "User not found" });

        // Sai mật khẩu
        if (!(await bcrypt.compare(password,user.password)))
            return res
                .status(401)
                .json({ success: false, error: "Incorrect password" });

        // generate token
        const token = generateToken(user?._id);

        res.setHeader("Authorization", token);

        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"],
});
export const googleAuthCallback = (
    req: ExtendedRequest,
    res: Response,
    next: Function
) => {
    passport.authenticate("google", { session: false }, async (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/api/auth/failed"); // Chuyển hướng khi xác thực thất bại
        }

        // Tạo token JWT từ thông tin người dùng
        const token = generateToken(user._id);
        // Đặt token vào header và redirect người dùng đến trang client cùng token
        res.setHeader("Authorization", token);
        return res.redirect(`${URL_CLIENT}/auth/?token=${token}`);
    })(req, res, next);
};

export const githubAuth = passport.authenticate("github", {
    scope: ["profile", "email"],
});
export const githubAuthCallback = (
    req: ExtendedRequest,
    res: Response,
    next: Function
) => {
    passport.authenticate("github", { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/api/auth/failed"); // Chuyển hướng khi xác thực thất bại
        }

        // Tạo token JWT từ thông tin người dùng
        const token = generateToken(user._id);
        // Đặt token vào header và redirect người dùng đến trang client cùng token
        res.setHeader("Authorization", token);
        return res.redirect(`${URL_CLIENT}/auth/?token=${token}`);
    })(req, res, next);
};
