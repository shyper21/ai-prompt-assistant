# AI Prompt Assistant MVP

Website MVP dengan tampilan mirip referensi `ngodingpakeai`.

## Fitur

- Landing page dark mode
- Textarea untuk menulis ide aplikasi
- Generator PRD singkat lokal, tanpa API eksternal
- Tombol copy hasil
- Responsive desktop dan mobile
- Siap deploy ke Vercel

## Cara menjalankan lokal

Pastikan Node.js sudah terinstall.

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
npm run start
```

## Deploy ke Vercel

1. Upload project ini ke GitHub.
2. Buka Vercel.
3. Klik Add New Project.
4. Pilih repository GitHub.
5. Framework akan otomatis terbaca sebagai Next.js.
6. Klik Deploy.

## Struktur folder

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  GeneratedPRD.tsx
  HeroInput.tsx
  Navbar.tsx
lib/
  generate-prd.ts
```
