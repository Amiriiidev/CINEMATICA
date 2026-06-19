"use client";

interface Movie {
  id: number;
  title: string;
  poster: string;
  year: string;
  country: string;
  imdb_rating: string;
  genres: string[];
  images: string[];
}

export default function MovieCard({
  movie,
  rank,
}: {
  movie: Movie;
  rank: number;
}) {
  const ratingPercent = ((parseFloat(movie.imdb_rating) / 10) * 100).toFixed(0);

  return (
    <div className="movie-card">
      {/* Rank badge */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 10,
          background: "rgba(10,10,15,0.85)",
          border: "1px solid rgba(255,215,0,0.3)",
          borderRadius: "4px",
          padding: "2px 8px",
          color: "var(--gold)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          fontFamily: "Bebas Neue, sans-serif",
          lineHeight: 1.6,
        }}
      >
        #{rank}
      </div>

      <div className="poster-wrap">
        <img src={movie.poster} alt={movie.title} />
        {/* Hover overlay */}
        <div className="overlay">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              marginBottom: "8px",
            }}
          >
            {movie?.genres?.map((g) => (
              <span key={g} className="genre-tag">
                {g}
              </span>
            ))}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
            {movie.country}
          </p>
        </div>
      </div>

      {/* Rating bar */}
      <div className="rating-bar" style={{ width: `${ratingPercent}%` }} />

      {/* Info */}
      <div style={{ padding: "0.75rem" }}>
        <h3
          className="font-display"
          style={{
            fontSize: "1.05rem",
            color: "var(--text-primary)",
            lineHeight: 1.2,
            marginBottom: "6px",
          }}
        >
          {movie.title}
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            {movie.year}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span className="star-icon" style={{ fontSize: "0.85rem" }} />
            <span
              style={{
                color: "var(--gold)",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              {movie.imdb_rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
