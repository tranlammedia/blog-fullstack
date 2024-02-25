import { Request, Response } from "express";
import { TagType } from "../interfaces";
import TagModel from "../models/Tag";
import PostModel from "../models/Post";

export const getAllTag = async (req: Request, res: Response) => {
    try {
        const tags = await TagModel.find().sort({name: 1});

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
    const existingTag = await TagModel.findOne({
        name: { $regex: new RegExp(tagBody.name, "i") },
    });
    if (existingTag) {
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

export const updateTag = async (req: Request, res: Response) => {
    try {
        const postId = req.params.id;
        const postBody = req.body;

        // Kiểm tra xem postId có tồn tại không
        const updatedTag = await TagModel.findByIdAndUpdate(
            postId,
            { $set: { ...postBody } },
            { new: true }
        );

        if (!updatedTag) {
            return res
                .status(404)
                .json({ success: false, error: "Tag not found" });
        }
        res.status(200).json({ success: true, data: updatedTag });
    } catch (error) {
        console.error("Error updating Tag:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const deleteTag = async (req: Request, res: Response) => {
    try {
        const tagId = req.params.id;

        // Xóa bài viết từ trong cơ sở dữ liệu
        const deletedTag = await TagModel.findByIdAndDelete(tagId);

        // Kiểm tra xem bài viết có tồn tại không
        if (!deletedTag) {
            return res
                .status(404)
                .json({ success: false, error: "tag not found" });
        }

        // Trả về thông báo xóa thành công
        res.json({
            success: true,
            message: "tag deleted successfully",
            data: deletedTag,
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Error deleting tag:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const getPostCountByTag = async (req: Request, res: Response) => {
    try {
        const counts = await PostModel.aggregate([
            { $unwind: "$tagIds" },
            {
                $lookup: {
                    from: "tags", // tên collection chứa thông tin danh mục
                    localField: "tagIds",
                    foreignField: "_id",
                    as: "tagInfo",
                },
            },

            { $unwind: "$tagInfo" },
            {
                $group: {
                    _id: "$tagInfo._id",
                    name: { $first: "$tagInfo.name" },
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
            error: "Đã xảy ra lỗi server khi lấy count nhãn bài viết.",
        });
    }
};