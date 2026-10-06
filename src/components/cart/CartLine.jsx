import { Link } from "react-router-dom";
import { useStore } from "../../store/context";
import { formatPrice } from "../../lib/format";
import { QuantityStepper } from "../ui/primitives";
import "./CartLine.css";

export default function CartLine({ line, size = "sm" }) {
  const { setQty, removeLine, maxQty, setCartOpen } = useStore();
  const { product, shade, qty, key, lineTotal } = line;
  const href = `/product/${product.slug}`;

  return (
    <li className={`cline cline--${size}`}>
      <Link to={href} className="cline__img" onClick={() => setCartOpen(false)} tabIndex={-1} aria-hidden="true">
        <img src={product.images[0]} alt="" loading="lazy" />
      </Link>
      <div className="cline__info">
        <div className="cline__top">
          <div>
            <Link to={href} className="cline__name" onClick={() => setCartOpen(false)}>
              {product.name}
            </Link>
            {shade && <p className="cline__shade">Shade: {shade}</p>}
          </div>
          <p className="cline__total">{formatPrice(lineTotal)}</p>
        </div>
        <div className="cline__bottom">
          <QuantityStepper
            size="sm"
            value={qty}
            min={1}
            max={maxQty}
            label={`Quantity for ${product.name}`}
            onChange={(n) => setQty(key, n)}
          />
          <button className="cline__remove" onClick={() => removeLine(key)}>
            Remove<span className="visually-hidden"> {product.name}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
