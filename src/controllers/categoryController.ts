import { Request, Response } from "express";
import { CategoryType } from "../interfaces";
import CategoryModel from "../models/Category";
import PostModel from "../models/Post";

export const getAllCategory = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find().sort({ name: 1 });
        console.log(categories)
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

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;
        const categoryBody = req.body;

        // Kiểm tra xem categoryId có tồn tại không
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            categoryId,
            { $set: { ...categoryBody } },
            { new: true }
        );

        if (!updatedCategory) {
            return res
                .status(404)
                .json({ success: false, error: "Category not found" });
        }
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.id;

        // Xóa bài viết từ trong cơ sở dữ liệu
        const deletedCategory = await CategoryModel.findByIdAndDelete(
            categoryId
        );

        // Kiểm tra xem bài viết có tồn tại không
        if (!deletedCategory) {
            return res
                .status(404)
                .json({ success: false, error: "category not found" });
        }

        // Trả về thông báo xóa thành công
        res.json({
            success: true,
            message: "category deleted successfully",
            data: deletedCategory,
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error deleting category:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const getPostCountByCategory = async (req: Request, res: Response) => {
    try {
        const counts = await PostModel.aggregate([
            { $unwind: "$categoryIds" },
            {
                $lookup: {
                    from: "categories", // tên collection chứa thông tin danh mục
                    localField: "categoryIds",
                    foreignField: "_id",
                    as: "categoryInfo",
                },
            },

            { $unwind: "$categoryInfo" },
            {
                $group: {
                    _id: "$categoryInfo._id",
                    name: { $first: "$categoryInfo.name" },
                    count: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            data: counts,
        });
    } catch (error) {
        res.status(500).json({
            succcess: false,
            error: "Đã xảy ra lỗi server khi lấy count chủ đề bài viết.",
        });
    }
};
