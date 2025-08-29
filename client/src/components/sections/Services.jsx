export default function Services({ data = [] }) {
  return (
    <section className="container section">
      <h2>Services</h2>
      <div className="grid cards">
        {(data.length
          ? data
          : [
              { title: "Web Dev", description: "Full-stack apps" },
              {
                title: "AI Integrations",
                description: "OpenAI, agents, automations",
              },
              { title: "Cloud Deployments", description: "AWS Lambda/EC2/S3" },
            ]
        ).map((s, i) => (
          <div key={i} className="card">
            <h3>{s.title}</h3>
            <p className="muted">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
