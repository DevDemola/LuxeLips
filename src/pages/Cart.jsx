import { Link } from "react-router-dom";
import { FiArrowRight, FiLock } from "react-icons/fi";
import { useStore } from "../store/context";
import { useTitle } from "../lib/hooks";
import { formatPrice, pluralize } from "../lib/format";
import { BESTSELLERS } from "../data/products";
import CartLine from "../components/cart/CartLine";
import FreeShippingMeter from "../components/cart/FreeShippingMeter";
import ProductCard from "../components/product/ProductCard";
import "./Cart.css";

export default function Cart() {
  const { lines, count, subtotal, savings } = useStore();
  useTitle("Your bag");

  if (!lines.length) {
    return (
      <div className="container cart-empty">
        <h1>Your bag is empty</h1>
        <p className="muted">Discover glosses, oils and tints made for every shade of you.</p>
        <Link to="/shop" className="btn btn--primary btn--lg">
          Start shopping <FiArrowRight />
        </Link>
        <section className="cart-empty__recs">
          <h2>Customer favourites</h2>
          <div className="product-grid">
            {BESTSELLERS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container cart">
      <header className="cart__head">
        <h1>Your bag</h1>
        <span className="muted">{pluralize(count, "item")}</span>
      </header>

      <div className="cart__grid">
        <section aria-label="Items in your bag">
          <div className="cart__meter">
            <FreeShippingMeter />
          </div>
          <ul>
            {lines.map((l) => (
              <CartLine key={l.key} line={l} size="lg" />
            ))}
          </ul>
          <Link to="/shop" className="link-arrow cart__continue">
            Continue shopping
          </Link>
        </section>

        <aside className="summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {savings > 0 && (
              <div className="summary__save">
                <dt>You're saving</dt>
                <dd>−{formatPrice(savings)}</dd>
              </div>
            )}
            <div>
              <dt>Delivery</dt>
              <dd className="muted">Calculated at checkout</dd>
            </div>
            <div className="summary__total">
              <dt>Estimated total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <Link to="/checkout" className="btn btn--primary btn--block btn--lg">
            <FiLock /> Secure checkout
          </Link>
          <p className="summary__note">Pay by card, bank transfer or USSD.</p>
        </aside>
      </div>
    </div>
  );
}
