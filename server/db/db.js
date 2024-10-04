import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const mongoURL =process.env.MONGOURL

const connectDB=async()=>{
    try {
        const connection = await mongoose.connect(mongoURL)
        console.log("db connection established");
        
    } catch (error) {
        console.error(" Mongoose connection error");
        process.exit(1);
    }
}

export default connectDB;