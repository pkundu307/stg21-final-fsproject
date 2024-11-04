import express from "express";
import { createIssue, getAllIssues } from "../controllers/issue_controller.js";

const router = express.Router();

router.post('/add', createIssue);

router.get('/all', getAllIssues);

export default router;