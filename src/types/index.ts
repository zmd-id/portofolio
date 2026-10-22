// "Kontrak" antara website dan AI.
// Selama AI (palsu maupun asli) mengembalikan bentuk data ini, tampilan tidak perlu diubah.

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatRequest = {
  message: string;
  history: ChatMessage[];
  lang: "en" | "ja";
};

export type ChatResponse = {
  reply: string;
};

// Contoh bentuk hasil deteksi objek (dipakai nanti saat demo CV dipasang).
export type DetectionResult = {
  label: string;
  confidence: number; // 0 - 1
  box: { x: number; y: number; width: number; height: number };
};
