import express from 'express';
import userRoute from "./routes/user_route.js";
import connectDB from './db/db.js';
import dotenv from "dotenv";
import cors from "cors";
import productRouter from "./routes/product_route.js";
import cartRouter from "./routes/cart_route.js";
import addressRouter from "./routes/address_route.js";
import orderRouter from "./routes/order_route.js";
import issueRouter from './routes/issue_route.js';
import newsletterRouter from './routes/newsletter_route.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

// CORS setup (Allow frontend requests)
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// API Routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/auth', userRoute);
app.use('/api/v1/address', addressRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/issues", issueRouter);
app.use('/api/v1/newsletter', newsletterRouter);

// To get the equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your dist folder after Vite build
const distPath = path.join(__dirname, 'dist');

// Serve Static Files (after building with Vite)
app.use(express.static(distPath));

// For all other routes, serve the index.html (for frontend routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Connect to the database
connectDB();

// Start the server
const Port = process.env.PORT || 5000; // Use the value from the environment variable or default to 5000
app.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});
