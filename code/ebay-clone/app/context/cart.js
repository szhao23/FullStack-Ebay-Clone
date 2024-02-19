"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();

  const [isItemAdded, setIsItemAdded] = useState(false);

  const getCart = () => {
    let cart = [];
    if (typeof localStorage !== "undefined") {
      // Either return items in cart or return empty array
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    return cart;
  };

  const addToCart = (product) => {
    if (typeof localStorage !== "undefined") {
      // Either return items in cart or return empty array
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    cart.push(product);
    // Reset Local Storage to Update Cart
    localStorage.setItem("cart", JSON.stringify(cart));
    isItemAddedToCart(product);
    router.refresh();
  };

  const removeFromCart = (product) => {
    let cart = [];
    if (typeof localStorage !== "undefined") {
      // Either return items in cart or return empty array
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    // Filter through the cart, if item id is not equal to product id we'll get that and remove from cart
    cart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    isItemAddedToCart(product);
    router.refresh();
  };

  //   Check if Item is Added to Cart
  const isItemAddedToCart = (product) => {
    let cart = [];
    if (typeof localStorage !== "undefined") {
      // Either return items in cart or return empty array
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    cart = cart.filter((item) => item.id == product.id);
    if (cart.length > 0) {
      setIsItemAdded(true);
      return;
    }
    setIsItemAdded(false);
  };

  //   Cart Count Check
  const cartCount = () => {
    let cart = [];
    if (typeof localStorage !== "undefined") {
      // Either return items in cart or return empty array
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }
    return cart.length;
  };

  //   Cart Total Price
  const cartTotal = () => {
    let total = 0;
    let cart = [];

    if (typeof localStorage !== "undefined") {
      // Either return items in cart or return empty array
      cart = JSON.parse(localStorage.getItem("cart")) || [];
    }

    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      // Adding price up as we loop
      total += element.price;
    }
    return total;
  };

  //   Clear Cart
  const clearCart = () => {
    localStorage.removeItem("cart");
    router.refresh();
  };

  //   Expose all functions and States we've made
  const exposed = {
    isItemAdded,
    getCart,
    addToCart,
    removeFromCart,
    isItemAddedToCart,
    cartCount,
    cartTotal,
    clearCart,
  };

  //   Return and access all this information
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useCart = () => useContext(Context);

export default Provider;
