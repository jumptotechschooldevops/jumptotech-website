"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "ru";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, ru: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("jtt_lang") as Lang | null;
    if (stored === "ru" || stored === "en") setLang(stored);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "en" ? "ru" : "en";
      localStorage.setItem("jtt_lang", next);
      return next;
    });
  };

  const t = (en: string, ru: string) => (lang === "ru" ? ru : en);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
