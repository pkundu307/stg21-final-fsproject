import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

interface OrderItem {
    id: string;
    items: Array<{ productId: string; quantity: number }>;
    totalAmount: number;
    user: { name: string }; // Adjust based on your User schema
    status: string;
}

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/orders/admin'); // Adjust API endpoint
                setOrders(response.data);
            } catch (err) {
                setError(`Failed to fetch orders.${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleChangeStatus = async (orderId: string, newStatus: string) => {
        try {
            await axios.put(`http://localhost:5000/api/v1/orders/update/${orderId}`, { status: newStatus }); // Adjust API endpoint
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
              return (error.response.data as string);
            }
            return ('Error fetching addresses');
          }
        }
      

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <>
        <Navbar/>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Order List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white shadow-md rounded-lg p-4 flex flex-col"
                    >
                        <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                        <p className="text-gray-600">Total Amount: ${order.totalAmount}</p>
                        <p className="text-gray-600">Customer: {order.user.name}</p>
                        <p className="text-gray-600">Status: {order.status}</p>
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Change Status:</label>
                            <select
                                value={order.status}
                                onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                                className="border rounded-md p-2"
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default OrderList;
