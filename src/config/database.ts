
import mongoose from "mongoose";

export default async function connectDatabase(URL_DATABASE: string): Promise<void> {
    try {
        await mongoose.connect(URL_DATABASE);
        console.log("Connect to the database successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}
