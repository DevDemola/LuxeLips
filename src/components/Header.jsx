// Header.tsx
import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";
import { GiQueenCrown } from "react-icons/gi";
import "./Header.css";
import SimpleCartIcon from "./SimpleCartIcon";

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

        {/* Center - Logo with Crown Icon */}
        <div className="logo">
          <GiQueenCrown className="logo-icon" />
          <span className="logo-text">LUXE LIPS</span>
        </div>

        {/* Right side - Icons */}
        <div className="header-right">
          <FiSearch className="icon" />
          <SimpleCartIcon className="icon" />
          <FiUser className="icon" />

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <nav className="desktop-nav">
        <a href="#">Home</a>
        <a href="#products">Products</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#" onClick={() => setMobileMenuOpen(false)}>
            Home
          </a>
          <a href="#products" onClick={() => setMobileMenuOpen(false)}>
            Products
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
