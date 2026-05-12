# PromptForge AI - AI Product Interviewer / PRD Generator

PromptForge AI membantu pemula dan non-coder mengubah ide website mentah menjadi PRD lengkap yang bisa langsung diberikan ke ChatGPT, Claude, Gemini, Codex, Claude Code, atau AI coding tools lain.

Produk ini bukan AI agent builder. Fokus utamanya adalah membantu user menjelaskan ide website dengan lebih jelas melalui wawancara singkat, lalu menghasilkan PRD lengkap yang siap dieksekusi.

## Arah Produk

```text
User punya imajinasi website
↓
Assistant bertanya hal yang belum jelas
↓
User menjawab
↓
Assistant membuat PRD lengkap
↓
User copy-paste PRD ke Claude / ChatGPT / Gemini / Codex
↓
AI tools membangun website berdasarkan PRD itu
```

## Fitur Utama

- Wizard 4 step: input ide, preferensi teknologi, pertanyaan wajib, output PRD.
- Assistant bertindak sebagai Product Manager / Product Interviewer.
- Semua pertanyaan wajib dijawab. Tidak ada tombol lewati.
- Tombol Generate PRD disabled jika masih ada jawaban kosong.
- Mode bahasa:
  - `id`: UI, pertanyaan, dan PRD bagian 1-9 dalam Bahasa Indonesia.
  - `en`: UI, pertanyaan, dan PRD dalam English.
- Mode API:
  - `local`: tanpa API.
  - `economy`: default, hemat API.
  - `full`: token lebih besar.
- Tidak memanggil API saat user mengetik.
- Analyze idea hanya dipanggil setelah user lanjut dari preferensi teknologi.
- Generate PRD hanya dipanggil setelah semua pertanyaan terjawab.
- Cache analyze dan generate di localStorage.
- `OPENROUTER_API_KEY` hanya dipakai server-side.
- Fallback generator lokal jika API gagal atau env belum tersedia.

## Struktur Output PRD

Output generator mengikuti struktur wajib:

1. Overview
2. Requirements
3. Core Features
4. User Flow
5. Architecture dengan Mermaid sequence diagram
6. Database Schema dengan Mermaid ERD dan tabel penjelasan
7. Design & Technical Constraints
8. API Specification / Server Actions
9. Acceptance Criteria
10. Prompt untuk AI Coding Tool

## Cara Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka:

```text
http://localhost:3000
```

## Environment Variables

Buat file `.env.local` jika ingin memakai OpenRouter:

```bash
OPENROUTER_API_KEY=
OPENROUTER_ANALYZE_MODEL=google/gemini-2.0-flash-lite-001
OPENROUTER_GENERATE_MODEL=google/gemini-2.0-flash-001
```

Catatan security:

- Jangan pernah menaruh `OPENROUTER_API_KEY` di client component.
- Semua request AI lewat `app/api/analyze-idea/route.ts` dan `app/api/generate-prd/route.ts`.
- Jika `OPENROUTER_API_KEY` kosong, aplikasi otomatis memakai generator lokal.

## Cara Test Fitur

1. Buka aplikasi.
2. Isi Step 1 dengan contoh:

```text
Saya mau bikin website pencatat stok gudang untuk toko kecil.
```

3. Pilih rekomendasi stack otomatis atau isi stack manual.
4. Saat masuk Step 3, aplikasi memanggil `/api/analyze-idea` satu kali.
5. Jawab semua pertanyaan klarifikasi.
6. Klik "Generate PRD" untuk memanggil `/api/generate-prd` satu kali.
7. Pastikan output berisi Architecture, Database Schema, API/Server Actions, Acceptance Criteria, dan Prompt untuk AI Coding Tool.

## Build Production

```bash
npm run build
```

## Deploy ke Vercel

1. Upload project ke GitHub.
2. Import repository ke Vercel.
3. Framework akan terdeteksi sebagai Next.js.
4. Tambahkan env OpenRouter jika ingin mode API.
5. Deploy. Jika env belum diisi, fallback lokal tetap berjalan.
