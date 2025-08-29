import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPortfolio } from "../api.js";
import Classic from "../components/templates/Classic.jsx";
import Modern from "../components/templates/Modern.jsx";
import { MdModeEdit } from "react-icons/md";

export default function PortfolioPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getPortfolio(id).then(setData);
  }, [id]);

  if (!data) return <div className="container">Loading...</div>;

  const Template = data.template === "modern" ? Modern : Classic;

  return (
    <div>
      <div className="container header">
        <Link to="/professionals" className="btn secondary">
          ← Back
        </Link>
        <Link
          to={`/edit/${id}`}
          className="btn secondary"
          style={{
            borderRadius: "8px",
            display: "flex",
            gap: "4px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Edit <MdModeEdit size={16} />
        </Link>
      </div>
      <Template data={data} />
    </div>
  );
}
