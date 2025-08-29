export default function Blog({ data = [] }) {
  return (
    <section className="container section">
      <h2>Blog</h2>
      <div className="grid cards">
        {(data.length
          ? data
          : [
              {
                title: "How I build apps",
                summary: "Your summary here",
                url: "#",
              },
            ]
        ).map((b, i) => (
          <a key={i} className="card" href={b.url || "#"} target="_blank">
            <h3>{b.title}</h3>
            <p className="muted">{b.summary}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
