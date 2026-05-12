export type TechMode = "ai" | "manual";

export type SelectedTech = {
  frontend?: string;
  backend?: string;
  database?: string;
  deployment?: string;
};

export type PrdAnswer = {
  question: string;
  answer: string;
};

export type GeneratePRDInput = {
  idea: string;
  techMode: TechMode;
  selectedTech: SelectedTech;
  answers: PrdAnswer[];
};

type CoreFeature = {
  name: string;
  description: string;
  input: string;
  output: string;
  notes: string;
};

type DomainProfile = {
  key: string;
  projectName: string;
  primaryEntity: string;
  primaryEntityLabel: string;
  activityEntity: string;
  settingsEntity: string;
  targetUsers: string[];
  roles: string[];
  inputMethods: string[];
  storedData: string[];
  notifications: string;
  features: CoreFeature[];
  pages: string[];
};

const defaultQuestions = [
  "Ceritakan siapa yang butuh aplikasi ini dan sekarang mereka biasanya melakukan proses ini dengan cara apa?",
  "Hal apa yang wajib berhasil dilakukan user di kunjungan pertama?",
  "Fitur apa saja yang wajib ada di versi pertama?",
  "Apa hal utama yang membuat aplikasi ini lebih enak dipakai dibanding cara lama?",
  "Apa yang membuat user mau membuka aplikasi ini terus-menerus?",
];

function cleanText(text: string) {
  return text.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ").trim();
}

