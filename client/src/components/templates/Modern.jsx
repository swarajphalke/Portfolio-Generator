import { useState, useEffect } from "react";
import HeroSection from "../sections/HeroSection.jsx";
import AboutMe from "../sections/AboutMe.jsx";
import Portfolio from "../sections/Portfolio.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../sections/Footer.jsx";

export default function UltraModern({ data }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #0A0E17 0%, #13182B 50%, #0A0E17 100%)",
        color: "white",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: `${20 + scrollPosition * 0.05}%`,
          right: "-100px",
          width: "300px",
          height: "300px",
          border: "2px solid rgba(101, 119, 249, 0.2)",
          borderRadius: "50%",
          transform: "rotate(25deg)",
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          bottom: `${10 - scrollPosition * 0.03}%`,
          left: "-150px",
          width: "400px",
          height: "400px",
          border: "2px solid rgba(236, 72, 153, 0.15)",
          transform: "rotate(45deg)",
          zIndex: 0,
        }}
      ></div>
      <div style={{ position: "relative", zIndex: 10 }}>
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(101, 119, 249, 0.1) 0%, transparent 70%)",
              clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
              zIndex: -1,
            }}
          ></div>

          <div className="container" style={{ padding: "2rem" }}>
            <HeroSection data={data.hero} theme="dark" />
          </div>
        </section>
        <section
          style={{
            padding: "18px 0 27px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "10%",
              width: "300px",
              height: "300px",
              background:
                "linear-gradient(135deg, rgba(101, 119, 249, 0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(20px)",
              zIndex: -1,
            }}
          ></div>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "4rem",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: "3rem",
                    marginBottom: "2rem",
                    fontWeight: "800",
                    lineHeight: "1.2",
                    background:
                      "linear-gradient(135deg, #fff 30%, #6577F9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Creative <br />
                  Problem Solver
                </h2>
                <AboutMe data={data.about} />
              </div>
              <div
                style={{
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    background: "linear-gradient(135deg, #6577F9, #EC4899)",
                    borderRadius: "20px",
                    position: "absolute",
                    top: "-20px",
                    left: "-20px",
                    zIndex: -1,
                  }}
                ></div>
                <img
                  src={data.hero?.profileImage}
                  alt={data.hero?.name}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "20px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          style={{
            padding: "3rem 0",
            background: "linear-gradient(135deg, #0A0E17, #121826)",
          }}
        >
          <div className="container">
            <h2
              style={{
                fontSize: "2.8rem",
                marginBottom: "3.5rem",
                textAlign: "center",
                fontWeight: "800",
                letterSpacing: "1px",
                background: "linear-gradient(135deg, #6577F9, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Skills & Expertise
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "2.5rem",
              }}
            >
              {(data.skills || []).map((skill, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    padding: "2rem",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px) scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 35px rgba(101, 119, 249, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(0,0,0,0.3)";
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "0 auto 1.5rem auto",
                      borderRadius: "50%",
                      background: `conic-gradient(#6577F9 ${
                        (i + 1) * 15
                      }%, #1a1f2e 0)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "85px",
                        height: "85px",
                        borderRadius: "50%",
                        background: "#0A0E17",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        color: "#fff",
                      }}
                    >
                      {Math.floor(Math.random() * (95 - 60 + 1)) + 60}%
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.3rem",
                      marginBottom: "0.8rem",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    {skill}
                  </h3>

                  <p
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      textAlign: "center",
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                    }}
                  >
                    Proficient in {skill} with hands-on experience delivering
                    modern solutions.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          style={{
            padding: "3rem 0",
            background: "rgba(10, 14, 23, 0.7)",
          }}
        >
          <div className="container">
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
              Recent Work
            </h2>
            <Portfolio data={data.projects} />
          </div>
        </section>
        <section style={{ padding: "3rem 0" }}>
          <div className="container">
            <Contact data={data.contact} />
          </div>
        </section>
        <Footer name={data.hero?.name} />
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
