// Header.tsx
import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        
        {/* Left side - empty for balance */}
        <div className="header-left"></div>

        {/* Center - Logo */}
        <div className="logo">
          <span className="logo-text">LUXE LIPS</span>
        </div>

        {/* Right side - Icons */}
        <div className="header-right">
          <FiSearch className="icon" />
          <FiShoppingCart className="icon" />
          <FiUser className="icon" />
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      
      <nav className="desktop-nav">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;