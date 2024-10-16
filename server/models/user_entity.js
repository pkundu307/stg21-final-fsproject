import mongoose from 'mongoose';

const {Schema}=mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },
    authSource:{
        type:String,
        enum:["self","google"]
    },
    role:{
        type:String,
        enum:["admin","user","superadmin"],
        default:"user"
    },
    picture:{
        type:String
    }
},{
    timestamps:true
})


const User = mongoose.model("User",userSchema);

export default User;


