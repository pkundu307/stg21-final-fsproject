import { useEffect } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, removeItemFromCart, selectCartItems, selectCartStatus } from '../redux/cartSlice'
import { Link } from 'react-router-dom'
import axios from 'axios';


function Cart() {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    console.log(cartItems,'cartItems');

    
    
  return (
    <div>
      <Navbar/>

    </div>
  )
}

export default Cart
