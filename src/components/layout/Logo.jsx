import { Link } from "react-router-dom";

export default function Logo({ light = false, className = "" }) {
  return (
    <Link to="/" className={`logo ${className}`} aria-label="Luxe Lips — home">
      <img
        src={light ? "/logo-mark-light.png" : "/logo-mark.png"}
        alt=""
        width="40"
        height="38"
        className="logo__mark"
      />
      <span className="logo__word">Luxe Lips</span>
    </Link>
  );
}
