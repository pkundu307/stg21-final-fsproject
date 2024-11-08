import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface Order {
  id: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  selectedAddress: string;
  items: {
    productId: {
      id: string;
      price: number;
      thumbnail: string;
    };
    quantity: number;
  }[];
  createdAt: string;
}

function MyOrders() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("")
  const [orders, setOrders] = useState<Order[]>([]);
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/orders/orders/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  console.log(orders);
  const handlePopUpOpen = async (orderId:string) => {
    console.log(orderId);

    setPopup(true);
    setSelectedOrderId(orderId);
  };
  console.log(cancelReason);
  const handelCancelOrder = async () => {
    try {
        const res = await axios.put(`http://localhost:5000/api/v1/orders/cancel/${selectedOrderId}`,{
            cancellationReason:cancelReason
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        toast.success("Order canceled successfully")
        console.log(res);
        
        location.reload();
        setPopup(false)
        setCancelReason("")
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="text-2xl font-bold mb-4">My Orders</div>
      <div className="space-y-4">
        {orders.map((order) => (
          <>
            <div
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row"
              key={order.id}
            >
              <div className="flex flex-col  space-y-2">
                <p className="text-lg font-semibold ">Order id :{order.id}</p>
                <p className="text-sm text-gray-500">Status : {order.status}</p>
                <p className="text-sm text-gray-500">
                  Total amount : ���{order.totalAmount}
                </p>
                <p className="text-sm text-gray-500">
                  Payment method : {order.paymentMethod}
                </p>
                <p className="text-sm text-gray-500">
                  Created at : {order.createdAt}
                </p>
              </div>
              {/* items */}
              <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                {order.items.map((item) => (
                  <>
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.productId.thumbnail}
                        alt={item.productId.thumbnail}
                        className="w-10 h-10 mt-10 object-cover"
                      />
                    </div>
                  </>
                ))}
              </div>
              {/* cancel order */}
              {order.status !== "cancelled" ? (
                <>
                  <button
                    onClick={()=>{handlePopUpOpen(order.id)}}
                    className="px-4 py-2 bg-red-400 text-white rounded-md"
                  >
                    Cancel Order
                  </button>
                </>
              ) : (
                <>
                  <p className="text-red-500 font-semibold">
                    Order is cancelled
                  </p>
                </>
              )}
            </div>
          </>
        ))}
      </div>
      <>{popup?(<div className="border-red-700">
      
 <input type="text" value={cancelReason} 
 onChange={(e)=>{setCancelReason(e.target.value)}

}
 className="border-blue-600 p-9"/>
<button onClick={handelCancelOrder}>
    cancel Order
</button>

      </div>):(<></>)}</>
    </div>
  );
}

export default MyOrders;
