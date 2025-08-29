import { useState } from "react";
import HeroSection from "../sections/HeroSection.jsx";
import AboutMe from "../sections/AboutMe.jsx";
import Portfolio from "../sections/Portfolio.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../sections/Footer.jsx";

export default function ModernPortfolio({ data }) {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #0b1020 0%, #111a38 50%, #1a234c 100%)",
        color: "white",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <nav
        style={{
          position: "fixed",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          padding: "1rem 0.5rem",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {[
          "hero",
          "about",
          "skills",
          "services",
          "portfolio",
          "testimonials",
          "blog",
          "contact",
        ].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              background:
                activeSection === section ? "#6366f1" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: activeSection === section ? "scale(1.4)" : "scale(1)",
            }}
            aria-label={`Scroll to ${section} section`}
          />
        ))}
      </nav>

      <section id="hero" style={{ paddingTop: "50px" }}>
        <HeroSection data={data.hero} theme="dark" />
      </section>

      <section id="about" style={{ padding: "4rem 0 4rem" }}>
        <div className="container">
          <div
            style={{
              padding: "3rem",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.03)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)",
                borderRadius: "24px 24px 0 0",
              }}
            />
            <AboutMe data={data.about} />
          </div>
        </div>
      </section>

      <section id="skills" style={{ padding: "2rem 0 5rem" }}>
        <div className="container">
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "2rem",
              textAlign: "center",
              background: "linear-gradient(90deg, #fff, #aaa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Skills & Expertise
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {(data.skills || []).map((s, i) => (
              <div
                key={i}
                style={{
                  background:
                    "linear-gradient(145deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "50px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.boxShadow = "0 10px 25px rgba(99,102,241,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>{s}</span>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        style={{ padding: "5rem 0", background: "rgba(0,0,0,0.2)" }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "3rem",
              textAlign: "center",
              background: "linear-gradient(90deg, #fff, #aaa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            What I Offer
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {(data.services || []).map((srv, i) => (
              <div
                key={i}
                style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.03)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-10px)";
                  e.target.style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  }}
                />
                <h3
                  style={{
                    marginBottom: "1rem",
                    fontSize: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    }}
                  ></span>
                  {srv.title}
                </h3>
                <p
                  style={{
                    lineHeight: "1.6",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.95rem",
                  }}
                >
                  {srv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" style={{ padding: "3rem 0" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            textAlign: "center",
            fontWeight: "700",
            background: "linear-gradient(135deg, #fff 30%, #6577F9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Projects
        </h2>
        <Portfolio data={data.projects} />
      </section>

      <section
        id="testimonials"
        style={{ padding: "3rem 0", background: "rgba(0,0,0,0.2)" }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "3rem",
              textAlign: "center",
              background: "linear-gradient(90deg, #fff, #aaa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Client Testimonials
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {(data.testimonials || []).map((t, i) => (
              <div
                key={i}
                style={{
                  padding: "2.5rem",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.03)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-5px)";
                  e.target.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    left: "1.5rem",
                    fontSize: "3rem",
                    color: "rgba(99,102,241,0.2)",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  "
                </div>
                <blockquote
                  style={{
                    fontStyle: "italic",
                    lineHeight: "1.7",
                    position: "relative",
                    zIndex: 2,
                    margin: "0 0 1.5rem 0",
                    paddingLeft: "1.5rem",
                  }}
                >
                  {t.quote}
                </blockquote>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "linear-gradient(145deg, #6366f1, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    {t.client
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      margin: 0,
                    }}
                  >
                    {t.client}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        style={{ padding: "4rem 0", background: "rgba(0,0,0,0.2)" }}
      >
        <Contact data={data.contact} />
      </section>

      <Footer name={data.hero?.name} />
    </div>
  );
}
