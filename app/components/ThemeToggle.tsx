"use client";
import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

export default function ThemeToggle() {
  const { isDark, toggle } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      title={isDark ? "تم روشن" : "تم تاریک"}
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
