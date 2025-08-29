import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPortfolios } from "../api.js";
import { FaTrash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import { MdModeEdit } from "react-icons/md";

export default function ProfessionalsList() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [skill, setSkill] = useState("");
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    getPortfolios().then(setData);
  }, []);

  const skills = useMemo(() => {
    const s = new Set();
    data.forEach((p) => (p.skills || []).forEach((x) => s.add(x)));
    return Array.from(s).sort();
  }, [data]);

  const professions = useMemo(() => {
    const s = new Set();
    data.forEach((p) => p.hero?.title && s.add(p.hero.title.trim()));
    return Array.from(s).sort();
  }, [data]);

  const locations = useMemo(() => {
    const s = new Set();
    data.forEach((p) => p.about?.location && s.add(p.about.location.trim()));
    return Array.from(s).sort();
  }, [data]);

  const filtered = useMemo(() => {
    let result = data.filter((p) => {
      const name = (p.hero?.name || "").toLowerCase();
      const title = (p.hero?.title || "").toLowerCase();
      const bio = (p.about?.bio || "").toLowerCase();

      const inQ =
        !q ||
        name.includes(q.toLowerCase()) ||
        title.includes(q.toLowerCase()) ||
        bio.includes(q.toLowerCase());

      const inSkill = !skill || (p.skills || []).includes(skill);
      const inProfession = !profession || p.hero?.title?.trim() === profession;
      const inLocation = !location || p.about?.location?.trim() === location;

      return inQ && inSkill && inProfession && inLocation;
    });

    if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        (a.hero?.name || "").localeCompare(b.hero?.name || "")
      );
    } else if (sortBy === "profession") {
      result = [...result].sort((a, b) =>
        (a.hero?.title || "").localeCompare(b.hero?.title || "")
      );
    } else if (sortBy === "location") {
      result = [...result].sort((a, b) =>
        (a.about?.location || "").localeCompare(b.about?.location || "")
      );
    }

    return result;
  }, [data, q, skill, profession, location, sortBy]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      await deletePortfolio(id);
      setData((prev) => prev.filter((p) => p.id !== id));
    }
  };
  return (
    <div className="container">
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.3rem" }}>
            Meet Our Professionals
          </h2>
          <p style={{ fontSize: "1rem", opacity: 0.75 }}>
            Explore talented creators who have built portfolios with
            PortfolioGen.
          </p>
        </div>

        <Link to="/" className="btn secondary" style={{ fontWeight: 600 }}>
          + Create New
        </Link>
      </div>

      <div
        className="toolbar card"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem",
        }}
      >
        <input
          className="input"
          placeholder="Search by name, role, bio..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: "1 1 200px" }}
        />
        <select
          className="select"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          style={{ flex: "1 1 150px" }}
        >
          <option value="">All Skills</option>
          {skills.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="select"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          style={{ flex: "1 1 150px" }}
        >
          <option value="">All Professions</option>
          {professions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          className="select"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ flex: "1 1 150px" }}
        >
          <option value="">All Locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ flex: "1 1 150px" }}
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="profession">Profession</option>
          <option value="location">Location</option>
        </select>
      </div>

      <div
        className="grid cards"
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filtered.map((p) => (
          <div
            key={p.id}
            className="card"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              overflow: "hidden",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1.2rem",
              }}
            >
              {p.hero?.profileImage && (
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    marginRight: "1rem",
                    flexShrink: 0,
                    border: "3px solid #f0f0f0",
                  }}
                >
                  <img
                    src={p.hero.profileImage}
                    alt={p.hero?.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <div style={{ textAlign: "left", flex: 1 }}>
                <h3 style={{ margin: "0 0 0.3rem 0", fontSize: "1.2rem" }}>
                  {p.hero?.name}
                </h3>

                {p.hero?.title && (
                  <div
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "20px",
                      background: "#374151",
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {p.hero.title}
                  </div>
                )}
              </div>
            </div>

            {p.about?.bio && (
              <p
                className="muted small"
                style={{
                  margin: "0 0 1rem 0",
                  lineHeight: "1.5",
                  textAlign: "left",
                }}
              >
                {p.about.bio.length > 100
                  ? p.about.bio.slice(0, 100) + "..."
                  : p.about.bio}
              </p>
            )}

            {p.about?.location && (
              <div
                className="muted small"
                style={{
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <TfiLocationPin style={{ fontSize: "1rem" }} />
                <span>{p.about.location}</span>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.8rem",
                margin: "0 0 1.2rem 0",
              }}
            >
              {p.about?.experience && (
                <div
                  style={{
                    borderRadius: "12px",
                    padding: "0.8rem",
                    textAlign: "center",
                    background: "#374151",
                    color: "white",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "1.1rem",
                      display: "block",
                      color: "white   ",
                    }}
                  >
                    {p.about.experience}
                  </strong>
                  <div className="muted small" style={{ fontSize: "0.75rem" }}>
                    Years Experience
                  </div>
                </div>
              )}

              {p.about?.totalProjects && (
                <div
                  style={{
                    borderRadius: "12px",
                    padding: "0.8rem",
                    textAlign: "center",
                    background: "#374151",
                    color: "white",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "1.1rem",
                      display: "block",
                      color: "white",
                    }}
                  >
                    {p.about.totalProjects}
                  </strong>
                  <div className="muted small" style={{ fontSize: "0.75rem" }}>
                    Projects
                  </div>
                </div>
              )}
            </div>

            <div
              className="tag-list"
              style={{
                margin: "0 0 1.2rem 0",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
              }}
            >
              {(p.skills || []).slice(0, 5).map((s, i) => (
                <span
                  key={i}
                  className="chip"
                  style={{
                    padding: "0.3rem 0.7rem",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                  }}
                >
                  {s}
                </span>
              ))}
              {(p.skills || []).length > 5 && (
                <span
                  className="chip"
                  style={{
                    padding: "0.3rem 0.7rem",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                    background: "#f3f4f6",
                    color: "#6b7280",
                  }}
                >
                  +{(p.skills || []).length - 5}
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.8rem",
                marginTop: "auto",
                alignItems: "center",
              }}
            >
              <Link
                to={`/portfolio/${p.id}`}
                className="btn"
                style={{
                  flex: 1,
                  borderRadius: "10px",
                  padding: "0.6rem",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                Contact
              </Link>

              <div style={{ display: "flex", gap: "0.4rem" }}>
                <Link
                  to={`/portfolio/${p.id}`}
                  className="btn secondary"
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiEye size={16} />
                </Link>
                <Link
                  to={`/edit/${p.id}`}
                  className="btn secondary"
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MdModeEdit size={16} />
                </Link>
                <button
                  className="btn ghost"
                  onClick={() => handleDelete(p.id)}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    borderColor: "#f87171",
                    color: "#f87171",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
