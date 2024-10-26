import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import Issue from '../db/issue_schema';


const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const mongoURL = 'mongodb://localhost:27017/issuesDB';


const connectDB = async () => {
  try {
      const connection = await mongoose.connect(mongoURL)
      console.log("DB connection established");
  } catch (error) {
      console.error("Mongoose connection error");
      process.exit(1);
  }
}
connectDB();


function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).send("Access denied");

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.status(403).send("Invalid token");

    req.user = user;  
    next();
  });
}


app.post('/create-issue', authenticateJWT, async (req, res) => {
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
