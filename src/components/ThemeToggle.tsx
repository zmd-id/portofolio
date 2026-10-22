"use client";

import { useLanguage } from "@/components/LanguageProvider";

// Tombol bulan / matahari untuk ganti mode terang dan gelap.
// Ikon dipilih lewat CSS (`dark:`), jadi tidak perlu state dan tidak ada kedipan saat halaman dibuka.
export default function ThemeToggle() {
  const { t } = useLanguage();

  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Abaikan jika penyimpanan browser diblokir.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.theme.toggle}
      title={t.theme.toggle}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-soft transition-colors hover:bg-surface2 hover:text-ink"
    >
      {/* Matahari: tampil di mode gelap (klik untuk ke terang) */}
      <svg
        className="hidden h-4 w-4 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* Bulan: tampil di mode terang (klik untuk ke gelap) */}
      <svg
        className="block h-4 w-4 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
