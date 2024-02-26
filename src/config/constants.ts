import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const URL_DATABASE = process.env.URL_DATABASE || "localhost:4000";

export const URL_CLIENT = process.env.URL_CLIENT;
export const SECRET_SESSION_KEY = process.env.SECRET_SESSION_KEY;
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;