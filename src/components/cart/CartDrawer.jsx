import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX, FiShoppingBag } from "react-icons/fi";
import { useStore } from "../../store/context";
import { useModal } from "../../lib/hooks";
import { formatPrice, pluralize } from "../../lib/format";
import { BESTSELLERS } from "../../data/products";
import CartLine from "./CartLine";
import FreeShippingMeter from "./FreeShippingMeter";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, lines, count, subtotal, addToCart } = useStore();
  const navigate = useNavigate();
  const close = useCallback(() => setCartOpen(false), [setCartOpen]);
  const ref = useModal(cartOpen, close);

  const go = (to) => {
    close();
    navigate(to);
  };

  const suggestions = BESTSELLERS.filter((p) => !lines.some((l) => l.productId === p.id)).slice(0, 2);

  return (
    <div className={`drawer ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen}>
      <div className="drawer__scrim" onClick={close} />
      <aside
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        ref={ref}
        tabIndex={-1}
        inert={!cartOpen}
      >
        <header className="drawer__head">
          <h2 id="cart-title">
            Your bag <span className="muted">({count})</span>
          </h2>
          <button className="icon-btn" onClick={close} aria-label="Close bag" data-autofocus>
            <FiX />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <FiShoppingBag aria-hidden="true" />
            <h3>Your bag is empty</h3>
            <p>Your next favourite gloss is a tap away.</p>
            <button className="btn btn--primary" onClick={() => go("/shop")}>
              Shop all products
            </button>
          </div>
        ) : (
          <>
            <div className="drawer__meter">
              <FreeShippingMeter />
            </div>
            <ul className="drawer__lines">
              {lines.map((l) => (
                <CartLine key={l.key} line={l} />
              ))}
            </ul>

            {suggestions.length > 0 && (
              <div className="drawer__upsell">
                <p className="eyebrow">Pairs well with</p>
                <ul>
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <img src={p.images[0]} alt="" loading="lazy" />
                      <div>
                        <Link to={`/product/${p.slug}`} onClick={close}>
                          {p.name}
                        </Link>
                        <span>{formatPrice(p.price)}</span>
                      </div>
                      <button
                        className="btn btn--outline"
                        onClick={() => addToCart(p, { shade: p.shades[0]?.name ?? null })}
                        aria-label={`Add ${p.name} to bag`}
                      >
                        Add
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <footer className="drawer__foot">
              <div className="drawer__sub">
                <span>Subtotal · {pluralize(count, "item")}</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="drawer__note">Delivery calculated at checkout.</p>
              <button className="btn btn--primary btn--block btn--lg" onClick={() => go("/checkout")}>
                Checkout · {formatPrice(subtotal)}
              </button>
              <button className="drawer__viewbag" onClick={() => go("/cart")}>
                View full bag
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
