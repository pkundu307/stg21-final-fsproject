import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import Issue from '../models/issue_entity.js';
import connectDB from '../db/db.js';
import { authenticate } from '../middleware/authenticate.js';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());


connectDB();// connecting with database

//post api that take two functions

app.post('/create-issue', authenticate, async (req, res) => {
  try {
    const { email } = req.user; 
    const { phone, issue } = req.body;

    
    if (!phone || !issue) {
      return res.status(400).json({ message: "Phone and issue fields are required" });
    }

    const newIssue = new Issue({
      email,
      phone,
      issue,
      is_resolved: false
    });

    await newIssue.save();
    res.status(201).json({ message: "Issue created successfully", issue: newIssue });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the issue" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
