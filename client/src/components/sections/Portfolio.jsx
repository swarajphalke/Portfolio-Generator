export default function Portfolio({ data = [] }) {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "2rem 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
          maxWidth: "1000px",  
        }}
      >
        {(data.length
          ? data
          : [
              {
                title: "Sample Project",
                image: "",
                description: "Describe your work",
                url: "#",
              },
            ]
        ).map((p, i) => (
          <a
            key={i}
            href={p.url || "#"}
            target="_blank"
            style={{
              textDecoration: "none",
              background: "rgba(255,255,255,0.05)",
              padding: "1.5rem",
              borderRadius: "12px",
              width: "280px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {p.image ? (
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: ".5rem",
                  objectFit: "cover",
                  height: "160px",
                }}
              />
            ) : null}
            <h3>{p.title}</h3>
            <p style={{ opacity: 0.7 }}>{p.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
