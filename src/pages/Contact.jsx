// ContactPage.jsx
import React, { useState } from "react";
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock,
  FiSend,
  FiCheckCircle,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMessageCircle
} from "react-icons/fi";
import { 
  GiQueenCrown, 
  GiLipstick,
  GiSparkles 
} from "react-icons/gi";
import { 
  RiCustomerServiceLine,
  RiChatSmileLine,
  RiMailSendLine,
  RiHeartLine
} from "react-icons/ri";
import "./Contact.css";

const Contact= () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });
  
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for reaching out! Our beauty consultants will respond within 24 hours."
    });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus({ submitted: false, success: false, message: "" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 5000);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: "Visit Us",
      details: ["123 Beauty Avenue", "Paris, France 75001"],
      link: "https://maps.google.com",
      linkText: "Get Directions →"
    },
    {
      icon: <FiPhone />,
      title: "Call Us",
      details: ["+33 (0) 1 23 45 67 89", "+33 (0) 1 98 76 54 32"],
      link: "tel:+33123456789",
      linkText: "Call Now →"
    },
    {
      icon: <FiMail />,
      title: "Email Us",
      details: ["hello@luxelips.com", "support@luxelips.com"],
      link: "mailto:hello@luxelips.com",
      linkText: "Send Email →"
    },
    {
      icon: <FiClock />,
      title: "Opening Hours",
      details: ["Monday - Friday: 9am - 7pm", "Saturday: 10am - 6pm", "Sunday: Closed"],
      link: "#",
      linkText: "Book Appointment →"
    }
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days within Europe, and 5-10 business days internationally. Express shipping is available at checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused products in original packaging. Simply contact our support team to initiate a return."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "Are your products cruelty-free?",
      answer: "Absolutely. We are PETA-certified cruelty-free and never test on animals. All our ingredients are ethically sourced."
    },
    {
      question: "How can I find my perfect shade?",
      answer: "Use our Shade Finder tool on each product page, or visit our boutique for a personalized consultation."
    }
  ];

  const storeLocations = [
    {
      city: "Paris",
      address: "123 Rue de Rivoli, 75001 Paris",
      phone: "+33 1 23 45 67 89",
      hours: "Mon-Sat: 10am-7pm"
    },
    {
      city: "London",
      address: "45 Oxford Street, W1D 1AN London",
      phone: "+44 20 1234 5678",
      hours: "Mon-Sat: 10am-8pm, Sun: 12pm-6pm"
    },
    {
      city: "New York",
      address: "789 Madison Avenue, NY 10021",
      phone: "+1 212 555 0123",
      hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm"
    },
    {
      city: "Tokyo",
      address: "5-7-13 Ginza, Chuo City, Tokyo 104-0061",
      phone: "+81 3 1234 5678",
      hours: "Mon-Sun: 11am-8pm"
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content-contact">
          <GiQueenCrown className="hero-crown" />
          <span className="hero-label">Get In Touch</span>
          <h1 className="hero-title-contact">
            We'd Love to Hear<br />From You
          </h1>
          <p className="hero-description-contact">
            Whether you have a question about our products, need shade advice, 
            or just want to say hello, our team is here for you.
          </p>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="info-cards-section">
        <div className="info-cards-grid">
          {contactInfo.map((info, index) => (
            <div key={index} className="info-card">
              <div className="info-icon-wrapper">
                {info.icon}
              </div>
              <h3 className="info-title">{info.title}</h3>
              <div className="info-details">
                {info.details.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
              </div>
              <a href={info.link} className="info-link">
                {info.linkText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="form-map-section">
        <div className="form-map-container">
          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <div className="form-header">
              <span className="form-subtitle">Send a Message</span>
              <h2 className="form-title">We're Here to Help</h2>
              <p className="form-description">
                Fill out the form below and our beauty consultants will get back to you within 24 hours.
              </p>
            </div>

            {formStatus.success ? (
              <div className="success-message">
                <FiCheckCircle className="success-icon" />
                <p>{formStatus.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <div className="form-checkbox">
                  <input type="checkbox" id="newsletter" />
                  <label htmlFor="newsletter">
                    Subscribe to our newsletter for beauty tips and exclusive offers
                  </label>
                </div>

                <button type="submit" className="submit-btn">
                  <FiSend className="btn-icon" />
                  Send Message
                </button>

                <p className="form-note">
                  * Required fields. We'll respond within 24 hours.
                </p>
              </form>
            )}
          </div>

          {/* Map/Image Section */}
          <div className="map-wrapper">
            <div className="map-container">
              <img 
                src="/image3.jpg" 
                alt="Luxe Lips Boutique" 
                className="map-image"
              />
              <div className="map-overlay">
                <GiQueenCrown className="map-crown" />
                <h3>Visit Our Flagship</h3>
                <p>123 Beauty Avenue, Paris</p>
                <button className="map-btn">Open in Maps →</button>
              </div>
            </div>
            
            <div className="live-chat-card">
              <RiChatSmileLine className="chat-icon" />
              <div className="chat-content">
                <h4>Need immediate assistance?</h4>
                <p>Our live chat is available 24/7</p>
              </div>
              <button className="chat-btn">
                <FiMessageCircle />
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="locations-section">
        <div className="locations-header">
          <span className="section-subtitle">Visit Us</span>
          <h2 className="section-title-contact">Our Boutiques</h2>
          <p className="locations-description">
            Experience Luxe Lips in person at one of our elegant boutiques around the world.
          </p>
        </div>

        <div className="locations-grid">
          {storeLocations.map((location, index) => (
            <div key={index} className="location-card">
              <div className="location-city">{location.city}</div>
              <div className="location-details">
                <p><FiMapPin /> {location.address}</p>
                <p><FiPhone /> {location.phone}</p>
                <p><FiClock /> {location.hours}</p>
              </div>
              <button className="location-btn">Get Directions</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <GiSparkles className="faq-sparkle" />
            <span className="section-subtitle">FAQ</span>
            <h2 className="section-title-contact">Frequently Asked Questions</h2>
            <p className="faq-description">
            </p>
          </div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">{activeFaq === index ? '−' : '+'}</span>
                </div>
                <div className={`faq-answer ${activeFaq === index ? 'show' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Connect */}
      <section className="social-connect">
        <div className="social-container">
          <h3>Connect With Us</h3>
          <p>Follow us on social media for daily inspiration and exclusive offers</p>
          
          <div className="social-icons-large">
            <a href="#" className="social-icon-large">
              <FiInstagram />
              <span>Instagram</span>
            </a>
            <a href="#" className="social-icon-large">
              <FiFacebook />
              <span>Facebook</span>
            </a>
            <a href="#" className="social-icon-large">
              <FiTwitter />
              <span>Twitter</span>
            </a>
            <a href="#" className="social-icon-large">
              <FiYoutube />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="cta-content">
          <RiHeartLine className="cta-heart" />
          <h2>Become a Luxe Insider</h2>
          <p>Subscribe for 15% off your first order and exclusive beauty insights</p>
          
          <form className="cta-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">
              <RiMailSendLine />
              Subscribe
            </button>
          </form>
          
          <p className="cta-note">By subscribing, you agree to our Privacy Policy</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;