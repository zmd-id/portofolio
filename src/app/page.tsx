"use client";

import Link from "next/link";
import Avatar from "@/components/Avatar";
import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/components/LanguageProvider";
import { projects } from "@/data/projects";

// Daftar skill yang tampil di beranda. Edit sesuai kemampuanmu.
const skills = [
  "Python",
  "PyTorch / TensorFlow",
  "Computer Vision",
  "TypeScript",
  "React / Next.js",
  "Tailwind CSS",
  "Git",
];

export default function HomePage() {
  const { t } = useLanguage();
  const featured = projects.slice(0, 3);

  return (
    <div>
      {/* Hero: teks di kiri, foto di kanan (di HP: foto di atas). */}
      <section className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div className="order-2 md:order-1">
          <p className="text-soft">{t.home.greeting}</p>
          <h1 className="mt-1 bg-linear-to-r from-accent to-fuchsia-500 bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            {t.home.name}
          </h1>
          <p className="mt-3 text-xl font-medium">{t.home.role}</p>
          <p className="mt-5 max-w-xl text-lg text-soft">{t.home.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-onaccent shadow-lg shadow-accent/20 transition-opacity hover:opacity-90"
            >
              {t.home.ctaProjects}
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface2"
            >
              {t.home.ctaAbout}
            </Link>
          </div>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <Avatar size="lg" />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-soft">
          {t.home.skillsTitle}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-line bg-surface px-3.5 py-1 text-sm"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">{t.home.featuredTitle}</h2>
          <Link href="/projects" className="text-sm font-semibold text-accent hover:underline">
            {t.home.viewAll}
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
