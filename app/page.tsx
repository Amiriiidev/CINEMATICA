"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";

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

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeGenreName, setActiveGenreName] = useState("همه");
  const [state, setState] = useState<{
    movies: Movie[];
    loading: boolean;
    error: string;
    totalPages: number;
  }>({
    movies: [],
    loading: true,
    error: "",
    totalPages: 1,
  });

  const currentPage = Number(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("q") || "";
  const genreId = searchParams.get("genre");

  const updateURL = useCallback(
    (q: string, page: number, genre: number | null) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (genre !== null) params.set("genre", String(genre));
      params.set("page", String(page));
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    let url: string;

    if (genreId) {
      // فیلتر بر اساس ژانر
      const params = new URLSearchParams();
      params.set("page", String(currentPage));
      url = `https://moviesapi.ir/api/v1/genres/${genreId}/movies?${params.toString()}`;
    } else {
      // حالت معمولی / سرچ
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      params.set("page", String(currentPage));
      url = `https://moviesapi.ir/api/v1/movies?${params.toString()}`;
    }

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setState({
          movies: data?.data ?? [],
          loading: false,
          error: "",
          totalPages: Number(data?.metadata?.page_count ?? 1),
        });
      })
      .catch(() => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "خطا در دریافت اطلاعات.",
        }));
      });

    return () => {
      setState((prev) => ({ ...prev, loading: true, error: "" }));
    };
  }, [currentPage, searchQuery, genreId]);

  const { movies, loading, error, totalPages } = state;

  const handleSearch = useCallback(
    (q: string) => {
      // سرچ، ژانر رو ریست می‌کنه
      setActiveGenreName("همه");
      updateURL(q, 1, null);
    },
    [updateURL],
  );

  const handleGenreChange = useCallback(
    (id: number | null, name: string) => {
      setActiveGenreName(name);
      // تغییر ژانر، سرچ رو ریست می‌کنه
      updateURL("", 1, id);
    },
    [updateURL],
  );

  const handlePageChange = (page: number) => {
    updateURL(searchQuery, page, genreId ? Number(genreId) : null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header
        activeGenreId={genreId ? Number(genreId) : null}
        activeGenreName={activeGenreName}
        onGenreChange={handleGenreChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
      />

      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
        }}
      >
        <div style={{ marginBottom: "2.5rem" }}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
              direction: "ltr",
              textAlign: "right",
            }}
          >
            THE GREATEST
            <br />
            <span style={{ color: "var(--gold)" }}>FILMS EVER MADE</span>
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              maxWidth: "480px",
              lineHeight: 1.8,
            }}
          >
            برترین فیلم‌های تاریخ سینما — بر اساس امتیاز IMDb، فیلتر شده بر اساس
            ژانر.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "2.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {[
            { label: "فیلم", value: "۲۵۰+" },
            { label: "ژانر", value: "۱۲" },
            { label: "بالاترین امتیاز", value: "9.3" },
            { label: "کشور", value: "۲۰+" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-display"
                style={{
                  fontSize: "1.8rem",
                  color: "var(--gold)",
                  lineHeight: 1,
                  direction: "ltr",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.75rem",
                  marginTop: "2px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 0",
              color: "var(--text-muted)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎞</div>
            <p>در حال بارگذاری فیلم‌ها...</p>
          </div>
        )}

        {error && (
          <div
            style={{ textAlign: "center", padding: "5rem 0", color: "#ff6b6b" }}
          >
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                نمایش{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                  {movies.length}
                </span>{" "}
                فیلم
                {searchQuery && (
                  <span>
                    {" "}
                    برای «
                    <span style={{ color: "var(--gold)" }}>{searchQuery}</span>»
                  </span>
                )}
                {genreId && (
                  <span>
                    {" "}
                    در ژانر «
                    <span style={{ color: "var(--gold)" }}>
                      {activeGenreName}
                    </span>
                    »
                  </span>
                )}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                صفحه {currentPage} از {totalPages}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {movies.map((movie, i) => (
                <div
                  key={movie.id}
                  className="scroll-fade"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <MovieCard
                    movie={movie}
                    rank={(currentPage - 1) * 10 + i + 1}
                  />
                </div>
              ))}
            </div>

            {movies.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 0",
                  color: "var(--text-muted)",
                }}
              >
                فیلمی یافت نشد.
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            textAlign: "center",
            padding: "5rem 0",
            color: "var(--text-muted)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎞</div>
          <p>در حال بارگذاری...</p>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
