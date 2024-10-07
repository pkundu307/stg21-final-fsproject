import { addProducts, deleteProductById, getProductById, getProducts, updateProductById } from "../controllers/product_controller.js";
import express from "express";

const router =  express.Router();


router.post('/add', addProducts);
router.get('/getAll', getProducts);
router.get('/:id',getProductById);
router.delete('/delete/:id',deleteProductById);
router.put('/update/:id',updateProductById)

export default router;