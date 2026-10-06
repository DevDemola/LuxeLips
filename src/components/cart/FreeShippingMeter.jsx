import { FiTruck } from "react-icons/fi";
import { SHIPPING } from "../../data/products";
import { formatPrice } from "../../lib/format";
import { useStore } from "../../store/context";

export default function FreeShippingMeter() {
  const { subtotal, toFreeShipping } = useStore();
  const pct = Math.min(100, (subtotal / SHIPPING.freeThreshold) * 100);
  return (
    <div className="ship-meter">
      <p>
        <FiTruck aria-hidden="true" />
        {toFreeShipping > 0 ? (
          <span>
            You're <strong>{formatPrice(toFreeShipping)}</strong> away from free delivery
          </span>
        ) : (
          <span>
            <strong>You've unlocked free delivery</strong>
          </span>
        )}
      </p>
      <div
        className="ship-meter__track"
        role="progressbar"
        aria-label="Progress to free delivery"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
