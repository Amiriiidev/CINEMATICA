"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Footer from "../../components/Footer";

interface MovieDetail {
  id: number;
  title: string;
  poster: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  country: string;
  awards: string;
  metascore: string;
  imdb_rating: string;
  imdb_votes: string;
  imdb_id: string;
  type: string;
  genres: string[];
  images: string[];
}

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetch(`https://moviesapi.ir/api/v1/movies/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => {
        setError("خطا در دریافت اطلاعات فیلم.");
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "6rem 0",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎞</div>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div style={{ textAlign: "center", padding: "6rem 0", color: "#ff6b6b" }}>
        <p>{error || "فیلم یافت نشد."}</p>
        <button
          className="filter-btn"
          style={{ marginTop: "1rem" }}
          onClick={() => router.push("/")}
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Backdrop hero */}
      <div className="movie-hero">
        <div
          className="movie-hero-bg"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="movie-hero-overlay" />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          <button className="back-btn" onClick={() => router.push("/")}>
            ← بازگشت
          </button>

          <div className="movie-hero-content">
            <div className="movie-poster-large">
              <img src={movie.poster} alt={movie.title} />
            </div>

            <div className="movie-hero-info">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginBottom: "0.8rem",
                }}
              >
                {movie?.genres?.map((g) => (
                  <span key={g} className="genre-tag">
                    {g}
                  </span>
                ))}
              </div>

              <h1 className="font-display movie-title-large">{movie.title}</h1>

              <div className="movie-meta-row">
                <span>{movie.year}</span>
                <span className="dot">·</span>
                <span>{movie.runtime}</span>
                <span className="dot">·</span>
                <span className="rated-badge">{movie.rated}</span>
                <span className="dot">·</span>
                <span>{movie.country}</span>
              </div>

              <div className="rating-block">
                <div className="rating-circle">
                  <span className="star-icon" style={{ fontSize: "1.1rem" }} />
                  <span className="rating-num">{movie.imdb_rating}</span>
                </div>
                <div>
                  <p
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    امتیاز IMDb
                  </p>
                  <p
                    style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}
                  >
                    {movie.imdb_votes} رأی
                  </p>
                </div>
                {movie.metascore && movie.metascore !== "N/A" && (
                  <div className="metascore-badge">
                    <span>{movie.metascore}</span>
                    <small>Metascore</small>
                  </div>
                )}
              </div>

              <p className="movie-plot">{movie.plot}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main details */}
      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
        }}
      >
        <div className="detail-grid">
          <div className="detail-card">
            <h3 className="detail-card-title">کارگردان</h3>
            <p className="detail-card-value">{movie.director}</p>
          </div>
          <div className="detail-card">
            <h3 className="detail-card-title">نویسنده</h3>
            <p className="detail-card-value">{movie.writer}</p>
          </div>
          <div className="detail-card">
            <h3 className="detail-card-title">بازیگران</h3>
            <p className="detail-card-value">{movie.actors}</p>
          </div>
          <div className="detail-card">
            <h3 className="detail-card-title">تاریخ اکران</h3>
            <p className="detail-card-value">{movie.released}</p>
          </div>
          <div className="detail-card">
            <h3 className="detail-card-title">جوایز</h3>
            <p className="detail-card-value">{movie.awards}</p>
          </div>
          <div className="detail-card">
            <h3 className="detail-card-title">شناسه IMDb</h3>
            <p
              className="detail-card-value"
              style={{ direction: "ltr", textAlign: "right" }}
            >
              {movie.imdb_id}
            </p>
          </div>
        </div>

        {/* Screenshots */}
        {movie.images && movie.images.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "1.6rem",
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              تصاویر فیلم
            </h2>
            <div className="screenshot-main">
              <img
                src={movie.images[activeImage]}
                alt={`${movie.title} screenshot`}
              />
            </div>
            <div className="screenshot-thumbs">
              {movie.images.map((img, i) => (
                <button
                  key={img}
                  className={`screenshot-thumb ${activeImage === i ? "active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`thumb-${i}`} />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
