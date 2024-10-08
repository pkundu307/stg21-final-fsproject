import React, { useEffect } from 'react'
import { Product } from '../utils/types'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function ProductDetails() {
    const [product, setProduct] = React.useState<Product | null>(null);
    const{id}=useParams<{id:string}>();
useEffect(()=>{
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
            console.log(response.data);
            setProduct(response.data);
            
        } catch (error) {
            console.error(error);
        }
    }
    fetchProduct();
 },[id])
  return (
    <div>
       <img src= {product?.thumbnail}/>
{product?.price}
        
      
    </div>
  )
}

export default ProductDetails
//we have to make this product detail page responsive and attractive+add to cart
//+
//make product list page responsive 