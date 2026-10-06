import { useId, useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import "./Newsletter.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Email capture. `onSubmit` is a stub — wire it to your ESP (Mailchimp, Klaviyo, Brevo…).
 */
export default function Newsletter({ variant = "light", cta = "Join" }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | done

  const onSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  if (status === "done") {
    return (
      <p className={`nl nl--${variant} nl__done`} role="status">
        <FiCheck aria-hidden="true" /> You're on the list. Check your inbox for 15% off.
      </p>
    );
  }

  return (
    <form className={`nl nl--${variant}`} onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="visually-hidden">
        Email address
      </label>
      <div className="nl__row">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${id}-err` : undefined}
        />
        <button type="submit" aria-label={cta}>
          <span>{cta}</span>
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
      {status === "error" && (
        <p id={`${id}-err`} className="nl__err">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
