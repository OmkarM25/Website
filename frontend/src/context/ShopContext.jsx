import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '₹';
  const delivery_fee = 100;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    console.log("Adding item to cart:", itemId);
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    console.log("CartItems state before set:", cartData);

    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + 'api/cart/add',
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Add to cart response:", response.data);
      } catch (error) {
        console.log("Add to cart error:", error);
        toast.error(error.message);
      }
    } else {
      console.log("No token found - user not logged in?");
    }
  };


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      try {
        if (cartItems[items] > 0) {
          totalCount += cartItems[items];
        }
      } catch (error) { }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + 'api/cart/update',
          { itemId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Update quantity response:", response.data);
        if (!response.data.success) {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("Update quantity error:", error);
        toast.error(error.message);
      }
    } else {
      console.log("No token found for updateQuantity");
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemQuantity = cartItems[itemId];
      const itemInfo = products.find((product) => product._id === itemId);

      if (itemInfo && itemQuantity > 0) {
        totalAmount += itemInfo.price * itemQuantity;
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}api/product/list`);
      if (response.data.products) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // getUserCart function
  const getUserCart = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + 'api/cart/get',
        {}, // no body needed, userId from token
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUserId(decoded.id); // or decoded._id depending on your backend
    }
  }, [token]);

  
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const value = {
    products, currency, delivery_fee, search,
    setSearch, showSearch, setShowSearch, cartItems, setCartItems, addToCart, getCartCount,
    updateQuantity, getCartAmount, navigate, backendUrl, setToken, token, userId
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
