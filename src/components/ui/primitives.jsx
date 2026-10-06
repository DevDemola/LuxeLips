import { useId, useState } from "react";
import { FiMinus, FiPlus, FiChevronDown } from "react-icons/fi";
import { formatPrice } from "../../lib/format";
import "./primitives.css";

export function Price({ price, compareAt, size = "md" }) {
  return (
    <span className={`price price--${size}`}>
      <span className={compareAt ? "price__now price__now--sale" : "price__now"}>{formatPrice(price)}</span>
      {compareAt && (
        <>
          <span className="visually-hidden">, was</span>
          <s className="price__was">{formatPrice(compareAt)}</s>
        </>
      )}
    </span>
  );
}

export function Rating({ value, count, showValue = false }) {
  const pct = (value / 5) * 100;
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5${count ? `, ${count} reviews` : ""}`}>
      <span className="rating__stars" aria-hidden="true" style={{ "--pct": `${pct}%` }}>
        ★★★★★
      </span>
      {showValue && (
        <span className="rating__value" aria-hidden="true">
          {value.toFixed(1)}
        </span>
      )}
      {count != null && (
        <span className="rating__count" aria-hidden="true">
          ({count})
        </span>
      )}
    </span>
  );
}

export function QuantityStepper({ value, onChange, min = 1, max = 10, size = "md", label = "Quantity" }) {
  return (
    <div className={`qty qty--${size}`} role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <FiMinus />
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <FiPlus />
      </button>
    </div>
  );
}

export function ShadePicker({ shades, value, onChange, size = "md" }) {
  if (!shades?.length) return null;
  return (
    <div className={`shades shades--${size}`} role="radiogroup" aria-label="Shade">
      {shades.map((s) => (
        <button
          key={s.name}
          type="button"
          role="radio"
          aria-checked={value === s.name}
          aria-label={s.name}
          title={s.name}
          className="shade"
          style={{ "--swatch": s.hex }}
          onClick={() => onChange(s.name)}
        />
      ))}
    </div>
  );
}

export function Accordion({ items, defaultOpen = null }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.title} className={`acc__item ${isOpen ? "is-open" : ""}`}>
            <h3>
              <button
                id={btnId}
                className="acc__btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.title}
                <FiChevronDown aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acc__panel" hidden={!isOpen}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
