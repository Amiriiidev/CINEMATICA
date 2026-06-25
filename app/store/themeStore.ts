import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: true,
      toggle: () => {
        const next = !get().isDark;
        document.documentElement.classList.toggle("light", !next);
        set({ isDark: next });
      },
    }),
    { name: "cinematica-theme" },
  ),
);
