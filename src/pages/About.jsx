// AboutPage.jsx
import React from "react";
import { 
  FiHeart, 
  FiAward, 
  FiUsers, 
  FiGlobe,
  FiDroplet,
  FiStar,
  FiChevronRight
} from "react-icons/fi";
import { 
  GiQueenCrown, 
  GiLipstick, 
  GiSparkles, 
  GiFlowerTwirl,
  GiPlantSeed 
} from "react-icons/gi";
import { 
  RiLeafLine, 
  RiCustomerServiceLine, 
  RiSeedlingLine,
  RiPlantLine 
} from "react-icons/ri";
import { MdOutlineSpa, MdOutlineScience } from "react-icons/md";
import "./About.css";

const AboutPage = () => {
  const founders = [
    {
      name: "Isabella Rossi",
      role: "Co-Founder & Creative Director",
      bio: "With 15 years in luxury beauty, Isabella brings her passion for color and formulation to every product.",
      image: "/person1.jpg",
      signature: "Isabella Rossi"
    },
    {
      name: "Sophia Chen",
      role: "Co-Founder & Formulation Expert",
      bio: "A cosmetic chemist with a vision for clean, high-performance ingredients that actually work.",
      image: "/person2.jpg",
      signature: "Sophia Chen"
    }
  ];

  const milestones = [
    { year: "2015", title: "The Beginning", desc: "Founded in Paris with a vision for luxury lip care" },
    { year: "2017", title: "First Boutique", desc: "Opened flagship store in Le Marais, Paris" },
    { year: "2019", title: "Global Expansion", desc: "Launched in 15 countries across Europe and Asia" },
    { year: "2021", title: "Clean Beauty Pledge", desc: "Committed to 100% natural ingredients" },
    { year: "2023", title: "Sustainability Award", desc: "Recognized for eco-friendly packaging" },
    { year: "2025", title: "The Future", desc: "Continuing our journey of innovation" }
  ];

  const values = [
    {
      icon: <GiQueenCrown />,
      title: "Luxury Without Compromise",
      desc: "We believe luxury should be accessible without sacrificing quality or ethics."
    },
    {
      icon: <RiLeafLine />,
      title: "Clean Beauty",
      desc: "100% natural ingredients, never tested on animals, always cruelty-free."
    },
    {
      icon: <GiSparkles />,
      title: "Innovation First",
      desc: "Constantly pushing boundaries with cutting-edge formulations."
    },
    {
      icon: <GiFlowerTwirl />,
      title: "Artisan Crafted",
      desc: "Each product is carefully crafted with attention to every detail."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: <FiUsers /> },
    { number: "25+", label: "Countries", icon: <FiGlobe /> },
    { number: "100%", label: "Natural Ingredients", icon: <RiLeafLine /> },
    { number: "15+", label: "Industry Awards", icon: <FiAward /> }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content-about">
          <span className="hero-label">Our Story</span>
          <h1 className="hero-title-about">
            The Art of 
            <span className="title-highlight-about"> Luxurious Lips</span>
          </h1>
          <p className="hero-description-about">
            Where science meets beauty, and every product tells a story of passion, 
            innovation, and uncompromising quality.
          </p>
          <div className="hero-decoration">
            <GiQueenCrown className="decoration-crown" />
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="philosophy-section">
        <div className="philosophy-container">
          <div className="philosophy-text">
            <span className="section-subtitle">Our Philosophy</span>
            <h2 className="section-title-about">Beauty That Speaks<br />Without Words</h2>
            <p className="philosophy-paragraph">
              At Luxe Lips, we believe that true beauty lies in the details. Every product we create 
              is a testament to our commitment to excellence, from the finest ingredients sourced 
              from around the world to the elegant packaging that adorns your vanity.
            </p>
            <p className="philosophy-paragraph">
              Our journey began with a simple observation: women deserved better. Better ingredients, 
              better formulations, better results. Today, we're proud to offer a collection that 
              combines the best of nature with cutting-edge science, all while maintaining our 
              commitment to sustainability and ethical practices.
            </p>
            
            <div className="signature-block">
              <div className="signature-line"></div>
              <p className="signature-text">With love,</p>
              <p className="signature-name">The Luxe Lips Team</p>
            </div>
          </div>
          
          <div className="philosophy-image">
            <img src="/image3.jpg" alt="Luxury lipstick on marble" />
            <div className="image-accent"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card-about">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number-about">{stat.number}</div>
              <div className="stat-label-about">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section">
        <div className="values-header">
          <span className="section-subtitle">What We Stand For</span>
          <h2 className="section-title-about">Our Core Values</h2>
        </div>
        
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon-wrapper">
                {value.icon}
              </div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.desc}</p>
              <div className="value-line"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="timeline-section">
        <div className="timeline-header">
          <span className="section-subtitle">Our Journey</span>
          <h2 className="section-title-about">A Decade of Excellence</h2>
        </div>
        
        <div className="timeline">
          {milestones.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>
              </div>
              {index < milestones.length - 1 && <div className="timeline-line"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Founders Section */}
      <section className="founders-section">
        <div className="founders-header">
          <span className="section-subtitle">The Visionaries</span>
          <h2 className="section-title-about">Meet The Founders</h2>
        </div>
        
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <div key={index} className="founder-card">
              <div className="founder-image-wrapper">
                <img src={founder.image} alt={founder.name} className="founder-image" />
                <div className="founder-overlay"></div>
              </div>
              <div className="founder-info">
                <h3 className="founder-name">{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                <p className="founder-bio">{founder.bio}</p>
                <div className="founder-signature">{founder.signature}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="craftsmanship-section">
        <div className="craftsmanship-container">
          <div className="craftsmanship-image">
            <img src="/image4.jpg" alt="Crafting lipstick" />
            <div className="craftsmanship-badge">
              <GiSparkles className="badge-icon" />
              <span>Handcrafted with love</span>
            </div>
          </div>
          
          <div className="craftsmanship-content">
            <span className="section-subtitle">Our Process</span>
            <h2 className="section-title-about">Where Art Meets Science</h2>
            
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h4>Sourcing</h4>
                  <p>Finest ingredients from sustainable farms worldwide</p>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h4>Formulation</h4>
                  <p>Expert chemists create perfect texture and payoff</p>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h4>Testing</h4>
                  <p>Rigorous quality control on every batch</p>
                </div>
              </div>
              
              <div className="process-step">
                <div className="step-number">04</div>
                <div className="step-content">
                  <h4>Packaging</h4>
                  <p>Elegant, sustainable packaging you'll love</p>
                </div>
              </div>
            </div>
            
            <button className="craftsmanship-btn">
              Discover Our Collection
              <FiChevronRight className="btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Sustainability Pledge */}
      <section className="sustainability-section">
        <div className="sustainability-content">
          <RiPlantLine className="sustainability-icon" />
          <h2 className="sustainability-title">Our Promise to the Planet</h2>
          <p className="sustainability-text">
            We're committed to reducing our environmental footprint through sustainable sourcing, 
            eco-friendly packaging, and carbon-neutral shipping. Every Luxe Lips purchase helps 
            protect our beautiful planet.
          </p>
          
          <div className="sustainability-badges">
            <div className="sustain-badge">
              <RiLeafLine /> 100% Natural
            </div>
            <div className="sustain-badge">
              <FiHeart /> Cruelty Free
            </div>
            <div className="sustain-badge">
              <RiSeedlingLine /> Eco Packaging
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-header">
          <span className="section-subtitle">Our Family</span>
          <h2 className="section-title-about">The People Behind the Magic</h2>
        </div>
        
        <div className="team-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="team-member">
              <div className="member-image">
                <img src={`/person3.jpg`} alt="Team member" />
              </div>
              {/* <h4 className="member-name">Team Member {item}</h4> */}
              <p className="member-role">Sales Manager</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="cta-container">
          <GiQueenCrown className="cta-crown" />
          <h2 className="cta-title">Ready to Experience Luxury?</h2>
          <p className="cta-text">Join thousands of women who trust Luxe Lips for their daily beauty ritual.</p>
          <button className="cta-button-about">
            Shop Our Collection
            <FiChevronRight className="btn-icon" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;