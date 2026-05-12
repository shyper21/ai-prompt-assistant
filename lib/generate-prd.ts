type KeywordInsight = {
  label: string;
  features: string[];
  pages: string[];
  schema: string[];
  api: string[];
};

const keywordInsights: KeywordInsight[] = [
  {
    label: "whatsapp",
    features: [
      "Input data dari format pesan yang konsisten",
      "Inbox untuk meninjau data yang masuk sebelum disimpan",
      "Template balasan dan status pemrosesan pesan",
    ],
    pages: ["Inbox WhatsApp", "Review Data Masuk"],
    schema: ["message_sources", "message_events"],
    api: ["parseIncomingMessage(payload)", "approveParsedMessage(id)"],
  },
  {
    label: "invoice",
    features: [
      "Manajemen klien, item invoice, pajak, dan diskon",
      "Pembuatan invoice dengan status draft, sent, paid, overdue",
      "Ringkasan pemasukan bulanan dan invoice jatuh tempo",
    ],
    pages: ["Clients", "Invoices", "Invoice Detail"],
    schema: ["clients", "invoices", "invoice_items", "payments"],
    api: ["createInvoice(data)", "markInvoicePaid(invoiceId)"],
  },
  {
    label: "booking",
    features: [
      "Kalender slot layanan yang bisa dipilih pengguna",
      "Form booking dengan status pending, confirmed, completed, cancelled",
      "Panel admin untuk mengelola jadwal dan kapasitas layanan",
    ],
    pages: ["Booking Calendar", "Service Management", "Booking Detail"],
    schema: ["services", "booking_slots", "bookings"],
    api: ["createBooking(data)", "updateBookingStatus(id, status)"],
  },
  {
    label: "pembayaran",
    features: [
      "Pencatatan pembayaran manual untuk MVP awal",
      "Riwayat transaksi dan bukti pembayaran",
      "Status pembayaran yang terlihat jelas di dashboard",
    ],
    pages: ["Payments", "Payment Detail"],
    schema: ["payments", "payment_proofs"],
    api: ["recordPayment(data)", "getPaymentSummary(userId)"],
  },
  {
    label: "belajar",
    features: [
      "Modul materi dengan urutan belajar yang jelas",
      "Kuis singkat untuk mengecek pemahaman",
      "Progress tracking per siswa dan rekap performa",
    ],
    pages: ["Learning Modules", "Quiz", "Progress"],
    schema: ["courses", "lessons", "quizzes", "student_progress"],
    api: ["submitQuizAnswer(data)", "getStudentProgress(userId)"],
  },
  {
    label: "dashboard",
    features: [
      "Dashboard metrik utama dengan filter periode",
      "Grafik tren sederhana untuk membaca perubahan",
      "Tabel aktivitas terbaru dengan pencarian dan filter",
    ],
    pages: ["Dashboard", "Reports"],
    schema: ["activity_logs", "saved_filters"],
    api: ["getDashboardSummary(userId)", "getReportData(filters)"],
  },
];

function cleanText(text: string) {
  return text.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ").trim();
}

function makeTitle(text: string) {
  const cleaned = cleanText(text);
  const words = cleaned.split(" ").slice(0, 9);
  const title = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return title.length > 86 ? `${title.slice(0, 83)}...` : title;
}

function unique(items: string[]) {
  return Array.from(new Set(items));
}

function getInsights(idea: string) {
  const lower = idea.toLowerCase();
  return keywordInsights.filter((entry) => lower.includes(entry.label));
}

function guessProductType(idea: string) {
  const lower = idea.toLowerCase();

  if (lower.includes("invoice")) return "operasional keuangan dan invoice";
  if (lower.includes("booking")) return "booking dan manajemen layanan";
  if (lower.includes("belajar") || lower.includes("siswa")) return "edtech dan progress belajar";
  if (lower.includes("umkm") || lower.includes("toko") || lower.includes("warung")) {
    return "operasional UMKM";
  }
  if (lower.includes("dashboard")) return "dashboard monitoring";

  return "aplikasi produktivitas berbasis web";
}

