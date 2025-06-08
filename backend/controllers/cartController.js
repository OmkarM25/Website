import userModel from "../models/userModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
    try {
      const userId = req.userId; // from middleware
      console.log("Middleware userId:", userId);
  
      const { itemId } = req.body;
      console.log("Item to add:", itemId);
  
      const user = await userModel.findById(userId);
      if (!user) {
        console.log("User not found for id:", userId);
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cart = user.cartData || {};
      console.log("Cart before adding:", cart);
  
      if (cart[itemId]) {
        cart[itemId] += 1;
      } else {
        cart[itemId] = 1;
      }
  
      console.log("Cart after adding:", cart);
  
      user.cartData = cart;
      user.markModified('cartData');
      await user.save();
      console.log("User cart saved");
  
      res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
      console.error("Add to cart error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  

// UPDATE CART
const updateCart = async (req, res) => {
    try {
      const userId = req.userId; // from middleware
      const { itemId, quantity } = req.body;
  
      const userData = await userModel.findById(userId);
      if (!userData) return res.status(404).json({ success: false, message: "User not found" });
  
      if (!userData.cartData) {
        userData.cartData = {};
      }
  
      userData.cartData[itemId] = quantity;
      userData.markModified('cartData');
      await userData.save();
  
      res.json({ success: true, message: "Cart updated" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  // GET USER CART
  const getUserCart = async (req, res) => {
    try {
      const userData = await userModel.findById(req.userId);
      if (!userData) return res.status(404).json({ success: false, message: "User not found" });
  
      const cartData = userData.cartData || {};
  
      res.json({ success: true, cartData });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

export { addToCart, updateCart, getUserCart };
