import Razorpay from 'razorpay'
import orderInitiate from "../models/orderInstantiate_entity.js";
import Order from '../models/order_entity.js';
import Product from '../models/product_entity.js';
import User from '../models/user_entity.js';
import Cart from '../models/cart_entity.js';
import Address from '../models/address_entity.js';


const instance = new Razorpay({
  key_id: 'rzp',
  key_secret: 'Og05Q',
})
// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {id}= req.user;
    const { items, paymentMethod, selectedAddress, paymentStatus } = req.body;
    const user = await User.findById(id);
    const address = await Address.findById(selectedAddress)
    const finalAddress = address.street+","+address.city+','+address.state+","+address.postalCode+","+address.country;
    let totalAmount = 0;
    let shippingFee=0;
    console.log(items, totalAmount, paymentMethod, selectedAddress, id);

    for (let item of items) {
      const productId = item.productId;
      const quantity = item.quantity;

      // Find the product by its ID
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${productId} not found.` });
      }

      // Multiply the price of the product by its quantity and add to totalAmount
      totalAmount += 3 * quantity;
    }


    if(totalAmount<500){
      shippingFee=40
    }
    totalAmount = totalAmount+shippingFee;

    

    
    const order = new Order({
      items,
      totalAmount,
      user,
      paymentMethod,
      selectedAddress:finalAddress,
      paymentStatus:paymentStatus?paymentStatus:"pending",
      shippingFee,
    });

    const savedOrder = await order.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.user; // Extract the user ID from the authenticated user
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch the user's orders, sorted by creation date (newest first), and populate product details
    const orders = await Order.find({ user: id })
      .sort({ createdAt: -1 })
      .populate('items.productId', 'title price thumbnail'); // Populating relevant product fields

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};


// Get an order by ID
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching order', error });
  }
};

// Update order status (e.g., from pending to shipped)
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status, paymentStatus, trackingNumber, estimatedDeliveryDate } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status, paymentStatus, trackingNumber, estimatedDeliveryDate },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating order', error });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting order', error });
  }
};
// send key 
export const getKey = async (req, res) => {
  return res.status(200).json({ key:"rzp_test_izwrHraJQ0vHKp"})
}

// generate order instance

export const createOnlineOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const user =await User.findById(id);
    console.log(id,user, 'id');

    const { items } = req.body;
    let totalAmount = 0;
    let shippingFee = 0;
    
    for (let item of items) {
      const productId = item.productId;
      const quantity = item.quantity;

      // Find the product by its ID
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${productId} not found.` });
      }

      // Multiply the price of the product by its quantity and add to totalAmount
      totalAmount += product.price * quantity;
    }

    // Add shipping fee if the total amount is less than 500
    if (totalAmount < 500) {
      shippingFee = 40;
    }
    totalAmount = totalAmount + shippingFee;

    console.log('Total Amount:', totalAmount);

    // Creating order with Razorpay or other payment gateway
    const options = {
      amount: Number(totalAmount) * 100, // Razorpay requires amount in paise (for INR)
      currency: "INR",
    };

    const order = await instance.orders.create(options); // Make sure 'instance' is initialized correctly for Razorpay

    console.log('Order created with payment gateway:', order);

    // Save order initiation details in your database
    const orderInst = await orderInitiate.create({
      order_id: order.id,
      userId: id,
      status: "pending", // Status should be a string
    });

    console.log('Order saved in DB:', orderInst);

    // Send response with the order details
    res.status(200).json({ order,user });
  } catch (error) {
    console.error('Error in creating order:', error);
    return res.status(500).json({ message: 'Error creating order', error });
  }
};

//verify order

export const verifyOrder = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign.toString())
    .digest("hex");

// console.log(razorpay_signature === expectedSign);

// Create isAuthentic
const isAuthentic = expectedSign === razorpay_signature;

if (isAuthentic) {
 const oldRecord = await orderInitiate.find({order_id:razorpay_order_id})
 console.log(oldRecord,'oldRecord');
 
 oldRecord.status = "completed";
 await oldRecord.save();
 res.status(200).json({ message: "Payment successful",paymentStatus: "completed" });
}


res.status(200).json({ message: "Payment unsuccessful",paymentStatus: "pending" });
   
  } catch (error) { 
    
    console.error('Error in verifying order:', error);
    return res.status(500).json({ message: 'Error verifying order', error });
  }
}

// Cancel order controller
export const cancelOrder = async (req, res) => {
  console.log("opopopopop");
  
  const { orderId } = req.params;
  const { cancellationReason } = req.body;
  const userId = req.user.id; 

  try {
    // Find the order by orderId
    const order = await Order.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Check if the current user is the owner of the order
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this order." });
    }

    // Update the selectedAddress field
    if(!cancellationReason){
      res.status(200).json({
        message: "unable to cancel.",
        order: order.toJSON(),
      });
    }
    order.cancellationReason = cancellationReason;
    order.status = "cancelled";

    // Save the updated order to the database
    await order.save();

    // Return the updated order
    res.status(200).json({
      message: "Address updated successfully.",
      order: order.toJSON(),
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

// update address 
export const updateAddress = async (req, res) => {
  const { orderId } = req.params;
  const { newAddress } = req.body;
  const userId = req.user.id; // Assuming `req.user` is set by authentication middleware

  try {
    // Find the order by orderId
    const order = await Order.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Check if the current user is the owner of the order
    if (order.user.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this order." });
    }

    // Update the selectedAddress field
    order.selectedAddress = newAddress;

    // Save the updated order to the database
    await order.save();

    // Return the updated order
    res.status(200).json({
      message: "Address updated successfully.",
      order: order.toJSON(),
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};