function guessUsers(idea: string) {
  const lower = idea.toLowerCase();

  if (lower.includes("umkm") || lower.includes("warung") || lower.includes("toko")) {
    return ["Pemilik UMKM", "Admin operasional", "Staf toko", "Pelanggan yang berinteraksi dengan bisnis"];
  }

  if (lower.includes("freelancer") || lower.includes("invoice")) {
    return ["Freelancer", "Konsultan independen", "Pemilik agensi kecil", "Klien penerima invoice"];
  }

  if (lower.includes("belajar") || lower.includes("siswa") || lower.includes("sekolah")) {
    return ["Siswa", "Guru atau mentor", "Orang tua", "Admin lembaga belajar"];
  }

  if (lower.includes("booking")) {
    return ["Pelanggan yang membuat booking", "Admin layanan", "Pemilik bisnis jasa", "Staf operasional"];
  }

  return ["Pengguna non-teknis", "Pemilik bisnis kecil", "Admin operasional", "Tim internal kecil"];
}

function guessProblem(idea: string) {
  const productType = guessProductType(idea);

  return [
    `Proses ${productType} masih berpotensi tersebar di chat, spreadsheet, catatan manual, atau tools yang tidak saling terhubung.`,
    "Pengguna kesulitan melihat status terbaru, riwayat perubahan, dan prioritas tindakan dalam satu tempat.",
    "Tim membutuhkan alur kerja yang sederhana agar data masuk, diproses, dan ditinjau tanpa banyak langkah teknis.",
    "Pemilik produk membutuhkan MVP yang cukup jelas untuk divalidasi, tetapi tetap mudah dikembangkan setelah feedback pertama.",
  ];
}

function guessFeatures(idea: string) {
  const insights = getInsights(idea);
  const contextual = insights.flatMap((entry) => entry.features);
  const defaultFeatures = [
    "Onboarding singkat dengan contoh data agar pengguna cepat memahami alur aplikasi",
    "Dashboard ringkasan berisi metrik utama, aktivitas terbaru, dan status yang perlu ditindaklanjuti",
    "CRUD data inti: tambah, lihat, ubah, hapus, pencarian, filter, dan validasi form",
    "Detail page untuk melihat informasi lengkap, riwayat, catatan, dan aksi lanjutan",
    "Pengaturan dasar untuk profil, preferensi tampilan, dan konfigurasi data dummy",
    "Empty state, loading state, error state, dan feedback sukses untuk setiap aksi utama",
    "Responsive layout untuk mobile, tablet, dan desktop",
  ];

  return unique([...contextual, ...defaultFeatures]).slice(0, 12);
}

function guessPages(idea: string) {
  const insights = getInsights(idea);
  const contextual = insights.flatMap((entry) => entry.pages);
  const defaultPages = [
    "Landing / Home",
    "Dashboard",
    "Data List",
    "Create / Edit Form",
    "Detail Page",
    "Settings",
  ];

  return unique([...defaultPages, ...contextual]);
}

function guessSchema(idea: string) {
  const insights = getInsights(idea);
  const contextual = insights.flatMap((entry) => entry.schema);
  const defaultTables = ["users", "records", "record_notes", "activity_logs", "settings"];

  return unique([...defaultTables, ...contextual]);
}

function guessApi(idea: string) {
  const insights = getInsights(idea);
  const contextual = insights.flatMap((entry) => entry.api);
  const defaultActions = [
    "createRecord(input)",
    "getRecords(filters)",
    "getRecordById(id)",
    "updateRecord(id, input)",
    "deleteRecord(id)",
    "getDashboardSummary(filters)",
    "createActivityLog(event)",
  ];

  return unique([...defaultActions, ...contextual]);
}

