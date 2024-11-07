import React from 'react';
import { useForm } from 'react-hook-form';
import Navbar from './Navbar';

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/product/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Product added successfully!');
                reset(); // Reset form after successful submission
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Network error: ${error.message}`);
        }
    };

    return (
        <>
        <Navbar/>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 space-y-4">
            <h2 className="text-xl font-semibold">Add New Product</h2>

            {/* Title */}
            <div>
                <label className="block font-medium">Title</label>
                <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full p-2 border rounded"
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block font-medium">Description</label>
                <textarea
                    {...register('description')}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Price */}
            <div>
                <label className="block font-medium">Price</label>
                <input
                    type="number"
                    {...register('price', { required: 'Price is required', min: 1 })}
                    className="w-full p-2 border rounded"
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>

            {/* MRP */}
            <div>
                <label className="block font-medium">MRP</label>
                <input
                    type="number"
                    {...register('mrp', { required: 'MRP is required', min: 1 })}
                    className="w-full p-2 border rounded"
                />
                {errors.mrp && <p className="text-red-500">{errors.mrp.message}</p>}
            </div>

            {/* Stock */}
            <div>
                <label className="block font-medium">Stock</label>
                <input
                    type="number"
                    {...register('stock', { required: 'Stock is required', min: 0 })}
                    className="w-full p-2 border rounded"
                />
                {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
            </div>

            {/* Brand */}
            <div>
                <label className="block font-medium">Brand</label>
                <input
                    type="text"
                    {...register('brand')}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Category */}
            <div>
                <label className="block font-medium">Category</label>
                <input
                    type="text"
                    {...register('category')}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Thumbnail */}
            <div>
                <label className="block font-medium">Thumbnail URL</label>
                <input
                    type="text"
                    {...register('thumbnail')}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Weight */}
            <div>
                <label className="block font-medium">Weight (kg)</label>
                <input
                    type="number"
                    {...register('weight')}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Dimensions */}
            <div className="space-y-2">
                <label className="block font-medium">Dimensions (cm)</label>
                <input
                    type="number"
                    {...register('dimensions.length')}
                    placeholder="Length"
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="number"
                    {...register('dimensions.width')}
                    placeholder="Width"
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="number"
                    {...register('dimensions.height')}
                    placeholder="Height"
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Product
            </button>
        </form>
        </>
    );
};

export default AddProduct;
