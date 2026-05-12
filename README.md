# PromptForge AI - PRD Wizard Generator

PromptForge AI membantu user non-teknis membuat PRD lengkap yang bisa langsung diberikan ke AI coding agent seperti Codex, Claude Code, ChatGPT, Claude, atau Gemini.

## Fitur Utama

- Wizard 4 step: input ide, preferensi teknologi, pertanyaan tambahan, output PRD.
- Mode teknologi: biarkan AI pilih atau pilih stack sendiri.
- 5 pertanyaan tambahan dengan input bebas, chip cepat, tombol lewati, dan progress.
- Output Markdown panjang dengan struktur PRD profesional.
- Copy semua PRD dan download sebagai file `.md`.
- Generate ulang dan kembali mengedit input.
- Tidak memakai API eksternal, Firebase, OpenAI API, atau secret key.

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

## Cara Test Fitur

1. Buka aplikasi.
2. Isi Step 1 dengan contoh:

```text
Buatkan website financial tracker harian untuk mencatat pemasukan dan pengeluaran. User bisa tambah transaksi, pilih kategori, lihat grafik pengeluaran bulanan, cek saldo, dan export laporan.
```

3. Pilih "Biarkan AI pilih" atau isi stack manual.
4. Jawab atau lewati 5 pertanyaan tambahan.
5. Klik "Generate PRD".
6. Pastikan output berisi dokumen panjang mulai dari `# PRD - Project Requirements Document`.
7. Coba tombol Copy, Download `.md`, Edit input, dan Generate ulang.

## Build Production

```bash
npm run build
```

## Deploy ke Vercel

1. Upload project ke GitHub.
2. Import repository ke Vercel.
3. Framework akan terdeteksi sebagai Next.js.
4. Deploy tanpa environment variable tambahan untuk versi MVP ini.

## Catatan

Generator berjalan lokal di browser. Integrasi database, auth, atau AI API bisa ditambahkan pada fase berikutnya tanpa mengubah alur utama wizard.
