import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const DashboardCards: React.FC = () => {
    return (
        <>
        <Navbar/>
        <div className="flex flex-col md:flex-row justify-around items-center p-4">
            {/* Card for All Orders */}
            <div className="bg-white shadow-lg rounded-lg p-6 m-4 flex flex-col justify-between w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-xl font-bold mb-4">All Orders</h2>
                <p className="text-gray-700 mb-4">
                    View and manage all customer orders in one place.
                    
             
                </p>
                <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                <Link to='/adminorder'>

                    View Orders
                    </Link>
                </button>
            </div>

            {/* Card for Issues*/}
            <div className="bg-white shadow-lg rounded-lg p-6 m-4 flex flex-col justify-between w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-xl font-bold mb-4">Products</h2>
                <p className="text-gray-700 mb-4">
                    Manage your product listings and stock levels here.
                </p>
                <button className="mt-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    View Products
                </button>
            </div>


            <div className="bg-white shadow-lg rounded-lg p-6 m-4 flex flex-col justify-between w-full md:w-1/2 lg:w-1/3">
                <h2 className="text-xl font-bold mb-4">All Issues</h2>
                <p className="text-gray-700 mb-4">
                    View and manage all customer issues.
                    
             
                </p>
                <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                <Link to='/customerissues'>

                    View Issues
                    </Link>
                </button>
            </div>
        </div>
        </>
    );
};

export default DashboardCards;
