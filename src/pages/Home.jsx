import React from "react";
import {
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiArrowRight,
  HiOutlineShoppingBag,
  HiOutlineStar,
  HiOutlineChevronRight,
} from "react-icons/hi";
import { GiLipstick, GiFlowerTwirl, GiQueenCrown } from "react-icons/gi";
import { RiLeafLine, RiCustomerServiceLine, RiTruckLine } from "react-icons/ri";
import { MdOutlineSpa, MdOutlineColorLens } from "react-icons/md";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Velvet Matte Lipstick",
      price: 28.99,
      rating: 4.8,
      reviews: 124,
      color: "#9B2C2C",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Hydrating Lip Gloss",
      price: 22.99,
      rating: 4.9,
      reviews: 89,
      color: "#97266D",
      badge: "New",
    },
    {
      id: 3,
      name: "Lip Care Set",
      price: 45.99,
      rating: 5.0,
      reviews: 56,
      color: "#744210",
      badge: "Limited",
    },
    {
      id: 4,
      name: "Tinted Lip Balm",
      price: 18.99,
      rating: 4.7,
      reviews: 203,
      color: "#702459",
      badge: "Eco",
    },
  ];

  const benefits = [
    {
      icon: <HiOutlineSparkles className="benefit-icon" />,
      title: "Premium Quality",
      description:
        "Handcrafted with the finest ingredients for lasting comfort",
    },
    {
      icon: <GiLipstick className="benefit-icon" />,
      title: "Handcrafted",
      description: "Artisan-made with attention to every beautiful detail",
    },
    {
      icon: <RiLeafLine className="benefit-icon" />,
      title: "Natural Ingredients",
      description: "Clean beauty you can feel good about",
    },
    {
      icon: <HiOutlineClock className="benefit-icon" />,
      title: "Long-lasting",
      description: "All-day wear that stays vibrant and comfortable",
    },
  ];

  return (
    <div className="lip-care-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="collection-badge">
            <HiOutlineSparkles className="badge-icons" />
            New Collection Available
          </span>
          <h1 className="hero-title">
            Beautiful Lips Deserve
            <span className="title-highlight">Beautiful Care</span>
          </h1>
          <p className="hero-description">
            Discover our premium collection of lip products that combine luxury,
            comfort, and stunning colors to enhance your natural beauty.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="explore-btn" href="#products">
              Explore Collection <HiArrowRight className="btn-icon" />
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4.9</span>
              <span className="stat-label">
                <HiOutlineStar className="star-icon" />
                <HiOutlineStar className="star-icon" />
                <HiOutlineStar className="star-icon" />
                <HiOutlineStar className="star-icon" />
                <HiOutlineStar className="star-icon" />
              </span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Natural</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="/product3.jpg"
            alt="Luxury lip products collection"
            className="product-image"
          />
          <div className="floating-badge badge-1">
            <GiQueenCrown className="badge-icons" />
            <span>Luxury</span>
          </div>
          <div className="floating-badge badge-2">
            <HiOutlineShieldCheck className="badge-icons" />
            <span>Certified</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        {benefits.map((benefit, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon-wrapper">{benefit.icon}</div>
            <h3 className="feature-title">{benefit.title}</h3>
            <p className="feature-description">{benefit.description}</p>
          </div>
        ))}
      </section>

      <section className="routine-section">
        <h2 className="section-title">How To Use</h2>
        <div className="routine-container">
          {/* Left image */}
          <div className="routine-image">
            <img src="/image2.jpg" alt="Lip care routine" />
          </div>

          {/* Right steps */}
          <div className="routine-steps">
            <div className="routine-card">
              <HiOutlineSparkles className="routine-icon" />
              <h3>Step 1: Exfoliate</h3>
              <p>Gently remove dry skin for a smooth canvas.</p>
            </div>
            <div className="routine-card">
              <GiLipstick className="routine-icon" />
              <h3>Step 2: Apply Lip Care</h3>
              <p>Use balm, gloss, or lipstick to nourish and beautify.</p>
            </div>
            <div className="routine-card">
              <GiQueenCrown className="routine-icon" />
              <h3>Step 3: Glow All Day</h3>
              <p>Enjoy soft, hydrated, and stunning lips anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="products-preview">
        <div className="section-header">
          <div>
            <span className="section-subtitle">Shop Our Bestsellers</span>
            <h2 className="section-title">Most Loved Products</h2>
          </div>
          <Link to="/products" className="view-all-btn">
            View All <HiOutlineChevronRight className="btn-icon" />
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.badge && (
                <span className="product-badge">{product.badge}</span>
              )}
              <div className="product-image-container">
                <img
                  src={`/product2.jpg`}
                  alt={product.name}
                  className="product-thumbnail"
                />
                <button className="quick-view-btn">
                  <HiOutlineShoppingBag />
                </button>
              </div>
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <div className="product-rating">
                  <HiOutlineStar className="star-filled" />
                  <span>{product.rating}</span>
                  <span className="rating-count">({product.reviews})</span>
                </div>
                <div className="product-price-row">
                  <span className="product-price">${product.price}</span>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Showcase */}
      <section className="benefits-showcase">
        <div className="benefits-grid">
          <div className="benefit-large-card">
            <GiFlowerTwirl className="benefit-large-icon" />
            <h3>100% Natural Ingredients</h3>
            <p>
              Formulated with organic oils and butters for ultimate lip care
            </p>
            <button className="learn-more-btn">
              Learn More <HiArrowRight className="btn-icon" />
            </button>
          </div>
          <div className="benefit-large-card">
            <MdOutlineSpa className="benefit-large-icon" />
            <h3>Spa-Quality Experience</h3>
            <p>
              Transform your daily routine into a luxurious self-care ritual
            </p>
            <button className="learn-more-btn">
              Learn More <HiArrowRight className="btn-icon" />
            </button>
          </div>
          <div className="benefit-large-card">
            <RiCustomerServiceLine className="benefit-large-icon" />
            <h3>24/7 Customer Support</h3>
            <p>We're here to help you find your perfect shade</p>
            <button className="learn-more-btn">
              Learn More <HiArrowRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">Loved By Our Customers</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <img
              src="/image1.jpg"
              alt="Happy customer"
              className="testimonial-img"
            />
            <p>
              "Absolutely love the hydrating lip gloss! My lips have never felt
              better."
            </p>
            <span>- Sarah K.</span>
          </div>
          <div className="testimonial-card">
            <img
              src="/image2.jpg"
              alt="Happy customer"
              className="testimonial-img"
            />
            <p>
              "The lipstick is so smooth and long-lasting. Highly recommend!"
            </p>
            <span>- Emily R.</span>
          </div>
          <div className="testimonial-card">
            <img
              src="/image1.jpg"
              alt="Happy customer"
              className="testimonial-img"
            />
            <p>
              "Best lip care set I've ever bought. Luxurious and effective."
            </p>
            <span>- Maya P.</span>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <MdOutlineColorLens className="newsletter-icon" />
          <h2>Get 15% Off Your First Order</h2>
          <p>
            Subscribe to receive beauty tips, exclusive offers, and new arrivals
          </p>

          <button type="submit" className="newsletter-btn">
            Subscribe <HiArrowRight className="btn-icon" />
          </button>

          <div className="trust-badges">
            <span>
              <HiOutlineShieldCheck /> Secure checkout
            </span>
            <span>
              <RiTruckLine /> Free shipping over $50
            </span>
            <span>
              <HiOutlineHeart /> Love it or return it
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
