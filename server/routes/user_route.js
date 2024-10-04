import express from "express";
import { googleAuthController } from "../controllers/user_controller.js";

const router = express.Router();

router.post('/google_auth',googleAuthController);

export default router;