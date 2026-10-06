import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiPlus } from "react-icons/fi";
import { useStore } from "../../store/context";
import { Price, Rating, ShadePicker } from "../ui/primitives";
import "./ProductCard.css";

export default function ProductCard({ product, priority = false }) {
  const { addToCart, toggleWishlist, isWished } = useStore();
  const [shade, setShade] = useState(product.shades[0]?.name ?? null);
  const wished = isWished(product.id);
  const href = `/product/${product.slug}`;
  const badge = product.badges[0];

  return (
    <article className="pcard">
      <div className="pcard__media">
        <Link to={href} tabIndex={-1} aria-hidden="true" className="pcard__imglink">
          <img
            src={product.images[0]}
            alt=""
            loading={priority ? "eager" : "lazy"}
            className="pcard__img"
            width="600"
            height="750"
          />
          {product.images[1] && (
            <img src={product.images[1]} alt="" loading="lazy" className="pcard__img pcard__img--alt" width="600" height="750" />
          )}
        </Link>

        {badge && <span className="pcard__badge">{badge}</span>}

        <button
          className={`pcard__wish ${wished ? "is-on" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <FiHeart />
        </button>

        <button
          className="pcard__quick"
          onClick={() => addToCart(product, { shade })}
          aria-label={`Add ${product.name}${shade ? ` in ${shade}` : ""} to bag`}
        >
          <FiPlus aria-hidden="true" />
          <span>Add to bag</span>
        </button>
      </div>

      <div className="pcard__body">
        <div className="pcard__row">
          <h3 className="pcard__name">
            <Link to={href}>{product.name}</Link>
          </h3>
          <Price price={product.price} compareAt={product.compareAt} />
        </div>
        <p className="pcard__tag">{product.tagline}</p>
        <div className="pcard__row pcard__meta">
          <Rating value={product.rating} count={product.reviews} />
          {product.shades.length > 1 && (
            <ShadePicker shades={product.shades} value={shade} onChange={setShade} size="sm" />
          )}
        </div>
      </div>
    </article>
  );
}
