import express from "express";
import { addToCart, clearCart, deleteFromCart, fetchCartByUser, 
    updateCart
 } from "../controllers/cart_controller.js";
import { authenticate } from "../middleware/authenticate.js";


const router = express.Router();

router.post('/add',authenticate,addToCart)

router.get('/cart',authenticate,fetchCartByUser)//middleware needed
 router.delete('/delete/:productid',authenticate,deleteFromCart)// middleware needed
 router.put('/:productid',authenticate,updateCart)//middleware needed
 router.put('/delete',authenticate,clearCart)//middleware needed

 export default router;