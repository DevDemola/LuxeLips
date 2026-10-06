import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { CATEGORIES } from "../../data/products";
import Newsletter from "../ui/Newsletter";
import Logo from "./Logo";
import "./Footer.css";

// PLACEHOLDER — replace social/WhatsApp links with the real handles.
const SOCIALS = [
  { href: "https://instagram.com/", label: "Instagram", Icon: FaInstagram },
  { href: "https://tiktok.com/", label: "TikTok", Icon: FaTiktok },
  { href: "https://wa.me/2340000000000", label: "WhatsApp", Icon: FaWhatsapp },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__news">
            <h2>
              Get <em>15% off</em> your first order
            </h2>
            <p>New shades, restocks and members-only drops. No spam, unsubscribe anytime.</p>
            <Newsletter variant="dark" cta="Subscribe" />
          </div>

          <div className="footer__cols">
            <div>
              <h3>Shop</h3>
              <ul>
                <li><Link to="/shop">Shop all</Link></li>
                {CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <Link to={`/shop/${c.id}`}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Help</h3>
              <ul>
                <li><Link to="/contact">Contact us</Link></li>
                <li><Link to="/contact#faq">Delivery & returns</Link></li>
                <li><Link to="/contact#faq">FAQs</Link></li>
                <li><Link to="/cart">Your bag</Link></li>
              </ul>
            </div>
            <div>
              <h3>Luxe Lips</h3>
              <ul>
                <li><Link to="/about">Our story</Link></li>
                <li><Link to="/wishlist">Wishlist</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <Logo light />
          <ul className="footer__social">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <s.Icon />
                </a>
              </li>
            ))}
          </ul>
          <p className="footer__legal">© {year} Luxe Lips. Made in Lagos.</p>
        </div>
      </div>
    </footer>
  );
}
