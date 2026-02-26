// ProductsListingPage.tsx
import React, { useState, useEffect } from "react";
import { 
  FiGrid, 
  FiList, 
  FiFilter, 
  FiChevronDown,
  FiHeart,
  FiEye,
  FiStar
} from "react-icons/fi";
import { GiQueenCrown, GiLipstick } from "react-icons/gi";
import { RiSparklingLine, RiLeafLine } from "react-icons/ri";
import "./ProductListing.css";
import AddToCartButton from "../components/AddToCartButton";

const ProductsListingPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(9);

  const categories = [
    { id: "all", name: "All Products", count: 24 },
    { id: "lipsticks", name: "Lipsticks", count: 12 },
    { id: "lip-glosses", name: "Lip Glosses", count: 6 },
    { id: "lip-balms", name: "Lip Balms", count: 4 },
    { id: "lip-kits", name: "Gift Sets", count: 2 },
  ];

  const products = [
    {
      id: 1,
      name: "Velvet Matte Lipstick",
      shade: "Rose Petal",
      category: "lipsticks",
      price: 28.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 124,
      isNew: false,
      isBestseller: true,
      isSale: false,
      image: "/product1.jpg",
      colors: ["#F2C4C4", "#B22222", "#EAC7B7", "#8A2E4B"],
    },
    {
      id: 2,
      name: "Hydrating Lip Gloss",
      shade: "Nude Bliss",
      category: "lip-glosses",
      price: 22.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      isNew: true,
      isBestseller: false,
      isSale: false,
      image: "/product2.jpg",
      colors: ["#EAC7B7", "#FF7F5F", "#A76F7A"],
    },
    {
      id: 3,
      name: "Lip Care Set",
      shade: "Complete Collection",
      category: "lip-kits",
      price: 45.99,
      originalPrice: 58.99,
      rating: 5.0,
      reviews: 56,
      isNew: false,
      isBestseller: true,
      isSale: true,
      image: "/product3.jpg",
      colors: [],
    },
    {
      id: 4,
      name: "Tinted Lip Balm",
      shade: "Berry Rich",
      category: "lip-balms",
      price: 18.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 203,
      isNew: false,
      isBestseller: false,
      isSale: false,
      image: "/product4.jpg",
      colors: ["#8A2E4B", "#A76F7A", "#B22222"],
    },
    {
      id: 5,
      name: "Satin Lipstick",
      shade: "Coral Dream",
      category: "lipsticks",
      price: 26.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 67,
      isNew: true,
      isBestseller: false,
      isSale: false,
      image: "/product5.jpg",
      colors: ["#FF7F5F", "#F2C4C4", "#EAC7B7"],
    },
    {
      id: 6,
      name: "Plumping Lip Gloss",
      shade: "Mauve Moment",
      category: "lip-glosses",
      price: 24.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 42,
      isNew: false,
      isBestseller: true,
      isSale: false,
      image: "/product6.jpg",
      colors: ["#A76F7A", "#8A2E4B"],
    },
    {
      id: 7,
      name: "Exfoliating Lip Scrub",
      shade: "Brown Sugar",
      category: "lip-balms",
      price: 16.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 78,
      isNew: false,
      isBestseller: false,
      isSale: false,
      image: "/product7.jpg",
      colors: [],
    },
    {
      id: 8,
      name: "Limited Edition Set",
      shade: "Holiday Collection",
      category: "lip-kits",
      price: 65.99,
      originalPrice: 85.99,
      rating: 5.0,
      reviews: 23,
      isNew: true,
      isBestseller: false,
      isSale: true,
      image: "/product8.jpg",
      colors: ["#B22222", "#8A2E4B", "#A76F7A"],
    },
    {
      id: 9,
      name: "Matte Liquid Lipstick",
      shade: "Velvet Red",
      category: "lipsticks",
      price: 24.99,
      originalPrice: null,
      rating: 4.7,
      reviews: 91,
      isNew: false,
      isBestseller: false,
      isSale: false,
      image: "/product9.jpg",
      colors: ["#B22222", "#8A2E4B"],
    },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "newest": return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1;
      default: return 0;
    }
  });

  const displayedProducts = sortedProducts.slice(0, visibleProducts);

  return (
    <div className="products-listing-page">
      {/* Hero Banner */}
      <div className="listing-hero">
        <div className="hero-content">
          <span className="hero-label">The Collection</span>
          <h1 className="hero-title">Luxury Lip Care</h1>
          <p className="hero-description">
            Discover our curated collection of premium lip products, 
            crafted with the finest ingredients for the perfect pout.
          </p>
        </div>
        <div className="hero-decoration">
          <GiQueenCrown className="hero-crown" />
          <div className="hero-pattern"></div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="filters-left">
          <button 
            className={`filter-toggle ${filterOpen ? 'active' : ''}`}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FiFilter /> Filters
          </button>
          
          <div className="categories">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
                <span className="category-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filters-right">
          <div className="view-options">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FiGrid />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FiList />
            </button>
          </div>

          <div className="sort-dropdown">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <FiChevronDown className="dropdown-icon" />
          </div>
        </div>
      </div>

      {/* Expanded Filters Panel */}
      {filterOpen && (
        <div className="filters-panel">
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-range">
              <input type="range" min="0" max="100" className="price-slider" />
              <div className="price-inputs">
                <span>$0</span>
                <span>$100+</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h4>Product Type</h4>
            <div className="checkbox-group">
              <label><input type="checkbox" /> Lipsticks <span>(12)</span></label>
              <label><input type="checkbox" /> Lip Glosses <span>(6)</span></label>
              <label><input type="checkbox" /> Lip Balms <span>(4)</span></label>
              <label><input type="checkbox" /> Gift Sets <span>(2)</span></label>
            </div>
          </div>

          <div className="filter-section">
            <h4>Finish</h4>
            <div className="checkbox-group">
              <label><input type="checkbox" /> Matte <span>(8)</span></label>
              <label><input type="checkbox" /> Satin <span>(6)</span></label>
              <label><input type="checkbox" /> Glossy <span>(7)</span></label>
              <label><input type="checkbox" /> Sheer <span>(3)</span></label>
            </div>
          </div>

          <div className="filter-section">
            <h4>Benefits</h4>
            <div className="checkbox-group">
              <label><input type="checkbox" /> Hydrating <span>(12)</span></label>
              <label><input type="checkbox" /> Long-lasting <span>(15)</span></label>
              <label><input type="checkbox" /> Plumping <span>(5)</span></label>
              <label><input type="checkbox" /> Natural <span>(8)</span></label>
            </div>
          </div>

          <button className="apply-filters">Apply Filters</button>
        </div>
      )}

      {/* Results Info */}
      <div className="results-info">
        <p>Showing <span>{displayedProducts.length}</span> of <span>{filteredProducts.length}</span> products</p>
      </div>

      {/* Products Grid/List */}
      <div className={`products-container ${viewMode}`}>
        {displayedProducts.map((product, index) => (
          <div key={product.id} className={`product-item ${viewMode}`}>
            <div className="product-card-luxury">
              {/* Badges */}
              <div className="product-badges">
                {product.isNew && <span className="badge new">New</span>}
                {product.isBestseller && <span className="badge bestseller">Bestseller</span>}
                {product.isSale && <span className="badge sale">Sale</span>}
              </div>

              {/* Image Container */}
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                
                {/* Quick Actions */}
                <div className="quick-actions">
                  <button className="quick-action-btn" aria-label="Add to wishlist">
                    <FiHeart />
                  </button>
                  <button className="quick-action-btn" aria-label="Quick view">
                    <FiEye />
                  </button>
                </div>

                {/* Shimmer Effect */}
                <div className="shimmer-effect"></div>

                {/* Color Swatches (if available) */}
                {product.colors.length > 0 && (
                  <div className="color-swatches">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <span 
                        key={idx} 
                        className="swatch" 
                        style={{ backgroundColor: color }}
                        title={`Shade ${idx + 1}`}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="swatch-more">+{product.colors.length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-shade">{product.shade}</p>
                
                {/* Rating */}
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} 
                      />
                    ))}
                  </div>
                  <span className="rating-count">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="product-price">
                  {product.originalPrice ? (
                    <>
                      <span className="sale-price">${product.price}</span>
                      <span className="original-price">${product.originalPrice}</span>
                    </>
                  ) : (
                    <span className="regular-price">${product.price}</span>
                  )}
                </div>

                <AddToCartButton product={product} />
              </div>

              {/* List View Extra Info */}
              {viewMode === 'list' && (
                <div className="list-view-extra">
                  <p className="list-description">
                    Luxurious formula that glides on smoothly, providing intense color 
                    and lasting comfort throughout the day.
                  </p>
                  <div className="list-benefits">
                    <span><RiSparklingLine /> Long-lasting</span>
                    <span><RiLeafLine /> Natural ingredients</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {visibleProducts < filteredProducts.length && (
        <div className="load-more-container">
          <button 
            className="load-more-btn"
            onClick={() => setVisibleProducts(prev => prev + 6)}
          >
            Load More Products
          </button>
        </div>
      )}

      {/* Featured Collection Banner */}
      <div className="featured-collection-banner">
        <div className="banner-content">
          <GiQueenCrown className="banner-crown" />
          <h2>The Holiday Collection</h2>
          <p>Limited edition shades for the festive season</p>
          <button className="banner-cta">Explore Collection →</button>
        </div>
        <div className="banner-image">
          <img src="/product3.jpg" alt="Holiday Collection" />
        </div>
      </div>
    </div>
  );
};

export default ProductsListingPage;