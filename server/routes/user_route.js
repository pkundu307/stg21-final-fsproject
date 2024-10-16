import express from "express";
import { googleAuthController } from "../controllers/user_controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post('/google_auth',googleAuthController);
router.get('/profile',authenticate,(req,res)=>{
    res.json(req.user)
})

export default router;