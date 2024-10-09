import Cart from "../models/cart_entity.js";

export const addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { product } = req.body;

    const existingCartItem = await Cart.findOne({ user: id, product });
    if (existingCartItem) {
      res.status(400).json({ message: "Product already exists in cart" });
    } //edge case handling

    const newCartItem = await new Cart({ ...req.body, user: id });
    await newCartItem.save();

    res.status(201).json({ message: "product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const fetchCartByUser = async (req, res) => {
  const { id } = req.user;

  try {
    const cartItem = await Cart.findOne({ user: id }).populate(
      "product",
      "price thumbnail title _id"
    );

    if (!cartItem || cartItem.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    } //handling edge case where cart is empty

    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  const { id } = req.user;
  const { productId } = req.params;
  try {
    const deletedItem = await Cart.findOneAndDelete({
      user: id,
      product: productId,
    });
    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.user;
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const updatedItem = await Cart.findByIdAndUpdate({
      user: id,
      product: productId,
    },{$set:{ quantity}},{new:true});

    if (!updatedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }//edge case
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
    const { id } = req.user;
    try {
      await Cart.deleteMany({ user: id });
      res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
