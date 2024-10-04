import express from 'express';
import userRoute from "./routes/user_route.js"
import connectDB from './db/db.js';
import dotenv from "dotenv"

dotenv.config();
const app = express();
app.use(express.json());


app.use('/api/auth',userRoute)

connectDB();
const Port = process.env.PORT
app.listen(Port,(req, res) => {
    console.log('Server running on port 5000');
  
})