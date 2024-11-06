import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoURL = process.env.MONGOURL; // Use MONGODB_URI as defined in your .env file

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(mongoURL);
        console.log("DB connection established successfully");
    } catch (error) {
        console.error("Mongoose connection error:", error.message); // Log the error message
        process.exit(1);
    }
};

export default connectDB;