function titleCase(text: string) {
  return cleanText(text)
    .split(" ")
    .filter(Boolean)
    .slice(0, 6)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function includesAny(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

function getDomainProfile(idea: string): DomainProfile {
  const lower = idea.toLowerCase();

  if (includesAny(lower, ["financial", "finance", "keuangan", "pengeluaran", "pemasukan", "saldo", "transaksi"])) {
    return {
      key: "finance",
      projectName: "Daily Finance Tracker",
      primaryEntity: "transactions",
      primaryEntityLabel: "transaksi",
      activityEntity: "activity_logs",
      settingsEntity: "budget_settings",
      targetUsers: ["Individu yang ingin mengelola keuangan harian", "Freelancer", "Pemilik usaha kecil", "Keluarga yang memantau pengeluaran"],
      roles: ["Demo user", "Registered user", "Admin pribadi"],
      inputMethods: ["Input transaksi manual", "Kategori transaksi", "Filter periode", "Export laporan"],
      storedData: ["pemasukan", "pengeluaran", "kategori", "tanggal transaksi", "saldo", "catatan", "riwayat aktivitas"],
      notifications: "Alert visual untuk tagihan mendekati jatuh tempo, budget hampir habis, dan pengeluaran bulanan melewati batas.",
      pages: ["Landing / Onboarding", "Dashboard Keuangan", "Tambah Transaksi", "Daftar Transaksi", "Laporan Bulanan", "Kategori", "Settings"],
      features: [
        {
          name: "Dashboard Utama",
          description: "Menampilkan saldo, total pemasukan, total pengeluaran, tren bulanan, dan kategori pengeluaran terbesar.",
          input: "Data transaksi, filter bulan, filter kategori.",
          output: "Kartu metrik, grafik ringkas, daftar transaksi terbaru, dan insight pengeluaran.",
          notes: "Dashboard harus tetap informatif dengan data dummy ketika user baru pertama kali membuka aplikasi.",
        },
        {
          name: "Manajemen Transaksi",
          description: "User dapat menambahkan, mengedit, menghapus, dan melihat transaksi pemasukan atau pengeluaran.",
          input: "Tipe transaksi, nominal, kategori, tanggal, catatan opsional.",
          output: "Transaksi tersimpan dan saldo/dashboard otomatis diperbarui.",
          notes: "Nominal wajib valid, tanggal wajib ada, dan tipe transaksi harus jelas.",
        },
        {
          name: "Kategori Keuangan",
          description: "User dapat memilih atau mengelola kategori seperti makanan, transportasi, tagihan, gaji, dan lainnya.",
          input: "Nama kategori, tipe kategori, warna/label.",
          output: "Kategori muncul di form transaksi, filter, dan laporan.",
          notes: "Sediakan kategori default agar user tidak perlu setup dari nol.",
        },
        {
          name: "Laporan Bulanan",
          description: "Aplikasi merangkum pemasukan, pengeluaran, saldo akhir, dan perbandingan antar periode.",
          input: "Rentang tanggal, kategori, tipe transaksi.",
          output: "Ringkasan bulanan, grafik sederhana, tabel transaksi, dan insight.",
          notes: "Untuk MVP, grafik bisa dibuat dengan komponen sederhana tanpa library chart eksternal.",
        },
        {
          name: "Reminder dan Alert",
          description: "Menampilkan pengingat visual untuk tagihan atau budget yang perlu diperhatikan.",
          input: "Tanggal jatuh tempo, batas budget, status transaksi.",
          output: "Alert dashboard dan daftar item yang perlu tindakan.",
          notes: "Jangan gunakan email/push notification sungguhan pada MVP; gunakan alert lokal terlebih dahulu.",
        },
        {
          name: "Export Laporan",
          description: "User dapat mengekspor data transaksi dan laporan bulanan untuk arsip pribadi.",
          input: "Filter periode dan format export.",
          output: "File CSV atau tampilan print-friendly.",
          notes: "Implementasikan export CSV lokal agar tidak membutuhkan service eksternal.",
        },
      ],
    };
  }

  if (includesAny(lower, ["booking", "jadwal", "reservasi", "appointment"])) {
    return {
      key: "booking",
      projectName: "Service Booking Hub",
      primaryEntity: "bookings",
      primaryEntityLabel: "booking",
      activityEntity: "booking_history",
      settingsEntity: "service_settings",
      targetUsers: ["Pelanggan yang membuat booking", "Admin layanan", "Pemilik bisnis jasa", "Staf operasional"],
      roles: ["Customer", "Staff", "Admin"],
      inputMethods: ["Form booking", "Kalender slot", "Filter status", "Catatan admin"],
      storedData: ["layanan", "slot jadwal", "customer", "status booking", "catatan", "riwayat perubahan"],
      notifications: "Alert visual untuk booking baru, jadwal mendekat, dan perubahan status.",
      pages: ["Landing", "Dashboard Booking", "Kalender", "Buat Booking", "Daftar Booking", "Detail Booking", "Settings"],
      features: [
        {
          name: "Dashboard Booking",
          description: "Menampilkan jumlah booking hari ini, jadwal terdekat, status pending, dan kapasitas layanan.",
          input: "Data booking, filter tanggal, status layanan.",
          output: "Kartu metrik dan daftar jadwal yang perlu ditindaklanjuti.",
          notes: "Admin harus cepat melihat booking yang butuh konfirmasi.",
        },
        {
          name: "Form Booking",
          description: "User dapat memilih layanan, jadwal, dan mengisi data kontak.",
          input: "Nama customer, kontak, layanan, slot waktu, catatan.",
          output: "Booking baru dengan status pending atau confirmed.",
          notes: "Validasi slot agar jadwal tidak dobel pada MVP.",
        },
        {
          name: "Manajemen Layanan",
          description: "Admin dapat membuat layanan, durasi, harga, dan status aktif.",
          input: "Nama layanan, durasi, harga, kapasitas.",
          output: "Layanan tersedia di form booking.",
          notes: "Gunakan data dummy untuk layanan awal.",
        },
        {
          name: "Status dan Riwayat Booking",
          description: "Admin dapat mengubah status booking dan melihat histori perubahan.",
          input: "Status baru dan catatan perubahan.",
          output: "Status terbaru dan activity log.",
          notes: "Status minimal: pending, confirmed, completed, cancelled.",
        },
        {
          name: "Kalender Jadwal",
          description: "Menampilkan slot waktu dalam tampilan kalender atau list harian.",
          input: "Filter tanggal dan layanan.",
          output: "Daftar slot tersedia dan booking yang sudah masuk.",
          notes: "Untuk MVP, list per hari cukup jika kalender penuh terlalu kompleks.",
        },
      ],
    };
  }

  if (includesAny(lower, ["belajar", "edtech", "kursus", "quiz", "kuis", "siswa"])) {
    return {
      key: "learning",
      projectName: "Learning Progress Studio",
      primaryEntity: "lessons",
      primaryEntityLabel: "materi belajar",
      activityEntity: "student_progress",
      settingsEntity: "learning_settings",
      targetUsers: ["Siswa", "Guru atau mentor", "Orang tua", "Admin lembaga belajar"],
      roles: ["Student", "Teacher", "Admin"],
      inputMethods: ["Materi belajar", "Jawaban kuis", "Progress checklist", "Feedback mentor"],
      storedData: ["course", "lesson", "quiz", "score", "progress", "feedback"],
      notifications: "Alert visual untuk materi belum selesai, kuis tersedia, dan progress menurun.",
      pages: ["Landing", "Dashboard Belajar", "Modul", "Lesson Detail", "Quiz", "Progress", "Settings"],
      features: [
        {
          name: "Dashboard Belajar",
          description: "Menampilkan progress, materi aktif, skor terakhir, dan rekomendasi langkah berikutnya.",
          input: "Progress siswa, hasil kuis, status lesson.",
          output: "Ringkasan belajar dan prioritas materi.",
          notes: "Buat pengalaman sederhana agar siswa tidak bingung.",
        },
        {
          name: "Manajemen Modul",
          description: "Admin atau guru dapat mengelola modul, lesson, dan urutan belajar.",
          input: "Judul modul, isi materi, urutan, level.",
          output: "Materi belajar tersusun dan bisa dibuka siswa.",
          notes: "Untuk MVP, konten bisa berupa teks dan daftar tugas.",
        },
        {
          name: "Kuis Interaktif",
          description: "Siswa mengerjakan kuis singkat untuk mengukur pemahaman.",
          input: "Jawaban pilihan ganda atau isian pendek.",
          output: "Skor, feedback, dan status completion.",
          notes: "Validasi jawaban secara lokal dulu tanpa AI scoring.",
        },
        {
          name: "Progress Tracking",
          description: "Sistem mencatat lesson yang selesai dan skor per kuis.",
          input: "Status lesson dan hasil kuis.",
          output: "Grafik atau daftar progress per siswa.",
          notes: "Progress harus mudah dibaca oleh guru dan siswa.",
        },
        {
          name: "Feedback Mentor",
          description: "Guru dapat menambahkan catatan feedback pada progress siswa.",
          input: "Komentar mentor dan rekomendasi.",
          output: "Catatan feedback tersimpan pada profil progress.",
          notes: "Bisa dibuat sebagai notes sederhana pada MVP.",
        },
      ],
    };
  }

  return {
    key: "generic",
    projectName: `${titleCase(idea) || "Smart Workflow"} App`,
    primaryEntity: "records",
    primaryEntityLabel: "data utama",
    activityEntity: "activity_logs",
    settingsEntity: "settings",
    targetUsers: ["Pengguna non-teknis", "Admin operasional", "Pemilik bisnis kecil", "Tim internal"],
    roles: ["Demo user", "Admin", "Staff"],
    inputMethods: ["Input manual", "Form data", "Filter dan pencarian", "Export data"],
    storedData: ["record utama", "status", "kategori", "catatan", "riwayat aktivitas", "preferensi user"],
    notifications: "Alert visual di dashboard untuk status penting, data baru, atau item yang perlu ditindaklanjuti.",
    pages: ["Landing / Onboarding", "Dashboard", "Create Record", "Data List", "Record Detail", "Reports", "Settings"],
    features: [
      {
        name: "Dashboard Utama",
        description: "Menampilkan ringkasan metrik utama, aktivitas terbaru, dan item yang perlu ditindaklanjuti.",
        input: "Data utama, status, filter periode.",
        output: "Kartu metrik, list aktivitas, dan shortcut aksi.",
        notes: "Dashboard harus berguna walau memakai data dummy pada MVP.",
      },
      {
        name: "Manajemen Data",
        description: "User dapat membuat, melihat, mengedit, menghapus, mencari, dan memfilter data utama.",
        input: "Field utama sesuai domain, status, kategori, catatan.",
        output: "Data tersimpan dan dapat dikelola dari list dan detail page.",
        notes: "Validasi field wajib dan tampilkan pesan error yang jelas.",
      },
      {
        name: "Detail dan Riwayat",
        description: "User dapat membuka detail data untuk melihat informasi lengkap dan histori perubahan.",
        input: "ID data dan aksi user.",
        output: "Detail record, notes, status, dan activity log.",
        notes: "Activity log membantu user memahami apa yang berubah.",
      },
      {
        name: "Search dan Filter",
        description: "User dapat menemukan data berdasarkan keyword, status, kategori, dan periode.",
        input: "Keyword, status, kategori, tanggal.",
        output: "Daftar data yang sudah difilter.",
        notes: "Filter harus bekerja tanpa refresh halaman.",
      },
      {
        name: "Export Data",
        description: "User dapat mengekspor data untuk laporan atau backup.",
        input: "Filter aktif dan format export.",
        output: "CSV lokal atau tampilan print-friendly.",
        notes: "Gunakan export lokal tanpa service eksternal.",
      },
    ],
  };
}

function getAnsweredContext(answers: PrdAnswer[]) {
  const filled = answers.filter((item) => cleanText(item.answer));
  if (!filled.length) {
    return "- User belum menambahkan jawaban tambahan. Gunakan asumsi produk yang masuk akal dan validasi ulang saat discovery berikutnya.";
  }

  return filled
    .map((item, index) => `${index + 1}. ${item.question}\n   Jawaban: ${cleanText(item.answer)}`)
    .join("\n");
}

function getTechRecommendation(input: GeneratePRDInput, profile: DomainProfile) {
  if (input.techMode === "manual") {
    return {
      frontend: input.selectedTech.frontend || "Next.js",
      backend: input.selectedTech.backend || "Next.js API Routes",
      database: input.selectedTech.database || "Supabase",
      deployment: input.selectedTech.deployment || "Vercel",
      reason: "Stack mengikuti pilihan user. AI coding agent harus menghormati pilihan ini kecuali ada konflik teknis yang jelas.",
    };
  }

  const database = profile.key === "finance" ? "SQLite for MVP, Supabase Postgres for multi-user production" : "Supabase Postgres";
  return {
    frontend: "Next.js App Router",
    backend: "Server Actions or Next.js API Routes",
    database,
    deployment: "Vercel",
    reason: "AI memilih stack yang cepat untuk MVP, mudah dideploy, cocok untuk UI dashboard, dan bisa naik kelas ke database sungguhan tanpa rewrite besar.",
  };
}

function renderCoreFeatures(features: CoreFeature[]) {
  return features
    .slice(0, 8)
    .map(
      (feature, index) => `### 3.${index + 1} ${feature.name}
- **Deskripsi:** ${feature.description}
- **Input:** ${feature.input}
- **Output:** ${feature.output}
- **Catatan:** ${feature.notes}`,
    )
    .join("\n\n");
}

function renderAcceptanceCriteria(profile: DomainProfile) {
  return `- [ ] User bisa login atau masuk sebagai demo user.
- [ ] User bisa menambahkan ${profile.primaryEntityLabel}.
- [ ] User bisa melihat data utama di dashboard.
- [ ] User bisa mengedit ${profile.primaryEntityLabel}.
- [ ] User bisa menghapus ${profile.primaryEntityLabel}.
- [ ] User bisa mencari dan memfilter data.
- [ ] User bisa melihat riwayat aktivitas.
- [ ] User bisa melihat laporan atau ringkasan historis.
- [ ] UI responsive di mobile dan desktop.
- [ ] Validasi input berjalan pada semua form utama.
- [ ] Empty state, loading state, error state, dan success feedback tersedia.
- [ ] Build production berhasil.
- [ ] Tidak ada API key yang terekspos di frontend.`;
}

function renderApiSpec(profile: DomainProfile, backend: string) {
  const useServerActions = backend.toLowerCase().includes("server action") || backend.toLowerCase().includes("next.js");

  if (useServerActions) {
    return `Gunakan Server Actions atau fungsi lokal dengan kontrak berikut:

\`\`\`ts
create${pascalSingular(profile.primaryEntity)}(data)
update${pascalSingular(profile.primaryEntity)}(id, data)
delete${pascalSingular(profile.primaryEntity)}(id)
get${pascalPlural(profile.primaryEntity)}(userId, filters)
get${pascalSingular(profile.primaryEntity)}ById(id)
getDashboardSummary(userId, filters)
createActivityLog(data)
exportReport(userId, filters)
\`\`\`

Response pattern:

\`\`\`ts
type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
\`\`\``;
  }

  return `Gunakan API endpoints dengan kontrak berikut:

### POST /api/${profile.primaryEntity}
Request:

\`\`\`json
{
  "title": "string",
  "status": "string",
  "category": "string",
  "notes": "string"
}
\`\`\`

Response:

\`\`\`json
{
  "success": true,
  "data": {}
}
\`\`\`

### GET /api/${profile.primaryEntity}?userId=:userId&status=:status&keyword=:keyword
Mengembalikan daftar data utama dengan filter.

### PATCH /api/${profile.primaryEntity}/:id
Mengubah data utama.

### DELETE /api/${profile.primaryEntity}/:id
Menghapus data utama.

### GET /api/dashboard/summary?userId=:userId
Mengembalikan metrik dashboard.

### GET /api/export?userId=:userId
Mengembalikan data export atau CSV.`;
}

function pascalSingular(text: string) {
  const base = text.endsWith("s") ? text.slice(0, -1) : text;
  return base
    .split(/[_-\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function pascalPlural(text: string) {
  return text
    .split(/[_-\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function singularSnake(text: string) {
  return text.endsWith("s") ? text.slice(0, -1) : text;
}

function renderErd(profile: DomainProfile) {
  const entityFields =
    profile.key === "finance"
      ? `    ${profile.primaryEntity} {
        int id PK
        int user_id FK
        string type
        string category
        decimal amount
        string notes
        date transaction_date
        datetime created_at
        datetime updated_at
    }`
      : `    ${profile.primaryEntity} {
        int id PK
        int user_id FK
        string title
        string category
        string status
        string notes
        datetime created_at
        datetime updated_at
    }`;

  return `\`\`\`mermaid
erDiagram
    users {
        int id PK
        string email
        string name
        string role
        datetime created_at
        datetime updated_at
    }

${entityFields}

    ${profile.activityEntity} {
        int id PK
        int user_id FK
        int ${singularSnake(profile.primaryEntity)}_id FK
        string action
        string metadata_json
        datetime created_at
    }

    ${profile.settingsEntity} {
        int id PK
        int user_id FK
        string key
        string value_json
        datetime created_at
        datetime updated_at
    }

    users ||--o{ ${profile.primaryEntity} : "owns"
    users ||--o{ ${profile.activityEntity} : "creates"
    users ||--o{ ${profile.settingsEntity} : "configures"
    ${profile.primaryEntity} ||--o{ ${profile.activityEntity} : "has logs"
\`\`\`

| Tabel | Deskripsi |
| --- | --- |
| users | Menyimpan akun atau demo user, role, dan identitas dasar. |
| ${profile.primaryEntity} | Menyimpan ${profile.primaryEntityLabel} sebagai data inti aplikasi. |
| ${profile.activityEntity} | Menyimpan riwayat aksi penting seperti create, update, delete, export, dan perubahan status. |
| ${profile.settingsEntity} | Menyimpan preferensi user, konfigurasi dashboard, kategori default, atau batas notifikasi. |`;
}

function renderArchitecture() {
  return `Aplikasi menggunakan arsitektur web sederhana: browser menampilkan UI, frontend mengelola state dan form, backend/server actions melakukan validasi dan persistence, lalu database menyimpan data utama. Untuk MVP tanpa service eksternal, database dapat diganti sementara dengan data dummy lokal dan helper function yang mudah dimigrasikan.

\`\`\`mermaid
sequenceDiagram
    participant User as User Browser
    participant UI as Frontend
    participant API as Backend/API
    participant DB as Database

    User->>UI: Input data
    UI->>API: Send request
    API->>API: Validate input and authorize user
    API->>DB: Save or update data
    DB-->>API: Return saved result
    API-->>UI: Return success response
    UI-->>User: Show updated dashboard
\`\`\``;
}

function renderFinalAgentPrompt(
  input: GeneratePRDInput,
  profile: DomainProfile,
  tech: ReturnType<typeof getTechRecommendation>,
  projectName: string,
) {
  return `\`\`\`text
Build a complete production-ready web application based on this PRD.

PROJECT NAME:
${projectName}

PRODUCT IDEA:
${cleanText(input.idea)}

TECH STACK:
- Frontend: ${tech.frontend}
- Backend/API: ${tech.backend}
- Database: ${tech.database}
- Deployment: ${tech.deployment}
- Language: TypeScript where applicable
- Styling: Tailwind CSS or an equivalent utility-first CSS approach if the selected framework is not Next.js

PAGES:
${profile.pages.map((page) => `- ${page}`).join("\n")}

CORE FEATURES:
${profile.features
  .slice(0, 8)
  .map((feature) => `- ${feature.name}: ${feature.description}`)
  .join("\n")}

DATABASE SCHEMA:
- users
- ${profile.primaryEntity}
- ${profile.activityEntity}
- ${profile.settingsEntity}

API OR SERVER ACTIONS:
- create${pascalSingular(profile.primaryEntity)}(data)
- update${pascalSingular(profile.primaryEntity)}(id, data)
- delete${pascalSingular(profile.primaryEntity)}(id)
- get${pascalPlural(profile.primaryEntity)}(userId, filters)
- getDashboardSummary(userId, filters)
- createActivityLog(data)
- exportReport(userId, filters)

UI RULES:
- Build an actual usable app, not only a landing page.
- Create responsive desktop and mobile layouts.
- Include dashboard cards, data tables/lists, forms, detail views, empty states, loading states, error states, and success feedback.
- Keep UI clean, accessible, and easy for non-technical users.
- Use clear labels, readable typography, sufficient contrast, and keyboard-friendly controls.

SECURITY RULES:
- Validate all form inputs.
- Never expose API keys or secrets in frontend code.
- Protect user-owned data by userId or session identity when auth is added.
- Sanitize displayed user-generated text where relevant.
- Use environment variables only for future external services.

ENVIRONMENT VARIABLES:
- No environment variables are required for the MVP if using local dummy data.
- If a real database is added later, document variables in .env.example and README.

DEPLOYMENT TARGET:
- Deploy to ${tech.deployment}.
- npm run build must pass before finishing.
- Fix all TypeScript, lint, runtime, and build errors before final response.

README REQUIREMENT:
- Include setup instructions.
- Include how to run locally.
- Include how to build.
- Include deployment notes.
- Include any environment variable requirements.

IMPLEMENTATION INSTRUCTIONS:
1. Inspect the existing project structure before editing.
2. Preserve existing working configuration unless a change is necessary.
3. Implement the MVP pages and core flows end-to-end.
4. Use dummy/local data first if no database credentials are available.
5. Keep components reusable and files organized.
6. Run npm run build.
7. Summarize files changed and any tradeoffs.
\`\`\``;
}

export function generatePRD(input: GeneratePRDInput) {
  const idea = cleanText(input.idea);
  const profile = getDomainProfile(idea);
  const tech = getTechRecommendation(input, profile);
  const projectName = profile.projectName || titleCase(idea);
  const answeredContext = getAnsweredContext(input.answers);

  return `# PRD — Project Requirements Document

## Nama Proyek
${projectName}

## 1. Overview
${projectName} adalah aplikasi web untuk membantu target user menyelesaikan kebutuhan berikut:

> ${idea}

Masalah yang ingin diselesaikan adalah proses kerja yang masih manual, tersebar, sulit dipantau, atau belum memiliki dashboard yang rapi. Kondisi lama biasanya bergantung pada catatan manual, spreadsheet, chat, atau ingatan pengguna sehingga data mudah hilang, sulit dianalisis, dan tidak konsisten.

Tujuan utama aplikasi adalah membuat alur digital yang sederhana: user dapat memasukkan data utama, melihat ringkasan, mengelola riwayat, dan mengambil keputusan lebih cepat. Target pengguna utama adalah ${profile.targetUsers.slice(0, 3).join(", ")}. Solusi yang disarankan adalah web app responsive dengan dashboard, form input, list data, detail view, laporan, dan export sederhana.

Konteks tambahan dari jawaban user:
${answeredContext}

## 2. Requirements
- **Platform:** Web browser, responsive desktop dan mobile.
- **Pengguna:** ${profile.targetUsers.join(", ")}.
- **Role Pengguna:** ${profile.roles.join(", ")}.
- **Data Input:** ${profile.inputMethods.join(", ")}.
- **Data Utama:** ${profile.storedData.join(", ")}.
- **Notifikasi:** ${profile.notifications}
- **Batasan MVP:** Fokus pada data dummy/lokal atau persistence sederhana terlebih dahulu. Jangan gunakan API eksternal, Firebase, OpenAI API, payment gateway sungguhan, atau secret key sampai fase berikutnya.
- **Security:** Login atau demo mode, validasi input, proteksi data per user, hindari secret di frontend, dan tampilkan error tanpa membocorkan detail sistem.
- **Tech Preference Mode:** ${input.techMode === "ai" ? "Biarkan AI pilih" : "Pilih sendiri"}.
- **Recommended Stack:** Frontend ${tech.frontend}, Backend ${tech.backend}, Database ${tech.database}, Deployment ${tech.deployment}.
- **Alasan Stack:** ${tech.reason}

## 3. Core Features
${renderCoreFeatures(profile.features)}

## 4. User Flow
1. User membuka landing page atau halaman awal aplikasi.
2. User login, membuat akun, atau masuk sebagai demo user untuk MVP awal.
3. User melihat dashboard dengan ringkasan data, metrik utama, dan aktivitas terbaru.
4. User klik tombol tambah untuk membuat ${profile.primaryEntityLabel}.
5. User mengisi form, melihat validasi input, lalu menyimpan data.
6. Sistem menyimpan data dan menampilkan feedback sukses.
7. User melihat data baru muncul di dashboard dan daftar data.
8. User mencari, memfilter, dan membuka detail ${profile.primaryEntityLabel}.
9. User mengedit atau menghapus data jika diperlukan.
10. Sistem mencatat perubahan ke riwayat aktivitas.
11. User membuka laporan atau riwayat untuk melihat data historis.
12. User melakukan export jika relevan untuk arsip atau pelaporan.

## 5. Architecture
${renderArchitecture()}

## 6. Database Schema
${renderErd(profile)}

## 7. Design & Technical Constraints
- **Style UI:** Modern, clean, dashboard-first, dan mudah dipahami user non-teknis.
- **Typography:** Gunakan font sans-serif modern, ukuran teks nyaman, heading jelas, dan spacing konsisten.
- **Warna:** Gunakan palet netral dengan aksen warna untuk status, alert, dan aksi utama. Hindari UI yang terlalu ramai.
- **Responsive Design:** Layout harus nyaman di mobile 360px, tablet, dan desktop. Form dan tabel harus tetap bisa digunakan di layar kecil.
- **Accessibility:** Gunakan label pada form, kontras warna cukup, focus state terlihat, tombol punya teks yang jelas, dan navigasi bisa dipakai keyboard.
- **Performance:** Minimalkan dependency, gunakan komponen ringan, hindari request eksternal pada MVP, dan tampilkan loading state untuk aksi async.
- **Security:** Validasi input, pisahkan data per user, jangan expose API key, dan siapkan pola environment variable untuk fase database sungguhan.
- **Deployment Target:** ${tech.deployment}.
- **Framework Recommendation:** Next.js App Router, TypeScript, Tailwind CSS, dan ${tech.database} sesuai kebutuhan user.

## 8. API Specification / Server Actions
${renderApiSpec(profile, tech.backend)}

## 9. Acceptance Criteria
${renderAcceptanceCriteria(profile)}

## 10. Prompt untuk AI Coding Agent
${renderFinalAgentPrompt(input, profile, tech, projectName)}
`;
}

export { defaultQuestions };
