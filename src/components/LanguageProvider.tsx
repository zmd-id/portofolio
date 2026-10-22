"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionary, type Dictionary, type Lang } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Saat halaman dibuka, ambil pilihan bahasa yang tersimpan (kalau ada).
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "ja") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem("lang", next);
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionary[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook kecil: di komponen mana pun cukup tulis `const { t, lang } = useLanguage();`
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage harus dipakai di dalam <LanguageProvider>");
  return ctx;
}
