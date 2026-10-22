import { NextResponse } from "next/server";
import type { ChatRequest, ChatResponse } from "@/types";

// Ini backend chatbot. Sekarang jawabannya masih PALSU (teks tetap).
// Nanti, ganti isi fungsi `generateReply` dengan panggilan ke LLM sungguhan.
// API key disimpan di file .env.local dan hanya dibaca di sini (server),
// jadi tidak pernah terlihat di browser.

async function generateReply({ message, lang }: ChatRequest): Promise<string> {
  // --- GANTI BAGIAN INI NANTI ---
  // Contoh arah pengembangan:
  //   1. Ambil CV + deskripsi proyek sebagai konteks.
  //   2. Kirim `message` + konteks ke API LLM (pakai process.env.LLM_API_KEY).
  //   3. Kembalikan teks jawabannya.
  const canned = {
    en: `This is a placeholder answer. You asked: "${message}". Soon this assistant will answer from my CV and projects.`,
    ja: `これは仮の回答です。ご質問：「${message}」。まもなく、履歴書とプロジェクトをもとに回答できるようになります。`,
  };
  return canned[lang];
  // --- SAMPAI SINI ---
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

  const reply = await generateReply({ message, history: body.history ?? [], lang });
  const response: ChatResponse = { reply };
  return NextResponse.json(response);
}
