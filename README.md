# Portfolio (Next.js + TypeScript + Tailwind)

Website portofolio dwibahasa (EN / JP) dengan chatbot "tanya tentang saya" dan galeri proyek AI.
Saat ini bagian AI masih berupa **slot dengan data palsu**; UI-nya sudah lengkap dan bisa dijalankan.

## Menjalankan di komputer

Butuh Node.js (versi 20 atau lebih baru) dan VS Code.

```bash
npm install     # sekali saja, mengunduh dependensi
npm run dev     # menjalankan website, buka http://localhost:3000
```

## Peta folder

```
src/
  app/                 Halaman website (satu folder = satu alamat URL)
    page.tsx             Beranda            ->  /
    about/page.tsx       Tentang saya       ->  /about
    projects/page.tsx    Daftar proyek      ->  /projects
    projects/[slug]/     Detail proyek      ->  /projects/nama-proyek
    contact/page.tsx     Kontak             ->  /contact
    api/chat/route.ts    Backend chatbot    ->  /api/chat
    layout.tsx           Kerangka yang membungkus semua halaman
  components/          Potongan UI yang dipakai ulang (Header, Chatbot, ProjectCard, DemoSlot, Avatar, ThemeToggle, ...)
  data/projects.ts     Daftar proyek (edit di sini untuk menambah / mengubah proyek)
  lib/i18n.ts          Semua teks dalam bahasa Inggris dan Jepang
  lib/config.ts        Alamat API dan link kontak
  types/index.ts       Bentuk data antara website dan AI
```

## Yang perlu kamu ganti dulu

1. `src/lib/i18n.ts`: nama (`name`) dan teks perkenalan di kedua bahasa.
2. `src/lib/config.ts`: email, GitHub, LinkedIn.
3. `src/data/projects.ts`: isi proyek sesuai milikmu.
4. `src/app/page.tsx`: daftar skill di beranda.
5. `src/app/layout.tsx`: judul tab browser.

## Foto profil, warna, dan mode gelap

- **Foto**: taruh fotomu di folder `public/` (misalnya `public/profile.jpg`), lalu ubah `photoUrl`
  di `src/lib/config.ts` menjadi `"/profile.jpg"`. Foto persegi paling bagus. Sekarang masih gambar contoh.
- **Screenshot proyek**: taruh gambar di `public/projects/`, lalu isi field `image` di `src/data/projects.ts`
  (misalnya `image: "/projects/cv.png"`). Kalau kosong, kartu memakai gradasi warna.
- **Mode terang / gelap**: tombol bulan/matahari di pojok kanan atas. Default-nya gelap, pilihan pengunjung
  tersimpan di browser.
- **Warna**: semua warna ada di bagian atas `src/app/globals.css` (blok `:root` untuk terang, `.dark` untuk gelap).
  Ingin nuansa lain? Ubah nilai `--accent` di kedua blok itu.

## Memasang AI nanti

- **Chatbot**: ganti isi fungsi `generateReply` di `src/app/api/chat/route.ts` dengan panggilan ke LLM.
  API key disimpan di `.env.local` (jangan di-commit).
- **Demo proyek**: setelah model di-deploy (misalnya Hugging Face Spaces), isi `demoUrl` di
  `src/data/projects.ts`. Slot demo otomatis menampilkannya.
