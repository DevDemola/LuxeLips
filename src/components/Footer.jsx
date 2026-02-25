import React from "react";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiMapPin,
  FiPhone,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";
import { GiQueenCrown, GiLipstick } from "react-icons/gi";
import {
  RiSecurePaymentLine,
  RiTruckLine,
  RiRefreshLine,
} from "react-icons/ri";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    "Lipsticks",
    "Lip Glosses",
    "Lip Balms",
    "Lip Kits",
    "Gift Sets",
    "Limited Edition",
  ];
  const aboutLinks = [
    "Our Story",
    "Ingredients",
    "Sustainability",
    "Press",
    "Careers",
    "Blog",
  ];
  const supportLinks = [
    "Contact Us",
    "FAQs",
    "Shipping",
    "Returns",
    "Track Order",
    "Size Guide",
  ];

  return (
    <footer className="footer">
      {/* Premium Newsletter Section */}
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <GiQueenCrown className="newsletter-icon" />
          <h3 className="newsletter-title">Join the Luxe Lips Family</h3>
          <p className="newsletter-text">
            Subscribe for 15% off your first order and receive exclusive updates
            on new collections, beauty tips, and special offers.
          </p>

          <form className="newsletter-form">
            <div className="form-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit">
                Subscribe
                <FiArrowRight className="submit-icon" />
              </button>
            </div>
            <label className="privacy-checkbox">
              <input type="checkbox" defaultChecked />
              <span>
                I agree to receive marketing emails and accept the privacy
                policy
              </span>
            </label>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <GiQueenCrown className="footer-logo-icon" />
              <span className="footer-logo-text">LUXE LIPS</span>
            </div>
            <p className="brand-description">
              Luxury lip care crafted with the finest natural ingredients.
              Empowering you to express your beauty with confidence and grace.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>123 Beauty Avenue, New York, NY 10001</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>hello@luxelips.com</span>
              </div>
            </div>

            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Shop</h4>
            <ul className="footer-links">
              {shopLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">About</h4>
            <ul className="footer-links">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-badges-section">
        <div className="trust-badges-grid">
          <div className="trust-item">
            <RiSecurePaymentLine className="trust-icon" />
            <div className="trust-text">
              <strong>Secure Payment</strong>
              <span>SSL encrypted checkout</span>
            </div>
          </div>
          <div className="trust-item">
            <RiTruckLine className="trust-icon" />
            <div className="trust-text">
              <strong>Free Shipping</strong>
              <span>On orders over $50</span>
            </div>
          </div>
          <div className="trust-item">
            <RiRefreshLine className="trust-icon" />
            <div className="trust-text">
              <strong>Easy Returns</strong>
              <span>30-day return policy</span>
            </div>
          </div>
          <div className="trust-item">
            <GiLipstick className="trust-icon" />
            <div className="trust-text">
              <strong>Cruelty Free</strong>
              <span>Never tested on animals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <p className="copyright">
            © {currentYear} Luxe Lips. All rights reserved. Made with{" "}
            <FiHeart className="heart-icon" /> for beauty lovers
          </p>

          {/* <div className="payment-methods">
            <span className="payment-text">We Accept:</span>
            <div className="payment-icons">
              <img src="/api/placeholder/40/25" alt="Visa" />
              <img src="/api/placeholder/40/25" alt="Mastercard" />
              <img src="/api/placeholder/40/25" alt="Amex" />
              <img src="/api/placeholder/40/25" alt="PayPal" />
              <img src="/api/placeholder/40/25" alt="Apple Pay" />
            </div>
          </div> */}

          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#terms">Terms of Service</a>
            <span className="separator">|</span>
            <a href="#cookies">Cookie Policy</a>
            <span className="separator">|</span>
            <a href="#accessibility">Accessibility</a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <FiArrowRight className="back-to-top-icon" />
      </button>
    </footer>
  );
};

export default Footer;
