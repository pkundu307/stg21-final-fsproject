import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import User from "../models/user_entity.js"

dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

// this  is middleware
export const authenticate =async (req,res,next)=>{
    const authHeader = req.headers['authorization'];

    const token =authHeader && authHeader.split(' ')[1];// this is a general way to get the token
    
    // from 'Bearer<token>'
    if(!token){
        return res.status(401).json({message: 'Authorization denied'});

    }
    try {
        const decode=jwt.verify(token,JWT_SECRET);
   
        const user = await User.findById(decode.user);
        req.user=user;
        next();
    } catch (error) {
        res.status(error.statusCode).json({message:'invalid token'});
    }

}

//main point of using jwt token 

// not sending sensetive information in payload