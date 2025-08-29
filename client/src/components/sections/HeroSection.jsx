export default function HeroSection({ data }) {
  const { name, title, tagline, profileImage } = data || {};
  return (
    <section className="hero">
      {profileImage && (
        <img
          src={profileImage}
          alt={name}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #2b355f",
          }}
        />
      )}
      <h1>{name || "Your Name"}</h1>
      <p className="muted">{title || "Your Role"}</p>
      <p>{tagline || "A short tagline about you."}</p>
    </section>
  );
}
