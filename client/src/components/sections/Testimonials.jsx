export default function Testimonials({ data = [] }) {
  return (
    <section className="container section">
      <h2>Testimonials</h2>
      <div className="grid cards">
        {(data.length
          ? data
          : [{ quote: "Great work!", client: "Happy Client" }]
        ).map((t, i) => (
          <div key={i} className="card">
            <p>"{t.quote}"</p>
            <div className="muted">— {t.client}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
