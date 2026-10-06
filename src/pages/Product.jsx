import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiHeart, FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";
import { getCategory, getProduct, getRelated, SHIPPING } from "../data/products";
import { formatPrice } from "../lib/format";
import { useTitle } from "../lib/hooks";
import { useStore } from "../store/context";
import { Accordion, Price, QuantityStepper, Rating, ShadePicker } from "../components/ui/primitives";
import ProductCard from "../components/product/ProductCard";
import NotFound from "./NotFound";
import "./Product.css";

export default function Product() {
  const { slug } = useParams();
  const product = getProduct(slug);
  // Re-mount per product so shade/qty/gallery state resets when navigating between products.
  return product ? <ProductView key={product.id} product={product} /> : <NotFound />;
}

function ProductView({ product }) {
  const { addToCart, toggleWishlist, isWished, maxQty } = useStore();
  const [active, setActive] = useState(0);
  const [shade, setShade] = useState(product.shades[0]?.name ?? null);
  const [qty, setQty] = useState(1);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef(null);
  const cat = getCategory(product.category);
  const wished = isWished(product.id);

  useTitle(product.name);

  // Show the sticky mobile add-to-bag bar once the main CTA scrolls out of view.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const add = () => addToCart(product, { shade, qty });

  return (
    <div className="pdp">
      <div className="container">
        <nav className="breadcrumbs pdp__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/shop/${cat.id}`}>{cat.name}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp__grid">
          {/* Gallery */}
          <div className="pdp__gallery">
            <div className="pdp__main">
              {product.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === 0 ? product.name : `${product.name}, lifestyle photo`}
                  className={i === active ? "is-active" : ""}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
              {product.badges[0] && <span className="pcard__badge">{product.badges[0]}</span>}
            </div>
            {product.images.length > 1 && (
              <div className="pdp__thumbs" role="tablist" aria-label="Product images">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Image ${i + 1}`}
                    onClick={() => setActive(i)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pdp__info">
            <div className="pdp__rating">
              <Rating value={product.rating} count={product.reviews} showValue />
            </div>
            <h1>{product.name}</h1>
            <p className="pdp__tagline">{product.tagline}</p>
            <Price price={product.price} compareAt={product.compareAt} size="lg" />

            <p className="pdp__desc">{product.description}</p>

            {product.shades.length > 0 && (
              <div className="pdp__opt">
                <p className="pdp__optlabel">
                  Shade: <strong>{shade}</strong>
                </p>
                <ShadePicker shades={product.shades} value={shade} onChange={setShade} />
              </div>
            )}

            <div className="pdp__buy" ref={ctaRef}>
              <QuantityStepper value={qty} onChange={setQty} min={1} max={maxQty} />
              <button className="btn btn--primary btn--lg pdp__add" onClick={add}>
                Add to bag · {formatPrice(product.price * qty)}
              </button>
              <button
                className={`icon-btn pdp__wish ${wished ? "is-on" : ""}`}
                onClick={() => toggleWishlist(product)}
                aria-pressed={wished}
                aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
              >
                <FiHeart />
              </button>
            </div>

            <ul className="pdp__perks">
              <li>
                <FiTruck aria-hidden="true" />
                <span>
                  <strong>Same-day delivery in Lagos</strong> on orders before 12pm. Free over{" "}
                  {formatPrice(SHIPPING.freeThreshold)}.
                </span>
              </li>
              <li>
                <FiRefreshCw aria-hidden="true" />
                <span>14-day returns on unopened products</span>
              </li>
              <li>
                <FiShield aria-hidden="true" />
                <span>Secure payment by card, transfer or USSD</span>
              </li>
            </ul>

            <Accordion
              defaultOpen={0}
              items={[
                {
                  title: "Why you'll love it",
                  content: (
                    <ul>
                      {product.benefits.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "How to use",
                  content: (
                    <p>
                      Apply to clean lips, starting from the centre and working outwards. Layer over a tint or liner
                      for extra depth. Reapply as needed.
                    </p>
                  ),
                },
                {
                  title: "Ingredients",
                  content: (
                    <p>
                      Full ingredient list coming soon. Cruelty-free and formulated without parabens. Contact us for
                      allergen information.
                    </p>
                  ),
                },
                {
                  title: "Delivery & returns",
                  content: (
                    <p>
                      Lagos: {formatPrice(SHIPPING.lagos)} · Nationwide: {formatPrice(SHIPPING.nationwide)} · Free over{" "}
                      {formatPrice(SHIPPING.freeThreshold)}. Unopened products can be returned within 14 days.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <section className="section container" id="related">
        <div className="section-head">
          <div>
            <span className="eyebrow">You may also like</span>
            <h2>Complete the look</h2>
          </div>
        </div>
        <div className="product-grid">
          {getRelated(product).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sticky add-to-bag (mobile) */}
      <div className={`pdp__sticky ${showSticky ? "is-visible" : ""}`} aria-hidden={!showSticky}>
        <img src={product.images[0]} alt="" />
        <div>
          <strong>{product.name}</strong>
          <span className="muted">
            {shade ? `${shade} · ` : ""}
            {formatPrice(product.price)}
          </span>
        </div>
        <button className="btn btn--primary" onClick={add} tabIndex={showSticky ? 0 : -1}>
          Add to bag
        </button>
      </div>
    </div>
  );
}
