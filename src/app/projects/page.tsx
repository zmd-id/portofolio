"use client";

import ProjectCard from "@/components/ProjectCard";
import { useLanguage } from "@/components/LanguageProvider";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.projects.title}</h1>
      <p className="mt-2 max-w-2xl text-soft">{t.projects.intro}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