function renderList(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function renderNumbered(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function renderSchema(tables: string[]) {
  const tableMap: Record<string, string[]> = {
    users: ["id", "name", "email", "role", "created_at", "updated_at"],
    records: ["id", "user_id", "title", "category", "status", "priority", "value", "notes", "created_at", "updated_at"],
    record_notes: ["id", "record_id", "user_id", "body", "created_at"],
    activity_logs: ["id", "user_id", "entity_type", "entity_id", "action", "metadata_json", "created_at"],
    settings: ["id", "user_id", "theme", "locale", "preferences_json", "created_at", "updated_at"],
    clients: ["id", "user_id", "name", "email", "phone", "company", "created_at"],
    invoices: ["id", "user_id", "client_id", "invoice_number", "status", "issue_date", "due_date", "subtotal", "tax", "total", "created_at"],
    invoice_items: ["id", "invoice_id", "description", "quantity", "unit_price", "line_total"],
    payments: ["id", "user_id", "record_id", "invoice_id", "amount", "method", "status", "paid_at", "created_at"],
    payment_proofs: ["id", "payment_id", "file_name", "file_url", "uploaded_at"],
    services: ["id", "user_id", "name", "duration_minutes", "price", "is_active"],
    booking_slots: ["id", "service_id", "starts_at", "ends_at", "capacity", "remaining_capacity"],
    bookings: ["id", "user_id", "service_id", "slot_id", "customer_name", "customer_contact", "status", "notes", "created_at"],
    message_sources: ["id", "user_id", "source_name", "source_type", "is_active", "created_at"],
    message_events: ["id", "source_id", "raw_message", "parsed_json", "status", "received_at"],
    courses: ["id", "title", "description", "level", "created_at"],
    lessons: ["id", "course_id", "title", "content", "sort_order"],
    quizzes: ["id", "lesson_id", "question", "options_json", "correct_answer"],
    student_progress: ["id", "user_id", "course_id", "lesson_id", "score", "completed_at"],
    saved_filters: ["id", "user_id", "name", "filters_json", "created_at"],
  };

  return tables
    .map((table) => {
      const fields = tableMap[table] ?? ["id", "name", "description", "created_at", "updated_at"];
      return `### ${table}\n${fields.map((field) => `- ${field}`).join("\n")}`;
    })
    .join("\n\n");
}

export function generatePRD(idea: string) {
  const cleanIdea = cleanText(idea);
  const title = makeTitle(cleanIdea);
  const users = guessUsers(cleanIdea);
  const problems = guessProblem(cleanIdea);
  const features = guessFeatures(cleanIdea);
  const pages = guessPages(cleanIdea);
  const schema = guessSchema(cleanIdea);
  const api = guessApi(cleanIdea);

  return `# Product Build Brief - ${title}

## 1. Ringkasan Produk
Bangun aplikasi web MVP berdasarkan ide berikut:

> ${cleanIdea}

Produk ini harus membantu pengguna menyelesaikan pekerjaan inti dengan alur yang jelas, cepat dipahami, dan siap divalidasi. Fokus utama bukan membuat semua fitur besar sekaligus, tetapi membuat fondasi produk yang rapi: data inti, dashboard, form, list, detail, dan prompt implementasi yang bisa langsung dipakai oleh AI coding agent.

## 2. Masalah Utama
${renderList(problems)}

## 3. Target Pengguna
${renderList(users)}

## 4. Fitur MVP
${renderNumbered(features)}

## 5. User Flow
1. Pengguna membuka aplikasi dan melihat value proposition singkat.
2. Pengguna masuk ke dashboard demo tanpa integrasi auth eksternal pada MVP awal.
3. Pengguna membuat data utama melalui form dengan validasi input.
4. Sistem menyimpan data ke state lokal atau data dummy terlebih dahulu.
5. Pengguna melihat data dalam list dengan pencarian, filter status, dan sorting sederhana.
6. Pengguna membuka detail item untuk melihat informasi lengkap dan aksi lanjutan.
7. Pengguna mengubah status, memperbarui data, atau menghapus item.
8. Dashboard memperbarui metrik ringkasan berdasarkan data terbaru.
9. Pengguna mengecek settings untuk preferensi dasar dan informasi versi MVP.

## 6. Struktur Halaman
${renderList(pages)}

Detail layout yang disarankan:
- Gunakan App Router Next.js.
- Buat navigasi utama yang jelas untuk Dashboard, Data, Create, dan Settings.
- Gunakan responsive sidebar pada desktop dan bottom/navigation drawer pada mobile.
- Sediakan empty state dan sample data agar aplikasi tetap terlihat hidup saat belum ada database.

## 7. Tech Stack Rekomendasi
- Framework: Next.js App Router + TypeScript.
- Styling: Tailwind CSS dengan komponen custom.
- State MVP: React state, URL search params, dan data dummy lokal.
- Validasi form: validasi manual sederhana atau Zod jika ingin ditambahkan nanti.
- Database fase berikutnya: Supabase Postgres atau Firebase Firestore, tetapi jangan wajib untuk MVP awal.
- Auth fase berikutnya: Supabase Auth, NextAuth, atau Firebase Auth, tetapi gunakan demo mode dulu.
- Deployment: Vercel.
- Constraint penting: jangan gunakan API eksternal, Firebase, OpenAI API, atau secret key pada versi awal.

## 8. Database Schema Awal
Gunakan schema ini sebagai arah desain data. Pada MVP tanpa database, representasikan struktur ini sebagai TypeScript types dan array data dummy.

${renderSchema(schema)}

## 9. API / Server Actions
Buat fungsi lokal atau server actions dengan kontrak berikut. Untuk MVP awal, implementasikan dengan data dummy dulu agar build Vercel tetap sederhana.

${api.map((action) => `- ${action}`).join("\n")}

Kontrak response yang disarankan:
- Semua mutation mengembalikan { success: boolean, data?: T, error?: string }.
- Semua query mendukung filter status, keyword, page, dan limit jika relevan.
- Pisahkan logic data di folder lib agar mudah diganti ke database sungguhan nanti.

## 10. Acceptance Criteria
- Aplikasi berhasil dijalankan secara lokal dan production build berhasil.
- Tidak ada dependency API eksternal dan tidak membutuhkan API key.
- UI responsive pada lebar mobile 360px, tablet, dan desktop.
- Dashboard menampilkan minimal 3 metrik utama yang berasal dari data dummy atau state lokal.
- Pengguna bisa membuat, melihat, mengubah, menghapus, mencari, dan memfilter data inti.
- Form memiliki validasi field wajib dan pesan error yang mudah dipahami.
- List memiliki empty state, loading/saving state, dan feedback sukses setelah aksi.
- Detail page menampilkan data lengkap dan aksi status utama.
- Komponen UI dipisah secara masuk akal agar mudah dikembangkan.
- Tidak ada secret, token, atau konfigurasi private yang terekspos di frontend.

## 11. Prompt Khusus untuk AI Coding Agent
Gunakan instruksi berikut untuk Codex, Claude Code, ChatGPT, Gemini, atau AI coding agent lain:

\`\`\`text
Kamu adalah senior full-stack engineer. Bangun MVP aplikasi web berdasarkan brief ini:

IDE PRODUK:
${cleanIdea}

TUJUAN:
Membuat aplikasi Next.js yang benar-benar usable, bukan landing page saja. Aplikasi harus punya dashboard, CRUD data inti, form validasi, list dengan filter/search, detail view, settings, dan data dummy lokal. Jangan gunakan API eksternal, Firebase, OpenAI API, atau payment gateway sungguhan dulu.

STACK:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Komponen custom yang reusable
- Data dummy lokal di lib atau state
- Deploy target Vercel

HALAMAN WAJIB:
${pages.map((page) => `- ${page}`).join("\n")}

FITUR WAJIB:
${features.map((feature) => `- ${feature}`).join("\n")}

DATA MODEL AWAL:
${schema.map((table) => `- ${table}`).join("\n")}

IMPLEMENTASI:
1. Audit struktur project terlebih dahulu.
2. Pertahankan pola existing code jika ada.
3. Buat UI modern, bersih, responsive, dan mudah dipakai.
4. Implementasikan data dummy dan helper CRUD lokal.
5. Pastikan semua halaman punya state visual: empty, loading/saving, error, success.
6. Jalankan npm run build dan perbaiki error build.
7. Ringkas file yang diubah dan keputusan teknis penting.

BATASAN:
- Jangan menambahkan API key.
- Jangan memerlukan service eksternal.
- Jangan membuat hanya mockup statis.
- Jangan menghapus konfigurasi Vercel/Next yang sudah berjalan.
\`\`\`
`;
}
