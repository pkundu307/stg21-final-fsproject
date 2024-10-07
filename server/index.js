import express from 'express';
import userRoute from "./routes/user_route.js"
import connectDB from './db/db.js';
import dotenv from "dotenv"
import cors from "cors"
import productRouter from "./routes/product_route.js"


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000',
  methods:'GET,POST,PUT,DELETE',
  credentials: true,
}));
app.use('/api/v1/products',productRouter)
app.use('/google-auth',async (req, res) => {
  const {credential,client_id} = req.body;
  console.log(credential,client_id);
  
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
})

connectDB();
const Port = process.env.PORT
app.listen(Port,(req, res) => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
  
})