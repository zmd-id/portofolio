"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { Project } from "@/data/projects";

// Pilihan gradasi untuk gambar kartu yang belum punya screenshot.
// Dipilih otomatis dari slug, jadi tiap proyek selalu punya warna yang sama.
const gradients = [
  "from-indigo-500 to-violet-500",
  "from-sky-500 to-indigo-500",
  "from-fuchsia-500 to-rose-500",
  "from-emerald-500 to-sky-500",
  "from-amber-500 to-rose-500",
];

function pickGradient(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return gradients[hash % gradients.length];
}

function initials(title: string) {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useLanguage();
  const href = `/projects/${project.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10">
      <Link href={href} aria-label={project.title[lang]}>
        <div
          className={`relative flex h-36 items-center justify-center overflow-hidden bg-linear-to-br ${pickGradient(project.slug)}`}
        >
          {project.image ? (
            <img src={project.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="select-none text-6xl font-black tracking-tight text-white/30">
              {initials(project.title.en)}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold leading-snug">{project.title[lang]}</h2>
          {project.status === "soon" && (
            <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
              {t.projects.comingSoon}
            </span>
          )}
        </div>

        <p className="mt-2 flex-1 text-sm text-soft">{project.summary[lang]}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((item) => (
            <li key={item} className="rounded-full bg-surface2 px-2.5 py-0.5 text-xs text-soft">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-4 text-sm font-semibold">
          <Link href={href} className="text-accent hover:underline">
            {t.projects.tryDemo}
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft hover:text-ink hover:underline"
            >
              {t.projects.github}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
