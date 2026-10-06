import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { BESTSELLERS, CATEGORIES, PRODUCTS, getProduct } from "../data/products";
import { REVIEWS } from "../data/content";
import { formatPrice } from "../lib/format";
import { useTitle } from "../lib/hooks";
import ProductCard from "../components/product/ProductCard";
import { Rating } from "../components/ui/primitives";
import "./Home.css";

const PROMISES = [
  "Shade-tested on melanin-rich skin",
  "Non-sticky, always",
  "Cruelty-free",
  "Shea butter + vitamin E",
  "Same-day delivery in Lagos",
];

// Shade finder: map skin depth to the nudes that flatter it most.
const DEPTHS = [
  { id: "light", label: "Light – Medium", tone: "#e7c3a6", picks: ["nude-mirror-gloss", "glass-glaze-gloss"], shade: "Bare" },
  { id: "tan", label: "Tan – Deep", tone: "#a8724f", picks: ["nude-mirror-gloss", "rosewood-matte-liquid-lip"], shade: "Mocha" },
  { id: "deep", label: "Deep – Rich", tone: "#5e3a29", picks: ["cocoa-velvet-tint", "nude-mirror-gloss"], shade: "Espresso" },
];

export default function Home() {
  useTitle(null);
  const hero = getProduct("glass-glaze-gloss");
  const [depth, setDepth] = useState(DEPTHS[1]);

  return (
    <div className="home">
      {/* ---------------------------------------------------------- Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">New · The Glass Collection</span>
            <h1>
              Shine that <span className="display-italic">speaks</span> for itself.
            </h1>
            <p className="hero__lede">
              High-shine glosses, nourishing oils and long-wear tints, shade-tested on melanin-rich skin and made
              to feel like nothing at all.
            </p>
            <div className="hero__ctas">
              <Link to="/shop" className="btn btn--primary btn--lg">
                Shop bestsellers <FiArrowRight />
              </Link>
              <a href="#shade-finder" className="btn btn--outline btn--lg">
                Find your nude
              </a>
            </div>
            <div className="hero__proof">
              <Rating value={4.9} />
              <span>
                <strong>4.9/5</strong> from 1,200+ reviews
              </span>
            </div>
          </div>

          <div className="hero__media">
            <img
              src="/images/hero-duo.webp"
              alt="Two women wearing glossy pink lip gloss"
              width="749"
              height="999"
              fetchPriority="high"
            />
            <Link to={`/product/${hero.slug}`} className="hero__chip">
              <img src={hero.images[0]} alt="" width="56" height="70" />
              <span>
                <span className="hero__chip-label">Most loved</span>
                <strong>{hero.name}</strong>
                <span>{formatPrice(hero.price)}</span>
              </span>
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Marquee */}
      <section className="marquee" aria-label="Our promises">
        <div className="marquee__track">
          {[...PROMISES, ...PROMISES].map((p, i) => (
            <span key={i} aria-hidden={i >= PROMISES.length}>
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- Categories */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Shop by category</span>
            <h2>Find your finish</h2>
          </div>
          <Link to="/shop" className="link-arrow">
            Shop all {PRODUCTS.length} products <FiArrowRight />
          </Link>
        </div>
        <ul className="cats">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link to={`/shop/${c.id}`} className="cat">
                <img src={c.image} alt="" loading="lazy" width="600" height="750" />
                <span className="cat__label">
                  <strong>{c.name}</strong>
                  <span>{c.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------- Bestsellers */}
      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Bestsellers</span>
              <h2>The ones everyone's wearing</h2>
            </div>
            <Link to="/shop" className="link-arrow">
              View all <FiArrowRight />
            </Link>
          </div>
          <div className="product-grid">
            {BESTSELLERS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Shade finder */}
      <section className="section container" id="shade-finder">
        <div className="finder">
          <div className="finder__media">
            <img src="/images/nude-mirror.webp" alt="Close-up of a nude lip gloss being applied" loading="lazy" />
          </div>
          <div className="finder__body">
            <span className="eyebrow">Shade finder</span>
            <h2>
              Nudes that actually <span className="display-italic">match</span>.
            </h2>
            <p className="muted">
              Most “nude” glosses are made for one skin tone. Ours were tested on deep, rich and everything-in-between
              skin. Pick yours:
            </p>

            <div className="finder__depths" role="radiogroup" aria-label="Your skin depth">
              {DEPTHS.map((d) => (
                <button
                  key={d.id}
                  role="radio"
                  aria-checked={depth.id === d.id}
                  className="finder__depth"
                  onClick={() => setDepth(d)}
                >
                  <span className="finder__tone" style={{ background: d.tone }} aria-hidden="true" />
                  {d.label}
                </button>
              ))}
            </div>

            <p className="finder__rec" aria-live="polite">
              We recommend <strong>{depth.shade}</strong> in Nude Mirror Gloss, plus:
            </p>
            <ul className="finder__picks">
              {depth.picks.map((slug) => {
                const p = getProduct(slug);
                return (
                  <li key={slug}>
                    <Link to={`/product/${p.slug}`} className="finder__pick">
                      <img src={p.images[0]} alt="" loading="lazy" />
                      <span>
                        <strong>{p.name}</strong>
                        <span className="muted">{formatPrice(p.price)}</span>
                      </span>
                      <FiArrowRight aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Ritual */}
      <section className="ritual">
        <div className="container ritual__grid">
          <div className="ritual__copy">
            <span className="eyebrow">The 3-step ritual</span>
            <h2>Softer lips in under a minute</h2>
            <ol className="ritual__steps">
              <li>
                <span>01</span>
                <div>
                  <h3>Prep</h3>
                  <p>Sweep on Crystal Bloom Lip Oil to hydrate and smooth.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Colour</h3>
                  <p>Add a tint or matte for depth. Define with a liner if you like.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Glaze</h3>
                  <p>Finish with Glass Glaze Gloss in the centre of your lips for a fuller look.</p>
                </div>
              </li>
            </ol>
            <Link to="/shop/sets" className="btn btn--light">
              Shop the ritual sets <FiArrowRight />
            </Link>
          </div>
          <div className="ritual__media">
            <img src="/images/hydra-plump.webp" alt="Glossy lips with a clear gloss wand" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Reviews */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Reviews</span>
            <h2>Loved in Lagos and beyond</h2>
          </div>
          <div className="reviews__agg">
            <strong>4.9</strong>
            <span>
              <Rating value={4.9} />
              <span className="muted">1,200+ verified reviews</span>
            </span>
          </div>
        </div>
        <ul className="reviews">
          {REVIEWS.map((r) => {
            const p = getProduct(r.product);
            return (
              <li key={r.name} className="review">
                <Rating value={r.rating} />
                <blockquote>“{r.quote}”</blockquote>
                <footer>
                  <strong>{r.name}</strong>
                  <span className="muted">
                    {r.location} · on <Link to={`/product/${p.slug}`}>{p.name}</Link>
                  </span>
                </footer>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
