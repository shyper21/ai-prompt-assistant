# PromptForge AI - PRD Wizard Generator

PromptForge AI membantu user non-teknis membuat PRD lengkap yang bisa langsung diberikan ke AI coding agent seperti Codex, Claude Code, ChatGPT, Claude, atau Gemini.

## Fitur Utama

- Wizard 4 step: input ide, preferensi teknologi, pertanyaan tambahan, output PRD.
- Mode teknologi: biarkan AI pilih atau pilih stack sendiri.
- 5 pertanyaan tambahan dinamis sesuai domain dengan input bebas, chip cepat, validasi wajib jawab, dan progress.
- Mode API: Lokal tanpa API, Hemat API, dan Lengkap.
- Cache localStorage untuk hasil analyze dan generate agar kuota API tidak terpakai ulang untuk input yang sama.
- Domain detection lokal untuk finance tracker, inventory/stok gudang, booking system, learning app, CRM/sales, task management, content management, e-commerce, SaaS dashboard, dan generic web app.
- Output Markdown panjang dengan struktur PRD profesional.
- Copy semua PRD dan download sebagai file `.md`.
- Generate ulang dan kembali mengedit input.
- Integrasi OpenRouter lewat Next.js API Route agar API key tidak terekspos di frontend.
- Fallback local generator otomatis jika OpenRouter belum dikonfigurasi atau request AI gagal.
- Memory awal memakai localStorage untuk menyimpan ide, jawaban, PRD, tanggal, dan feedback.

## Struktur Output PRD

Output generator berisi:

- Nama Proyek
- Overview
- Requirements
- Core Features
- User Flow
- Architecture dengan Mermaid sequence diagram
- Database Schema dengan Mermaid ERD
- Design & Technical Constraints
- API Specification / Server Actions
- Acceptance Criteria
- Prompt untuk AI Coding Agent

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

Buat file `.env.local` dari `.env.example`:

```bash
OPENROUTER_API_KEY=
OPENROUTER_ANALYZE_MODEL=google/gemini-2.0-flash-lite-001
OPENROUTER_GENERATE_MODEL=google/gemini-2.0-flash-001
```

Catatan security:

- Jangan pernah menaruh `OPENROUTER_API_KEY` di client component.
- Semua request AI lewat:
  - `app/api/analyze-idea/route.ts`
  - `app/api/generate-prd/route.ts`
- Jika `OPENROUTER_API_KEY` kosong, aplikasi otomatis memakai generator lokal.
- Mode `Lokal tanpa API` tidak memanggil OpenRouter sama sekali.
- Mode `Hemat API` memakai OpenRouter maksimal 1x untuk analyze dan 1x untuk generate dengan batas token lebih rendah.
- Mode `Lengkap` memakai OpenRouter maksimal 1x untuk analyze dan 1x untuk generate dengan batas token lebih besar.
- Jika user memakai Generate ulang di mode API, aplikasi menampilkan warning bahwa kuota API akan dipakai lagi.

## Cara Test Fitur

1. Buka aplikasi.
2. Isi Step 1 dengan contoh:

```text
Buatkan website financial tracker harian untuk mencatat pemasukan dan pengeluaran. User bisa tambah transaksi, pilih kategori, lihat grafik pengeluaran bulanan, cek saldo, dan export laporan.
```

3. Pilih "Biarkan AI pilih" atau isi stack manual.
4. Saat masuk Step 3, aplikasi memanggil `/api/analyze-idea` untuk membuat pertanyaan klarifikasi.
5. Jawab semua 5 pertanyaan tambahan.
6. Klik "Generate PRD" untuk memanggil `/api/generate-prd`.
7. Pastikan output berisi dokumen panjang mulai dari `# PRD - Project Requirements Document`.
8. Coba tombol Copy, Download `.md`, Edit masukan, dan Generate ulang.

## Build Production

```bash
npm run build
```

## Deploy ke Vercel

1. Upload project ke GitHub.
2. Import repository ke Vercel.
3. Framework akan terdeteksi sebagai Next.js.
4. Tambahkan `OPENROUTER_API_KEY`, `OPENROUTER_ANALYZE_MODEL`, dan `OPENROUTER_GENERATE_MODEL` di Vercel Environment Variables jika ingin mode AI.
5. Deploy. Jika env belum diisi, fallback lokal tetap berjalan.

## Catatan

OpenRouter dipanggil hanya dari server route. API key tidak pernah dipakai di client component. Helper memory di `lib/prd-memory.ts` masih memakai localStorage dan bisa diganti ke database pada fase berikutnya.
