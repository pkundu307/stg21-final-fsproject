import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';
import User from '../models/user_entity.js';
import dotenv from "dotenv"

dotenv.config();
const clientId=process.env.clientId;

const client = new OAuth2Client(
    clientId
);
const JWT_SECRET = "prasanna";

export const googleAuthController = async (req, res) => {
    const {credential,client_id} = req.body;

    try{
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id
        });
        const payload = ticket.getPayload();
        const {email,given_name,family_name,picture} = payload;

        let user = await User.findOne({email});
        if(!user){
            user= await User.create({
                email,
                name: `${given_name} ${family_name}`,
                picture,
                authSource:'google'
            });
        }else{
            user.picture=picture;
            await user.save();
        }
        
        const token = jwt.sign({userId: user._id}, JWT_SECRET);
        res.status(200).json({user,token})
    }catch(err){
        console.log(err);
        res.status(401).json({error: 'Failed to authenticate'})
    }
}