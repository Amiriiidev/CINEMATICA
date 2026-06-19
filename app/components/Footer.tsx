export default function Footer() {
  return (
    <footer style={{ padding: "2rem 1.5rem", marginTop: "4rem" }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="font-display" style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>CINEMATICA</span>
          <span style={{ color: "var(--border)", fontSize: "1rem" }}>·</span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Top Rated Films</span>
        </div>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["About", "API", "Contact"].map(item => (
            <span key={item} style={{
              color: "var(--text-muted)",
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
              onMouseOver={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseOut={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {item}
            </span>
          ))}
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
          Data powered by <span style={{ color: "var(--gold)" }}>moviesapi.ir</span>
        </p>
      </div>
    </footer>
  );
}
