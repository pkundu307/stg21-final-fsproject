import { subscribeUser } from "../controllers/newsletter_controller.js";
import express from "express";
const router = express.Router()

router.post('/subscribe', subscribeUser)

export default router;