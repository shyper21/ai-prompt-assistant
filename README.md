# PromptForge AI — Futuristic MVP

Website generator PRD dan prompt teknis untuk membantu pengguna mengubah ide aplikasi menjadi brief yang siap dipakai di ChatGPT, Claude, Gemini, Codex, atau developer.

## Perubahan versi ini

- UI tidak lagi meniru screenshot awal secara langsung.
- Tampilan dibuat lebih futuristik dengan glassmorphism, neon glow, gradient, dan grid background.
- Output prompt dibuat lebih lengkap:
  - Ringkasan produk
  - Masalah utama
  - Target pengguna
  - Fitur MVP
  - User flow
  - Struktur halaman
  - Tech stack
  - Database awal
  - API/server actions
  - Acceptance criteria
  - Prompt khusus untuk Codex / AI coding agent

## Cara menjalankan lokal

```bash
npm install
npm run dev
```

Buka:

```text
http://localhost:3000
```

## Build production

```bash
npm run build
```

## Deploy ke Vercel

1. Upload semua file ke GitHub.
2. Import repository ke Vercel.
3. Framework akan terdeteksi sebagai Next.js.
4. Klik Deploy.

## Catatan

Versi ini masih local generator, jadi belum membutuhkan OpenAI API, Firebase, atau Supabase.
