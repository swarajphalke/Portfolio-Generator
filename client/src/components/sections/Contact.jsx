export default function Contact({ data }) {
  const { message, email, phone } = data || {};
  return (
    <section className="container section">
      <h2>Contact</h2>
      <p className="muted">{message || "Let’s work together!"}</p>
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))" }}
      >
        <div className="card">
          <div className="muted">Email</div>
          <div>{email || "-"}</div>
        </div>
        <div className="card">
          <div className="muted">Phone</div>
          <div>{phone || "-"}</div>
        </div>
      </div>
    </section>
  );
}
