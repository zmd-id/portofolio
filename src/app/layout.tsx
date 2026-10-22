import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Judul dan deskripsi yang muncul di tab browser dan hasil pencarian.
export const metadata: Metadata = {
  title: "Adam Lormaz | Software Engineer",
  description: "Portfolio of a software engineer: computer vision, AI and web development.",
};

// Script kecil yang jalan SEBELUM halaman tampil, supaya mode gelap langsung terpasang
// dan layar tidak berkedip putih dulu. Default-nya gelap, kecuali pengunjung pernah memilih terang.
const themeScript = `
try {
  var saved = localStorage.getItem("theme");
  if (saved !== "light") document.documentElement.classList.add("dark");
} catch (e) {
  document.documentElement.classList.add("dark");
}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: class "dark" ditambahkan oleh script di atas, bukan oleh React.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <LanguageProvider>
          <Header />
          <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-12">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
