import { useMemo } from "react";
import { Link, NavLink, useParams, useSearchParams } from "react-router-dom";
import { FiChevronDown, FiX } from "react-icons/fi";
import { CATEGORIES, FINISHES, PRODUCTS, getCategory } from "../data/products";
import { useTitle } from "../lib/hooks";
import ProductCard from "../components/product/ProductCard";
import NotFound from "./NotFound";
import "./Shop.css";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "rating", label: "Top rated" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

const PRICES = [
  { id: "u10", label: "Under ₦10,000", test: (p) => p.price < 10000 },
  { id: "10-20", label: "₦10,000 – ₦20,000", test: (p) => p.price >= 10000 && p.price <= 20000 },
  { id: "o20", label: "Over ₦20,000", test: (p) => p.price > 20000 },
];

export default function Shop() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams();
  const cat = category ? getCategory(category) : null;

  const finishes = params.getAll("finish");
  const price = params.get("price");
  const sort = params.get("sort") || "featured";

  useTitle(cat ? cat.name : "Shop all");

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => !cat || p.category === cat.id);
    if (finishes.length) list = list.filter((p) => finishes.includes(p.finish));
    const priceRule = PRICES.find((r) => r.id === price);
    if (priceRule) list = list.filter(priceRule.test);
    const sorted = [...list];
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [cat, finishes, price, sort]);

  if (category && !cat) return <NotFound />;

  const update = (mutate) => {
    const next = new URLSearchParams(params);
    mutate(next);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const toggleFinish = (f) =>
    update((n) => {
      const cur = n.getAll("finish");
      n.delete("finish");
      (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]).forEach((x) => n.append("finish", x));
    });

  const setPrice = (id) => update((n) => (price === id ? n.delete("price") : n.set("price", id)));
  const setSort = (id) => update((n) => (id === "featured" ? n.delete("sort") : n.set("sort", id)));
  const clearAll = () => update((n) => ["finish", "price"].forEach((k) => n.delete(k)));

  // Only show finishes that exist in the current category.
  const availableFinishes = FINISHES.filter((f) =>
    PRODUCTS.some((p) => (!cat || p.category === cat.id) && p.finish === f)
  );
  const activeCount = finishes.length + (price ? 1 : 0);

  return (
    <div className="shop">
      <header className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            {cat ? <Link to="/shop">Shop</Link> : <span aria-current="page">Shop</span>}
            {cat && (
              <>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{cat.name}</span>
              </>
            )}
          </nav>
          <h1>{cat ? cat.name : "Shop all"}</h1>
          <p>{cat ? `${cat.blurb}.` : "Glosses, oils, tints and sets. Every one shade-tested on melanin-rich skin."}</p>
        </div>
      </header>

      <div className="shop__bar">
        <div className="container">
          <nav className="shop__tabs" aria-label="Categories">
            <NavLink to="/shop" end className="shop__tab">
              All
            </NavLink>
            {CATEGORIES.map((c) => (
              <NavLink key={c.id} to={`/shop/${c.id}`} className="shop__tab">
                {c.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="container shop__body">
        <div className="shop__filters" role="group" aria-label="Filters">
          <div className="shop__chips">
            {availableFinishes.map((f) => (
              <button key={f} className="chip" aria-pressed={finishes.includes(f)} onClick={() => toggleFinish(f)}>
                {f}
              </button>
            ))}
            <span className="shop__divider" aria-hidden="true" />
            {PRICES.map((r) => (
              <button key={r.id} className="chip" aria-pressed={price === r.id} onClick={() => setPrice(r.id)}>
                {r.label}
              </button>
            ))}
            {activeCount > 0 && (
              <button className="shop__clear" onClick={clearAll}>
                <FiX aria-hidden="true" /> Clear ({activeCount})
              </button>
            )}
          </div>

          <div className="shop__sortrow">
            <p className="shop__count" aria-live="polite">
              {results.length} product{results.length === 1 ? "" : "s"}
            </p>
            <label className="shop__sort">
              <span className="visually-hidden">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    Sort: {s.label}
                  </option>
                ))}
              </select>
              <FiChevronDown aria-hidden="true" />
            </label>
          </div>
        </div>

        {results.length ? (
          <div className="product-grid product-grid--3 shop__grid">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="shop__empty">
            <h2>No matches</h2>
            <p className="muted">Try removing a filter. There's plenty more to discover.</p>
            <button className="btn btn--outline" onClick={clearAll}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
