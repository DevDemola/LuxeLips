import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle, FiLock } from "react-icons/fi";
import { useStore } from "../store/context";
import { useTitle } from "../lib/hooks";
import { formatPrice } from "../lib/format";
import { SHIPPING } from "../data/products";
import "./Cart.css";
import "./Checkout.css";

const STATES = [
  "Lagos", "Abuja (FCT)", "Rivers", "Oyo", "Ogun", "Kano", "Kaduna", "Enugu", "Anambra", "Delta", "Edo", "Kwara",
  "Akwa Ibom", "Cross River", "Imo", "Osun", "Ondo", "Ekiti", "Plateau", "Other",
];

const PAYMENTS = [
  { id: "card", label: "Debit / credit card", hint: "Visa, Mastercard, Verve" },
  { id: "transfer", label: "Bank transfer", hint: "Pay from any Nigerian bank" },
  { id: "ussd", label: "USSD", hint: "Dial a code from your phone" },
];

const REQUIRED = ["fullName", "phone", "email", "address", "city", "state"];

function validate(f) {
  const e = {};
  REQUIRED.forEach((k) => {
    if (!f[k]?.trim()) e[k] = "Required";
  });
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = "Enter a valid email";
  if (f.phone && !/^(\+?234|0)[789][01]\d{8}$/.test(f.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid Nigerian phone number";
  return e;
}

export default function Checkout() {
  const { lines, subtotal, clearCart } = useStore();
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", address: "", city: "", state: "Lagos", payment: "card" });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);
  useTitle("Checkout");

  const delivery = subtotal >= SHIPPING.freeThreshold ? 0 : form.state === "Lagos" ? SHIPPING.lagos : SHIPPING.nationwide;
  const total = subtotal + delivery;

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    const firstKey = REQUIRED.find((k) => errs[k]);
    if (firstKey) {
      document.getElementById(`co-${firstKey}`)?.focus();
      return;
    }
    // TODO: hand off to your payment provider here and only confirm on success.
    setOrder({ id: `LL-${Date.now().toString().slice(-6)}`, total, email: form.email, name: form.fullName.split(" ")[0] });
    clearCart();
    window.scrollTo(0, 0);
  };

  if (order) {
    return (
      <div className="container co-done">
        <FiCheckCircle aria-hidden="true" />
        <h1>Thank you, {order.name}!</h1>
        <p>
          Order <strong>{order.id}</strong> is confirmed. We've sent a receipt to {order.email}.
        </p>
        <p className="muted">Total paid: {formatPrice(order.total)}</p>
        <Link to="/shop" className="btn btn--primary btn--lg">
          Keep shopping
        </Link>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="container co-done">
        <h1>Your bag is empty</h1>
        <p className="muted">Add something you love, then come back to check out.</p>
        <Link to="/shop" className="btn btn--primary btn--lg">
          Shop now
        </Link>
      </div>
    );
  }

  const field = (k, label, props = {}) => (
    <div className="field">
      <label htmlFor={`co-${k}`}>{label}</label>
      <input
        id={`co-${k}`}
        className="input"
        value={form[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `co-${k}-err` : undefined}
        {...props}
      />
      {errors[k] && (
        <span id={`co-${k}-err`} className="field-error">
          {errors[k]}
        </span>
      )}
    </div>
  );

  return (
    <div className="container co">
      <Link to="/cart" className="co__back">
        ← Back to bag
      </Link>
      <h1>Checkout</h1>

      <div className="co__grid">
        <form onSubmit={submit} noValidate className="co__form">
          <fieldset>
            <legend>Contact</legend>
            <div className="co__row">
              {field("fullName", "Full name", { autoComplete: "name" })}
              {field("phone", "Phone number", { type: "tel", autoComplete: "tel", placeholder: "0803 000 0000" })}
            </div>
            {field("email", "Email", { type: "email", autoComplete: "email" })}
          </fieldset>

          <fieldset>
            <legend>Delivery address</legend>
            {field("address", "Street address", { autoComplete: "street-address" })}
            <div className="co__row">
              {field("city", "City / area", { autoComplete: "address-level2", placeholder: "e.g. Lekki" })}
              <div className="field">
                <label htmlFor="co-state">State</label>
                <select id="co-state" className="input" value={form.state} onChange={set("state")} autoComplete="address-level1">
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <div className="co__pay" role="radiogroup">
              {PAYMENTS.map((p) => (
                <label key={p.id} className={`co__payopt ${form.payment === p.id ? "is-on" : ""}`}>
                  <input type="radio" name="payment" value={p.id} checked={form.payment === p.id} onChange={set("payment")} />
                  <span>
                    <strong>{p.label}</strong>
                    <span className="muted">{p.hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="btn btn--primary btn--block btn--lg">
            <FiLock /> Pay {formatPrice(total)}
          </button>
          <p className="co__fine">Demo checkout: no payment is taken until a payment provider is connected.</p>
        </form>

        <aside className="summary co__summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <ul className="co__items">
            {lines.map((l) => (
              <li key={l.key}>
                <span className="co__thumb">
                  <img src={l.product.images[0]} alt="" />
                  <span>{l.qty}</span>
                </span>
                <span className="co__iname">
                  {l.product.name}
                  {l.shade && <span className="muted">{l.shade}</span>}
                </span>
                <span>{formatPrice(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery ({form.state === "Lagos" ? "Lagos" : "Nationwide"})</dt>
              <dd>{delivery === 0 ? "Free" : formatPrice(delivery)}</dd>
            </div>
            <div className="summary__total">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
