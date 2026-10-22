import { NextResponse } from "next/server";
import { profileText, systemRules } from "@/data/profile";
import type { ChatMessage, ChatRequest, ChatResponse } from "@/types";

// Backend chatbot: memanggil Gemini (Google AI Studio, ada free tier).
// API key dibaca dari environment variable GEMINI_API_KEY (server saja, tidak terlihat di browser).
//   Lokal : taruh di file .env.local  ->  GEMINI_API_KEY=xxxx
//   Vercel: Project Settings -> Environment Variables
// Model bisa diganti tanpa ubah kode lewat GEMINI_MODEL (default di bawah).

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const MAX_HISTORY = 10; // hanya kirim 10 pesan terakhir supaya hemat kuota

// --- Pembatas sederhana per IP (disimpan di memori) ---
// Di Vercel (serverless) ini bersifat "usaha terbaik", bukan jaminan mutlak,
// tapi cukup untuk menahan spam ringan. Batas kuota harian Google juga tetap berlaku.
const WINDOW_MS = 10 * 60 * 1000; // 10 menit
const MAX_REQUESTS = 15; // per IP per jendela waktu
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // cegah memori membengkak
  return recent.length > MAX_REQUESTS;
}

const messages = {
  en: {
    noKey: "The AI assistant isn't configured yet. Please contact the owner via the Contact page.",
    busy: "The assistant is busy right now. Please try again in a moment.",
    limit: "You're sending messages too quickly. Please wait a few minutes.",
  },
  ja: {
    noKey: "AIアシスタントはまだ設定されていません。連絡先ページからご連絡ください。",
    busy: "現在アシスタントが混み合っています。しばらくしてからもう一度お試しください。",
    limit: "メッセージの送信が速すぎます。数分お待ちください。",
  },
};

async function generateReply({ message, history, lang }: ChatRequest): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return messages[lang].noKey;

  const languageName = lang === "ja" ? "Japanese" : "English";
  const systemInstruction = `${systemRules}\n\nReply language: ${languageName}.\n\n# PROFILE\n${profileText}`;

  const past = history
    .filter((m): m is ChatMessage => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content.slice(0, 1000) }],
    }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [...past, { role: "user", parts: [{ text: message }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 400 },
      }),
    },
  );

  if (!res.ok) {
    console.error("Gemini error", res.status, await res.text());
    return messages[lang].busy;
  }

  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text ?? "")
    .join("")
    .trim();
  return text || messages[lang].busy;
}

export async function POST(request: Request) {
  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validasi sederhana: pesan harus teks dan tidak kosong / kepanjangan.
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 500) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }
  const lang = body.lang === "ja" ? "ja" : "en";
  const history = Array.isArray(body.history) ? body.history : [];

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    const limited: ChatResponse = { reply: messages[lang].limit };
    return NextResponse.json(limited); // status 200 agar pesannya tampil di chat
  }

  try {
    const reply = await generateReply({ message, history, lang });
    const response: ChatResponse = { reply };
    return NextResponse.json(response);
  } catch (err) {
    console.error("Chat error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
