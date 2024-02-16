import { Request, Response } from "express";
import { TagType } from "../interfaces";
import TagModel from "../models/Tag";

export const getAllTag = async (req: Request, res: Response) => {
    try {
        const tags = await TagModel.find();

        if (tags.length < 1) {
            res.status(404).json({
                success: false,
                error: "Không có tags nào được tìm thấy.",
            });
        } else {
            res.status(200).json({
                success: true,
                data: tags,
            });
        }
    } catch (error) {
        console.error("Lỗi khi lấy tags bài viết:", error);
        res.status(500).json({
            succcess: false,
            error: "Đã xảy ra lỗi server khi lấy tags bài viết.",
        });
    }
};

export const createTag = async (req: Request, res: Response) => {
    const tagBody = req.body;

    // Kiểm tra email duy nhất
    const existingCategory = await TagModel.findOne({
        name: { $regex: new RegExp(tagBody.name, "i") },
    });
    if (existingCategory) {
        return res
            .status(409)
            .json({ success: false, error: "Tag đã tồn tại" });
    }

    // Kiểm tra các trường bắt buộc
    if (!tagBody.name) {
        return res.status(400).json({
            success: false,
            error: "name yêu cầu bắt buộc",
        });
    }
    const newTag: TagType = new TagModel(tagBody);
    await TagModel.create(newTag);

    res.status(201).json({ success: true, data: newTag });
};
