export default function AboutMe({ data }) {
  const { bio, email, phone, location, socials = {} } = data || {};
  return (
    <section className="container ">
      <h2
        style={{ fontSize: "2.5rem", textAlign: "center", fontWeight: "700" }}
      >
        About
      </h2>
      <p className="muted">{bio || "Tell your story here."}</p>
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
        <div className="card">
          <div className="muted">Location</div>
          <div>{location || "-"}</div>
        </div>
        <div className="card">
          <div className="muted">Socials</div>
          <div className="tag-list">
            {Object.entries(socials).map(([k, v]) =>
              v ? (
                <a key={k} href={v} target="_blank" className="chip">
                  {k}
                </a>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
