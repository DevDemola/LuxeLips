import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { TEAM } from "../data/content";
import { useTitle } from "../lib/hooks";
import "./About.css";

const VALUES = [
  {
    n: "01",
    title: "Made for melanin",
    body: "Every shade is tested on deep, rich and medium skin before it ships. If it washes anyone out, it doesn't make the cut.",
  },
  {
    n: "02",
    title: "Comfort first",
    body: "Non-sticky, non-drying formulas with shea butter, jojoba and vitamin E. Made to survive Lagos heat and long days.",
  },
  {
    n: "03",
    title: "Kind by default",
    body: "Cruelty-free, paraben-free, and packaged in recyclable materials wherever we can.",
  },
];

export default function About() {
  useTitle("Our story");

  return (
    <div className="about">
      <section className="about__hero container">
        <div className="about__heroCopy">
          <span className="eyebrow">Our story</span>
          <h1>
            Beauty that sees <span className="display-italic">you</span>.
          </h1>
          <p>
            Luxe Lips started in Lagos with a simple frustration: the glosses on the shelf weren't made with our skin,
            our climate or our budgets in mind. So we made our own.
          </p>
        </div>
        <div className="about__heroMedia">
          <img src="/images/team-1.webp" alt="The Luxe Lips founder" />
          <img src="/images/berry-kiss-duo.webp" alt="A woman holding two Luxe Lips glosses" loading="lazy" />
        </div>
      </section>

      <section className="about__statement">
        <div className="container">
          <p>
            “We wanted lip products that felt as luxurious as anything from Paris or New York, but were made for the
            women we actually see every day.”
          </p>
          <span className="muted">— Founder, Luxe Lips</span>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">What we stand for</span>
            <h2>Three promises, every product</h2>
          </div>
        </div>
        <ol className="values">
          {VALUES.map((v) => (
            <li key={v.n}>
              <span>{v.n}</span>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">The team</span>
              <h2>The people behind the gloss</h2>
            </div>
            <p>A small team in Lagos obsessing over textures, shades and how you feel when you wear them.</p>
          </div>
          <ul className="team">
            {TEAM.map((m, i) => (
              <li key={i}>
                <img src={m.image} alt={m.name} loading="lazy" />
                <strong>{m.name}</strong>
                <span className="muted">{m.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section container about__cta">
        <h2>
          Find the gloss that feels like <span className="display-italic">you</span>.
        </h2>
        <Link to="/shop" className="btn btn--primary btn--lg">
          Shop the collection <FiArrowRight />
        </Link>
      </section>
    </div>
  );
}
