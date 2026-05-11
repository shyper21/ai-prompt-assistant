type FeatureGuess = {
  label: string;
  items: string[];
};

const stackByKeyword: FeatureGuess[] = [
  {
    label: "whatsapp",
    items: [
      "Integrasi WhatsApp Business API atau webhook pihak ketiga",
      "Queue pesan untuk memproses input pengguna",
      "Validasi format pesan agar data konsisten",
    ],
  },
  {
    label: "dashboard",
    items: [
      "Dashboard ringkasan metrik utama",
      "Filter berdasarkan tanggal, status, atau kategori",
      "Kartu statistik dan grafik tren sederhana",
    ],
  },
  {
    label: "invoice",
    items: [
      "Manajemen klien dan item invoice",
      "Generate PDF invoice",
      "Status pembayaran: draft, sent, paid, overdue",
    ],
  },
  {
    label: "booking",
    items: [
      "Kalender jadwal layanan",
      "Form booking dengan status pending/confirmed",
      "Notifikasi konfirmasi untuk pelanggan",
    ],
  },
  {
    label: "pembayaran",
    items: [
      "Integrasi payment gateway",
      "Webhook status transaksi",
      "Riwayat pembayaran dan bukti transaksi",
    ],
  },
  {
    label: "belajar",
    items: [
      "Modul materi belajar",
      "Kuis interaktif",
      "Progress tracking dan leaderboard",
    ],
  },
];

function cleanText(text: string) {
  return text.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ").trim();
}

function makeTitle(text: string) {
  const cleaned = cleanText(text);
  const base = cleaned.length > 72 ? `${cleaned.slice(0, 72)}...` : cleaned;

  return base
    .split(" ")
    .slice(0, 10)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function guessFeatures(idea: string) {
  const lower = idea.toLowerCase();
  const found = stackByKeyword
    .filter((entry) => lower.includes(entry.label))
    .flatMap((entry) => entry.items);

  const defaultFeatures = [
    "Onboarding singkat agar pengguna memahami cara memakai aplikasi",
    "Form input data utama sesuai kebutuhan ide",
    "Manajemen data: tambah, edit, hapus, dan pencarian",
    "Dashboard ringkasan untuk melihat kondisi terbaru",
    "Export data ke CSV atau PDF",
    "Pengaturan dasar akun dan preferensi pengguna",
  ];

  return Array.from(new Set([...found, ...defaultFeatures])).slice(0, 9);
}

function guessUsers(idea: string) {
  const lower = idea.toLowerCase();

  if (lower.includes("umkm") || lower.includes("warung") || lower.includes("toko")) {
    return ["Pemilik UMKM", "Admin toko", "Staf operasional", "Pelanggan lokal"];
  }

  if (lower.includes("freelancer") || lower.includes("invoice")) {
    return ["Freelancer", "Konsultan independen", "Small agency", "Klien yang menerima invoice"];
  }

  if (lower.includes("belajar") || lower.includes("siswa") || lower.includes("sekolah")) {
    return ["Siswa", "Guru", "Orang tua", "Admin lembaga belajar"];
  }

  return ["Pengguna non-teknis", "Pemilik bisnis kecil", "Admin operasional", "Tim kecil"];
}

export function generatePRD(idea: string) {
  const cleanIdea = cleanText(idea);
  const title = makeTitle(cleanIdea);
  const features = guessFeatures(cleanIdea);
  const users = guessUsers(cleanIdea);

  return `# PRD — ${title}

## 1. Ringkasan Produk
Buat aplikasi web berdasarkan ide berikut:

> ${cleanIdea}

Tujuan aplikasi adalah mengubah proses manual menjadi sistem digital yang lebih rapi, mudah dipakai, dan bisa dikembangkan bertahap.

## 2. Masalah Utama
- Pengguna masih melakukan proses secara manual atau tersebar di banyak tempat.
- Data penting sulit dicari, diringkas, atau dipantau.
- Pengguna membutuhkan alat yang sederhana, cepat dipahami, dan tidak terlalu teknis.
- Tim membutuhkan satu tempat untuk melihat status, riwayat, dan progres.

## 3. Target Pengguna
${users.map((user) => `- ${user}`).join("\n")}

## 4. Tujuan MVP
- Membuat versi awal yang bisa dipakai untuk validasi ide.
- Fokus pada fitur inti, bukan fitur kompleks.
- Bisa berjalan di desktop dan mobile.
- Siap deploy ke Vercel.
- Struktur kode mudah dikembangkan lagi.

## 5. Fitur Utama
${features.map((feature, index) => `${index + 1}. ${feature}`).join("\n")}

## 6. User Flow
1. Pengguna membuka landing page.
2. Pengguna login atau masuk sebagai demo user.
3. Pengguna menambahkan data utama.
4. Sistem menyimpan data dan menampilkan riwayat.
5. Pengguna melihat ringkasan di dashboard.
6. Pengguna memfilter, mencari, mengedit, atau export data.
7. Pengguna mendapatkan insight atau laporan sederhana.

## 7. Struktur Halaman
- Landing Page
- Dashboard
- Form Input Data
- List / Riwayat Data
- Detail Data
- Settings
- Login Page

## 8. Rekomendasi Tech Stack
- Frontend: Next.js App Router + TypeScript
- Styling: Tailwind CSS
- Component: reusable custom components
- Database: Supabase atau Firebase
- Auth: Google Login
- File/PDF: browser print atau library PDF ringan
- Deployment: Vercel

## 9. Database Awal
Contoh collection/table:

### users
- id
- name
- email
- created_at

### records
- id
- user_id
- title
- category
- amount_or_value
- status
- notes
- created_at
- updated_at

### settings
- id
- user_id
- preferences
- created_at

Sesuaikan nama field dengan domain aplikasi.

## 10. API / Server Actions
- createRecord(data)
- getRecords(userId)
- updateRecord(id, data)
- deleteRecord(id)
- getDashboardSummary(userId)
- exportRecords(userId, format)

## 11. Acceptance Criteria
- Pengguna bisa menambahkan data baru.
- Pengguna bisa melihat daftar data.
- Pengguna bisa mencari dan memfilter data.
- Dashboard menampilkan minimal 3 metrik penting.
- Aplikasi responsive di mobile.
- Build production berhasil tanpa error.
- Tidak ada API key yang terekspos di frontend.

## 12. Prompt untuk Codex / AI Coding Agent
Bangun aplikasi web berdasarkan PRD ini.

Requirement:
- Gunakan Next.js App Router, TypeScript, dan Tailwind CSS.
- Buat UI modern, clean, responsive, dan mudah dipakai pengguna non-teknis.
- Buat struktur folder rapi: app, components, lib, types.
- Mulai dari MVP tanpa fitur berlebihan.
- Tambahkan data dummy jika database belum dikonfigurasi.
- Pastikan npm run build berhasil.
- Siapkan README berisi cara menjalankan dan deploy ke Vercel.

Ide aplikasi:
"${cleanIdea}"

Output yang diharapkan:
- Kode lengkap
- Halaman utama
- Dashboard
- Form input
- List data
- Komponen reusable
- Dokumentasi setup
- Instruksi deploy ke Vercel`;
}
