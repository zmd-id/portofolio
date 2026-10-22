"use client";

import { useLanguage } from "@/components/LanguageProvider";

// "Slot" tempat demo AI dipasang.
// - Kalau demoUrl kosong  -> tampil placeholder.
// - Kalau demoUrl terisi  -> demo di-embed lewat iframe (cocok untuk Hugging Face Spaces).
// Demo yang jalan langsung di browser (TensorFlow.js / MediaPipe) nanti
// bisa menggantikan iframe ini dengan komponen React sendiri.
export default function DemoSlot({ demoUrl }: { demoUrl?: string }) {
  const { t } = useLanguage();

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold tracking-tight">{t.projects.demoTitle}</h2>
      {demoUrl ? (
        <iframe
          src={demoUrl}
          title="Live demo"
          className="mt-4 h-[520px] w-full rounded-2xl border border-line bg-surface"
          allow="camera; microphone"
        />
      ) : (
        <div className="mt-4 flex h-64 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-surface text-sm text-soft">
          <svg
            className="h-8 w-8 opacity-60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M8 21h8M12 18v3" />
          </svg>
          {t.projects.demoPlaceholder}
        </div>
      )}
    </section>
  );
}
