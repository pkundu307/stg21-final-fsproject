import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user_entity.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.user);
    
    if (!user) {
      return res.status(401).json({ message: 'Authorization denied' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    // If error object does not have a statusCode, default to 400
    const statusCode = error.statusCode || 400;
    res.status(statusCode).json({ message: 'Invalid token' });
  }
};
