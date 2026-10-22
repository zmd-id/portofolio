"use client";

import { useLanguage } from "@/components/LanguageProvider";

// Tombol kecil EN | JP di pojok kanan atas.
export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  const base = "px-2.5 py-1 text-xs font-semibold transition-colors";
  const active = "bg-accent text-onaccent";
  const inactive = "text-soft hover:bg-surface2 hover:text-ink";

  return (
    <div
      className="inline-flex overflow-hidden rounded-full border border-line"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`${base} ${lang === "en" ? active : inactive}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ja")}
        className={`${base} ${lang === "ja" ? active : inactive}`}
        aria-pressed={lang === "ja"}
      >
        JP
      </button>
    </div>
  );
}
