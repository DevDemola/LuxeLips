// components/SimpleCartToast.jsx - Redesigned
import React from "react";
import { FiShoppingBag, FiX, FiArrowRight } from "react-icons/fi";
import { GiQueenCrown } from "react-icons/gi";
import { useCart } from "../context/CartContext";
import "./SimpleCartToast.css";

const SimpleCartToast = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    showCart,
    setShowCart,
    removeFromCart,
  } = useCart();

  if (!showCart) return null;

  return (
    <div className="cart-toast-luxury">
      {/* Header */}
      <div className="toast-header">
        <div className="toast-title">
          <div className="title-icon">
            <FiShoppingBag />
          </div>
          <div className="title-text">
            <h3>Your Cart</h3>
            <span className="item-count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
          </div>
        </div>
        <button className="toast-close" onClick={() => setShowCart(false)}>
          <FiX />
        </button>
      </div>

      {/* Items */}
      <div className="toast-items">
        {cartItems.length === 0 ? (
          <div className="toast-empty">
            <GiQueenCrown className="empty-crown" />
            <p>Your cart is empty</p>
            <button className="empty-shop" onClick={() => setShowCart(false)}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="items-container">
            {cartItems.map((item) => (
              <div key={item.id} className="toast-item">
                <div className="item-image-wrapper">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <span className="item-quantity-badge">{item.quantity}</span>
                </div>
                
                <div className="item-info">
                  <div className="item-header">
                    <p className="item-name">{item.name}</p>
                    <button
                      className="item-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <FiX />
                    </button>
                  </div>
                  
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="toast-footer">
          <div className="toast-subtotal">
            <span>Subtotal</span>
            <span className="subtotal-amount">${cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="toast-actions">
            <button className="toast-view-cart" onClick={() => {
              setShowCart(false);
              // Navigate to cart page if needed
            }}>
              View Cart
            </button>
            <button className="toast-checkout" onClick={() => alert("Proceeding to checkout...")}>
              Checkout
              <FiArrowRight className="checkout-arrow" />
            </button>
          </div>
          
          <p className="toast-shipping">Free shipping on orders over $50</p>
        </div>
      )}
    </div>
  );
};

export default SimpleCartToast;