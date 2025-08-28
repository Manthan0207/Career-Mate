import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const connectDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected");

    } catch (error) {
        console.log("Error in database : " + error.message);
    }
}