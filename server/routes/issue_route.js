import express from "express";
import { createIssue, getAllIssues,updateIssue } from "../controllers/issue_controller.js";


const router = express.Router();

router.post('/add', createIssue);

router.get('/all', getAllIssues);

router.put('/update/:id',updateIssue);


export default router;

