import { Link } from "react-router-dom";
import { useTitle } from "../lib/hooks";

export default function NotFound() {
  useTitle("Page not found");
  return (
    <div className="container" style={{ padding: "var(--s-9) var(--gutter)", textAlign: "center", display: "grid", justifyItems: "center", gap: "var(--s-4)" }}>
      <span className="eyebrow">404</span>
      <h1 style={{ fontSize: "var(--fs-3xl)" }}>
        This page has <span className="display-italic">vanished</span>.
      </h1>
      <p className="muted">It may have moved, or the link might be wrong.</p>
      <Link to="/shop" className="btn btn--primary btn--lg">
        Go to the shop
      </Link>
    </div>
  );
}
