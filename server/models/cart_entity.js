import mongoose from "mongoose";
const {Schema}= mongoose;

const cartSchema = new Schema({
    quantity: {type: Number, required: true},
    product: {type: Schema.Types.ObjectId, ref: "Product"},
    user: {type: Schema.Types.ObjectId, ref: "User"},   
})

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;