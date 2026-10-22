import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/data/projects";

// Memberi tahu Next.js halaman apa saja yang ada, supaya dibuat saat build.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Di Next.js 15, `params` adalah Promise, jadi harus di-await.
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}
