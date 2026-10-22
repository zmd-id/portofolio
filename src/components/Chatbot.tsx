"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { config } from "@/lib/config";
import type { ChatMessage, ChatRequest, ChatResponse } from "@/types";

export default function Chatbot() {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Setiap ada pesan baru, gulir otomatis ke bawah.
  useEffect(() => {
    if (messages.length > 0 || loading) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError(false);
    setLoading(true);

    try {
      const payload: ChatRequest = { message: text, history: messages, lang };
      const res = await fetch(config.chatApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as ChatResponse;
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold leading-tight">{t.about.chatTitle}</h2>
          <p className="text-sm text-soft">{t.about.chatHint}</p>
        </div>
      </div>

      <div className="mt-5 h-72 space-y-3 overflow-y-auto rounded-xl bg-page p-3">
        {messages.length === 0 && !loading && (
          <p className="flex h-full items-center justify-center px-6 text-center text-sm text-soft">
            {t.about.chatHint}
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm ${
                m.role === "user"
                  ? "bg-accent text-onaccent"
                  : "border border-line bg-surface2 text-ink"
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}
        {loading && <p className="text-sm text-soft">{t.about.chatThinking}</p>}
        {error && <p className="text-sm text-red-500">{t.about.chatError}</p>}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.about.chatPlaceholder}
          maxLength={500}
          className="min-w-0 flex-1 rounded-xl border border-line bg-page px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-soft focus:border-accent"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-onaccent transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {t.about.chatSend}
        </button>
      </form>
    </div>
  );
}
