import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const templates = [
  {
    id: "classic",
    name: "Classic",
    features: [
      "Dark theme with formal design",
      "Skills displayed as chips/badges",
      "Services section",
      "Testimonials section",
      "Structured resume-like layout",
    ],
  },
  {
    id: "modern",
    name: "Modern",
    features: [
      "Dark gradient theme",
      "Bold, modern styling",
      "Skills displayed in a timeline format",
      "No services/testimonials (clean layout)",
      "Creative portfolio-style design",
    ],
  },
];

export default function TemplateSelect() {
  const nav = useNavigate();
  return (
    <div className="container" style={{ padding: "4rem 1.5rem" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "3.5rem",
          maxWidth: "720px",
          marginInline: "auto",
          padding: "0 1rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            marginBottom: "0.75rem",
            fontWeight: "700",
            color: "#ffffff",
            letterSpacing: "-0.5px",
            lineHeight: "1.2",
          }}
        >
          Choose Your Template
        </h1>

        <div
          style={{
            height: "3px",
            width: "70px",
            margin: "0.75rem auto 1.5rem",
            borderRadius: "2px",
            backgroundColor: "#6366f1",
            opacity: 0.9,
          }}
        />

        <p
          style={{
            fontSize: "1.1rem",
            opacity: 0.85,
            lineHeight: "1.6",
            color: "#d1d5db",
          }}
        >
          Pick one and start building your portfolio instantly with a sleek,
          professional design.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {templates.map((t) => (
          <div
            key={t.id}
            style={{
              maxWidth: "380px",
              margin: "0 auto",
              padding: "2rem 1.8rem",
              borderRadius: "20px",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => nav(`/create/${t.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.25)";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
            }}
          >
            <h3
              style={{
                marginBottom: "1.2rem",
                fontSize: "1.6rem",
                fontWeight: "600",
              }}
            >
              {t.name}
            </h3>

            <ul style={{ marginBottom: "2rem", paddingLeft: "0" }}>
              {t.features.map((f, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    fontSize: "0.95rem",
                    marginBottom: "0.6rem",
                    opacity: 0.9,
                  }}
                >
                  <CheckCircle2 size={18} color="#4ade80" /> {f}
                </li>
              ))}
            </ul>

            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  padding: "0.75rem 1.6rem",
                  fontSize: "1rem",
                  borderRadius: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  background:
                    "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)",
                  color: "#fff",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Use {t.name} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
