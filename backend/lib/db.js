import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected", conn.connection.host);
    } catch (error) {
        console.log("Error in DB connection", error);
        process.exit(1); // 1 status code means failure 0 means success
    }
}