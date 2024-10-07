import mongoose from "mongoose";
const {Schema} = mongoose;

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:[1,"wrong min price"],
    },
    purchasePrice:{
        type:Number,
        min:[1,"wrong min price"],
    },
    mrp:{
        type:Number,
        required:true,
        min:[1,"wrong min MRP"],
    },
    tax:{
        type:Number,
        required:false,
        min:[0,"wrong min tax"],
        max:[100,"wrong max tax"]
    },
    discountPercent:{
        type:Number,
        required:false,
        min:[0,"wrong min discount"],
        max:[99,"wrong max discount"]
    },
    rating:{
        type:Number,
        required:false,
        min:[1,"wrong min rating"],
        max:[5,"wrong max rating"]
    },
    seller_id:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    brand:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:{
        type:[String]
    },
    category:{
        type:String,
        required:true
    }
})
const Product = mongoose.model("Product",productSchema)
export default Product;