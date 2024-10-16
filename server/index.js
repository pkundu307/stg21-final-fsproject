import express from 'express';
import userRoute from "./routes/user_route.js"
import connectDB from './db/db.js';
import dotenv from "dotenv"
import cors from "cors"
import productRouter from "./routes/product_route.js"
import cartRouter from "./routes/cart_route.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000", // or the frontend URL
      methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
      credentials: true,
    })
  );
  app.use(cors())
app.use('/api/v1/products',productRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/auth',userRoute);

connectDB();
const Port = process.env.PORT
app.listen(Port,(req, res) => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
  
})