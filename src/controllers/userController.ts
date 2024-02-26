import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../models/User";
import { UserType } from "../interfaces";
import { Types } from "mongoose";
import generateToken from "../functions/generateToken";

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Kiểm tra email duy nhất
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res
            .status(409)
            .json({ success: false, error: "Email đã được sử dụng" });
    }

    // Kiểm tra các trường bắt buộc
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            error: "name, email, password yêu cầu bắt buộc",
        });
    }
    const hash_password = await bcrypt.hash(password, 10);

    const newUser: UserType = new UserModel({
        name,
        email,
        password: hash_password,
    });
    const createdUser = await UserModel.create(newUser);

    const token = generateToken(createdUser?._id)
    res.setHeader("Authorization", token);

    return res.sendStatus(200);
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        // Kiểm tra xem userId có hợp lệ không
        if (!Types.ObjectId.isValid(userId)) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid userId parameter" });
        }
        // tìm user
        const user: UserType | null = await UserModel.findById(userId);

        // nếu không tồn tại
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: "User not found" });
        }

        // mếu tìm thấy
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};
