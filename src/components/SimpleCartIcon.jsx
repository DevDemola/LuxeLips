// components/SimpleCartIcon.jsx
import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./SimpleCartIcon.css";

const SimpleCartIcon = () => {
  const { cartCount, setShowCart } = useCart();

  return (
    <button className="simple-cart-icon" onClick={() => setShowCart(true)}>
      <FiShoppingBag />
      {cartCount > 0 && <span className="simple-cart-count">{cartCount}</span>}
    </button>
  );
};

export default SimpleCartIcon;