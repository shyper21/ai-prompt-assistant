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

export type ProjectDomain =
  | "finance-tracker"
  | "inventory"
  | "booking-system"
  | "learning-app"
  | "crm-sales"
  | "task-management"
  | "content-management"
  | "e-commerce"
  | "saas-dashboard"
  | "generic-web-app";

type CoreFeature = {
  name: string;
  description: string;
  input: string;
  output: string;
  notes: string;
};

type DatabaseTable = {
  name: string;
  description: string;
  fields: string[];
};

type DomainProfile = {
  domain: ProjectDomain;
  label: string;
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
  pages: string[];
  questions: string[];
  chips: string[][];
  features: CoreFeature[];
  flow: string[];
  apiActions: string[];
  acceptance: string[];
  designTone: string;
};

type StackRecommendation = {
  frontend: string;
  backend: string;
  database: string;
  deployment: string;
  reason: string;
};

const genericQuestions = [
  "Ceritakan siapa yang butuh aplikasi ini dan sekarang mereka biasanya melakukan proses ini dengan cara apa?",
  "Hal apa yang wajib berhasil dilakukan user di kunjungan pertama?",
  "Fitur apa saja yang wajib ada di versi pertama?",
  "Apa hal utama yang membuat aplikasi ini lebih enak dipakai dibanding cara lama?",
  "Apa yang membuat user mau membuka aplikasi ini terus-menerus?",
];

const genericChips = [
  ["Pemilik bisnis kecil", "Tim internal", "Pengguna pribadi"],
  ["Tambah data pertama", "Lihat dashboard", "Cari data lama"],
  ["Dashboard", "CRUD data", "Search/filter", "Export"],
  ["Lebih cepat", "Lebih rapi", "Lebih mudah dipantau"],
  ["Reminder", "Insight berkala", "Riwayat lengkap"],
];

