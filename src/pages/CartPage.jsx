// pages/CartPage.jsx - Modern Minimalist Design
import React from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag, FiCreditCard, FiTruck } from "react-icons/fi";
import { GiQueenCrown } from "react-icons/gi";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  // Calculate savings if there are original prices
  const savings = cartItems.reduce((total, item) => {
    if (item.originalPrice) {
      return total + ((item.originalPrice - item.price) * item.quantity);
    }
    return total;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-modern">
        <div className="empty-content">
          <div className="empty-icon">
            <GiQueenCrown />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="empty-shop-btn">
            <FiShoppingBag />
            Discover Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-modern">
      {/* Header */}
      <div className="cart-header-modern">
        <div className="cart-header-left">
          <Link to="/products" className="back-link">
            <FiArrowLeft />
            Continue Shopping
          </Link>
        </div>
        <h1 className="cart-title-modern">Shopping Cart</h1>
        <div className="cart-header-right">
          <span className="item-count">{cartItems.length} items</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="cart-layout">
        {/* Left Column - Cart Items */}
        <div className="cart-items-modern">
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${item.shade}`} className="cart-item-modern">
              <div className="item-image-modern">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details-modern">
                <div className="item-header-modern">
                  <div>
                    <h3 className="item-name-modern">{item.name}</h3>
                    {item.shade && (
                      <span className="item-shade-modern">Shade: {item.shade}</span>
                    )}
                  </div>
                  <button 
                    className="item-remove-modern"
                    onClick={() => removeFromCart(item.id, item.shade)}
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="item-price-modern">
                  <span className="current-price-modern">${item.price}</span>
                  {item.originalPrice && (
                    <span className="original-price-modern">${item.originalPrice}</span>
                  )}
                </div>

                <div className="item-actions-modern">
                  <div className="quantity-modern">
                    <button 
                      className="qty-btn-modern"
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.shade)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="qty-value-modern">{item.quantity}</span>
                    <button 
                      className="qty-btn-modern"
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.shade)}
                      disabled={item.quantity >= item.maxQuantity}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  
                  <div className="item-total-modern">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {cartItems.length > 1 && (
            <div className="cart-actions-modern">
              <button className="clear-cart-modern" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-summary-modern">
          <h2>Order Summary</h2>
          
          <div className="summary-list">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping</span>
              <span className="free-shipping">Free</span>
            </div>
            {savings > 0 && (
              <div className="summary-item savings">
                <span>You Save</span>
                <span>-${savings.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-item total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="promo-modern">
            <input 
              type="text" 
              placeholder="Gift card or discount code" 
              className="promo-input-modern"
            />
            <button className="promo-apply-modern">Apply</button>
          </div>

          <button className="checkout-btn-modern" onClick={handleCheckout}>
            <FiCreditCard />
            Checkout Securely
          </button>

          <div className="payment-badges">
            <img src="/api/placeholder/40/25" alt="Visa" />
            <img src="/api/placeholder/40/25" alt="Mastercard" />
            <img src="/api/placeholder/40/25" alt="Amex" />
            <img src="/api/placeholder/40/25" alt="PayPal" />
            <img src="/api/placeholder/40/25" alt="Apple Pay" />
          </div>

          <div className="shipping-note">
            <FiTruck />
            <span>Free shipping on orders over $50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;