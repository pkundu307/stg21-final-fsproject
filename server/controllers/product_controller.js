import Product from "../models/product_entity.js";


export const addProducts = async (req, res) => {
    const { title, description, price,brand,thumbnail,category,mrp } = req.body;
    try {
      
        const newProduct = new Product({ title, description, price, brand, thumbnail, category,mrp });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}