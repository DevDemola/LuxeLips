import { SHIPPING } from "../../data/products";
import { formatPrice } from "../../lib/format";
import "./AnnouncementBar.css";

export default function AnnouncementBar() {
  return (
    <div className="announce" role="region" aria-label="Store announcement">
      <p>
        Free delivery on orders over <strong>{formatPrice(SHIPPING.freeThreshold)}</strong>
        <span className="announce__dot" aria-hidden="true">·</span>
        <span className="announce__extra">Same-day delivery in Lagos before 12pm</span>
      </p>
    </div>
  );
}
