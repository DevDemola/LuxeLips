import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiX } from "react-icons/fi";
import { CATEGORIES } from "../../data/products";
import { useStore } from "../../store/context";
import { useModal } from "../../lib/hooks";
import Logo from "./Logo";
import "./Header.css";

const NAV = [
  { to: "/shop", label: "Shop all" },
  { to: "/shop/gloss", label: "Gloss" },
  { to: "/shop/oil", label: "Lip Oils" },
  { to: "/shop/sets", label: "Sets & Gifts" },
  { to: "/about", label: "Our Story" },
];

export default function Header() {
  const { count, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const menuRef = useModal(menuOpen, closeMenu);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header__inner">
        <button className="icon-btn header__burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <FiMenu />
        </button>

        <Logo className="header__logo" />

        <nav className="header__nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/shop"} className="header__link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search products">
            <FiSearch />
          </button>
          <Link to="/wishlist" className="icon-btn header__wish" aria-label={`Wishlist, ${wishlist.length} items`}>
            <FiHeart />
            {wishlist.length > 0 && <span className="badge-dot" aria-hidden="true" />}
          </Link>
          <button className="icon-btn" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${count} items`}>
            <FiShoppingBag />
            {count > 0 && (
              <span className="count-badge" aria-hidden="true">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — portalled to <body>: the header's backdrop-filter would otherwise trap position:fixed */}
      {createPortal(
      <div className={`mnav ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mnav__scrim" onClick={closeMenu} />
        <div
          className="mnav__panel"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          inert={!menuOpen}
        >
          <div className="mnav__top">
            <Logo />
            <button className="icon-btn" onClick={closeMenu} aria-label="Close menu">
              <FiX />
            </button>
          </div>

          <nav aria-label="Mobile">
            <p className="eyebrow mnav__label">Shop</p>
            <ul className="mnav__cats">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link to={`/shop/${c.id}`} className="mnav__cat">
                    <img src={c.image} alt="" loading="lazy" />
                    <span>{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mnav__links">
              <li><Link to="/shop">Shop all</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/contact">Help & Contact</Link></li>
              <li><Link to="/wishlist">Wishlist ({wishlist.length})</Link></li>
            </ul>
          </nav>
        </div>
      </div>,
      document.body
      )}
    </header>
  );
}
