"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg bg-[var(--muted-bg)]" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--muted-bg)] hover:bg-[var(--border)] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={17} className="text-yellow-400" />
      ) : (
        <Moon size={17} className="text-[var(--primary)]" />
      )}
    </button>
  );
}
