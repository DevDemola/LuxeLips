// components/AddToCartButton.jsx
import React, { useState } from "react";
import { FiShoppingBag, FiCheck, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./AddToCartButton.css";

const AddToCartButton = ({ product, shade = null, quantity = 1, variant = "default" }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, quantity, shade);
    
    // Show success animation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      className={`add-to-cart-btn ${variant} ${isAdded ? 'added' : ''}`}
      onClick={handleAddToCart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Add to cart"
    >
      <span className="btn-content">
        {isAdded ? (
          <>
            <FiCheck className="btn-icon added-icon" />
            <span>Added to Cart</span>
          </>
        ) : (
          <>
            {variant === "icon" ? (
              <FiShoppingBag className="btn-icon" />
            ) : variant === "mini" ? (
              <>
                <FiPlus className="btn-icon" />
                <span>Add</span>
              </>
            ) : (
              <>
                <FiShoppingBag className="btn-icon" />
                <span>Add to Cart</span>
                {product.price && <span className="btn-price">${product.price}</span>}
              </>
            )}
          </>
        )}
      </span>
      
      {isHovered && !isAdded && variant === "default" && (
        <span className="btn-tooltip">Click to add</span>
      )}
    </button>
  );
};

export default AddToCartButton;