function cleanText(text: string) {
  return text.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeUserFacingText(text: string) {
  return text
    .replace(/\bUser\b/g, "Pengguna")
    .replace(/\buser\b/g, "pengguna")
    .replace(/\bUsers\b/g, "Pengguna")
    .replace(/\bCustomer\b/g, "Pelanggan")
    .replace(/\bcustomer\b/g, "pelanggan")
    .replace(/\bCustomers\b/g, "Pelanggan")
    .replace(/\bStaff\b/g, "Staf")
    .replace(/\bstaff\b/g, "staf")
    .replace(/\bOwner\b/g, "Pemilik")
    .replace(/\bowner\b/g, "pemilik")
    .replace(/\bManager\b/g, "Manajer")
    .replace(/\bWriter\b/g, "Penulis")
    .replace(/\bTeacher\b/g, "Guru")
    .replace(/\bStudent\b/g, "Siswa")
    .replace(/\bLearner\b/g, "Peserta belajar")
    .replace(/\bMember\b/g, "Anggota")
    .replace(/\bStock\b/g, "Stok")
    .replace(/\bstock\b/g, "stok")
    .replace(/\bExport\b/g, "Ekspor")
    .replace(/\bexport\b/g, "ekspor")
    .replace(/\bAlert\b/g, "Peringatan")
    .replace(/\bAlerts\b/g, "Peringatan")
    .replace(/\balert\b/g, "peringatan")
    .replace(/\bReminder\b/g, "Pengingat")
    .replace(/\bReminders\b/g, "Pengingat")
    .replace(/\bReports\b/g, "Laporan")
    .replace(/\bReport\b/g, "Laporan")
    .replace(/\breport\b/g, "laporan")
    .replace(/\bSettings\b/g, "Pengaturan")
    .replace(/\bSetting\b/g, "Pengaturan")
    .replace(/\bProducts\b/g, "Produk")
    .replace(/\bProduct\b/g, "Produk")
    .replace(/\bOrders\b/g, "Pesanan")
    .replace(/\bOrder\b/g, "Pesanan")
    .replace(/\bLeads\b/g, "Lead")
    .replace(/\bTasks\b/g, "Tugas")
    .replace(/\bTask\b/g, "Tugas")
    .replace(/\bPosts\b/g, "Konten")
    .replace(/\bPost\b/g, "Konten")
    .replace(/\bDashboard Inventory\b/g, "Dashboard Inventori")
    .replace(/\bBooking Form\b/g, "Form Booking")
    .replace(/\bSchedule Calendar\b/g, "Kalender Jadwal")
    .replace(/\bLearning Dashboard\b/g, "Dashboard Belajar")
    .replace(/\bSales Dashboard\b/g, "Dashboard Penjualan")
    .replace(/\bTask Dashboard\b/g, "Dashboard Tugas")
    .replace(/\bContent Dashboard\b/g, "Dashboard Konten")
    .replace(/\bProduct Catalog\b/g, "Katalog Produk")
    .replace(/\bStorefront\b/g, "Etalase Toko")
    .replace(/\bOverview Dashboard\b/g, "Dashboard Ringkasan")
    .replace(/\bLow budget alert\b/g, "Peringatan budget rendah")
    .replace(/\bLow stock alert\b/g, "Peringatan stok rendah")
    .replace(/\bAuto confirmed\b/g, "Konfirmasi otomatis")
    .replace(/\bWaitlist\b/g, "Daftar tunggu")
    .replace(/\bSelf-paced\b/g, "Belajar mandiri")
    .replace(/\bStreak\b/g, "Rangkaian belajar")
    .replace(/\bBadge\b/g, "Lencana")
    .replace(/\bReminder follow-up\b/g, "Pengingat follow-up")
    .replace(/\bEmail note\b/g, "Catatan email")
    .replace(/\bPublish langsung\b/g, "Terbitkan langsung")
    .replace(/\bExport content\b/g, "Ekspor konten")
    .replace(/\bRevenue\b/g, "Pendapatan")
    .replace(/\bOperations\b/g, "Operasional")
    .replace(/\bSupport\b/g, "Dukungan")
    .replace(/\bRegistered pengguna\b/g, "Pengguna terdaftar")
    .replace(/\bHousehold admin\b/g, "Admin keluarga")
    .replace(/\bBusiness pemilik\b/g, "Pemilik bisnis")
    .replace(/\bWarehouse staf\b/g, "Staf gudang")
    .replace(/\bStore admin\b/g, "Admin toko")
    .replace(/\bFulfillment staf\b/g, "Staf fulfillment")
    .replace(/\bProject manajer\b/g, "Manajer proyek")
    .replace(/\bSales manajer\b/g, "Manajer sales")
    .replace("## 4. Pengguna Flow", "## 4. User Flow");
}

function normalizePrdExceptFinalPrompt(markdown: string) {
  const marker = "## 10. Prompt untuk AI Coding Agent";
  const index = markdown.indexOf(marker);

  if (index === -1) {
    return normalizeUserFacingText(markdown);
  }

  const beforeFinalPrompt = markdown.slice(0, index);
  const finalPrompt = markdown.slice(index);
  return `${normalizeUserFacingText(beforeFinalPrompt)}${finalPrompt}`;
}

function includesAny(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

function titleCase(text: string) {
  return cleanText(text)
    .split(" ")
    .filter(Boolean)
    .slice(0, 5)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function detectProjectDomain(idea: string): ProjectDomain {
  const lower = idea.toLowerCase();

  if (includesAny(lower, ["finance", "financial", "keuangan", "pengeluaran", "pemasukan", "saldo", "transaksi", "tagihan", "budget"])) {
    return "finance-tracker";
  }

  if (includesAny(lower, ["inventory", "stok", "stock", "gudang", "warehouse", "barang", "sku", "rak", "batch"])) {
    return "inventory";
  }

  if (includesAny(lower, ["booking", "reservasi", "jadwal", "appointment", "slot", "janji temu"])) {
    return "booking-system";
  }

  if (includesAny(lower, ["learning", "belajar", "kursus", "kelas", "siswa", "quiz", "kuis", "lesson", "edtech"])) {
    return "learning-app";
  }

  if (includesAny(lower, ["crm", "sales", "lead", "pipeline", "prospect", "customer relationship", "penjualan"])) {
    return "crm-sales";
  }

  if (includesAny(lower, ["task", "todo", "kanban", "project management", "tugas", "deadline", "sprint"])) {
    return "task-management";
  }

  if (includesAny(lower, ["content", "cms", "blog", "artikel", "editorial", "publishing", "postingan"])) {
    return "content-management";
  }

  if (includesAny(lower, ["ecommerce", "e-commerce", "toko online", "checkout", "cart", "keranjang", "produk", "order"])) {
    return "e-commerce";
  }

  if (includesAny(lower, ["saas", "dashboard", "analytics", "metric", "subscription", "tenant", "admin panel"])) {
    return "saas-dashboard";
  }

  return "generic-web-app";
}

function createFeature(name: string, description: string, input: string, output: string, notes: string): CoreFeature {
  return { name, description, input, output, notes };
}

function getDomainProfile(domain: ProjectDomain, idea: string): DomainProfile {
  const profiles: Record<ProjectDomain, DomainProfile> = {
    "finance-tracker": {
      domain,
      label: "Finance Tracker",
      projectName: "Daily Finance Tracker",
      primaryEntity: "transactions",
      primaryEntityLabel: "transaksi",
      activityEntity: "activity_logs",
      settingsEntity: "budget_settings",
      targetUsers: ["Individu yang mengelola uang harian", "Keluarga", "Freelancer", "Pemilik bisnis kecil"],
      roles: ["Demo user", "Registered user", "Household admin", "Business owner"],
      inputMethods: ["Input pemasukan/pengeluaran manual", "Kategori transaksi", "Filter bulan", "Export laporan"],
      storedData: ["transaksi", "kategori", "budget", "tagihan", "saldo", "laporan", "riwayat aktivitas"],
      notifications: "Alert visual untuk tagihan, budget hampir habis, transaksi besar, dan pengeluaran yang melewati batas bulanan.",
      pages: ["Onboarding", "Dashboard Keuangan", "Tambah Transaksi", "Daftar Transaksi", "Kategori", "Budget & Tagihan", "Laporan Bulanan", "Settings"],
      questions: [
        "Apakah aplikasi ini untuk pribadi, keluarga, freelancer, atau bisnis kecil?",
        "Data apa saja yang perlu dicatat: pemasukan, pengeluaran, hutang, tagihan, budget, atau saldo awal?",
        "Apakah user perlu kategori transaksi dan budget per kategori?",
        "Grafik atau laporan apa yang paling penting: harian, mingguan, bulanan, atau per kategori?",
        "Apakah user perlu export laporan, reminder tagihan, atau alert budget?",
      ],
      chips: [
        ["Pribadi", "Keluarga", "Freelancer", "Bisnis kecil"],
        ["Pemasukan", "Pengeluaran", "Hutang", "Tagihan", "Saldo awal"],
        ["Kategori wajib", "Budget per kategori", "Kategori default"],
        ["Grafik bulanan", "Laporan kategori", "Tren saldo"],
        ["Export CSV", "Reminder tagihan", "Low budget alert"],
      ],
      features: [
        createFeature("Dashboard Keuangan", "Menampilkan saldo, pemasukan, pengeluaran, cashflow, budget tersisa, dan transaksi terbaru.", "Transaksi, kategori, periode, budget.", "Kartu metrik, grafik sederhana, insight bulanan, dan alert.", "Dashboard harus berguna dengan data dummy dan tetap mudah dibaca di mobile."),
        createFeature("Manajemen Transaksi", "User dapat menambah, mengedit, menghapus, dan mencari transaksi pemasukan atau pengeluaran.", "Tipe, nominal, kategori, tanggal, catatan.", "Transaksi tersimpan dan dashboard diperbarui.", "Nominal harus tervalidasi dan tipe transaksi harus jelas."),
        createFeature("Kategori dan Budget", "User dapat memakai kategori default atau membuat kategori sendiri dengan batas budget.", "Nama kategori, tipe, limit bulanan, warna label.", "Kategori muncul di form, filter, dan laporan.", "Sediakan kategori default agar onboarding cepat."),
        createFeature("Tagihan dan Reminder", "User dapat mencatat tagihan rutin dan melihat alert jatuh tempo.", "Nama tagihan, nominal, tanggal jatuh tempo, status.", "Daftar reminder dan alert visual di dashboard.", "MVP cukup alert visual, belum perlu email/push notification."),
        createFeature("Laporan Bulanan", "Aplikasi merangkum pengeluaran, pemasukan, saldo akhir, dan kategori terbesar.", "Rentang tanggal, kategori, tipe transaksi.", "Laporan bulanan dan grafik/tren sederhana.", "Gunakan komponen ringan tanpa chart API eksternal."),
        createFeature("Export Laporan", "User dapat mengekspor transaksi sesuai filter.", "Periode, kategori, tipe transaksi.", "File CSV atau tampilan print-friendly.", "Export harus berjalan lokal tanpa service eksternal."),
      ],
      flow: ["User masuk sebagai demo user atau akun pribadi.", "User mengatur saldo awal dan kategori default.", "User menambah transaksi pemasukan/pengeluaran.", "Dashboard memperbarui saldo dan metrik bulanan.", "User memfilter transaksi berdasarkan bulan/kategori.", "User melihat laporan bulanan dan alert budget.", "User mengedit atau menghapus transaksi.", "User export laporan untuk arsip."],
      apiActions: ["createTransaction(data)", "updateTransaction(id, data)", "deleteTransaction(id)", "getTransactions(userId, filters)", "getFinanceSummary(userId, period)", "createCategory(data)", "updateBudgetSetting(data)", "exportTransactions(userId, filters)"],
      acceptance: ["User bisa menambah transaksi pemasukan dan pengeluaran.", "Saldo berubah otomatis berdasarkan transaksi.", "Dashboard menampilkan minimal total pemasukan, total pengeluaran, saldo, dan kategori terbesar.", "User bisa membuat atau memilih kategori transaksi.", "User bisa memfilter transaksi per bulan dan kategori.", "User bisa melihat alert budget/tagihan jika relevan.", "User bisa export laporan CSV.", "Nominal negatif atau kosong ditolak oleh validasi."],
      designTone: "Dashboard finansial yang tenang, rapi, sangat mudah dipindai, dengan warna status untuk income, expense, budget warning, dan overdue.",
    },
    inventory: {
      domain,
      label: "Inventory / Stok Gudang",
      projectName: "Warehouse Stock Control",
      primaryEntity: "products",
      primaryEntityLabel: "produk/stok",
      activityEntity: "stock_movements",
      settingsEntity: "warehouse_settings",
      targetUsers: ["Admin gudang", "Pemilik toko", "Staff operasional", "Procurement"],
      roles: ["Admin", "Warehouse staff", "Manager"],
      inputMethods: ["Input barang", "Stok masuk", "Stok keluar", "Lokasi rak", "Scan SKU opsional"],
      storedData: ["produk", "SKU", "batch", "stok", "lokasi rak", "supplier", "pergerakan stok", "low stock threshold"],
      notifications: "Low stock alert, stok habis, barang mendekati reorder point, dan movement tidak wajar.",
      pages: ["Dashboard Stok", "Daftar Produk", "Tambah Produk", "Stock In/Out", "Lokasi Rak", "Supplier", "Stock History", "Settings"],
      questions: [
        "Apakah inventori ini untuk toko kecil, gudang, produksi, atau distribusi?",
        "Apakah perlu batch number, expiry date, SKU/barcode, atau serial number?",
        "Apakah stok masuk dan stok keluar dicatat manual atau dari order?",
        "Apakah perlu lokasi rak, gudang cabang, atau multi-location stock?",
        "Apakah butuh low stock alert dan apakah ada admin tunggal atau banyak admin?",
      ],
      chips: [
        ["Toko kecil", "Gudang", "Produksi", "Distribusi"],
        ["Batch number", "Expiry date", "SKU", "Barcode"],
        ["Manual", "Dari order", "Import CSV"],
        ["Lokasi rak", "Multi gudang", "Cabang"],
        ["Low stock alert", "Admin tunggal", "Banyak admin"],
      ],
      features: [
        createFeature("Dashboard Inventory", "Menampilkan total SKU, stok rendah, stok habis, movement terbaru, dan nilai inventori.", "Data produk, movement, threshold.", "Kartu metrik dan alert stok.", "Low stock harus terlihat jelas begitu admin membuka aplikasi."),
        createFeature("Manajemen Produk", "Admin dapat membuat, mengedit, mencari, dan menonaktifkan produk.", "Nama produk, SKU, kategori, supplier, lokasi, threshold.", "Produk tersimpan dan muncul di list inventory.", "SKU harus unik."),
        createFeature("Stock In / Stock Out", "Staff dapat mencatat barang masuk dan keluar dengan alasan movement.", "Produk, jumlah, tipe movement, catatan, lokasi.", "Stok berubah dan movement tercatat.", "Tidak boleh stock out melebihi stok tersedia."),
        createFeature("Batch dan Lokasi", "Aplikasi mendukung batch number dan lokasi rak bila diperlukan.", "Batch, expiry date, lokasi rak/gudang.", "Detail stok per batch atau lokasi.", "Bisa dibuat opsional agar MVP tidak terlalu berat."),
        createFeature("Low Stock Alert", "Sistem menampilkan produk yang berada di bawah batas minimum.", "Threshold per produk.", "Alert dashboard dan filter low stock.", "Manager harus bisa melihat prioritas reorder."),
        createFeature("Riwayat Stok", "Semua perubahan stok tersimpan sebagai audit trail.", "Movement event dan user actor.", "Timeline movement per produk.", "Penting untuk akurasi dan accountability."),
      ],
      flow: ["Admin login atau masuk demo.", "Admin menambahkan produk dan threshold stok.", "Staff mencatat stok masuk.", "Staff mencatat stok keluar saat barang dipakai/terjual.", "Dashboard menampilkan stok rendah dan movement terbaru.", "Admin membuka detail produk untuk melihat riwayat.", "Admin mengedit data produk atau lokasi.", "Manager export laporan stok."],
      apiActions: ["createProduct(data)", "updateProduct(id, data)", "deleteProduct(id)", "getProducts(filters)", "createStockMovement(data)", "getStockMovements(productId)", "getInventorySummary(userId)", "exportInventoryReport(filters)"],
      acceptance: ["User bisa menambahkan produk dengan SKU unik.", "User bisa mencatat stok masuk.", "User bisa mencatat stok keluar tanpa membuat stok negatif.", "Dashboard menampilkan produk low stock.", "User bisa melihat riwayat movement per produk.", "User bisa mencari produk berdasarkan nama/SKU/kategori.", "User bisa mencatat lokasi rak jika fitur diaktifkan.", "Validasi jumlah stok berjalan."],
      designTone: "Dashboard operasional yang padat, cepat dipindai, dengan status stok jelas dan tabel yang nyaman untuk pekerjaan berulang.",
    },
    "booking-system": {
      domain,
      label: "Booking System",
      projectName: "Service Booking Hub",
      primaryEntity: "bookings",
      primaryEntityLabel: "booking",
      activityEntity: "booking_history",
      settingsEntity: "service_settings",
      targetUsers: ["Customer", "Admin layanan", "Staff operasional", "Pemilik bisnis jasa"],
      roles: ["Customer", "Staff", "Admin"],
      inputMethods: ["Form booking", "Kalender slot", "Status booking", "Catatan customer"],
      storedData: ["layanan", "slot jadwal", "booking", "customer", "status", "payment note", "history"],
      notifications: "Alert booking baru, jadwal mendekat, booking pending, dan pembatalan.",
      pages: ["Landing", "Booking Form", "Dashboard Booking", "Calendar / Schedule", "Booking List", "Booking Detail", "Services", "Settings"],
      questions: [
        "Jenis layanan apa yang akan dibooking dan berapa durasi setiap layanan?",
        "Apakah booking butuh pilihan tanggal, jam, staff tertentu, atau lokasi?",
        "Apakah booking langsung confirmed atau perlu approval admin?",
        "Status apa saja yang dibutuhkan: pending, confirmed, completed, cancelled, no-show?",
        "Apakah perlu reminder, pembayaran, deposit, atau catatan customer?",
      ],
      chips: [
        ["Jasa appointment", "Rental", "Kelas", "Konsultasi"],
        ["Pilih tanggal", "Pilih jam", "Pilih staff", "Pilih lokasi"],
        ["Auto confirmed", "Approval admin", "Waitlist"],
        ["Pending", "Confirmed", "Completed", "Cancelled"],
        ["Reminder", "Deposit", "Catatan customer"],
      ],
      features: [
        createFeature("Booking Form", "Customer dapat memilih layanan, slot waktu, dan mengisi detail kontak.", "Layanan, tanggal, jam, customer, catatan.", "Booking baru dengan status awal.", "Form harus cepat dan mobile-friendly."),
        createFeature("Schedule Calendar", "Admin melihat jadwal booking dalam tampilan kalender atau list harian.", "Tanggal, staff, layanan.", "Slot tersedia dan booking aktif.", "MVP boleh memakai list jadwal jika kalender kompleks."),
        createFeature("Booking Management", "Admin dapat mengubah status, menjadwal ulang, atau membatalkan booking.", "Status baru, catatan admin, waktu baru.", "Status booking terbaru dan history.", "Status harus konsisten."),
        createFeature("Service Management", "Admin mengelola layanan, durasi, harga, dan kapasitas.", "Nama layanan, durasi, harga, kapasitas.", "Layanan tersedia di booking form.", "Sediakan sample service."),
        createFeature("Customer Records", "Sistem menyimpan informasi customer dan riwayat booking.", "Nama, kontak, booking history.", "Profil customer sederhana.", "Hindari menyimpan data sensitif berlebihan."),
        createFeature("Reminder & Alerts", "Aplikasi menampilkan jadwal mendekat dan booking pending.", "Tanggal booking dan status.", "Alert dashboard.", "MVP cukup alert visual."),
      ],
      flow: ["Customer membuka form booking.", "Customer memilih layanan dan slot.", "Customer mengirim booking.", "Admin melihat booking baru di dashboard.", "Admin confirm/reschedule/cancel booking.", "Customer atau admin melihat detail booking.", "Staff menandai booking completed.", "Admin melihat riwayat dan laporan booking."],
      apiActions: ["createBooking(data)", "updateBookingStatus(id, status)", "rescheduleBooking(id, data)", "deleteBooking(id)", "getBookings(filters)", "getAvailableSlots(serviceId, date)", "createService(data)", "getBookingSummary(filters)"],
      acceptance: ["Customer bisa membuat booking.", "Admin bisa melihat booking baru.", "Admin bisa mengubah status booking.", "Slot yang sudah penuh tidak bisa dipilih.", "Dashboard menampilkan booking hari ini dan pending.", "User bisa filter booking berdasarkan tanggal/status.", "Riwayat perubahan status tersimpan.", "Form booking responsive di mobile."],
      designTone: "UI scheduling yang jelas, ringan, dan fokus pada kalender, status, serta aksi cepat admin.",
    },
    "learning-app": {
      domain,
      label: "Learning App",
      projectName: "Learning Progress Studio",
      primaryEntity: "lessons",
      primaryEntityLabel: "materi belajar",
      activityEntity: "student_progress",
      settingsEntity: "learning_settings",
      targetUsers: ["Siswa", "Guru", "Mentor", "Admin lembaga belajar", "Orang tua"],
      roles: ["Student", "Teacher", "Admin"],
      inputMethods: ["Materi belajar", "Jawaban kuis", "Checklist progress", "Feedback mentor"],
      storedData: ["course", "lesson", "quiz", "question", "answer", "score", "progress", "feedback"],
      notifications: "Alert materi belum selesai, kuis baru, progress menurun, dan target belajar mendekat.",
      pages: ["Dashboard Belajar", "Course List", "Lesson Detail", "Quiz", "Progress", "Teacher Review", "Settings"],
      questions: [
        "Siapa target learner: anak, siswa sekolah, mahasiswa, karyawan, atau komunitas?",
        "Konten belajar berbentuk apa: teks, video, quiz, flashcard, atau tugas?",
        "Apakah perlu progress tracking, scoring, sertifikat, atau leaderboard?",
        "Apakah ada role guru/mentor yang memberi feedback?",
        "Apa yang membuat learner mau kembali belajar setiap hari?",
      ],
      chips: [
        ["Anak", "Siswa SMP/SMA", "Karyawan", "Komunitas"],
        ["Teks", "Video", "Quiz", "Flashcard", "Tugas"],
        ["Progress", "Scoring", "Sertifikat", "Leaderboard"],
        ["Guru", "Mentor", "Self-paced"],
        ["Streak", "Reminder", "Badge", "Target harian"],
      ],
      features: [
        createFeature("Learning Dashboard", "Menampilkan progress, course aktif, lesson berikutnya, skor, dan streak.", "Progress, lesson status, quiz score.", "Ringkasan belajar dan rekomendasi langkah berikutnya.", "Dashboard harus memotivasi tanpa terlalu ramai."),
        createFeature("Course & Lesson Management", "Admin/guru dapat membuat course, lesson, dan urutan materi.", "Judul, konten, level, urutan.", "Course dan lesson tersusun.", "MVP bisa memakai konten teks dulu."),
        createFeature("Quiz Engine", "Learner mengerjakan kuis untuk mengecek pemahaman.", "Pertanyaan, pilihan jawaban, jawaban user.", "Skor dan feedback.", "Validasi lokal dulu, tanpa AI scoring."),
        createFeature("Progress Tracking", "Sistem mencatat lesson selesai, skor, dan progress keseluruhan.", "Completion event dan score.", "Progress per learner.", "Teacher dapat membaca progress dengan cepat."),
        createFeature("Feedback Mentor", "Guru/mentor dapat memberi komentar dan rekomendasi belajar.", "Komentar, lesson, learner.", "Feedback tersimpan.", "Opsional untuk mode self-paced."),
        createFeature("Engagement Loop", "Aplikasi memberi motivasi seperti streak, target harian, atau badge.", "Aktivitas belajar harian.", "Streak dan badge sederhana.", "Jangan buat gamification terlalu kompleks di MVP."),
      ],
      flow: ["Learner masuk ke dashboard.", "Learner memilih course.", "Learner membaca lesson.", "Learner mengerjakan quiz.", "Sistem menghitung skor dan progress.", "Learner melihat rekomendasi berikutnya.", "Teacher melihat progress dan memberi feedback.", "Learner kembali untuk mengejar target/streak."],
      apiActions: ["createCourse(data)", "createLesson(data)", "updateLesson(id, data)", "submitQuizAnswer(data)", "getStudentProgress(userId)", "markLessonComplete(lessonId)", "createFeedback(data)", "getLearningSummary(userId)"],
      acceptance: ["User bisa membuka course dan lesson.", "User bisa menyelesaikan lesson.", "User bisa mengerjakan kuis.", "Sistem menghitung skor quiz.", "Dashboard menampilkan progress.", "Teacher/admin bisa melihat progress jika role tersedia.", "User bisa melihat lesson berikutnya.", "UI nyaman untuk membaca materi di mobile."],
      designTone: "UI edukasi yang fokus, readable, ringan, dan memberi rasa progress yang jelas.",
    },
    "crm-sales": {
      domain,
      label: "CRM / Sales",
      projectName: "Sales Pipeline CRM",
      primaryEntity: "leads",
      primaryEntityLabel: "lead/customer",
      activityEntity: "sales_activities",
      settingsEntity: "pipeline_settings",
      targetUsers: ["Sales team", "Sales manager", "Founder", "Account executive"],
      roles: ["Sales rep", "Manager", "Admin"],
      inputMethods: ["Input lead", "Pipeline stage", "Follow-up note", "Deal value", "Contact activity"],
      storedData: ["lead", "contact", "company", "deal", "pipeline stage", "activity", "follow-up"],
      notifications: "Alert follow-up overdue, deal idle, lead baru, dan opportunity mendekati closing.",
      pages: ["Sales Dashboard", "Leads", "Pipeline Board", "Lead Detail", "Activities", "Reports", "Settings"],
      questions: [
        "Siapa yang memakai CRM ini: founder, sales tunggal, atau tim sales?",
        "Tahap pipeline apa saja yang dibutuhkan dari lead sampai close?",
        "Data lead apa yang wajib disimpan: kontak, company, source, value, notes?",
        "Apakah perlu reminder follow-up dan activity log?",
        "Report sales apa yang paling penting: conversion, deal value, source, atau forecast?",
      ],
      chips: [
        ["Founder", "Sales tunggal", "Tim sales"],
        ["New", "Qualified", "Proposal", "Won/Lost"],
        ["Kontak", "Company", "Source", "Deal value"],
        ["Reminder follow-up", "Activity log", "Email note"],
        ["Conversion", "Forecast", "Source report", "Deal value"],
      ],
      features: [
        createFeature("Sales Dashboard", "Menampilkan pipeline value, leads baru, follow-up overdue, dan conversion summary.", "Lead, deal, activity, stage.", "Metrik sales dan prioritas follow-up.", "Manager harus cepat tahu deal mana yang butuh aksi."),
        createFeature("Lead Management", "Sales dapat membuat, mengedit, mencari, dan mengelola lead.", "Nama, kontak, company, source, value, owner.", "Lead tersimpan dan masuk pipeline.", "Contact info harus divalidasi."),
        createFeature("Pipeline Board", "Lead ditampilkan berdasarkan stage pipeline.", "Stage, owner, deal value.", "Kanban pipeline atau grouped list.", "Drag-and-drop opsional, tombol stage change cukup untuk MVP."),
        createFeature("Activity Log", "Sales mencatat call, meeting, email, dan notes.", "Tipe aktivitas, tanggal, catatan.", "Timeline aktivitas lead.", "Penting untuk handover dan audit."),
        createFeature("Follow-up Reminder", "Aplikasi menampilkan lead yang perlu dihubungi.", "Tanggal follow-up dan status.", "Alert follow-up overdue/upcoming.", "MVP visual alert tanpa email."),
        createFeature("Sales Report", "Manager melihat conversion, source performance, dan deal value.", "Filter periode, owner, source.", "Report sederhana dan export.", "Report harus bisa dipakai untuk keputusan sales."),
      ],
      flow: ["Sales login.", "Sales menambah lead baru.", "Lead masuk stage awal pipeline.", "Sales mencatat activity dan follow-up.", "Sales mengubah stage lead.", "Dashboard memperbarui pipeline value.", "Manager melihat report dan follow-up overdue.", "Sales menutup deal sebagai won/lost."],
      apiActions: ["createLead(data)", "updateLead(id, data)", "deleteLead(id)", "moveLeadStage(id, stage)", "createSalesActivity(data)", "getLeads(filters)", "getPipelineSummary(filters)", "getSalesReport(filters)"],
      acceptance: ["User bisa membuat lead.", "User bisa mengubah stage pipeline.", "User bisa mencatat activity.", "Dashboard menampilkan pipeline value.", "User bisa melihat follow-up overdue.", "User bisa filter lead berdasarkan owner/stage/source.", "Lead detail menampilkan timeline.", "Report sales dasar tersedia."],
      designTone: "CRM yang padat, task-oriented, dengan pipeline jelas dan prioritas follow-up yang menonjol.",
    },
    "task-management": {
      domain,
      label: "Task Management",
      projectName: "Focus Task Board",
      primaryEntity: "tasks",
      primaryEntityLabel: "task",
      activityEntity: "task_events",
      settingsEntity: "workspace_settings",
      targetUsers: ["Individu produktif", "Tim kecil", "Project manager", "Freelancer"],
      roles: ["Member", "Project manager", "Admin"],
      inputMethods: ["Task form", "Status board", "Deadline", "Assignee", "Priority"],
      storedData: ["task", "project", "status", "priority", "assignee", "deadline", "comment", "activity"],
      notifications: "Alert deadline dekat, task overdue, task assigned, dan status blocked.",
      pages: ["Task Dashboard", "Kanban Board", "Task List", "Task Detail", "Projects", "Calendar", "Settings"],
      questions: [
        "Apakah task dipakai pribadi, tim kecil, atau banyak project?",
        "Workflow status apa yang dibutuhkan: todo, doing, review, done, blocked?",
        "Apakah perlu assignee, deadline, priority, tags, atau subtasks?",
        "Apakah user butuh Kanban, list, calendar, atau semua view?",
        "Apa report yang penting: overdue, workload, velocity, atau completion rate?",
      ],
      chips: [
        ["Pribadi", "Tim kecil", "Multi project"],
        ["Todo", "Doing", "Review", "Done", "Blocked"],
        ["Assignee", "Deadline", "Priority", "Subtasks"],
        ["Kanban", "List", "Calendar"],
        ["Overdue", "Workload", "Completion rate"],
      ],
      features: [
        createFeature("Task Dashboard", "Menampilkan task due soon, overdue, workload, dan progress project.", "Task, deadline, status, assignee.", "Metrik produktivitas dan prioritas hari ini.", "Dashboard harus membantu user tahu apa yang harus dikerjakan."),
        createFeature("Task CRUD", "User dapat membuat, mengedit, menghapus, dan menyelesaikan task.", "Judul, deskripsi, status, deadline, priority.", "Task tersimpan dan bisa difilter.", "Validasi judul dan status wajib."),
        createFeature("Kanban Board", "Task dikelompokkan berdasarkan status workflow.", "Status dan project.", "Board status dengan task cards.", "Drag-and-drop opsional."),
        createFeature("Assignment & Priority", "Task bisa diberi assignee dan prioritas.", "Assignee, priority, tags.", "Task lebih mudah diprioritaskan.", "Untuk personal mode, assignee dapat disembunyikan."),
        createFeature("Comments & Activity", "User dapat memberi komentar dan melihat perubahan task.", "Komentar, status change, actor.", "Timeline task.", "Memudahkan kolaborasi."),
        createFeature("Calendar & Reports", "User melihat deadline di kalender dan laporan completion.", "Filter periode dan project.", "Calendar/list deadline dan report.", "MVP boleh pakai list deadline dulu."),
      ],
      flow: ["User membuka dashboard task.", "User membuat project atau memakai default workspace.", "User menambah task.", "User mengatur status, assignee, priority, deadline.", "User memindahkan task antar status.", "User membuka detail task dan komentar.", "Dashboard menampilkan overdue dan progress.", "User melihat report completion."],
      apiActions: ["createTask(data)", "updateTask(id, data)", "deleteTask(id)", "moveTaskStatus(id, status)", "createTaskComment(data)", "getTasks(filters)", "getTaskSummary(filters)", "getProjectReport(projectId)"],
      acceptance: ["User bisa membuat task.", "User bisa mengubah status task.", "User bisa filter task berdasarkan status/priority/assignee.", "Dashboard menampilkan overdue dan due soon.", "User bisa membuka detail task.", "Activity perubahan status tercatat.", "Kanban atau grouped list tersedia.", "UI usable di mobile."],
      designTone: "UI produktivitas yang cepat, rapi, minim distraksi, dengan status dan prioritas sangat jelas.",
    },
    "content-management": {
      domain,
      label: "Content Management",
      projectName: "Editorial Content Studio",
      primaryEntity: "posts",
      primaryEntityLabel: "konten/post",
      activityEntity: "editorial_events",
      settingsEntity: "content_settings",
      targetUsers: ["Content creator", "Editor", "Marketing team", "Publisher"],
      roles: ["Writer", "Editor", "Admin"],
      inputMethods: ["Editor konten", "Media upload placeholder", "Status publish", "Kategori/tag"],
      storedData: ["post", "category", "tag", "author", "status", "revision", "publish schedule"],
      notifications: "Alert draft pending review, scheduled post, dan content yang perlu revisi.",
      pages: ["Content Dashboard", "Posts", "Editor", "Categories", "Editorial Calendar", "Review Queue", "Settings"],
      questions: [
        "Konten yang dikelola berbentuk blog, artikel, landing page, dokumentasi, atau social content?",
        "Apakah perlu workflow draft, review, approved, scheduled, published?",
        "Apakah ada banyak author/editor atau admin tunggal?",
        "Apakah butuh kategori, tag, SEO fields, dan revision history?",
        "Apakah publishing langsung atau hanya manajemen konten internal dulu?",
      ],
      chips: [
        ["Blog", "Artikel", "Dokumentasi", "Social content"],
        ["Draft", "Review", "Scheduled", "Published"],
        ["Admin tunggal", "Banyak author", "Editor approval"],
        ["SEO fields", "Tags", "Revision history"],
        ["Publish langsung", "Internal dulu", "Export content"],
      ],
      features: [
        createFeature("Content Dashboard", "Menampilkan jumlah draft, review queue, scheduled posts, dan performa konten dasar.", "Post status, author, schedule.", "Ringkasan editorial.", "Fokus pada workload editorial."),
        createFeature("Post Editor", "User dapat membuat dan mengedit konten dengan metadata.", "Judul, body, excerpt, category, tags, SEO.", "Konten tersimpan sebagai draft atau published.", "MVP bisa textarea markdown sederhana."),
        createFeature("Workflow Status", "Konten bergerak dari draft ke review, scheduled, dan published.", "Status konten dan reviewer.", "Status editorial terbaru.", "Approval flow bisa sederhana."),
        createFeature("Categories & Tags", "User mengelola taxonomy konten.", "Category, tag, slug.", "Konten lebih mudah difilter.", "Slug harus unik."),
        createFeature("Revision History", "Sistem menyimpan perubahan penting pada konten.", "Revision event dan author.", "Riwayat revisi.", "MVP bisa simpan metadata perubahan dulu."),
        createFeature("Editorial Calendar", "Scheduled content terlihat dalam kalender/list.", "Publish date dan status.", "Daftar konten terjadwal.", "Kalender penuh opsional."),
      ],
      flow: ["Writer membuat draft.", "Writer menambahkan kategori/tag/SEO.", "Writer mengirim ke review.", "Editor memberi feedback atau approve.", "Post dijadwalkan atau dipublish.", "Dashboard memperbarui queue.", "User melihat revision history.", "Admin mengelola kategori dan settings."],
      apiActions: ["createPost(data)", "updatePost(id, data)", "deletePost(id)", "changePostStatus(id, status)", "createRevision(data)", "getPosts(filters)", "getEditorialSummary(filters)", "schedulePost(id, publishAt)"],
      acceptance: ["User bisa membuat post.", "User bisa menyimpan draft.", "User bisa mengubah status editorial.", "User bisa filter post berdasarkan status/category/author.", "Post detail menampilkan metadata.", "Revision event tercatat.", "Scheduled posts terlihat.", "Slug atau title wajib tervalidasi."],
      designTone: "Editorial UI yang tenang, readable, dengan editor luas dan queue status yang mudah dipantau.",
    },
    "e-commerce": {
      domain,
      label: "E-commerce",
      projectName: "Commerce Starter Store",
      primaryEntity: "orders",
      primaryEntityLabel: "order/produk",
      activityEntity: "order_events",
      settingsEntity: "store_settings",
      targetUsers: ["Pembeli", "Admin toko", "Owner", "Staff fulfillment"],
      roles: ["Customer", "Store admin", "Fulfillment staff"],
      inputMethods: ["Product catalog", "Cart", "Checkout manual", "Order status", "Inventory update"],
      storedData: ["product", "customer", "cart", "order", "order item", "payment status", "shipment status"],
      notifications: "Alert order baru, pembayaran pending, stok rendah, dan order siap dikirim.",
      pages: ["Storefront", "Product Detail", "Cart", "Checkout", "Order Success", "Admin Dashboard", "Products", "Orders", "Settings"],
      questions: [
        "Produk yang dijual digital, fisik, jasa, atau campuran?",
        "Apakah checkout butuh pembayaran online sekarang atau cukup order manual dulu?",
        "Apakah perlu varian produk seperti ukuran, warna, paket, atau stok per varian?",
        "Status order apa yang dibutuhkan: pending, paid, packed, shipped, completed, cancelled?",
        "Apakah admin perlu kelola katalog, stok, promo, dan laporan penjualan?",
      ],
      chips: [
        ["Produk fisik", "Produk digital", "Jasa", "Campuran"],
        ["Order manual", "Payment later", "Payment gateway nanti"],
        ["Ukuran", "Warna", "Paket", "Stok varian"],
        ["Pending", "Paid", "Shipped", "Completed"],
        ["Katalog", "Stok", "Promo", "Laporan"],
      ],
      features: [
        createFeature("Product Catalog", "Customer dapat melihat produk, kategori, harga, dan stok.", "Product data, category, search.", "Grid/list produk dan detail produk.", "Gunakan gambar placeholder lokal bila belum ada asset."),
        createFeature("Cart & Checkout", "Customer menambahkan produk ke cart dan membuat order.", "Product, quantity, customer info.", "Order baru dengan status pending.", "MVP tidak wajib payment gateway."),
        createFeature("Order Management", "Admin melihat dan mengubah status order.", "Order status, fulfillment note.", "Status order terbaru dan event log.", "Order status harus konsisten."),
        createFeature("Product Management", "Admin mengelola produk, harga, stok, kategori, dan status publish.", "Product fields dan inventory.", "Catalog terupdate.", "Validasi price dan stock wajib."),
        createFeature("Customer Records", "Sistem menyimpan customer dan riwayat order.", "Nama, kontak, alamat opsional.", "Customer profile sederhana.", "Hindari data sensitif berlebihan."),
        createFeature("Sales Dashboard", "Owner melihat total order, revenue, produk terlaris, dan pending fulfillment.", "Orders, products, period.", "Metrik toko.", "Revenue bisa dihitung dari order dummy/local."),
      ],
      flow: ["Customer melihat katalog.", "Customer membuka product detail.", "Customer menambah produk ke cart.", "Customer checkout manual.", "Admin melihat order baru.", "Admin mengubah status fulfillment.", "Customer/admin melihat detail order.", "Owner melihat laporan penjualan."],
      apiActions: ["createProduct(data)", "updateProduct(id, data)", "deleteProduct(id)", "createOrder(data)", "updateOrderStatus(id, status)", "getOrders(filters)", "getProducts(filters)", "getStoreSummary(filters)"],
      acceptance: ["Customer bisa melihat katalog.", "Customer bisa menambah produk ke cart.", "Customer bisa membuat order.", "Admin bisa mengubah status order.", "Admin bisa mengelola produk.", "Stok berkurang saat order dibuat jika fitur stok aktif.", "Dashboard menampilkan order/revenue dasar.", "Checkout tidak membutuhkan payment API pada MVP."],
      designTone: "Storefront bersih dan admin dashboard operasional, dengan fokus pada katalog, cart, dan order fulfillment.",
    },
    "saas-dashboard": {
      domain,
      label: "SaaS Dashboard",
      projectName: "SaaS Metrics Console",
      primaryEntity: "metrics",
      primaryEntityLabel: "metric/dashboard item",
      activityEntity: "dashboard_events",
      settingsEntity: "tenant_settings",
      targetUsers: ["Founder", "Admin SaaS", "Ops team", "Customer success"],
      roles: ["Owner", "Admin", "Member", "Viewer"],
      inputMethods: ["Metric input", "Filter date range", "Workspace setting", "Report view"],
      storedData: ["workspace", "metric", "event", "report", "user role", "subscription placeholder"],
      notifications: "Alert metric turun, target tidak tercapai, trial hampir selesai, atau anomaly sederhana.",
      pages: ["Overview Dashboard", "Metrics", "Reports", "Users & Roles", "Workspace Settings", "Billing Placeholder", "Activity"],
      questions: [
        "Dashboard ini memantau metrik apa: revenue, users, operations, marketing, support, atau product analytics?",
        "Apakah aplikasi multi-tenant, satu workspace, atau dashboard internal saja?",
        "Role user apa yang dibutuhkan: owner, admin, member, viewer?",
        "Apakah data metric diinput manual dulu atau nanti dari API/integrasi?",
        "Report dan alert apa yang paling penting untuk user?",
      ],
      chips: [
        ["Revenue", "Users", "Operations", "Marketing", "Support"],
        ["Multi-tenant", "Single workspace", "Internal dashboard"],
        ["Owner", "Admin", "Member", "Viewer"],
        ["Input manual", "CSV import", "API nanti"],
        ["Weekly report", "Anomaly alert", "Target tracking"],
      ],
      features: [
        createFeature("Overview Dashboard", "Menampilkan KPI utama, tren, target, dan aktivitas terbaru.", "Metric data, date range, workspace.", "Kartu KPI, tren sederhana, dan status target.", "MVP bisa input manual dulu."),
        createFeature("Metric Management", "Admin dapat membuat dan memperbarui metric yang dipantau.", "Nama metric, value, target, periode.", "Metric tersimpan dan muncul di dashboard.", "Validasi angka dan periode."),
        createFeature("Reports", "User melihat report periodik berdasarkan filter.", "Date range dan metric group.", "Summary report dan table.", "Export report opsional."),
        createFeature("Users & Roles", "Owner mengatur anggota workspace dan role.", "Email, role, workspace.", "Daftar user dan permission.", "Auth sungguhan bisa fase berikutnya."),
        createFeature("Workspace Settings", "User mengatur preferensi dashboard, target, dan threshold alert.", "Settings key/value.", "Konfigurasi tersimpan.", "Gunakan local/dummy data untuk MVP."),
        createFeature("Activity & Audit", "Sistem mencatat perubahan metric dan settings.", "Actor, action, metadata.", "Activity timeline.", "Penting untuk dashboard bisnis."),
      ],
      flow: ["Owner masuk ke dashboard.", "Owner membuat workspace atau memakai demo workspace.", "Owner menambahkan metric dan target.", "Dashboard menampilkan KPI dan tren.", "User memfilter periode.", "User membuka report.", "Owner mengatur role/settings.", "Activity log mencatat perubahan."],
      apiActions: ["createMetric(data)", "updateMetric(id, data)", "deleteMetric(id)", "getMetrics(filters)", "getDashboardOverview(workspaceId, filters)", "createWorkspaceSetting(data)", "inviteWorkspaceUser(data)", "getActivityLog(workspaceId)"],
      acceptance: ["Dashboard menampilkan minimal 4 KPI.", "User bisa menambah metric.", "User bisa mengubah target/threshold.", "User bisa filter berdasarkan periode.", "Report dasar tersedia.", "Role list tersedia walau auth masih demo.", "Activity log tercatat.", "Build deployable ke Vercel."],
      designTone: "SaaS admin yang profesional, padat, dan mudah dipindai, dengan hierarchy data yang kuat.",
    },
    "generic-web-app": {
      domain,
      label: "Generic Web App",
      projectName: `${titleCase(idea) || "Smart Workflow"} App`,
      primaryEntity: "records",
      primaryEntityLabel: "data utama",
      activityEntity: "activity_logs",
      settingsEntity: "settings",
      targetUsers: ["Pengguna non-teknis", "Admin operasional", "Pemilik bisnis kecil", "Tim internal"],
      roles: ["Demo user", "Admin", "Staff"],
      inputMethods: ["Input manual", "Form data", "Pencarian/filter", "Export data"],
      storedData: ["record utama", "status", "kategori", "catatan", "riwayat aktivitas", "preferensi user"],
      notifications: "Alert visual untuk status penting, item baru, atau data yang perlu ditindaklanjuti.",
      pages: ["Landing / Onboarding", "Dashboard", "Data List", "Create / Edit Form", "Detail Page", "Reports", "Settings"],
      questions: genericQuestions,
      chips: genericChips,
      features: [
        createFeature("Dashboard Utama", "Menampilkan metrik utama, aktivitas terbaru, dan item yang butuh aksi.", "Data utama, status, periode.", "Kartu metrik, activity list, dan quick actions.", "Harus tetap informatif dengan data dummy."),
        createFeature("Manajemen Data", "User dapat membuat, melihat, mengedit, menghapus, mencari, dan memfilter data utama.", "Field utama, status, kategori, catatan.", "Data tersimpan dan dapat dikelola.", "Validasi field wajib."),
        createFeature("Detail dan Riwayat", "User melihat detail data dan riwayat perubahan.", "ID data dan activity events.", "Detail page dan timeline.", "Activity log membantu audit."),
        createFeature("Search dan Filter", "User menemukan data berdasarkan keyword, status, kategori, atau periode.", "Keyword dan filter.", "List terfilter.", "Filter bekerja tanpa refresh penuh."),
        createFeature("Report / Export", "User melihat ringkasan dan mengekspor data.", "Filter aktif dan format export.", "CSV atau print-friendly report.", "Tidak membutuhkan service eksternal."),
      ],
      flow: ["User masuk sebagai demo user.", "User melihat dashboard.", "User menambah data utama.", "User melihat list data.", "User membuka detail data.", "User mengedit/menghapus data.", "Activity log tercatat.", "User export laporan."],
      apiActions: ["createRecord(data)", "updateRecord(id, data)", "deleteRecord(id)", "getRecords(filters)", "getRecordById(id)", "getDashboardSummary(filters)", "createActivityLog(data)", "exportRecords(filters)"],
      acceptance: ["User bisa menambahkan data utama.", "User bisa melihat list data.", "User bisa mengedit data.", "User bisa menghapus data.", "User bisa mencari dan memfilter.", "Dashboard menampilkan minimal 3 metrik.", "Activity log tersedia.", "UI responsive dan build production berhasil."],
      designTone: "UI web app modern, rapi, mudah dipakai user non-teknis, dan siap dikembangkan.",
    },
  };

  return profiles[domain];
}

export function getDynamicQuestions(domain: ProjectDomain) {
  return getDomainProfile(domain, "").questions.map(normalizeUserFacingText);
}

export function getDynamicQuestionChips(domain: ProjectDomain) {
  return getDomainProfile(domain, "").chips.map((group) => group.map(normalizeUserFacingText));
}

export function inferRecommendedStack(domain: ProjectDomain, idea: string): StackRecommendation {
  const lower = idea.toLowerCase();
  const isSimple = includesAny(lower, ["pribadi", "personal", "demo", "internal", "mvp"]);

  if (domain === "learning-app") {
    return {
      frontend: "Next.js App Router",
      backend: "Server Actions",
      database: "Supabase Postgres",
      deployment: "Vercel",
      reason: "Learning app membutuhkan struktur relational untuk course, lesson, quiz, dan progress, tetapi tetap cepat dibuat sebagai MVP Next.js.",
    };
  }

  if (domain === "inventory" || domain === "crm-sales" || domain === "e-commerce") {
    return {
      frontend: "Next.js App Router",
      backend: "Next.js API Routes or Server Actions",
      database: "PostgreSQL or Supabase Postgres",
      deployment: "Vercel",
      reason: "Domain ini membutuhkan relational data, audit trail, filter kuat, dan peluang multi-user sehingga Postgres/Supabase paling aman untuk scale awal.",
    };
  }

  if (domain === "finance-tracker") {
    return {
      frontend: "Next.js App Router",
      backend: "Server Actions",
      database: isSimple ? "SQLite for MVP, Supabase Postgres for production" : "Supabase Postgres",
      deployment: "Vercel",
      reason: "Finance tracker perlu query periode, kategori, dan summary. SQLite cukup untuk MVP pribadi, Supabase lebih cocok untuk multi-user.",
    };
  }

  if (domain === "task-management" || domain === "content-management") {
    return {
      frontend: "Next.js App Router",
      backend: "Server Actions",
      database: "Supabase Postgres",
      deployment: "Vercel",
      reason: "Workflow, status, dan riwayat perubahan cocok dengan relational schema dan server actions yang sederhana.",
    };
  }

  return {
    frontend: "Next.js App Router",
    backend: "Server Actions or Next.js API Routes",
    database: "Supabase Postgres",
    deployment: "Vercel",
    reason: "Stack ini cepat untuk MVP, mudah dideploy, kuat untuk dashboard CRUD, dan mudah dikembangkan ke auth/database sungguhan.",
  };
}

function getFinalStack(input: GeneratePRDInput, domain: ProjectDomain): StackRecommendation {
  if (input.techMode === "manual") {
    return {
      frontend: input.selectedTech.frontend || "Next.js",
      backend: input.selectedTech.backend || "Next.js API Routes",
      database: input.selectedTech.database || "Supabase",
      deployment: input.selectedTech.deployment || "Vercel",
      reason: "Stack mengikuti pilihan user. AI coding agent harus menghormati pilihan ini kecuali ada konflik teknis yang jelas.",
    };
  }

  return inferRecommendedStack(domain, input.idea);
}

export function generateDatabaseSchema(domain: ProjectDomain, idea: string): DatabaseTable[] {
  const profile = getDomainProfile(domain, idea);
  const baseUsers: DatabaseTable = {
    name: "users",
    description: "Menyimpan identitas user, role, dan metadata akun.",
    fields: ["id int PK", "email string unique", "name string", "role string", "created_at datetime", "updated_at datetime"],
  };

  const activity: DatabaseTable = {
    name: profile.activityEntity,
    description: "Menyimpan riwayat aksi penting untuk audit trail dan timeline.",
    fields: ["id int PK", "user_id int FK", `${singularSnake(profile.primaryEntity)}_id int FK`, "action string", "metadata_json string", "created_at datetime"],
  };

  const settings: DatabaseTable = {
    name: profile.settingsEntity,
    description: "Menyimpan preferensi, threshold, konfigurasi dashboard, dan setting domain.",
    fields: ["id int PK", "user_id int FK", "key string", "value_json string", "created_at datetime", "updated_at datetime"],
  };

  const tableByDomain: Record<ProjectDomain, DatabaseTable[]> = {
    "finance-tracker": [
      baseUsers,
      { name: "transactions", description: "Menyimpan pemasukan, pengeluaran, hutang, tagihan, dan saldo movement.", fields: ["id int PK", "user_id int FK", "type string", "category_id int FK", "amount decimal", "notes string", "transaction_date date", "is_recurring boolean", "created_at datetime", "updated_at datetime"] },
      { name: "categories", description: "Kategori transaksi dan budget.", fields: ["id int PK", "user_id int FK", "name string", "type string", "monthly_budget decimal", "color string"] },
      { name: "bills", description: "Tagihan dan reminder jatuh tempo.", fields: ["id int PK", "user_id int FK", "name string", "amount decimal", "due_date date", "status string"] },
      activity,
      settings,
    ],
    inventory: [
      baseUsers,
      { name: "products", description: "Master produk/SKU yang tersedia di gudang.", fields: ["id int PK", "sku string unique", "name string", "category string", "supplier_id int FK", "min_stock int", "current_stock int", "created_at datetime", "updated_at datetime"] },
      { name: "stock_movements", description: "Riwayat stok masuk dan keluar.", fields: ["id int PK", "product_id int FK", "user_id int FK", "type string", "quantity int", "reason string", "location_id int FK", "batch_number string", "created_at datetime"] },
      { name: "locations", description: "Lokasi gudang, rak, atau cabang.", fields: ["id int PK", "name string", "code string", "description string"] },
      { name: "suppliers", description: "Supplier produk.", fields: ["id int PK", "name string", "contact string", "notes string"] },
      settings,
    ],
    "booking-system": [
      baseUsers,
      { name: "services", description: "Layanan yang dapat dibooking.", fields: ["id int PK", "name string", "duration_minutes int", "price decimal", "capacity int", "is_active boolean"] },
      { name: "booking_slots", description: "Slot jadwal yang tersedia.", fields: ["id int PK", "service_id int FK", "starts_at datetime", "ends_at datetime", "capacity int", "remaining_capacity int"] },
      { name: "bookings", description: "Data booking customer.", fields: ["id int PK", "service_id int FK", "slot_id int FK", "customer_name string", "customer_contact string", "status string", "notes string", "created_at datetime", "updated_at datetime"] },
      activity,
      settings,
    ],
    "learning-app": [
      baseUsers,
      { name: "courses", description: "Kumpulan materi belajar.", fields: ["id int PK", "title string", "description string", "level string", "created_at datetime"] },
      { name: "lessons", description: "Lesson di dalam course.", fields: ["id int PK", "course_id int FK", "title string", "content text", "sort_order int", "created_at datetime"] },
      { name: "quizzes", description: "Kuis dan pertanyaan untuk lesson.", fields: ["id int PK", "lesson_id int FK", "question text", "options_json string", "correct_answer string"] },
      { name: "student_progress", description: "Progress dan skor learner.", fields: ["id int PK", "user_id int FK", "course_id int FK", "lesson_id int FK", "score int", "completed_at datetime"] },
      settings,
    ],
    "crm-sales": [
      baseUsers,
      { name: "leads", description: "Prospek dan customer potensial.", fields: ["id int PK", "owner_id int FK", "name string", "company string", "email string", "phone string", "source string", "stage string", "deal_value decimal", "next_follow_up date", "created_at datetime"] },
      { name: "sales_activities", description: "Call, meeting, email, dan notes sales.", fields: ["id int PK", "lead_id int FK", "user_id int FK", "type string", "notes text", "activity_at datetime"] },
      { name: "pipeline_stages", description: "Konfigurasi stage pipeline.", fields: ["id int PK", "name string", "sort_order int", "probability int"] },
      settings,
    ],
    "task-management": [
      baseUsers,
      { name: "projects", description: "Workspace/project tempat task dikelompokkan.", fields: ["id int PK", "name string", "description string", "owner_id int FK", "created_at datetime"] },
      { name: "tasks", description: "Task yang harus dikerjakan.", fields: ["id int PK", "project_id int FK", "assignee_id int FK", "title string", "description text", "status string", "priority string", "due_date date", "created_at datetime", "updated_at datetime"] },
      { name: "task_comments", description: "Komentar pada task.", fields: ["id int PK", "task_id int FK", "user_id int FK", "body text", "created_at datetime"] },
      activity,
      settings,
    ],
    "content-management": [
      baseUsers,
      { name: "posts", description: "Konten utama seperti artikel atau halaman.", fields: ["id int PK", "author_id int FK", "title string", "slug string unique", "body text", "status string", "published_at datetime", "created_at datetime", "updated_at datetime"] },
      { name: "categories", description: "Kategori konten.", fields: ["id int PK", "name string", "slug string unique"] },
      { name: "tags", description: "Tag konten.", fields: ["id int PK", "name string", "slug string unique"] },
      { name: "revisions", description: "Riwayat revisi konten.", fields: ["id int PK", "post_id int FK", "user_id int FK", "snapshot_json string", "created_at datetime"] },
      activity,
      settings,
    ],
    "e-commerce": [
      baseUsers,
      { name: "products", description: "Produk katalog toko.", fields: ["id int PK", "name string", "slug string unique", "description text", "price decimal", "stock int", "status string", "created_at datetime"] },
      { name: "customers", description: "Data customer order.", fields: ["id int PK", "name string", "email string", "phone string", "address text"] },
      { name: "orders", description: "Order dari customer.", fields: ["id int PK", "customer_id int FK", "status string", "total decimal", "payment_status string", "created_at datetime", "updated_at datetime"] },
      { name: "order_items", description: "Item produk di dalam order.", fields: ["id int PK", "order_id int FK", "product_id int FK", "quantity int", "unit_price decimal", "line_total decimal"] },
      activity,
      settings,
    ],
    "saas-dashboard": [
      baseUsers,
      { name: "workspaces", description: "Tenant atau workspace dashboard.", fields: ["id int PK", "name string", "owner_id int FK", "plan string", "created_at datetime"] },
      { name: "metrics", description: "Metric/KPI yang dipantau.", fields: ["id int PK", "workspace_id int FK", "name string", "value decimal", "target decimal", "period date", "created_at datetime"] },
      { name: "workspace_members", description: "User dan role dalam workspace.", fields: ["id int PK", "workspace_id int FK", "user_id int FK", "role string", "created_at datetime"] },
      activity,
      settings,
    ],
    "generic-web-app": [
      baseUsers,
      { name: "records", description: "Data utama aplikasi.", fields: ["id int PK", "user_id int FK", "title string", "category string", "status string", "notes text", "created_at datetime", "updated_at datetime"] },
      activity,
      settings,
    ],
  };

  return tableByDomain[domain];
}

export function generateCoreFeatures(domain: ProjectDomain, answers: PrdAnswer[]) {
  const profile = getDomainProfile(domain, "");
  const answerText = answers.map((answer) => answer.answer).join(" ").toLowerCase();
  const features = [...profile.features];

  if (includesAny(answerText, ["export", "csv", "pdf", "laporan"])) {
    features.push(createFeature("Advanced Export", "User dapat mengekspor data sesuai filter yang aktif untuk laporan atau backup.", "Filter periode, kategori, status, dan format.", "CSV atau print-friendly report.", "Implementasi harus lokal dulu tanpa API eksternal."));
  }

  if (includesAny(answerText, ["reminder", "alert", "notifikasi"])) {
    features.push(createFeature("Smart Alerts", "Aplikasi menampilkan alert visual untuk kondisi penting yang butuh tindakan user.", "Threshold, tanggal, status, dan event domain.", "Alert dashboard dan badge status.", "MVP cukup visual alert, email/push notification dapat masuk fase berikutnya."));
  }

  if (includesAny(answerText, ["multi admin", "banyak admin", "team", "tim", "role"])) {
    features.push(createFeature("Role & Team Access", "Aplikasi menyiapkan role dasar agar data dan aksi dapat dipisahkan per tipe user.", "Role user, ownership, permission.", "Kontrol akses dasar dan UI sesuai role.", "Untuk MVP bisa demo role tanpa auth eksternal."));
  }

  return features.slice(0, 8);
}

function getAnsweredContext(answers: PrdAnswer[]) {
  const filled = answers.filter((item) => cleanText(item.answer));
  if (!filled.length) {
    return "- User belum menambahkan jawaban tambahan. Gunakan asumsi domain yang paling masuk akal dan buat MVP mudah divalidasi.";
  }

  return filled
    .map((item, index) => `${index + 1}. ${item.question}\n   Jawaban: ${cleanText(item.answer)}`)
    .join("\n");
}

function renderCoreFeatures(features: CoreFeature[]) {
  return features
    .map(
      (feature, index) => `### 3.${index + 1} ${feature.name}
- **Deskripsi:** ${feature.description}
- **Input:** ${feature.input}
- **Output:** ${feature.output}
- **Catatan:** ${feature.notes}`,
    )
    .join("\n\n");
}

function singularSnake(text: string) {
  return text.endsWith("s") ? text.slice(0, -1) : text;
}

function pascal(text: string) {
  return text
    .split(/[_-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function pascalSingular(text: string) {
  return pascal(singularSnake(text));
}

function renderErd(tables: DatabaseTable[], profile: DomainProfile) {
  const tableBlocks = tables
    .map(
      (table) => `    ${table.name} {
${table.fields.map((field) => `        ${field}`).join("\n")}
    }`,
    )
    .join("\n\n");

  return `\`\`\`mermaid
erDiagram
${tableBlocks}

    users ||--o{ ${profile.primaryEntity} : "owns"
    users ||--o{ ${profile.activityEntity} : "creates"
    users ||--o{ ${profile.settingsEntity} : "configures"
    ${profile.primaryEntity} ||--o{ ${profile.activityEntity} : "has history"
\`\`\`

| Tabel | Deskripsi |
| --- | --- |
${tables.map((table) => `| ${table.name} | ${table.description} |`).join("\n")}`;
}

function renderArchitecture(profile: DomainProfile) {
  return `Arsitektur aplikasi dibuat sederhana dan mudah dikembangkan. Browser menampilkan UI, frontend mengirim aksi ke server actions/API, backend melakukan validasi dan authorization, lalu database menyimpan ${profile.primaryEntityLabel}, settings, dan activity log. Untuk MVP tanpa service eksternal, persistence dapat dimulai dari data dummy lokal dan helper function yang bentuknya menyerupai repository/database layer.

\`\`\`mermaid
sequenceDiagram
    participant Pengguna as Browser Pengguna
    participant UI as Frontend
    participant API as Backend/API
    participant DB as Database

    Pengguna->>UI: Mengisi form atau menjalankan aksi
    UI->>API: Mengirim request yang sudah divalidasi
    API->>API: Mengecek akses pengguna dan aturan domain
    API->>DB: Menyimpan ${profile.primaryEntityLabel} dan activity log
    DB-->>API: Mengembalikan data tersimpan
    API-->>UI: Mengembalikan sukses atau error validasi
    UI-->>Pengguna: Memperbarui dashboard, list, dan peringatan
\`\`\``;
}

function renderApiSpec(profile: DomainProfile, backend: string) {
  const useServerActions = backend.toLowerCase().includes("server action") || backend.toLowerCase().includes("next.js");

  if (useServerActions) {
    return `Gunakan Server Actions atau fungsi lokal dengan kontrak berikut:

\`\`\`ts
${profile.apiActions.join("\n")}
\`\`\`

Pola response:

\`\`\`ts
type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
\`\`\`

Aturan implementasi:
- Semua mutation wajib validasi input.
- Semua query menerima filter domain seperti keyword, status, date range, page, dan limit jika relevan.
- Pisahkan data logic di folder lib agar mudah diganti dari dummy data ke database sungguhan.`;
  }

  return `Gunakan API Routes dengan kontrak awal berikut:

### POST /api/${profile.primaryEntity}
Request:

\`\`\`json
{
  "title": "string",
  "status": "string",
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

### GET /api/${profile.primaryEntity}?keyword=:keyword&status=:status&page=:page
Mengembalikan daftar ${profile.primaryEntityLabel} berdasarkan filter.

### PATCH /api/${profile.primaryEntity}/:id
Mengubah ${profile.primaryEntityLabel}.

### DELETE /api/${profile.primaryEntity}/:id
Menghapus ${profile.primaryEntityLabel}.

### GET /api/dashboard/summary
Mengembalikan metrik dashboard sesuai domain ${profile.label}.`;
}

function renderFinalAgentPrompt(
  input: GeneratePRDInput,
  domain: ProjectDomain,
  profile: DomainProfile,
  tech: StackRecommendation,
  tables: DatabaseTable[],
  features: CoreFeature[],
) {
  return `\`\`\`text
Build a complete production-ready web application based on this PRD.

PROJECT DOMAIN:
${profile.label}

PROJECT NAME:
${profile.projectName}

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
${features.map((feature) => `- ${feature.name}: ${feature.description}`).join("\n")}

DATABASE TABLES:
${tables.map((table) => `- ${table.name}: ${table.fields.join(", ")}`).join("\n")}

API OR SERVER ACTIONS:
${profile.apiActions.map((action) => `- ${action}`).join("\n")}

USER FLOW:
${profile.flow.map((step, index) => `${index + 1}. ${step}`).join("\n")}

UI RULES:
- Build an actual usable app, not only a landing page.
- Create all required pages and connect them with realistic dummy/local data first.
- Include responsive desktop and mobile layouts.
- Include dashboard cards, forms, data lists/tables, detail views, empty states, loading states, error states, and success feedback.
- Follow this design tone: ${profile.designTone}
- Keep labels clear for non-technical users.

SECURITY RULES:
- Validate all form inputs.
- Never expose API keys or secrets in frontend code.
- Protect user-owned data by userId or session identity when auth is added.
- Sanitize displayed user-generated text where relevant.
- Use environment variables only for future external services.

ENVIRONMENT VARIABLES:
- No environment variables are required for the MVP if using dummy/local data.
- If a real database is added later, document required variables in .env.example and README.

DEPLOYMENT TARGET:
- Deploy to ${tech.deployment}.
- npm run build must pass before finishing.
- Fix all TypeScript, runtime, lint, and build errors before final response.

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
7. Summarize files changed and important implementation decisions.

Detected domain: ${domain}
\`\`\``;
}

export function generatePRD(input: GeneratePRDInput) {
  const idea = cleanText(input.idea);
  const domain = detectProjectDomain(idea);
  const profile = getDomainProfile(domain, idea);
  const tech = getFinalStack(input, domain);
  const tables = generateDatabaseSchema(domain, idea);
  const features = generateCoreFeatures(domain, input.answers);
  const answeredContext = getAnsweredContext(input.answers);

  return normalizePrdExceptFinalPrompt(`# PRD — Project Requirements Document

## Nama Proyek
${profile.projectName}

## 1. Overview
${profile.projectName} adalah aplikasi ${profile.label} yang dibuat berdasarkan ide berikut:

> ${idea}

Masalah utama yang ingin diselesaikan adalah proses lama yang masih manual, tersebar, sulit dipantau, dan tidak punya sumber data yang konsisten. Pada domain ${profile.label}, user biasanya membutuhkan alur yang jelas untuk memasukkan data, melihat status terbaru, memahami riwayat, dan mengambil tindakan tanpa membuka banyak tool berbeda.

Target pengguna utama adalah ${profile.targetUsers.join(", ")}. Solusi yang disarankan adalah aplikasi web responsive dengan dashboard, form input, list/detail data, activity history, settings, dan report sesuai domain.

Domain yang terdeteksi: **${profile.label}**

Konteks tambahan dari jawaban user:
${answeredContext}

## 2. Requirements
- **Platform:** Web browser, responsive desktop dan mobile.
- **Pengguna:** ${profile.targetUsers.join(", ")}.
- **Role Pengguna:** ${profile.roles.join(", ")}.
- **Metode Input Data:** ${profile.inputMethods.join(", ")}.
- **Data Utama yang Disimpan:** ${profile.storedData.join(", ")}.
- **Notifikasi/Alert:** ${profile.notifications}
- **Batasan MVP:** Buat MVP usable dengan dummy/local data terlebih dahulu. Jangan gunakan API eksternal, Firebase, OpenAI API, payment gateway, atau secret key pada versi awal.
- **Security:** Login/demo mode, validasi input, ownership data per user/workspace, sanitasi text output, dan tidak mengekspos secret di frontend.
- **Tech Preference Mode:** ${input.techMode === "ai" ? "Biarkan AI pilih" : "Pilih sendiri"}.
- **Recommended Stack:** Frontend ${tech.frontend}, Backend ${tech.backend}, Database ${tech.database}, Deployment ${tech.deployment}.
- **Alasan Stack:** ${tech.reason}

## 3. Core Features
${renderCoreFeatures(features)}

## 4. User Flow
${profile.flow.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## 5. Architecture
${renderArchitecture(profile)}

## 6. Database Schema
${renderErd(tables, profile)}

## 7. Design & Technical Constraints
- **Style UI:** ${profile.designTone}
- **Typography:** Gunakan font sans-serif modern, heading jelas, body text nyaman, dan spacing konsisten.
- **Warna:** Gunakan palet dark/neutral atau clean light sesuai produk, dengan warna status yang jelas untuk success, warning, danger, dan info.
- **Responsive Design:** Semua halaman harus nyaman di mobile 360px, tablet, dan desktop.
- **Accessibility:** Setiap input punya label, focus state terlihat, kontras cukup, tombol punya teks jelas, dan flow bisa dipakai keyboard.
- **Performance:** Minimalkan dependency, hindari request eksternal pada MVP, gunakan component sederhana, dan pastikan data dummy tidak membuat UI lambat.
- **Security:** Validasi input di client dan server layer, pisahkan data per user/workspace, jangan expose API key, dan siapkan .env.example hanya jika service eksternal ditambahkan nanti.
- **Deployment Target:** ${tech.deployment}.
- **Recommended Implementation:** ${tech.frontend}, ${tech.backend}, ${tech.database}, dan TypeScript.

## 8. API Specification / Server Actions
${renderApiSpec(profile, tech.backend)}

## 9. Acceptance Criteria
${profile.acceptance.map((item) => `- [ ] ${item}`).join("\n")}
- [ ] User bisa login atau masuk sebagai demo user.
- [ ] UI responsive di mobile dan desktop.
- [ ] Empty state, loading state, error state, dan success feedback tersedia.
- [ ] Build production berhasil.
- [ ] Tidak ada API key yang terekspos di frontend.

## 10. Prompt untuk AI Coding Agent
${renderFinalAgentPrompt(input, domain, profile, tech, tables, features)}
`);
}

export { genericQuestions as defaultQuestions };
