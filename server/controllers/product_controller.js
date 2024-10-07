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

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) return res.json(product);
        res.status(404).json({ message: "Product not found" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) return res.json({ message: "Product deleted successfully" });
        res.status(404).json({ message: "Product not found" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateProductById = async (req, res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(updatedProduct) return res.status(200).json(updatedProduct);
        res.status(404).json({ message: "Product not found" });
    }catch(err){
        res.status(400).json({ error: error.message });
    }
}