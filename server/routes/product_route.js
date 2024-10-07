import { addProducts, getProducts } from "../controllers/product_controller.js";
import express from "express";

const router =  express.Router();


router.post('/add', addProducts);
router.get('/getAll', getProducts);

export default router;