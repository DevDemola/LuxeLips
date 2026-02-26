// context/SimpleCartContext.jsx
import React, { createContext, useState, useContext } from "react";

const SimpleCartContext = createContext();

export const useCart = () => {
  const context = useContext(SimpleCartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    console.log("Adding to cart:", product); // DEBUG: Check if this logs
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    setShowCart(true); // Show cart when item added
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SimpleCartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      showCart,
      addToCart,
      removeFromCart,
      setShowCart
    }}>
      {children}
    </SimpleCartContext.Provider>
  );
};