import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config/constants";
import { Types } from "mongoose";

const generateToken = (_id: Types.ObjectId | undefined) => {
    if (_id) {
        try {
            const token = jwt.sign({ _id }, SECRET_JWT_KEY, {
                expiresIn: "4h",
            });
            return token;
        } catch (error) {
            console.error(error);
        }
    }
    return null;
};

export default generateToken;
