
import { Routes, Route, NavLink } from 'react-router-dom'
import TemplateSelect from './pages/TemplateSelect.jsx'
import PortfolioForm from './pages/PortfolioForm.jsx'
import ProfessionalsList from './pages/ProfessionalsList.jsx'
import PortfolioPage from './pages/PortfolioPage.jsx'
import EditProfile from './pages/EditProfile.jsx'
export default function App() {
  return (
    <div>
      <nav
        className="container nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
         <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontWeight: 800,
            fontSize: "1.3rem",
            letterSpacing: "-0.5px",
            color: "#fff",
          }}
        >
          <span style={{ fontSize: "1.4rem" }}>🚀</span>
          <span>PortfolioGen</span>
        </div>

         <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `btn ghost ${isActive ? "active-link" : ""}`
            }
          >
            Templates
          </NavLink>

          <NavLink
            to="/professionals"
            className={({ isActive }) =>
              `btn ghost ${isActive ? "active-link" : ""}`
            }
          >
            Professionals
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<TemplateSelect />} />
        <Route path="/create/:template" element={<PortfolioForm />} />
        <Route path="/professionals" element={<ProfessionalsList />} />
        <Route path="/portfolio/:id" element={<PortfolioPage />} />
        <Route path="/edit/:id" element={<EditProfile />} />
      </Routes>

      <footer className="footer">
        Built for IPAGE assignment — MERN + API-driven React
      </footer>
    </div>
  );
}
