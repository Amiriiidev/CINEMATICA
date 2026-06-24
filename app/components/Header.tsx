"use client";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import RegisterForm from "./RegisterForm";
interface Genre {
  id: number;
  name: string;
}

interface HeaderProps {
  activeGenreId: number | null;
  activeGenreName: string;
  onGenreChange: (id: number | null, name: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function Header({
  activeGenreId,
  activeGenreName,
  onGenreChange,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(true);

  useEffect(() => {
    fetch("https://moviesapi.ir/api/v1/genres")
      .then((r) => r.json())
      .then((data) => {
        setGenres(data);
        setLoadingGenres(false);
      })
      .catch(() => {
        setLoadingGenres(false);
      });
  }, []);
  const [registerOpen, setRegisterOpen] = useState(false);
  return (
    <header>
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 0",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "var(--gold)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#0A0A0F", fontSize: "1.1rem" }}>🎬</span>
            </div>
            <span
              className="font-display"
              style={{
                fontSize: "1.8rem",
                color: "var(--text-primary)",
                lineHeight: 1,
                direction: "ltr",
              }}
            >
              CINEMATICA
            </span>
          </div>

          {/* Search bar */}
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="جستجوی فیلم..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* <div
            style={{
              background: "rgba(255,215,0,0.1)",
              border: "1px solid rgba(255,215,0,0.3)",
              borderRadius: "999px",
              padding: "4px 14px",
              color: "var(--gold)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            IMDb RATED
          </div> */}
          {/* جای IMDb RATED badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                background: "rgba(255,215,0,0.1)",
                border: "1px solid rgba(255,215,0,0.3)",
                borderRadius: "999px",
                padding: "4px 14px",
                color: "var(--gold)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              IMDb RATED
            </div>

            <button
              className="register-btn"
              onClick={() => setRegisterOpen(true)}
            >
              ثبت نام
            </button>
          </div>

          <Modal
            isOpen={registerOpen}
            onClose={() => setRegisterOpen(false)}
            title="ثبت نام"
          >
            <RegisterForm onClose={() => setRegisterOpen(false)} />
          </Modal>
        </div>

        {/* Genre filter */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            paddingBottom: "0.9rem",
            flexWrap: "wrap",
          }}
        >
          <button
            className={`filter-btn ${activeGenreId === null ? "active" : ""}`}
            onClick={() => onGenreChange(null, "همه")}
          >
            همه
          </button>

          {loadingGenres && (
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                alignSelf: "center",
              }}
            >
              در حال بارگذاری ژانرها...
            </span>
          )}

          {!loadingGenres &&
            genres.map((genre) => (
              <button
                key={genre.id}
                className={`filter-btn ${activeGenreId === genre.id ? "active" : ""}`}
                onClick={() => onGenreChange(genre.id, genre.name)}
              >
                {genre.name}
              </button>
            ))}
        </div>
      </div>
    </header>
  );
}
