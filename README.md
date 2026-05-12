# PromptForge AI - Agent Brief Generator

PromptForge AI membantu pengguna mengubah ide aplikasi menjadi product brief dan prompt teknis yang siap diberikan ke AI coding agent seperti Codex, Claude Code, ChatGPT, atau Gemini.

## Fokus Versi Ini

- UI futuristik original dengan dark background, glassmorphism, grid, dan aksen neon cyan/violet/lime.
- Generator berjalan lokal tanpa API eksternal.
- Tidak membutuhkan Firebase, OpenAI API, Supabase, atau secret key.
- Output bukan PRD pendek, tetapi build brief lengkap untuk implementasi MVP.

## Output Generator

Generator menghasilkan:

- Ringkasan produk
- Masalah utama
- Target pengguna
- Fitur MVP
- User flow
- Struktur halaman
- Tech stack rekomendasi
- Database schema awal
- API/server actions
- Acceptance criteria
- Prompt khusus untuk AI coding agent

## Cara Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka:

```text
http://localhost:3000
```

## Build Production

```bash
npm run build
```

## Deploy ke Vercel

1. Upload project ke GitHub.
2. Import repository ke Vercel.
3. Pastikan framework terdeteksi sebagai Next.js.
4. Jalankan deploy tanpa environment variable tambahan.

## Catatan

Versi ini sengaja memakai generator lokal agar aman untuk MVP awal dan tetap mudah dikembangkan ke database atau AI API di fase berikutnya.
