"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { config } from "@/lib/config";

export default function ContactPage() {
  const { t } = useLanguage();

  const items = [
    { label: t.contact.email, href: `mailto:${config.email}`, text: config.email },
    { label: t.contact.github, href: config.githubUrl, text: config.githubUrl },
    { label: t.contact.linkedin, href: config.linkedinUrl, text: config.linkedinUrl },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.contact.title}</h1>
      <p className="mt-2 max-w-2xl text-soft">{t.contact.intro}</p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="block h-full rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10"
            >
              <p className="text-sm font-semibold text-soft">{item.label}</p>
              <p className="mt-1 break-all font-medium text-accent">{item.text}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
