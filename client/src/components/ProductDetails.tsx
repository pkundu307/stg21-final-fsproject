import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";

interface Dimensions {
  length: number;
  width: number;
  height: number;
}

interface Product {
  _id: string;
  id: string;
  title: string;
  description: string;
  price: number;
  purchasePrice: number;
  mrp: number;
  sellingPrice: number;
  gstTax: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  colors: string[];
  sizes: string[];
  highlights: string[];
  weight: number;
  dimensions: Dimensions;
  createdAt: string;
  updatedAt: string;
}

const ProductDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [largeImage, setLargeImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data: Product = await response.json();
        setProduct(data);
        {
          data.images.push(data.thumbnail);
        }
        setLargeImage(data.thumbnail);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Safe to access message
        } else {
          setError("An unknown error occurred"); // Handle unknown error types
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
const addProductToCart = (ProductToAdd: Product)=>{
  const dataToAdd = {
    quantity:1,
    product:ProductToAdd._id
  }
fetch('http://localhost:5000/api/v1/cart/add',{
  method: 'POST',
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('token')}`,

  },
  body: JSON.stringify(dataToAdd),
})
.then((response)=>{
  if(!response.ok){
    throw new Error(`Failed to add product inside cart`);
  }
  return response.json();
})
.then((data)=>{
  console.log('data added');
  dispatch(addItemToCart(data));
}).catch((error)=>{
console.error('Failed to add product',error);
})

}
  return (
    <>
    <Navbar/>
    <div className="font-sans bg-white" style={{ zIndex: -1 }}>
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-3 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
              <img
                style={{ zIndex: -1 }}
                src={largeImage !== null ? largeImage : undefined}
                alt="Product"
                className="w-72 h-72 rounded object-cover mx-auto"
              />
              <button type="button" className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#ccc"
                  className="mr-1 hover:fill-[#333]"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>
            {product.images.length > 0 && (
              <div className="mt-8">
                <div className="flex flex-row flex-wrap justify-center gap-4 mx-auto">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-24 h-20 flex items-center justify-center rounded-lg p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer"
                      style={{ minWidth: "6rem", minHeight: "5rem" }} // Added min width/height to enforce constant size
                    >
                      <img
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                        style={{ maxWidth: "6rem", maxHeight: "5rem" }} // Added max width/height to control image scaling
                        onClick={() => setLargeImage(image)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-800">
              {product.title}
            </h2>

            <div className="flex space-x-2 mt-4">
              <svg
                className="w-5 fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                className="w-5 fill-[#CED5D8]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <h4 className="text-gray-800 text-base">500 Reviews</h4>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <p className="text-gray-800 text-3xl font-bold">
                ₹{product.price}
              </p>
              <p className="text-gray-400 text-base">
                ₹{product.mrp}{" "}
                <span className="text-sm ml-1">Tax included</span>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">
                Choose a Color
              </h3>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  type="button"
                  className="w-10 h-10 bg-black border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                ></button>
                <button
                  type="button"
                  className="w-10 h-10 bg-gray-300 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                ></button>
                <button
                  type="button"
                  className="w-10 h-10 bg-gray-100 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                ></button>
                <button
                  type="button"
                  className="w-10 h-10 bg-blue-400 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                ></button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
              >
                Buy now
              </button>
              <button
                type="button"
                className="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                onClick={() => {addProductToCart(product)}}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-xl font-bold text-gray-800">
            Product information
          </h3>
          <ul className="mt-4 space-y-6 text-gray-800">
            <li className="text-sm">
              TYPE <span className="ml-4 float-right">LAPTOP</span>
            </li>
            <li className="text-sm">
              RAM <span className="ml-4 float-right">16 BG</span>
            </li>
            <li className="text-sm">
              SSD <span className="ml-4 float-right">1000 BG</span>
            </li>
            <li className="text-sm">
              PROCESSOR TYPE{" "}
              <span className="ml-4 float-right">INTEL CORE I7-12700H</span>
            </li>
            <li className="text-sm">
              PROCESSOR SPEED{" "}
              <span className="ml-4 float-right">2.3 - 4.7 GHz</span>
            </li>
            <li className="text-sm">
              DISPLAY SIZE INCH <span className="ml-4 float-right">16.0</span>
            </li>
            <li className="text-sm">
              DISPLAY SIZE SM <span className="ml-4 float-right">40.64 cm</span>
            </li>
            <li className="text-sm">
              DISPLAY TYPE{" "}
              <span className="ml-4 float-right">
                OLED, TOUCHSCREEN, 120 Hz
              </span>
            </li>
            <li className="text-sm">
              DISPLAY RESOLUTION{" "}
              <span className="ml-4 float-right">2880x1620</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;
//1st. create a cart entity ->done
//2nd. add to cart controller,update the cart controller,delete from cart controller , empty the cart controller ->done
//3rd. set routes for cart ->done
//4th. create cart slice in client side (using redux)
//5th. integrate cart slice with add to cart button
//6th.then create a cart page