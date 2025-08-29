export default function Footer({ name }) {
  return (
    <div className="footer">
      © {new Date().getFullYear()} - Crafted with React by {name || "Your Name"}
    </div>
  );
}
