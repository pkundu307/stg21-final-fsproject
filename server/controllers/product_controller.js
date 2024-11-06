import Product from "../models/product_entity.js";


export const addProducts = async (req, res) => {
    const {
        title,
        description,
        price,
        purchasePrice,
        mrp,
        sellingPrice,
        gstTax,
        discountPercentage,
        rating,
        seller_id,
        stock,
        brand,
        category,
        thumbnail,
        images,
        colors,
        sizes,
        highlights,
        coupon,
        weight,
        dimensions,
        manufacturer,
        supplier
    } = req.body;

    try {
        // Create a new product instance with the provided data
        const newProduct = new Product({
            title,
            description,
            price,
            purchasePrice,
            mrp,
            sellingPrice,
            gstTax,
            discountPercentage,
            rating,
            seller_id,
            stock,
            brand,
            category,
            thumbnail,
            images,
            colors,
            sizes,
            highlights,
            coupon,
            weight,
            dimensions,
            manufacturer,
            supplier
        });

        // Save the new product to the database
        await newProduct.save();

        // Return a success response with the new product's data
        res.status(201).json({
            message: 'Product added successfully',
            product: {
                id: newProduct.id,
                title: newProduct.title,
                description: newProduct.description,
                price: newProduct.price,
                thumbnail: newProduct.thumbnail,
                stock: newProduct.stock,
                brand: newProduct.brand,
                category: newProduct.category,
                mrp: newProduct.mrp
            }
        });
    } catch (error) {
        // Handle validation errors or duplicate key errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                error: 'Validation Error',
                message: error.message
            });
        }
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'Duplicate Key Error',
                message: 'A product with this title already exists.'
            });
        }
        // Return a general error response
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
};


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
        console.log(product);
        
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

export const searchProductsByName = async (req, res) => {
    try {    
      const name = req.query.name || "";
      console.log(name);
      
      const products = await Product.find({
        title: { $regex: `^${name}`, $options: "i" },
        // deleted: false
      }).select('title thumbnail'); // Select only title and thumbnail fields
      console.log(products);
      
      res.status(200).json(products.map(product => ({
        id: product.id,         // Virtual 'id' field
        title: product.title,
        thumbnail: product.thumbnail
      })));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
  