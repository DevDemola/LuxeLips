import React, { useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductListing";
import About from "./pages/About";

import { CartProvider } from "./context/CartContext";
import SimpleCartToast from "./components/SimpleCartToast";
import Contact from "./pages/Contact";

const App = () => {
  // In your main App component or Footer component
  useEffect(() => {
    const handleScroll = () => {
      const backToTop = document.querySelector(".back-to-top");
      if (backToTop) {
        if (window.scrollY > 500) {
          backToTop.classList.add("show");
        } else {
          backToTop.classList.remove("show");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <CartProvider>
        <SimpleCartToast/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </CartProvider>

      <Footer />
    </div>
  );
};

export default App;
