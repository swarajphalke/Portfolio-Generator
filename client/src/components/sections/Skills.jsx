export default function Skills({ data = [] }) {
  return (
    <section className="container section">
      <h2>Skills</h2>
      <div className="tag-list">
        {(data && data.length ? data : ["React", "Node", "AWS"]).map((s, i) => (
          <span key={i} className="chip">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
