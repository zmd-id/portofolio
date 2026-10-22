import type { Lang } from "@/lib/i18n";

type Localized = Record<Lang, string>;

export type Project = {
  slug: string;
  title: Localized;
  summary: Localized;
  problem: Localized;
  tech: string[];
  githubUrl?: string;
  // Screenshot / GIF proyek (taruh di folder public/, misalnya "/projects/cv.png").
  // Kalau kosong, kartu menampilkan gradasi warna sebagai pengganti.
  image?: string;
  // Alamat demo. Kosongkan (undefined) kalau demo belum siap: slot akan menampilkan placeholder.
  // Setelah model dipasang di Hugging Face Spaces, isi dengan URL Space-nya.
  demoUrl?: string;
  status: "live" | "soon";
};

// Tiga proyek awal. Ganti isinya dengan proyekmu yang sebenarnya.
export const projects: Project[] = [
  {
    slug: "computer-vision-final-project",
    title: {
      en: "Computer Vision Final Project",
      ja: "コンピュータビジョン卒業研究",
    },
    summary: {
      en: "My final-year computer vision system, turned into a demo you can try in the browser.",
      ja: "卒業研究のコンピュータビジョンシステムを、ブラウザで試せるデモにしました。",
    },
    problem: {
      en: "Describe the problem your final project solves, the dataset, the model, and the results here.",
      ja: "卒業研究が解決する課題、データセット、モデル、結果をここに書きます。",
    },
    tech: ["Python", "PyTorch", "Hugging Face Spaces"],
    status: "soon",
  },
  {
    slug: "ask-me-chatbot",
    title: {
      en: "Ask-Me AI Assistant",
      ja: "私について答えるAIアシスタント",
    },
    summary: {
      en: "A chatbot that answers questions about my experience, based on my CV and projects.",
      ja: "履歴書とプロジェクトをもとに、私の経験について答えるチャットボットです。",
    },
    problem: {
      en: "Recruiters have little time. This assistant lets them ask directly instead of reading everything.",
      ja: "採用担当者は時間が限られています。すべてを読まなくても直接質問できるようにしました。",
    },
    tech: ["Next.js", "TypeScript", "LLM API"],
    status: "soon",
  },
  {
    slug: "fullstack-tracker",
    title: {
      en: "Full-stack Tracker App",
      ja: "フルスタック管理アプリ",
    },
    summary: {
      en: "A small app with login, database and API to show the backend side of my skills.",
      ja: "ログイン、データベース、APIを備えた小さなアプリで、バックエンドのスキルを示します。",
    },
    problem: {
      en: "Show that I can build and deploy a complete application, not only frontend screens.",
      ja: "フロントエンドだけでなく、完全なアプリを作って公開できることを示します。",
    },
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    status: "soon",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
