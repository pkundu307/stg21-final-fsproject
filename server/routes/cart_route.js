import express from "express";
import { addToCart, clearCart, deleteCartItem, fetchCartByUser, updateCart } from "../controllers/cart_controller.js";
import { authenticate } from "../middleware/authenticate.js";


const router = express.Router();

router.post('/add',addToCart)

router.get('/cart',authenticate,fetchCartByUser)//middleware needed
 router.delete('/delete/:productid',authenticate,deleteCartItem)// middleware needed
 router.put('/:productid',authenticate,updateCart)//middleware needed
 router.put('/clear',authenticate,clearCart)//middleware needed

 export default router;