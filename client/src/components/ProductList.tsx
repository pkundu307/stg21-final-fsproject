import React, { useEffect, useState } from "react";
import { Product } from "../utils/types";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = React.useState<Product[]>([]);
  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/products/getAll");
        console.log(response);
        
        if (!response) {
          throw new Error("Could not fetch data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchedProducts();
  },[]);
  return <div>all products</div>;
}

export default ProductList;
