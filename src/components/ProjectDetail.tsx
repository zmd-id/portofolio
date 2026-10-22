"use client";

import Link from "next/link";
import DemoSlot from "@/components/DemoSlot";
import { useLanguage } from "@/components/LanguageProvider";
import { getProject } from "@/data/projects";

export default function ProjectDetail({ slug }: { slug: string }) {
  const { t, lang } = useLanguage();
  const project = getProject(slug);

  if (!project) {
    return <p className="text-soft">{t.projects.notFound}</p>;
  }

  return (
    <div className="max-w-3xl">
      <Link href="/projects" className="text-sm text-soft hover:text-ink">
        {t.projects.back}
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{project.title[lang]}</h1>
      <p className="mt-3 text-lg text-soft">{project.summary[lang]}</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-soft">
            {t.projects.problem}
          </h2>
          <p className="mt-2">{project.problem[lang]}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-soft">
            {t.projects.tech}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface px-3 py-1 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-xl border border-line bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:bg-surface2"
        >
          {t.projects.github} →
        </a>
      )}

      <DemoSlot demoUrl={project.demoUrl} />
    </div>
  );
}
