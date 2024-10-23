import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  fetchCart,
  clearCart,
  selectCartItems,
  selectCartStatus,
} from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { fetchAddresses } from "../redux/addressSlice";
import { RootState } from "../redux/types";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addresses, status, error } = useSelector(
    (state: RootState) => state.address
  );

  const cart = useSelector(selectCartItems);

  console.log(cart, "<---");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

//   ****************  
  const handleOrder =async()=>{
    const orderData = {
        items:cart,
        paymentMethod,
        selectedAddress,
        paymentStatus:"pending"
    }
    try {
        const response = await fetch('http://localhost:5000/api/v1/orders/new',
            {method:"POST",
            
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(orderData)
            }
        )
        if(response.ok){
            throw new Error("Successfully  placed order")
        }

    } catch (error) {
        
    }
    
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1>Order Summery</h1>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold mb-4 text-grey-200">
            Products
          </h2>
          <div className="overflow-auto">
            <table className="min-w-full bg-white border-grey-200">
              <thead>
                <tr className="text-left">
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td className="text-left">{item.product.title}</td>
                    <td className="text-left">{item.quantity}</td>
                    <td className="text-left">₹{item.product.price}</td>
                    <td className="text-left">
                      ₹{item.product.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <label htmlFor="addressDropdown" className="block mb-2 text-sm">
            Address
          </label>
          <select
            name=""
            id="addressDropdown"
            value={selectedAddress || ""}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className="block w-full p-2 border border-gray-400 rounded-md "
          >
            <option value="">Select Address</option>

            {addresses.map((address)=>{
                return (
                  <option key={address._id} value={address._id}>
                    {`${address.street}, ${address.city}, ${address.state} - ${address.postalCode}`}
                  </option>
                )
            })}
          </select>
        </div>
        <div>
          <label htmlFor="addressDropdown" className="block mb-2 text-sm">
            Payment Method
          </label>
          <select
            name=""
            id="addressDropdown"
            value={paymentMethod || ""}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="block w-full p-2 border border-gray-400 rounded-md "
          >
            <option value="">Select Payment Method</option>
            <option value="online" >online</option>
            <option value="cash_on_delivery" >Cash On Delivery</option>
        
          </select>
          </div>
      </div>
      {/* remove this button later */}
      <button onClick={handleOrder} className="bg-green-400 p-5 rounded-md mt-8">Place order</button>
    </div>
  );
}

export default Order;
