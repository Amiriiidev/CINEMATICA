"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import Footer from "../components/Footer";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { accessToken, clearTokens } = useAuthStore();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
      return;
    }

    fetch("/api/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError("خطا در دریافت اطلاعات کاربر.");
        setLoading(false);
      });
  }, [accessToken, router]);

  const handleLogout = () => {
    clearTokens();
    router.push("/");
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "6rem 0",
          color: "var(--text-muted)",
        }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>👤</div>
        <p>در حال بارگذاری اطلاعات...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={{ textAlign: "center", padding: "6rem 0", color: "#ff6b6b" }}>
        <p>{error || "اطلاعات کاربر یافت نشد."}</p>
        <button
          className="filter-btn"
          style={{ marginTop: "1rem" }}
          onClick={() => router.push("/")}
        >
          بازگشت
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            className="back-btn"
            onClick={() => router.push("/")}
            style={{ margin: 0 }}
          >
            ← بازگشت
          </button>
          <span
            className="font-display"
            style={{
              fontSize: "1.5rem",
              color: "var(--text-primary)",
              direction: "ltr",
            }}
          >
            CINEMATICA
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            خروج
          </button>
        </div>
      </div>

      <main
        style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem 1.5rem" }}
      >
        {/* Avatar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, var(--gold-dim), var(--gold))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.2rem",
              marginBottom: "1rem",
              boxShadow: "0 0 0 4px rgba(255,215,0,0.15)",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h1
            className="font-display"
            style={{ fontSize: "2rem", color: "var(--text-primary)" }}
          >
            {user.name}
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              marginTop: "4px",
            }}
          >
            #{user.id}
          </p>
        </div>

        {/* Info cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="profile-card">
            <span className="profile-card-label">نام</span>
            <span className="profile-card-value">{user.name}</span>
          </div>

          <div className="profile-card">
            <span className="profile-card-label">ایمیل</span>
            <span className="profile-card-value" style={{ direction: "ltr" }}>
              {user.email}
            </span>
          </div>

          <div className="profile-card">
            <span className="profile-card-label">شناسه کاربری</span>
            <span className="profile-card-value">{user.id}</span>
          </div>

          <div className="profile-card">
            <span className="profile-card-label">تاریخ عضویت</span>
            <span className="profile-card-value" style={{ direction: "ltr" }}>
              {user.created_at}
            </span>
          </div>

          <div className="profile-card">
            <span className="profile-card-label">آخرین بروزرسانی</span>
            <span className="profile-card-value" style={{ direction: "ltr" }}>
              {user.updated_at}
            </span>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
          style={{ width: "100%", marginTop: "2rem", padding: "12px" }}
        >
          خروج از حساب کاربری
        </button>
      </main>

      <Footer />
    </>
  );
}
