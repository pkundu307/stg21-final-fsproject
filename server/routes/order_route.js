import {   createOrder, 
    getUserOrders, 
    getOrderById, 
    updateOrderStatus, 
    deleteOrder, 
    getKey,
    createOnlineOrder,
    verifyOrder,
    updateAddress,
    cancelOrder, 
    getAllOrders,
    changeOrderStatus} from "../controllers/order_controller.js";
import { authenticate } from "../middleware/authenticate.js";

import express from "express";
const router = express.Router();

router.post('/new',authenticate, createOrder);
router.get('/orders/user',authenticate, getUserOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);
router.get('/getkey',authenticate,getKey)
router.post('/onlinepay',authenticate,createOnlineOrder)
router.post('/paymentverification',verifyOrder)
router.put('/updateAddress/:orderId', authenticate, updateAddress);
router.put('/cancel/:orderId', authenticate, cancelOrder);

// -----------ADMIN USE----------------
router.get('/admin', getAllOrders);

// Route to change order status
router.put('/update/:orderId', changeOrderStatus);

export default router;
