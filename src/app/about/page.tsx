"use client";

import Avatar from "@/components/Avatar";
import Chatbot from "@/components/Chatbot";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.about.title}</h1>
          <div className="mt-5 max-w-2xl space-y-4 text-soft">
            {t.about.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Avatar size="md" />
        </div>
      </section>

      <div className="mt-12">
        <Chatbot />
      </div>
    </div>
  );
}
