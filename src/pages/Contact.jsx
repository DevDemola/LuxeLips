import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiClock, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { CONTACT, FAQS } from "../data/content";
import { useTitle } from "../lib/hooks";
import { Accordion } from "../components/ui/primitives";
import "./Contact.css";

const TOPICS = ["Order help", "Shade advice", "Wholesale & stockists", "Press & partnerships", "Something else"];

export default function Contact() {
  useTitle("Help & contact");
  const { hash } = useLocation();
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Please tell us your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) er.email = "Enter a valid email";
    if (form.message.trim().length < 10) er.message = "Tell us a little more (10+ characters)";
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`ct-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    // TODO: POST to your form backend (Formspree, a serverless function, etc.)
    setSent(true);
  };

  return (
    <div className="contact">
      <header className="page-hero">
        <div className="container">
          <span className="eyebrow">Help & contact</span>
          <h1>We're here to help</h1>
          <p>Questions about an order, or need help picking a shade? The fastest way to reach us is WhatsApp.</p>
        </div>
      </header>

      <div className="container section contact__grid">
        <aside className="contact__channels">
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="contact__wa">
            <FaWhatsapp aria-hidden="true" />
            <span>
              <strong>Chat on WhatsApp</strong>
              <span>Typically replies in under 10 minutes</span>
            </span>
          </a>
          <ul>
            <li>
              <FiMail aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <FiPhone aria-hidden="true" />
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>{CONTACT.phone}</a>
            </li>
            <li>
              <FiMapPin aria-hidden="true" />
              <span>{CONTACT.address}</span>
            </li>
            <li>
              <FiClock aria-hidden="true" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </aside>

        <section className="contact__form" aria-labelledby="ct-title">
          <h2 id="ct-title">Send us a message</h2>
          {sent ? (
            <div className="contact__sent" role="status">
              <FiCheckCircle aria-hidden="true" />
              <div>
                <strong>Message sent. Thank you, {form.name.split(" ")[0]}!</strong>
                <p className="muted">We'll reply to {form.email} within one working day.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="contact__row">
                <div className="field">
                  <label htmlFor="ct-name">Name</label>
                  <input id="ct-name" className="input" autoComplete="name" value={form.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "ct-name-err" : undefined} />
                  {errors.name && <span id="ct-name-err" className="field-error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="ct-email">Email</label>
                  <input id="ct-email" type="email" className="input" autoComplete="email" value={form.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "ct-email-err" : undefined} />
                  {errors.email && <span id="ct-email-err" className="field-error">{errors.email}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="ct-topic">What's it about?</label>
                <select id="ct-topic" className="input" value={form.topic} onChange={set("topic")}>
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="ct-message">Message</label>
                <textarea id="ct-message" className="input" rows={6} value={form.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "ct-message-err" : undefined} />
                {errors.message && <span id="ct-message-err" className="field-error">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn--primary btn--lg">
                Send message
              </button>
            </form>
          )}
        </section>
      </div>

      <section className="container contact__faq" id="faq">
        <div className="section-head">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>Delivery, returns & more</h2>
          </div>
        </div>
        <Accordion items={FAQS} />
      </section>
    </div>
  );
}
