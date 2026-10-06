import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { PRODUCTS } from "../data/products";
import { useStore } from "../store/context";
import { useTitle } from "../lib/hooks";
import ProductCard from "../components/product/ProductCard";

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  useTitle("Wishlist");

  return (
    <div>
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">Saved for later</span>
          <h1>Your wishlist</h1>
        </div>
      </header>
      <div className="container section">
        {items.length ? (
          <div className="product-grid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: "var(--s-4)" }}>
            <FiHeart size={36} color="var(--rose)" aria-hidden="true" />
            <p className="muted">Tap the heart on any product to save it here.</p>
            <Link to="/shop" className="btn btn--primary">
              Browse products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
