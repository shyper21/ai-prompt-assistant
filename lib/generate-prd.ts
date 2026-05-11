function titleCase(text: string) {
  const cleaned = text
    .replace(/[\n\r]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const short = cleaned.length > 58 ? `${cleaned.slice(0, 58)}...` : cleaned;

  return short
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generatePRD(idea: string) {
  const name = titleCase(idea);

  return `# PRD Singkat — ${name}

## 1. Ringkasan
Buat aplikasi berdasarkan ide berikut:

"${idea}"

Aplikasi ini ditujukan untuk membantu pengguna menyelesaikan kebutuhan utama dengan cara yang sederhana, cepat, dan mudah digunakan.

## 2. Target Pengguna
- Pengguna non-teknis
- Pemilik bisnis kecil atau UMKM
- Freelancer atau creator
- Tim kecil yang butuh solusi praktis

## 3. Masalah yang Diselesaikan
- Proses manual masih memakan waktu
- Data atau aktivitas belum terorganisir
- Pengguna membutuhkan ringkasan yang mudah dipahami
- Pengguna ingin alat sederhana yang bisa dipakai tanpa setup rumit

## 4. Fitur Utama MVP
1. Input data utama dari pengguna
2. Dashboard ringkasan
3. Daftar riwayat aktivitas
4. Filter atau pencarian data
5. Export sederhana ke teks atau CSV
6. Tampilan responsive untuk desktop dan mobile

## 5. Rekomendasi Tech Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Next.js API Routes
- Database: Supabase atau Firebase
- Authentication: Google Login
- Deployment: Vercel

## 6. Langkah MVP
1. Buat landing page dan form input utama
2. Simpan data ke database
3. Tampilkan data dalam dashboard
4. Tambahkan fitur edit dan hapus data
5. Tambahkan export data
6. Deploy ke Vercel

## 7. Prompt untuk AI Coding Agent
Buat aplikasi web berdasarkan PRD ini. Gunakan Next.js App Router, TypeScript, Tailwind CSS, dan struktur folder yang rapi. Pastikan aplikasi responsive, mudah dipahami, dan siap deploy ke Vercel.`;
}
