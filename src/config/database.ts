
import mongoose from "mongoose";

export default function connectDatabase(URL_DATABASE: string): void {
    try {
        mongoose.connect(URL_DATABASE);
        console.log("Connect to the database successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}
