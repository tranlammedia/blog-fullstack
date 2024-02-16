import { Request, Response } from "express";
import { CategoryType } from "../interfaces";
import CategoryModel from "../models/Category";

export const getAllCategory = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find();

        if (categories.length < 1) {
            res.status(404).json({
                success: false,
                error: "Không có chủ đề nào được tìm thấy.",
            });
        } else {
            res.status(200).json({
                success: true,
                data: categories,
            });
        }
    } catch (error) {
        console.error("Lỗi khi lấy chủ đề bài viết:", error);
        res.status(500).json({
            succcess: false,
            error: "Đã xảy ra lỗi server khi lấy chủ đề bài viết.",
        });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    const categoryBody = req.body;

    // Kiểm tra email duy nhất
    const existingCategory = await CategoryModel.findOne({
        name: { $regex: new RegExp(categoryBody.name, "i") },
    });
    if (existingCategory) {
        return res
            .status(409)
            .json({ success: false, error: "Chủ đề đã tồn tại" });
    }

    // Kiểm tra các trường bắt buộc
    if (!categoryBody.name) {
        return res.status(400).json({
            success: false,
            error: "name yêu cầu bắt buộc",
        });
    }
    const newCategory: CategoryType = new CategoryModel(categoryBody);
    await CategoryModel.create(newCategory);

    res.status(201).json({ success: true, data: newCategory });
};
