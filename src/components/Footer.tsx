"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-line py-6 text-center text-xs text-soft">{t.footer}</footer>
  );
}
