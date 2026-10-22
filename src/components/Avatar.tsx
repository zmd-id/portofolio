"use client";

import { config } from "@/lib/config";
import { useLanguage } from "@/components/LanguageProvider";

const sizes = {
  md: "h-32 w-32",
  lg: "h-44 w-44 sm:h-56 sm:w-56",
};

// Foto profil bulat dengan cincin warna. Sumber gambar diatur di src/lib/config.ts.
export default function Avatar({ size = "lg" }: { size?: keyof typeof sizes }) {
  const { t } = useLanguage();

  return (
    <div className="rounded-full bg-linear-to-br from-accent to-fuchsia-500 p-1 shadow-xl shadow-accent/20">
      <div className="rounded-full bg-page p-1">
        {/* <img> biasa dipakai supaya foto dari mana pun (jpg, png, svg) langsung bisa tampil. */}
        <img
          src={config.photoUrl}
          alt={t.home.photoAlt}
          className={`${sizes[size]} rounded-full object-cover`}
        />
      </div>
    </div>
  );
}
