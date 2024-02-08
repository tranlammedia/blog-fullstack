import jwt from "jsonwebtoken";
import { UserType } from "../interfaces";
import { SECRET_JWT_KEY } from "../config/constants";

const generateToken = (user: UserType) => {
    try {
        const token = jwt.sign(
            { name: user.name, role: user.role },
            SECRET_JWT_KEY,
            { expiresIn: "1h" }
        );
        return token;
    } catch (error) {
        return error;
    }
};

export default generateToken;
