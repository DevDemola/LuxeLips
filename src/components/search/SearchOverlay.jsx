import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";
import { PRODUCTS, CATEGORIES } from "../../data/products";
import { useStore } from "../../store/context";
import { useModal } from "../../lib/hooks";
import { formatPrice } from "../../lib/format";
import "./SearchOverlay.css";

const POPULAR = ["Gloss", "Nude", "Red", "Lip oil", "Gift set"];

function search(q) {
  const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return PRODUCTS.filter((p) => {
    const hay = [
      p.name,
      p.tagline,
      p.finish,
      p.description,
      CATEGORIES.find((c) => c.id === p.category)?.name,
      ...p.shades.map((s) => s.name),
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => hay.includes(t.replace(/s$/, "")));
  });
}

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const close = useCallback(() => setSearchOpen(false), [setSearchOpen]);
  const ref = useModal(searchOpen, close);
  const results = useMemo(() => search(q), [q]);

  // "/" opens search from anywhere (when not typing in a field).
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(document.activeElement?.tagName);
      if (e.key === "/" && !typing && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (results[0]) {
      close();
      navigate(`/product/${results[0].slug}`);
    }
  };

  return (
    <div className={`search ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
      <div className="search__scrim" onClick={close} />
      <div className="search__panel" role="dialog" aria-modal="true" aria-label="Search" ref={ref} inert={!searchOpen}>
        <div className="container">
          <form className="search__bar" onSubmit={onSubmit} role="search">
            <FiSearch aria-hidden="true" />
            <label htmlFor="site-search" className="visually-hidden">
              Search products
            </label>
            <input
              id="site-search"
              data-autofocus
              type="search"
              placeholder="Search glosses, shades, sets…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
            />
            <button type="button" className="icon-btn" onClick={close} aria-label="Close search">
              <FiX />
            </button>
          </form>

          <div className="search__body" aria-live="polite">
            {!q.trim() ? (
              <div className="search__popular">
                <p className="eyebrow">Popular searches</p>
                <div className="search__chips">
                  {POPULAR.map((term) => (
                    <button key={term} className="chip" onClick={() => setQ(term)}>
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="search__none">
                No results for “{q}”. Try “gloss” or a shade like “nude”.
              </p>
            ) : (
              <>
                <p className="search__count">
                  {results.length} result{results.length === 1 ? "" : "s"}
                </p>
                <ul className="search__results">
                  {results.slice(0, 6).map((p) => (
                    <li key={p.id}>
                      <Link to={`/product/${p.slug}`} onClick={close} className="search__hit">
                        <img src={p.images[0]} alt="" loading="lazy" />
                        <span>
                          <strong>{p.name}</strong>
                          <span className="muted">{formatPrice(p.price)}</span>
                        </span>
                        <FiArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
