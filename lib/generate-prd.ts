import type { AppLanguage } from "@/lib/i18n";

export type TechMode = "ai" | "manual";
export type ApiMode = "local" | "economy" | "full";

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

export type GeneratePRDInput = {
  idea: string;
  language?: AppLanguage;
  domain?: ProjectDomain;
  apiMode?: ApiMode;
  techMode: TechMode;
  selectedTech: SelectedTech;
  answers: PrdAnswer[];
};

type Feature = {
  name: string;
  description: string;
  input: string;
  output: string;
  notes: string;
};

type Table = {
  name: string;
  description: string;
  fields: string[];
};

type DomainProfile = {
  labelId: string;
  labelEn: string;
  projectNameId: string;
  projectNameEn: string;
  usersId: string[];
  usersEn: string[];
  rolesId: string[];
  rolesEn: string[];
  inputsId: string[];
  inputsEn: string[];
  storedDataId: string[];
  storedDataEn: string[];
  notificationsId: string;
  notificationsEn: string;
  pages: string[];
  questionsId: string[];
  questionsEn: string[];
  chipsId: string[][];
  chipsEn: string[][];
  featuresId: Feature[];
  featuresEn: Feature[];
  tables: Table[];
  flowId: string[];
  flowEn: string[];
  apiActions: string[];
  designToneId: string;
  designToneEn: string;
};

const projectDomains: ProjectDomain[] = [
  "finance-tracker",
  "inventory",
  "booking-system",
  "learning-app",
  "crm-sales",
  "task-management",
  "content-management",
  "e-commerce",
  "saas-dashboard",
  "generic-web-app",
];

export function isProjectDomain(value: unknown): value is ProjectDomain {
  return typeof value === "string" && projectDomains.includes(value as ProjectDomain);
}

function cleanText(text: string) {
  return text.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ").trim();
}

function includesAny(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

function feature(name: string, description: string, input: string, output: string, notes: string): Feature {
  return { name, description, input, output, notes };
}

const discoveryQuestionsId = [
  "Website ini akan dipakai oleh siapa dan mereka sekarang menyelesaikan masalah ini dengan cara apa?",
  "Masalah utama apa yang paling ingin diselesaikan oleh website ini?",
  "Fitur wajib apa saja yang harus ada di versi pertama agar website ini berguna?",
  "Data apa saja yang perlu disimpan, dilihat ulang, dicari, atau diedit oleh user?",
  "Apakah website ini membutuhkan login, dashboard, laporan/export, notifikasi, atau admin panel? Jelaskan yang wajib.",
];

const discoveryQuestionsEn = [
  "Who will use this website and how do they currently solve this problem?",
  "What is the main problem this website must solve?",
  "Which must-have features are required in the first version?",
  "What data must users save, review, search, or edit?",
  "Does this website need login, dashboard, reports/export, notifications, or an admin panel? Explain what is required.",
];

const discoveryChipsId = [
  ["Pemula", "Pelanggan", "Admin", "Tim internal"],
  ["Proses manual", "Data berantakan", "Sulit dipantau", "Butuh booking"],
  ["Dashboard", "Form input", "CRUD data", "Search/filter"],
  ["User", "Produk", "Transaksi", "Jadwal", "Laporan"],
  ["Login", "Dashboard", "Export", "Notifikasi", "Admin panel"],
];

const discoveryChipsEn = [
  ["Beginners", "Customers", "Admin", "Internal team"],
  ["Manual process", "Messy data", "Hard to monitor", "Needs booking"],
  ["Dashboard", "Input form", "CRUD data", "Search/filter"],
  ["Users", "Products", "Transactions", "Schedules", "Reports"],
  ["Login", "Dashboard", "Export", "Notifications", "Admin panel"],
];

const profiles: Record<ProjectDomain, DomainProfile> = {
  inventory: {
    labelId: "Manajemen Stok Gudang",
    labelEn: "Inventory Management",
    projectNameId: "Website Pencatat Stok Gudang",
    projectNameEn: "Warehouse Stock Tracker",
    usersId: ["Pemilik usaha kecil", "Admin gudang", "Staf operasional"],
    usersEn: ["Small business owner", "Warehouse admin", "Operations staff"],
    rolesId: ["Owner", "Admin gudang", "Staf input stok"],
    rolesEn: ["Owner", "Warehouse admin", "Stock entry staff"],
    inputsId: ["Produk", "SKU", "stok masuk", "stok keluar", "lokasi rak", "supplier"],
    inputsEn: ["Products", "SKUs", "stock in", "stock out", "shelf location", "supplier"],
    storedDataId: ["users", "products", "suppliers", "stock_movements", "warehouse_locations"],
    storedDataEn: ["users", "products", "suppliers", "stock_movements", "warehouse_locations"],
    notificationsId: "Peringatan stok minimum, stok kosong, dan pergerakan stok yang perlu ditinjau.",
    notificationsEn: "Low-stock, out-of-stock, and stock movement review alerts.",
    pages: ["Dashboard", "Produk", "Stok Masuk", "Stok Keluar", "Riwayat Stok", "Laporan", "Admin"],
    questionsId: [
      "Stok ini untuk toko kecil, gudang, produksi, atau distribusi?",
      "Data produk apa yang wajib ada: SKU, barcode, batch, expiry date, lokasi rak, atau supplier?",
      "Siapa saja yang boleh menambah stok masuk dan mencatat stok keluar?",
      "Apakah perlu dashboard stok minimum, laporan riwayat, dan export CSV/PDF?",
      "Apakah perlu login dan admin panel untuk mengatur produk, user, dan supplier?",
    ],
    questionsEn: [
      "Is this for a small store, warehouse, production, or distribution workflow?",
      "Which product data is required: SKU, barcode, batch, expiry date, shelf location, or supplier?",
      "Who can add stock in and record stock out?",
      "Do you need low-stock dashboard, history reports, and CSV/PDF export?",
      "Do you need login and an admin panel to manage products, users, and suppliers?",
    ],
    chipsId: [
      ["Toko kecil", "Gudang", "Produksi", "Distribusi"],
      ["SKU", "Barcode", "Batch", "Expiry date", "Lokasi rak"],
      ["Owner", "Admin gudang", "Staf"],
      ["Stok minimum", "Riwayat", "Export CSV", "Export PDF"],
      ["Login", "Admin panel", "Multi user"],
    ],
    chipsEn: [
      ["Small store", "Warehouse", "Production", "Distribution"],
      ["SKU", "Barcode", "Batch", "Expiry date", "Shelf location"],
      ["Owner", "Warehouse admin", "Staff"],
      ["Low stock", "History", "CSV export", "PDF export"],
      ["Login", "Admin panel", "Multi user"],
    ],
    featuresId: [
      feature("Dashboard Utama", "Menampilkan total produk, stok menipis, stok kosong, dan aktivitas stok terbaru.", "Data produk dan stock_movements.", "Ringkasan stok yang mudah dipantau.", "Prioritaskan angka besar, status warna, dan tabel aktivitas terbaru."),
      feature("Manajemen Produk", "User dapat menambah, mengedit, menghapus, dan mencari produk.", "Nama produk, SKU, kategori, stok minimum, lokasi, supplier.", "Produk tersimpan dan muncul di dashboard.", "Validasi SKU unik jika digunakan."),
      feature("Stok Masuk", "Mencatat penambahan stok dari pembelian, retur, atau produksi.", "Produk, jumlah, tanggal, supplier, catatan.", "Stok produk bertambah dan riwayat tersimpan.", "Jumlah wajib angka positif."),
      feature("Stok Keluar", "Mencatat pengurangan stok untuk penjualan, pemakaian, rusak, atau transfer.", "Produk, jumlah, tanggal, alasan, catatan.", "Stok berkurang dan sistem mencegah stok negatif.", "Berikan error jika jumlah melebihi stok tersedia."),
      feature("Laporan Riwayat", "User dapat melihat, memfilter, dan mengekspor riwayat stok.", "Tanggal, produk, tipe pergerakan, keyword.", "Tabel riwayat dan file export.", "Export berjalan dari data yang sudah difilter."),
    ],
    featuresEn: [
      feature("Main Dashboard", "Shows total products, low stock, empty stock, and recent stock activity.", "Product and stock movement data.", "A scannable inventory summary.", "Prioritize large numbers, status colors, and recent activity."),
      feature("Product Management", "Users can create, edit, delete, and search products.", "Product name, SKU, category, minimum stock, location, supplier.", "Saved products appear in dashboard.", "Validate unique SKU if used."),
      feature("Stock In", "Records incoming stock from purchase, return, or production.", "Product, quantity, date, supplier, notes.", "Product stock increases and history is saved.", "Quantity must be positive."),
      feature("Stock Out", "Records outgoing stock for sale, usage, damage, or transfer.", "Product, quantity, date, reason, notes.", "Stock decreases and negative stock is prevented.", "Show error when quantity exceeds available stock."),
      feature("History Reports", "Users can view, filter, and export stock history.", "Date, product, movement type, keyword.", "History table and export file.", "Export must respect active filters."),
    ],
    tables: [
      { name: "users", description: "Data akun dan role pengguna.", fields: ["id int PK", "name string", "email string", "role string", "created_at datetime"] },
      { name: "products", description: "Master data produk yang stoknya dipantau.", fields: ["id int PK", "name string", "sku string", "category string", "minimum_stock int", "current_stock int", "location_id int FK", "supplier_id int FK", "created_at datetime"] },
      { name: "suppliers", description: "Data supplier atau sumber barang.", fields: ["id int PK", "name string", "phone string", "address text", "created_at datetime"] },
      { name: "warehouse_locations", description: "Lokasi rak, gudang, atau cabang penyimpanan.", fields: ["id int PK", "name string", "code string", "description text"] },
      { name: "stock_movements", description: "Riwayat stok masuk dan stok keluar.", fields: ["id int PK", "product_id int FK", "user_id int FK", "type string", "quantity int", "reason string", "notes text", "created_at datetime"] },
    ],
    flowId: ["User login atau masuk sebagai demo.", "Admin menambahkan produk, supplier, dan lokasi rak.", "Staf mencatat stok masuk atau stok keluar.", "Sistem memvalidasi jumlah dan memperbarui stok.", "Dashboard menampilkan stok terbaru dan alert stok minimum.", "User melihat riwayat lalu export laporan jika dibutuhkan."],
    flowEn: ["User logs in or enters demo mode.", "Admin adds products, suppliers, and shelf locations.", "Staff records stock in or stock out.", "System validates quantity and updates stock.", "Dashboard shows latest stock and low-stock alerts.", "User reviews history and exports reports when needed."],
    apiActions: ["createProduct(data)", "updateProduct(id, data)", "deleteProduct(id)", "createStockMovement(data)", "getInventoryDashboard(filters)", "exportStockMovements(filters)"],
    designToneId: "Dashboard operasional yang padat, rapi, mudah dipindai, dan memakai warna status untuk stok aman, menipis, dan kosong.",
    designToneEn: "A dense, tidy operational dashboard with clear status colors for healthy, low, and empty stock.",
  },
  "finance-tracker": {
    labelId: "Pencatat Keuangan Harian",
    labelEn: "Daily Finance Tracker",
    projectNameId: "Aplikasi Keuangan Harian",
    projectNameEn: "Daily Finance Tracker",
    usersId: ["Pengguna pribadi", "Keluarga", "Freelancer", "Pemilik usaha kecil"],
    usersEn: ["Personal users", "Families", "Freelancers", "Small business owners"],
    rolesId: ["User pribadi", "Admin keluarga", "Owner bisnis"],
    rolesEn: ["Personal user", "Family admin", "Business owner"],
    inputsId: ["Pemasukan", "pengeluaran", "kategori", "akun", "budget", "tagihan"],
    inputsEn: ["Income", "expenses", "categories", "accounts", "budgets", "bills"],
    storedDataId: ["users", "accounts", "categories", "transactions", "budgets", "recurring_bills"],
    storedDataEn: ["users", "accounts", "categories", "transactions", "budgets", "recurring_bills"],
    notificationsId: "Alert budget hampir habis, tagihan jatuh tempo, dan pengeluaran melewati batas.",
    notificationsEn: "Budget limit, upcoming bill, and overspending alerts.",
    pages: ["Dashboard", "Transaksi", "Tambah Transaksi", "Kategori", "Budget", "Tagihan", "Laporan", "Export"],
    questionsId: [
      "Aplikasi keuangan ini untuk pribadi, keluarga, freelancer, atau bisnis kecil?",
      "Data apa yang wajib dicatat: pemasukan, pengeluaran, hutang, tagihan, budget, atau saldo awal?",
      "Apakah perlu kategori transaksi, akun/dompet berbeda, dan budget per kategori?",
      "Laporan apa yang paling penting: harian, mingguan, bulanan, per kategori, atau per akun?",
      "Apakah perlu login, reminder tagihan, alert budget, dan export CSV/PDF?",
    ],
    questionsEn: [
      "Is this finance app for personal use, family use, freelancers, or a small business?",
      "What must be recorded: income, expenses, debt, bills, budgets, or opening balance?",
      "Do you need transaction categories, multiple accounts/wallets, and category budgets?",
      "Which reports matter most: daily, weekly, monthly, by category, or by account?",
      "Do you need login, bill reminders, budget alerts, and CSV/PDF export?",
    ],
    chipsId: [["Pribadi", "Keluarga", "Freelancer", "Bisnis kecil"], ["Pemasukan", "Pengeluaran", "Hutang", "Tagihan", "Budget"], ["Kategori", "Multi akun", "Budget kategori"], ["Bulanan", "Per kategori", "Per akun"], ["Login", "Reminder", "Export CSV"]],
    chipsEn: [["Personal", "Family", "Freelancer", "Small business"], ["Income", "Expenses", "Debt", "Bills", "Budget"], ["Categories", "Multi account", "Category budget"], ["Monthly", "By category", "By account"], ["Login", "Reminder", "CSV export"]],
    featuresId: [
      feature("Dashboard Keuangan", "Menampilkan saldo, pemasukan, pengeluaran, sisa budget, dan transaksi terbaru.", "Transaksi, akun, kategori, budget.", "Ringkasan cashflow dan grafik sederhana.", "Dashboard harus tetap berguna dengan data dummy."),
      feature("Pencatatan Pemasukan", "User mencatat pemasukan dari gaji, penjualan, bonus, atau sumber lain.", "Nominal, tanggal, akun, kategori, catatan.", "Saldo akun bertambah dan transaksi tersimpan.", "Nominal wajib positif."),
      feature("Pencatatan Pengeluaran", "User mencatat pengeluaran harian dan mengelompokkannya.", "Nominal, tanggal, akun, kategori, catatan.", "Saldo akun berkurang dan laporan diperbarui.", "Berikan validasi untuk data kosong."),
      feature("Kategori Transaksi", "User membuat kategori dan budget agar pengeluaran mudah dianalisis.", "Nama kategori, tipe, warna, limit bulanan.", "Kategori muncul di form dan laporan.", "Sediakan kategori default."),
      feature("Grafik Bulanan", "Menampilkan tren pemasukan, pengeluaran, dan kategori terbesar.", "Rentang bulan dan filter akun.", "Grafik dan insight bulanan.", "Gunakan chart sederhana tanpa API eksternal."),
      feature("Export Laporan", "User mengekspor transaksi sesuai filter.", "Periode, kategori, akun, format.", "CSV atau print-friendly report.", "Export harus jelas untuk arsip pribadi."),
    ],
    featuresEn: [
      feature("Finance Dashboard", "Shows balance, income, expenses, remaining budget, and recent transactions.", "Transactions, accounts, categories, budgets.", "Cashflow summary and simple charts.", "Dashboard must be useful with dummy data."),
      feature("Income Entry", "Users record income from salary, sales, bonus, or other sources.", "Amount, date, account, category, notes.", "Account balance increases and transaction is saved.", "Amount must be positive."),
      feature("Expense Entry", "Users record daily expenses and categorize them.", "Amount, date, account, category, notes.", "Account balance decreases and reports update.", "Validate empty data."),
      feature("Transaction Categories", "Users create categories and budgets for easier analysis.", "Category name, type, color, monthly limit.", "Categories appear in forms and reports.", "Provide default categories."),
      feature("Monthly Charts", "Shows income, expenses, and top categories over time.", "Month range and account filter.", "Charts and monthly insight.", "Use simple charts without external APIs."),
      feature("Report Export", "Users export filtered transactions.", "Period, category, account, format.", "CSV or print-friendly report.", "Export must be useful for personal records."),
    ],
    tables: [
      { name: "users", description: "Data akun pengguna.", fields: ["id int PK", "name string", "email string", "role string", "created_at datetime"] },
      { name: "accounts", description: "Dompet, rekening, atau sumber saldo.", fields: ["id int PK", "user_id int FK", "name string", "type string", "opening_balance decimal", "current_balance decimal"] },
      { name: "categories", description: "Kategori pemasukan dan pengeluaran.", fields: ["id int PK", "user_id int FK", "name string", "type string", "color string", "monthly_limit decimal"] },
      { name: "transactions", description: "Data pemasukan dan pengeluaran harian.", fields: ["id int PK", "user_id int FK", "account_id int FK", "category_id int FK", "type string", "amount decimal", "date date", "notes text"] },
      { name: "budgets", description: "Target atau batas budget bulanan.", fields: ["id int PK", "user_id int FK", "category_id int FK", "month string", "limit_amount decimal"] },
      { name: "recurring_bills", description: "Tagihan rutin dan reminder.", fields: ["id int PK", "user_id int FK", "name string", "amount decimal", "due_day int", "status string"] },
    ],
    flowId: ["User login atau masuk mode demo.", "User mengatur akun/dompet dan kategori awal.", "User menambah pemasukan atau pengeluaran.", "Dashboard memperbarui saldo dan metrik bulanan.", "User memfilter transaksi dan melihat grafik.", "User export laporan untuk arsip."],
    flowEn: ["User logs in or enters demo mode.", "User sets accounts/wallets and starter categories.", "User adds income or expense.", "Dashboard updates balance and monthly metrics.", "User filters transactions and reviews charts.", "User exports reports for records."],
    apiActions: ["createTransaction(data)", "updateTransaction(id, data)", "deleteTransaction(id)", "getFinanceDashboard(filters)", "createCategory(data)", "exportTransactions(filters)"],
    designToneId: "Dashboard finansial yang tenang, jelas, dan menonjolkan angka penting tanpa dekorasi berlebihan.",
    designToneEn: "A calm, clear finance dashboard that highlights important numbers without excessive decoration.",
  },
  "booking-system": {
    labelId: "Sistem Booking Layanan",
    labelEn: "Service Booking System",
    projectNameId: "Website Booking Layanan",
    projectNameEn: "Service Booking Website",
    usersId: ["Pelanggan", "Admin layanan", "Owner bisnis jasa"],
    usersEn: ["Customers", "Service admin", "Service business owner"],
    rolesId: ["Customer", "Admin", "Owner"],
    rolesEn: ["Customer", "Admin", "Owner"],
    inputsId: ["Layanan", "jadwal", "booking", "data pelanggan", "status pesanan", "pembayaran"],
    inputsEn: ["Services", "schedules", "bookings", "customer data", "order status", "payments"],
    storedDataId: ["users", "services", "bookings", "schedules", "payments"],
    storedDataEn: ["users", "services", "bookings", "schedules", "payments"],
    notificationsId: "Notifikasi status booking, reminder jadwal, dan perubahan pesanan.",
    notificationsEn: "Booking status, schedule reminder, and order update notifications.",
    pages: ["Landing Page Layanan", "Form Booking", "Jadwal", "Status Pesanan", "Dashboard Admin", "Laporan Booking"],
    questionsId: ["Layanan apa yang akan dibooking dan berapa durasi tiap layanan?", "Apakah user memilih tanggal, jam, staff, lokasi, atau paket layanan?", "Apakah booking langsung diterima atau perlu approval admin?", "Status pesanan apa saja yang dibutuhkan?", "Apakah perlu pembayaran, DP, reminder, laporan, dan admin panel?"],
    questionsEn: ["What service will users book and how long does each service take?", "Will users choose date, time, staff, location, or service package?", "Are bookings auto-confirmed or approved by admin?", "Which order statuses are needed?", "Do you need payment, deposit, reminders, reports, and admin panel?"],
    chipsId: [["Laundry", "Salon", "Konsultasi", "Rental"], ["Tanggal", "Jam", "Staff", "Lokasi"], ["Auto confirm", "Approval admin"], ["Pending", "Confirmed", "Completed", "Cancelled"], ["DP", "Reminder", "Laporan", "Admin panel"]],
    chipsEn: [["Laundry", "Salon", "Consultation", "Rental"], ["Date", "Time", "Staff", "Location"], ["Auto confirm", "Admin approval"], ["Pending", "Confirmed", "Completed", "Cancelled"], ["Deposit", "Reminder", "Reports", "Admin panel"]],
    featuresId: [
      feature("Landing Page Layanan", "Menampilkan daftar layanan, harga, durasi, dan CTA booking.", "Data layanan dan paket.", "Halaman layanan yang mudah dipilih pelanggan.", "Jangan hanya marketing, CTA harus masuk ke flow booking."),
      feature("Form Booking", "Pelanggan mengisi data booking dengan tanggal, jam, layanan, dan kontak.", "Nama, kontak, layanan, slot, catatan.", "Booking tersimpan dengan status awal.", "Form wajib validasi data kontak dan slot."),
      feature("Manajemen Jadwal", "Admin mengatur slot tersedia dan melihat benturan jadwal.", "Tanggal, jam, kapasitas, staff.", "Slot booking tersedia atau penuh.", "Cegah double booking."),
      feature("Status Pesanan", "Pelanggan dan admin dapat melihat status booking.", "Kode booking atau login.", "Status pending, confirmed, completed, cancelled.", "Status harus jelas dan mudah dilacak."),
      feature("Dashboard Admin", "Admin memantau booking hari ini, total booking, dan status pesanan.", "Data booking dan filter tanggal.", "Ringkasan operasional.", "Berikan aksi ubah status cepat."),
      feature("Laporan Booking", "Admin melihat riwayat booking dan export laporan.", "Periode, layanan, status.", "Tabel laporan dan export.", "Export CSV cukup untuk MVP."),
    ],
    featuresEn: [
      feature("Service Landing Page", "Shows services, prices, duration, and booking CTA.", "Service and package data.", "A service page customers can choose from.", "CTA must enter the booking flow."),
      feature("Booking Form", "Customers submit bookings with date, time, service, and contact.", "Name, contact, service, slot, notes.", "Booking is saved with initial status.", "Validate contact data and slot."),
      feature("Schedule Management", "Admin manages available slots and schedule conflicts.", "Date, time, capacity, staff.", "Available or full booking slots.", "Prevent double booking."),
      feature("Order Status", "Customers and admins can view booking status.", "Booking code or login.", "Pending, confirmed, completed, cancelled status.", "Status must be easy to track."),
      feature("Admin Dashboard", "Admin monitors today's bookings, total bookings, and order status.", "Booking data and date filters.", "Operational summary.", "Include quick status actions."),
      feature("Booking Reports", "Admin views booking history and exports reports.", "Period, service, status.", "Report table and export.", "CSV export is enough for MVP."),
    ],
    tables: [
      { name: "users", description: "Data customer dan admin.", fields: ["id int PK", "name string", "email string", "phone string", "role string"] },
      { name: "services", description: "Daftar layanan yang bisa dibooking.", fields: ["id int PK", "name string", "description text", "duration_minutes int", "price decimal", "is_active boolean"] },
      { name: "schedules", description: "Slot jadwal yang tersedia.", fields: ["id int PK", "service_id int FK", "staff_name string", "start_time datetime", "end_time datetime", "capacity int", "status string"] },
      { name: "bookings", description: "Data booking pelanggan.", fields: ["id int PK", "user_id int FK", "service_id int FK", "schedule_id int FK", "status string", "notes text", "created_at datetime"] },
      { name: "payments", description: "Catatan pembayaran atau DP.", fields: ["id int PK", "booking_id int FK", "amount decimal", "method string", "status string", "paid_at datetime"] },
    ],
    flowId: ["Pelanggan membuka landing page layanan.", "Pelanggan memilih layanan dan slot jadwal.", "Pelanggan mengisi form booking.", "Sistem menyimpan booking dan memberi status awal.", "Admin melihat booking di dashboard dan mengubah status.", "Pelanggan mengecek status dan admin export laporan."],
    flowEn: ["Customer opens service landing page.", "Customer chooses service and schedule slot.", "Customer fills booking form.", "System saves booking and returns initial status.", "Admin reviews booking and changes status.", "Customer checks status and admin exports reports."],
    apiActions: ["createBooking(data)", "updateBookingStatus(id, status)", "getAvailableSchedules(filters)", "createService(data)", "updateSchedule(id, data)", "exportBookings(filters)"],
    designToneId: "Tampilan booking yang sederhana, cepat, dan jelas dengan status pesanan yang mudah dipahami.",
    designToneEn: "A simple, fast, clear booking interface with easy-to-understand order status.",
  },
  "learning-app": {
    labelId: "Aplikasi Belajar",
    labelEn: "Learning Application",
    projectNameId: "Website Belajar Online",
    projectNameEn: "Online Learning Website",
    usersId: ["Siswa", "Mentor", "Admin konten"],
    usersEn: ["Learners", "Mentors", "Content admins"],
    rolesId: ["Siswa", "Mentor", "Admin"],
    rolesEn: ["Learner", "Mentor", "Admin"],
    inputsId: ["Materi", "kelas", "kuis", "progress", "nilai"],
    inputsEn: ["Lessons", "classes", "quizzes", "progress", "scores"],
    storedDataId: ["users", "courses", "lessons", "quizzes", "progress_records"],
    storedDataEn: ["users", "courses", "lessons", "quizzes", "progress_records"],
    notificationsId: "Reminder belajar, materi baru, dan progress belum selesai.",
    notificationsEn: "Study reminders, new content, and incomplete progress alerts.",
    pages: ["Dashboard Belajar", "Katalog Kelas", "Detail Materi", "Kuis", "Progress", "Admin Konten"],
    questionsId: ["Siapa peserta belajarnya dan level mereka apa?", "Format materi apa yang wajib ada: teks, video, kuis, atau tugas?", "Apakah perlu progress, nilai, sertifikat, atau leaderboard?", "Apakah ada mentor/admin yang memberi feedback?", "Apakah perlu login, reminder, dan dashboard admin konten?"],
    questionsEn: ["Who are the learners and what is their level?", "What content format is required: text, video, quizzes, or assignments?", "Do you need progress, scores, certificates, or leaderboard?", "Is there a mentor/admin who gives feedback?", "Do you need login, reminders, and content admin dashboard?"],
    chipsId: [["Pemula", "Siswa sekolah", "Karyawan"], ["Teks", "Video", "Kuis", "Tugas"], ["Progress", "Nilai", "Sertifikat"], ["Mentor", "Admin", "Self-paced"], ["Login", "Reminder", "Admin konten"]],
    chipsEn: [["Beginner", "Students", "Employees"], ["Text", "Video", "Quiz", "Assignment"], ["Progress", "Scores", "Certificate"], ["Mentor", "Admin", "Self-paced"], ["Login", "Reminder", "Content admin"]],
    featuresId: [
      feature("Dashboard Belajar", "Menampilkan kelas aktif, progress, dan target belajar.", "Data user, course, progress.", "Ringkasan belajar personal.", "Gunakan progress bar yang jelas."),
      feature("Katalog Kelas", "User melihat daftar kelas dan memilih materi.", "Course, kategori, level.", "Daftar kelas dengan filter.", "Kartu kelas harus ringkas."),
      feature("Detail Materi", "User membaca atau menonton materi pembelajaran.", "Lesson content.", "Halaman materi dengan status selesai.", "MVP bisa mulai dari teks dan video embed dummy."),
      feature("Kuis dan Penilaian", "User menjawab kuis untuk mengukur pemahaman.", "Pertanyaan, pilihan jawaban.", "Skor dan feedback sederhana.", "Validasi semua jawaban wajib diisi."),
      feature("Progress Tracking", "Sistem menyimpan progres materi dan kuis.", "lesson_id, status, score.", "Persentase progres per kelas.", "Data progress harus per user."),
    ],
    featuresEn: [
      feature("Learning Dashboard", "Shows active courses, progress, and learning targets.", "User, course, progress data.", "Personal learning summary.", "Use clear progress bars."),
      feature("Course Catalog", "Users browse classes and choose lessons.", "Course, category, level.", "Course list with filters.", "Course cards should be concise."),
      feature("Lesson Detail", "Users read or watch learning content.", "Lesson content.", "Lesson page with completion status.", "MVP can start with text and dummy video embeds."),
      feature("Quizzes and Scoring", "Users answer quizzes to measure understanding.", "Questions and answer choices.", "Score and simple feedback.", "Validate all answers."),
      feature("Progress Tracking", "System saves lesson and quiz progress.", "lesson_id, status, score.", "Progress percentage per course.", "Progress must be per user."),
    ],
    tables: [
      { name: "users", description: "Data siswa, mentor, dan admin.", fields: ["id int PK", "name string", "email string", "role string"] },
      { name: "courses", description: "Daftar kelas.", fields: ["id int PK", "title string", "description text", "level string", "created_by int FK"] },
      { name: "lessons", description: "Materi dalam kelas.", fields: ["id int PK", "course_id int FK", "title string", "content text", "order_index int"] },
      { name: "quizzes", description: "Kuis untuk materi atau kelas.", fields: ["id int PK", "lesson_id int FK", "question text", "options json", "correct_answer string"] },
      { name: "progress_records", description: "Progress belajar per user.", fields: ["id int PK", "user_id int FK", "course_id int FK", "lesson_id int FK", "status string", "score decimal"] },
    ],
    flowId: ["User login atau masuk demo.", "User memilih kelas dari katalog.", "User membuka materi dan menandai selesai.", "User mengerjakan kuis.", "Dashboard memperbarui progress dan skor.", "Admin mengelola materi dan melihat laporan progress."],
    flowEn: ["User logs in or enters demo mode.", "User chooses a course from catalog.", "User opens lesson and marks it complete.", "User takes quiz.", "Dashboard updates progress and score.", "Admin manages content and reviews progress reports."],
    apiActions: ["createCourse(data)", "createLesson(data)", "submitQuiz(data)", "updateProgress(data)", "getLearningDashboard(userId)", "exportProgress(filters)"],
    designToneId: "Tampilan belajar yang fokus, bersih, dan membuat progress mudah terlihat.",
    designToneEn: "A focused, clean learning interface that makes progress easy to see.",
  },
  "crm-sales": {
    labelId: "CRM Penjualan",
    labelEn: "Sales CRM",
    projectNameId: "Website CRM Penjualan",
    projectNameEn: "Sales CRM Website",
    usersId: ["Founder", "Sales", "Manajer penjualan"],
    usersEn: ["Founder", "Sales reps", "Sales manager"],
    rolesId: ["Owner", "Sales", "Manager"],
    rolesEn: ["Owner", "Sales", "Manager"],
    inputsId: ["Lead", "customer", "deal", "pipeline", "follow-up"],
    inputsEn: ["Leads", "customers", "deals", "pipeline", "follow-ups"],
    storedDataId: ["users", "leads", "customers", "deals", "activities", "follow_ups"],
    storedDataEn: ["users", "leads", "customers", "deals", "activities", "follow_ups"],
    notificationsId: "Reminder follow-up, deal overdue, dan aktivitas sales yang belum lengkap.",
    notificationsEn: "Follow-up reminders, overdue deals, and incomplete sales activity alerts.",
    pages: ["Dashboard Sales", "Leads", "Customers", "Pipeline", "Activities", "Reports"],
    questionsId: ["CRM ini untuk solo sales, founder, atau tim sales?", "Tahapan pipeline apa saja yang dibutuhkan?", "Data lead apa yang wajib disimpan?", "Apakah perlu reminder follow-up dan activity log?", "Laporan sales apa yang paling penting?"],
    questionsEn: ["Is this CRM for solo sales, founder, or sales team?", "Which pipeline stages are needed?", "What lead data must be stored?", "Do you need follow-up reminders and activity logs?", "Which sales reports matter most?"],
    chipsId: [["Solo sales", "Founder", "Tim sales"], ["New", "Qualified", "Proposal", "Won/Lost"], ["Kontak", "Company", "Source", "Value"], ["Reminder", "Activity log"], ["Conversion", "Forecast", "Source report"]],
    chipsEn: [["Solo sales", "Founder", "Sales team"], ["New", "Qualified", "Proposal", "Won/Lost"], ["Contact", "Company", "Source", "Value"], ["Reminder", "Activity log"], ["Conversion", "Forecast", "Source report"]],
    featuresId: [
      feature("Dashboard Sales", "Menampilkan lead baru, deal aktif, follow-up hari ini, dan nilai pipeline.", "Lead, deal, activity.", "Ringkasan performa sales.", "Tampilkan prioritas follow-up."),
      feature("Manajemen Lead", "User menambah dan mengelola lead dari berbagai sumber.", "Nama, kontak, source, status.", "Lead tersimpan dan bisa diproses.", "Validasi email/phone."),
      feature("Pipeline Deal", "Deal dipindahkan antar tahap pipeline.", "Deal, stage, value, expected close.", "Visual pipeline dan status deal.", "MVP bisa pakai board sederhana."),
      feature("Follow-up Reminder", "User membuat jadwal follow-up untuk lead/deal.", "Tanggal, catatan, owner.", "Reminder visual di dashboard.", "Email reminder fase berikutnya."),
      feature("Activity Log", "Semua interaksi sales dicatat.", "Call, meeting, email, note.", "Riwayat aktivitas per lead/deal.", "Riwayat tidak boleh hilang saat status berubah."),
    ],
    featuresEn: [
      feature("Sales Dashboard", "Shows new leads, active deals, today's follow-ups, and pipeline value.", "Lead, deal, activity.", "Sales performance summary.", "Show follow-up priorities."),
      feature("Lead Management", "Users add and manage leads from multiple sources.", "Name, contact, source, status.", "Saved leads ready for processing.", "Validate email/phone."),
      feature("Deal Pipeline", "Deals move across pipeline stages.", "Deal, stage, value, expected close.", "Visual pipeline and deal status.", "MVP can use a simple board."),
      feature("Follow-up Reminder", "Users schedule follow-ups for leads/deals.", "Date, notes, owner.", "Visual reminder on dashboard.", "Email reminder can be later."),
      feature("Activity Log", "All sales interactions are recorded.", "Call, meeting, email, note.", "Activity history per lead/deal.", "History must persist across status changes."),
    ],
    tables: [
      { name: "users", description: "Data sales dan manager.", fields: ["id int PK", "name string", "email string", "role string"] },
      { name: "leads", description: "Prospek penjualan.", fields: ["id int PK", "owner_id int FK", "name string", "email string", "phone string", "source string", "status string"] },
      { name: "customers", description: "Lead yang sudah menjadi customer.", fields: ["id int PK", "lead_id int FK", "name string", "company string", "created_at datetime"] },
      { name: "deals", description: "Peluang penjualan dan pipeline.", fields: ["id int PK", "lead_id int FK", "owner_id int FK", "stage string", "value decimal", "expected_close date"] },
      { name: "activities", description: "Riwayat interaksi sales.", fields: ["id int PK", "lead_id int FK", "user_id int FK", "type string", "notes text", "created_at datetime"] },
      { name: "follow_ups", description: "Jadwal follow-up.", fields: ["id int PK", "deal_id int FK", "user_id int FK", "due_at datetime", "status string"] },
    ],
    flowId: ["User login sebagai sales atau manager.", "User menambah lead baru.", "Lead dibuat menjadi deal dan masuk pipeline.", "User mencatat aktivitas dan jadwal follow-up.", "Dashboard menampilkan prioritas dan nilai pipeline.", "Manager export laporan performa."],
    flowEn: ["User logs in as sales or manager.", "User adds a new lead.", "Lead becomes deal and enters pipeline.", "User records activity and follow-up schedule.", "Dashboard shows priorities and pipeline value.", "Manager exports performance report."],
    apiActions: ["createLead(data)", "updateLead(id, data)", "createDeal(data)", "moveDealStage(id, stage)", "createActivity(data)", "exportSalesReport(filters)"],
    designToneId: "Dashboard CRM yang profesional, padat, dan membantu sales melihat prioritas cepat.",
    designToneEn: "A professional, dense CRM dashboard that helps sales teams see priorities quickly.",
  },
  "task-management": {
    labelId: "Manajemen Tugas",
    labelEn: "Task Management",
    projectNameId: "Website Manajemen Tugas",
    projectNameEn: "Task Management Website",
    usersId: ["User pribadi", "Tim kecil", "Project manager"],
    usersEn: ["Personal users", "Small teams", "Project managers"],
    rolesId: ["Owner", "Member", "Viewer"],
    rolesEn: ["Owner", "Member", "Viewer"],
    inputsId: ["Project", "task", "assignee", "deadline", "priority", "status"],
    inputsEn: ["Projects", "tasks", "assignees", "deadlines", "priorities", "statuses"],
    storedDataId: ["users", "projects", "tasks", "comments", "activity_logs"],
    storedDataEn: ["users", "projects", "tasks", "comments", "activity_logs"],
    notificationsId: "Reminder deadline, tugas overdue, dan perubahan status.",
    notificationsEn: "Deadline reminders, overdue tasks, and status-change alerts.",
    pages: ["Dashboard Tugas", "Projects", "Kanban", "Task Detail", "Calendar", "Reports"],
    questionsId: ["Aplikasi tugas ini untuk pribadi, tim kecil, atau banyak project?", "Status workflow apa saja yang dibutuhkan?", "Apakah perlu assignee, deadline, priority, tag, atau subtask?", "View apa yang wajib: Kanban, list, calendar, atau dashboard?", "Apakah perlu login, notifikasi deadline, laporan, dan admin workspace?"],
    questionsEn: ["Is this task app for personal use, small teams, or multiple projects?", "Which workflow statuses are needed?", "Do you need assignees, deadlines, priorities, tags, or subtasks?", "Which views are required: Kanban, list, calendar, or dashboard?", "Do you need login, deadline notifications, reports, and workspace admin?"],
    chipsId: [["Pribadi", "Tim kecil", "Multi project"], ["Todo", "Doing", "Review", "Done"], ["Assignee", "Deadline", "Priority", "Subtask"], ["Kanban", "List", "Calendar"], ["Login", "Notifikasi", "Laporan"]],
    chipsEn: [["Personal", "Small team", "Multi project"], ["Todo", "Doing", "Review", "Done"], ["Assignee", "Deadline", "Priority", "Subtask"], ["Kanban", "List", "Calendar"], ["Login", "Notifications", "Reports"]],
    featuresId: [
      feature("Dashboard Tugas", "Menampilkan tugas hari ini, overdue, progress project, dan prioritas.", "Project dan task.", "Ringkasan pekerjaan.", "Buat mudah dipindai."),
      feature("Manajemen Project", "User membuat project dan mengatur anggota.", "Nama project, deskripsi, anggota.", "Project tersimpan.", "MVP bisa satu workspace."),
      feature("Kanban Board", "Task dipindah antar status.", "Task, status, assignee.", "Board interaktif sederhana.", "Pastikan status konsisten."),
      feature("Task Detail", "User mengisi detail task, deadline, priority, dan komentar.", "Judul, deskripsi, due date, priority.", "Detail task lengkap.", "Validasi judul wajib."),
      feature("Laporan Progress", "User melihat tugas selesai, overdue, dan workload.", "Periode, project, assignee.", "Laporan progress.", "Export CSV bila relevan."),
    ],
    featuresEn: [
      feature("Task Dashboard", "Shows today's tasks, overdue items, project progress, and priorities.", "Project and task data.", "Work summary.", "Make it scannable."),
      feature("Project Management", "Users create projects and manage members.", "Project name, description, members.", "Saved project.", "MVP can use one workspace."),
      feature("Kanban Board", "Tasks move across statuses.", "Task, status, assignee.", "Simple interactive board.", "Keep statuses consistent."),
      feature("Task Detail", "Users fill task details, deadline, priority, and comments.", "Title, description, due date, priority.", "Complete task detail.", "Validate title."),
      feature("Progress Reports", "Users review completed, overdue, and workload data.", "Period, project, assignee.", "Progress report.", "CSV export if relevant."),
    ],
    tables: [
      { name: "users", description: "Data member workspace.", fields: ["id int PK", "name string", "email string", "role string"] },
      { name: "projects", description: "Project atau ruang kerja.", fields: ["id int PK", "owner_id int FK", "name string", "description text", "status string"] },
      { name: "tasks", description: "Tugas yang dikelola.", fields: ["id int PK", "project_id int FK", "assignee_id int FK", "title string", "description text", "status string", "priority string", "due_date date"] },
      { name: "comments", description: "Komentar pada task.", fields: ["id int PK", "task_id int FK", "user_id int FK", "body text", "created_at datetime"] },
      { name: "activity_logs", description: "Riwayat perubahan task.", fields: ["id int PK", "task_id int FK", "user_id int FK", "action string", "created_at datetime"] },
    ],
    flowId: ["User login atau masuk demo.", "User membuat project.", "User menambah task dan assignee.", "Task dipindah antar status.", "Dashboard memperbarui progress dan overdue.", "User melihat laporan atau export."],
    flowEn: ["User logs in or enters demo mode.", "User creates project.", "User adds task and assignee.", "Task moves across statuses.", "Dashboard updates progress and overdue items.", "User reviews report or exports."],
    apiActions: ["createProject(data)", "createTask(data)", "updateTask(id, data)", "moveTaskStatus(id, status)", "createComment(data)", "exportTaskReport(filters)"],
    designToneId: "Tampilan produktivitas yang rapi, cepat, dan mengutamakan status serta prioritas.",
    designToneEn: "A tidy, fast productivity interface focused on status and priority.",
  },
  "content-management": {
    labelId: "Manajemen Konten",
    labelEn: "Content Management",
    projectNameId: "Website Manajemen Konten",
    projectNameEn: "Content Management Website",
    usersId: ["Penulis", "Editor", "Admin konten"],
    usersEn: ["Writers", "Editors", "Content admins"],
    rolesId: ["Writer", "Editor", "Admin"],
    rolesEn: ["Writer", "Editor", "Admin"],
    inputsId: ["Artikel", "kategori", "tag", "SEO", "status publikasi"],
    inputsEn: ["Articles", "categories", "tags", "SEO", "publishing status"],
    storedDataId: ["users", "posts", "categories", "tags", "revisions"],
    storedDataEn: ["users", "posts", "categories", "tags", "revisions"],
    notificationsId: "Notifikasi konten siap review, jadwal publish, dan revisi.",
    notificationsEn: "Review-ready, scheduled publishing, and revision notifications.",
    pages: ["Dashboard Konten", "Daftar Konten", "Editor", "Kategori", "Review", "Publikasi"],
    questionsId: ["Konten apa yang akan dikelola: blog, artikel, landing page, docs, atau social content?", "Workflow editorial apa yang dibutuhkan?", "Apakah ada penulis dan editor berbeda?", "Apakah perlu kategori, tag, SEO field, dan revision history?", "Apakah konten dipublish dari aplikasi atau hanya dikelola internal?"],
    questionsEn: ["What content will be managed: blog, articles, landing pages, docs, or social content?", "Which editorial workflow is needed?", "Are writer and editor separate roles?", "Do you need categories, tags, SEO fields, and revision history?", "Will content be published from the app or managed internally only?"],
    chipsId: [["Blog", "Artikel", "Landing page", "Docs"], ["Draft", "Review", "Scheduled", "Published"], ["Writer", "Editor", "Admin"], ["SEO", "Tag", "Revision"], ["Publish", "Internal only", "Export"]],
    chipsEn: [["Blog", "Articles", "Landing page", "Docs"], ["Draft", "Review", "Scheduled", "Published"], ["Writer", "Editor", "Admin"], ["SEO", "Tags", "Revision"], ["Publish", "Internal only", "Export"]],
    featuresId: [
      feature("Dashboard Konten", "Menampilkan konten draft, review, scheduled, dan published.", "Posts dan status.", "Ringkasan editorial.", "Status harus mudah dipahami."),
      feature("Editor Konten", "User menulis dan mengedit konten.", "Judul, body, excerpt, SEO.", "Konten tersimpan sebagai draft.", "Autosave bisa fase berikutnya."),
      feature("Workflow Review", "Konten berpindah dari draft ke review hingga publish.", "Status, reviewer, catatan.", "Proses editorial terlacak.", "Role writer/editor harus jelas."),
      feature("Kategori dan Tag", "Konten dikelompokkan untuk pencarian.", "Kategori dan tag.", "Filter konten.", "Cegah kategori duplikat."),
      feature("Revision History", "Sistem menyimpan revisi penting.", "Post version dan editor.", "Riwayat perubahan.", "MVP cukup menyimpan snapshot sederhana."),
    ],
    featuresEn: [
      feature("Content Dashboard", "Shows draft, review, scheduled, and published content.", "Posts and statuses.", "Editorial summary.", "Statuses must be clear."),
      feature("Content Editor", "Users write and edit content.", "Title, body, excerpt, SEO.", "Content saved as draft.", "Autosave can be later."),
      feature("Review Workflow", "Content moves from draft to review to publish.", "Status, reviewer, notes.", "Tracked editorial process.", "Writer/editor roles must be clear."),
      feature("Categories and Tags", "Content is grouped for search.", "Categories and tags.", "Content filters.", "Prevent duplicate categories."),
      feature("Revision History", "System stores important revisions.", "Post version and editor.", "Change history.", "MVP can store simple snapshots."),
    ],
    tables: [
      { name: "users", description: "Data penulis, editor, dan admin.", fields: ["id int PK", "name string", "email string", "role string"] },
      { name: "posts", description: "Konten utama.", fields: ["id int PK", "author_id int FK", "title string", "slug string", "body text", "status string", "published_at datetime"] },
      { name: "categories", description: "Kategori konten.", fields: ["id int PK", "name string", "slug string"] },
      { name: "tags", description: "Tag konten.", fields: ["id int PK", "name string", "slug string"] },
      { name: "revisions", description: "Riwayat revisi konten.", fields: ["id int PK", "post_id int FK", "user_id int FK", "snapshot json", "created_at datetime"] },
    ],
    flowId: ["User login sesuai role.", "Writer membuat draft konten.", "Editor memberi review dan catatan.", "Konten dijadwalkan atau dipublish.", "Dashboard memperbarui status editorial.", "Admin export atau audit revisi."],
    flowEn: ["User logs in by role.", "Writer creates content draft.", "Editor reviews and adds notes.", "Content is scheduled or published.", "Dashboard updates editorial status.", "Admin exports or audits revisions."],
    apiActions: ["createPost(data)", "updatePost(id, data)", "changePostStatus(id, status)", "createCategory(data)", "createRevision(data)", "exportContent(filters)"],
    designToneId: "Tampilan editorial yang bersih, fokus pada tulisan, status, dan antrian review.",
    designToneEn: "A clean editorial interface focused on writing, statuses, and review queue.",
  },
  "e-commerce": {
    labelId: "Toko Online",
    labelEn: "E-commerce",
    projectNameId: "Website Toko Online",
    projectNameEn: "E-commerce Website",
    usersId: ["Customer", "Admin toko", "Owner"],
    usersEn: ["Customers", "Store admin", "Owner"],
    rolesId: ["Customer", "Admin", "Owner"],
    rolesEn: ["Customer", "Admin", "Owner"],
    inputsId: ["Produk", "kategori", "cart", "order", "payment", "shipping"],
    inputsEn: ["Products", "categories", "cart", "orders", "payment", "shipping"],
    storedDataId: ["users", "products", "orders", "order_items", "payments"],
    storedDataEn: ["users", "products", "orders", "order_items", "payments"],
    notificationsId: "Status order, stok menipis, dan pembayaran perlu dicek.",
    notificationsEn: "Order status, low stock, and payment-review alerts.",
    pages: ["Storefront", "Product Detail", "Cart", "Checkout", "Order Status", "Admin Produk", "Laporan Sales"],
    questionsId: ["Produk yang dijual fisik, digital, jasa, atau campuran?", "Apakah pembayaran online wajib sekarang atau cukup order manual dulu?", "Apakah produk punya varian ukuran, warna, paket, atau stok berbeda?", "Status order apa saja yang dibutuhkan?", "Apakah admin perlu kelola katalog, stok, promo, dan laporan sales?"],
    questionsEn: ["Are products physical, digital, services, or mixed?", "Is online payment required now or are manual orders enough first?", "Do products have variants such as size, color, package, or separate stock?", "Which order statuses are needed?", "Does admin need catalog, stock, promo, and sales reports?"],
    chipsId: [["Fisik", "Digital", "Jasa", "Campuran"], ["Order manual", "Payment gateway nanti"], ["Ukuran", "Warna", "Paket", "Variant stock"], ["Pending", "Paid", "Shipped", "Completed"], ["Katalog", "Stok", "Promo", "Laporan"]],
    chipsEn: [["Physical", "Digital", "Service", "Mixed"], ["Manual order", "Payment gateway later"], ["Size", "Color", "Package", "Variant stock"], ["Pending", "Paid", "Shipped", "Completed"], ["Catalog", "Stock", "Promo", "Reports"]],
    featuresId: [
      feature("Storefront Produk", "Customer melihat produk, kategori, harga, dan status stok.", "Produk, kategori, harga.", "Daftar produk.", "Kartu produk harus informatif."),
      feature("Detail Produk", "Menampilkan foto, deskripsi, varian, dan CTA beli.", "Product detail.", "Halaman detail produk.", "Foto bisa placeholder lokal."),
      feature("Cart dan Checkout", "Customer memilih produk lalu membuat order.", "Cart items, alamat, kontak.", "Order baru.", "MVP bisa tanpa payment gateway."),
      feature("Status Pesanan", "Customer melihat status order.", "Order code atau login.", "Status order jelas.", "Status harus mudah dipahami."),
      feature("Dashboard Admin", "Admin mengelola produk, order, stok, dan laporan.", "Produk dan order.", "Ringkasan penjualan.", "Sediakan aksi ubah status."),
    ],
    featuresEn: [
      feature("Product Storefront", "Customers view products, categories, prices, and stock status.", "Products, categories, prices.", "Product listing.", "Product cards must be informative."),
      feature("Product Detail", "Shows photos, description, variants, and buy CTA.", "Product detail.", "Product detail page.", "Photos can be local placeholders."),
      feature("Cart and Checkout", "Customers choose products and create orders.", "Cart items, address, contact.", "New order.", "MVP can skip payment gateway."),
      feature("Order Status", "Customers review order status.", "Order code or login.", "Clear order status.", "Statuses must be easy to understand."),
      feature("Admin Dashboard", "Admin manages products, orders, stock, and reports.", "Products and orders.", "Sales summary.", "Provide status change actions."),
    ],
    tables: [
      { name: "users", description: "Customer dan admin.", fields: ["id int PK", "name string", "email string", "phone string", "role string"] },
      { name: "products", description: "Produk yang dijual.", fields: ["id int PK", "name string", "slug string", "description text", "price decimal", "stock int", "status string"] },
      { name: "orders", description: "Pesanan customer.", fields: ["id int PK", "user_id int FK", "status string", "total decimal", "shipping_address text", "created_at datetime"] },
      { name: "order_items", description: "Item di dalam order.", fields: ["id int PK", "order_id int FK", "product_id int FK", "quantity int", "unit_price decimal"] },
      { name: "payments", description: "Catatan pembayaran manual atau gateway.", fields: ["id int PK", "order_id int FK", "amount decimal", "method string", "status string"] },
    ],
    flowId: ["Customer membuka storefront.", "Customer melihat detail dan menambah produk ke cart.", "Customer checkout dan membuat order.", "Admin melihat order dan mengubah status.", "Customer memantau status pesanan.", "Owner melihat laporan sales."],
    flowEn: ["Customer opens storefront.", "Customer reviews detail and adds product to cart.", "Customer checks out and creates order.", "Admin reviews order and updates status.", "Customer tracks order status.", "Owner reviews sales report."],
    apiActions: ["createProduct(data)", "updateProduct(id, data)", "createOrder(data)", "updateOrderStatus(id, status)", "getStorefrontProducts(filters)", "exportSalesReport(filters)"],
    designToneId: "Tampilan toko yang jelas, informatif, dan memudahkan pembelian tanpa proses rumit.",
    designToneEn: "A clear, informative store interface that makes buying easy.",
  },
  "saas-dashboard": {
    labelId: "Dashboard SaaS/Internal",
    labelEn: "SaaS/Internal Dashboard",
    projectNameId: "Dashboard Operasional",
    projectNameEn: "Operational Dashboard",
    usersId: ["Owner", "Admin", "Tim internal"],
    usersEn: ["Owner", "Admin", "Internal team"],
    rolesId: ["Owner", "Admin", "Member", "Viewer"],
    rolesEn: ["Owner", "Admin", "Member", "Viewer"],
    inputsId: ["Metric", "workspace", "report", "target", "alert"],
    inputsEn: ["Metrics", "workspaces", "reports", "targets", "alerts"],
    storedDataId: ["users", "workspaces", "metrics", "reports", "alerts"],
    storedDataEn: ["users", "workspaces", "metrics", "reports", "alerts"],
    notificationsId: "Alert target terlewati, anomaly, dan laporan berkala.",
    notificationsEn: "Target, anomaly, and periodic report alerts.",
    pages: ["Dashboard", "Metrics", "Reports", "Targets", "Alerts", "Settings"],
    questionsId: ["Metric apa yang harus dipantau dashboard ini?", "Apakah untuk internal saja, satu workspace, atau multi-tenant?", "Role pengguna apa saja yang diperlukan?", "Data metric dimasukkan manual, import CSV, atau integrasi API nanti?", "Alert dan laporan apa yang paling penting?"],
    questionsEn: ["Which metrics should this dashboard monitor?", "Is it internal only, single workspace, or multi-tenant?", "Which user roles are needed?", "Are metrics entered manually, imported by CSV, or integrated by API later?", "Which alerts and reports are most important?"],
    chipsId: [["Revenue", "User", "Operasional", "Support"], ["Internal", "Single workspace", "Multi-tenant"], ["Owner", "Admin", "Member", "Viewer"], ["Manual", "CSV", "API nanti"], ["Weekly report", "Anomaly", "Target"]],
    chipsEn: [["Revenue", "Users", "Operations", "Support"], ["Internal", "Single workspace", "Multi-tenant"], ["Owner", "Admin", "Member", "Viewer"], ["Manual", "CSV", "API later"], ["Weekly report", "Anomaly", "Target"]],
    featuresId: [
      feature("Overview Dashboard", "Menampilkan KPI utama, tren, dan status target.", "Metric dan target.", "Ringkasan operasional.", "Angka harus mudah dibandingkan."),
      feature("Manajemen Metric", "User menambah dan mengedit metric yang dipantau.", "Nama metric, value, periode.", "Metric tersimpan.", "Sediakan validasi angka."),
      feature("Target Tracking", "User membuat target dan membandingkan realisasi.", "Target, periode, owner.", "Progress target.", "Gunakan indikator status."),
      feature("Reports", "User melihat laporan berkala dan filter data.", "Periode, metric, workspace.", "Tabel dan grafik laporan.", "Export jika relevan."),
      feature("Alerts", "Sistem menampilkan alert saat kondisi penting terjadi.", "Threshold dan metric.", "Alert dashboard.", "MVP cukup alert visual."),
    ],
    featuresEn: [
      feature("Overview Dashboard", "Shows key KPIs, trends, and target status.", "Metrics and targets.", "Operational summary.", "Numbers must be easy to compare."),
      feature("Metric Management", "Users create and edit tracked metrics.", "Metric name, value, period.", "Saved metric.", "Validate numbers."),
      feature("Target Tracking", "Users create targets and compare actual results.", "Target, period, owner.", "Target progress.", "Use status indicators."),
      feature("Reports", "Users view periodic reports and filter data.", "Period, metric, workspace.", "Report table and charts.", "Export if relevant."),
      feature("Alerts", "System shows alerts when important conditions happen.", "Threshold and metric.", "Dashboard alert.", "Visual alerts are enough for MVP."),
    ],
    tables: [
      { name: "users", description: "Data pengguna dashboard.", fields: ["id int PK", "name string", "email string", "role string"] },
      { name: "workspaces", description: "Workspace atau organisasi.", fields: ["id int PK", "owner_id int FK", "name string", "plan string"] },
      { name: "metrics", description: "Nilai metric yang dipantau.", fields: ["id int PK", "workspace_id int FK", "name string", "value decimal", "period string", "recorded_at datetime"] },
      { name: "reports", description: "Laporan tersimpan.", fields: ["id int PK", "workspace_id int FK", "title string", "period string", "summary text"] },
      { name: "alerts", description: "Alert berdasarkan target atau threshold.", fields: ["id int PK", "workspace_id int FK", "metric_id int FK", "type string", "message text", "status string"] },
    ],
    flowId: ["User login ke workspace.", "User melihat KPI di dashboard.", "User menambah metric atau import data.", "Sistem membandingkan metric dengan target.", "Dashboard menampilkan alert dan tren.", "User export laporan berkala."],
    flowEn: ["User logs into workspace.", "User views KPIs on dashboard.", "User adds metric or imports data.", "System compares metrics with targets.", "Dashboard shows alerts and trends.", "User exports periodic reports."],
    apiActions: ["createMetric(data)", "updateMetric(id, data)", "createTarget(data)", "getDashboardSummary(filters)", "createAlertRule(data)", "exportReport(filters)"],
    designToneId: "Dashboard SaaS yang utilitarian, padat, dan optimal untuk scanning KPI.",
    designToneEn: "A utilitarian SaaS dashboard optimized for KPI scanning.",
  },
  "generic-web-app": {
    labelId: "Website Aplikasi Custom",
    labelEn: "Custom Web Application",
    projectNameId: "Website Aplikasi Custom",
    projectNameEn: "Custom Web Application",
    usersId: ["User utama sesuai ide", "Admin", "Owner"],
    usersEn: ["Primary users based on idea", "Admin", "Owner"],
    rolesId: ["User", "Admin", "Owner"],
    rolesEn: ["User", "Admin", "Owner"],
    inputsId: ["Data utama", "status", "catatan", "kategori", "laporan"],
    inputsEn: ["Core data", "status", "notes", "categories", "reports"],
    storedDataId: ["users", "items", "categories", "activity_logs", "settings"],
    storedDataEn: ["users", "items", "categories", "activity_logs", "settings"],
    notificationsId: "Alert visual untuk data penting, status berubah, atau item yang perlu ditindaklanjuti.",
    notificationsEn: "Visual alerts for important data, status changes, or items needing follow-up.",
    pages: ["Dashboard", "Data Utama", "Tambah Data", "Detail Data", "Laporan", "Admin"],
    questionsId: discoveryQuestionsId,
    questionsEn: discoveryQuestionsEn,
    chipsId: discoveryChipsId,
    chipsEn: discoveryChipsEn,
    featuresId: [
      feature("Dashboard Utama", "Menampilkan ringkasan data, status penting, dan aktivitas terbaru.", "Data utama, status, filter.", "Ringkasan yang mudah dipahami.", "Sesuaikan kartu metric dengan domain ide user."),
      feature("Manajemen Data Utama", "User dapat menambah, mengedit, menghapus, mencari, dan memfilter data utama.", "Field utama sesuai kebutuhan user.", "Data tersimpan dan dapat dikelola.", "Jangan gunakan field generic jika domain sudah jelas."),
      feature("Detail dan Riwayat", "User melihat detail data dan riwayat perubahan.", "ID data, activity log.", "Halaman detail lengkap.", "Riwayat membantu audit dan kepercayaan user."),
      feature("Laporan dan Export", "User melihat laporan sederhana dan mengekspor data sesuai filter.", "Periode, status, kategori.", "Tabel laporan dan CSV.", "Export relevan jika user butuh arsip."),
      feature("Admin Panel", "Admin mengatur data referensi, role, dan konfigurasi dasar.", "User, kategori, settings.", "Panel kontrol admin.", "Role admin harus dibedakan dari user biasa."),
    ],
    featuresEn: [
      feature("Main Dashboard", "Shows data summary, important statuses, and recent activity.", "Core data, status, filters.", "Easy-to-understand summary.", "Adapt metric cards to the user's domain."),
      feature("Core Data Management", "Users can create, edit, delete, search, and filter core data.", "Core fields based on user needs.", "Saved and manageable data.", "Avoid generic fields if the domain is clear."),
      feature("Detail and History", "Users see data detail and change history.", "Data ID, activity log.", "Complete detail page.", "History supports audit and trust."),
      feature("Reports and Export", "Users review simple reports and export filtered data.", "Period, status, category.", "Report table and CSV.", "Export is relevant when users need records."),
      feature("Admin Panel", "Admin manages reference data, roles, and basic configuration.", "Users, categories, settings.", "Admin control panel.", "Admin role must be separate from normal users."),
    ],
    tables: [
      { name: "users", description: "Data pengguna dan role.", fields: ["id int PK", "name string", "email string", "role string", "created_at datetime"] },
      { name: "items", description: "Data utama aplikasi sesuai ide user.", fields: ["id int PK", "user_id int FK", "title string", "category_id int FK", "status string", "notes text", "created_at datetime"] },
      { name: "categories", description: "Kategori data utama.", fields: ["id int PK", "name string", "description text"] },
      { name: "activity_logs", description: "Riwayat perubahan dan aktivitas.", fields: ["id int PK", "item_id int FK", "user_id int FK", "action string", "created_at datetime"] },
      { name: "settings", description: "Konfigurasi aplikasi.", fields: ["id int PK", "key string", "value text", "updated_at datetime"] },
    ],
    flowId: ["User login atau masuk demo.", "User melakukan setup awal data referensi.", "User menambah data utama.", "Dashboard memperbarui ringkasan dan status.", "User membuka detail dan riwayat.", "User export laporan jika relevan."],
    flowEn: ["User logs in or enters demo mode.", "User sets initial reference data.", "User creates core data.", "Dashboard updates summary and status.", "User opens detail and history.", "User exports report if relevant."],
    apiActions: ["createItem(data)", "updateItem(id, data)", "deleteItem(id)", "getDashboardSummary(filters)", "createActivityLog(data)", "exportItems(filters)"],
    designToneId: "Tampilan aplikasi kerja yang sederhana, jelas, dan membantu pemula memahami aksi berikutnya.",
    designToneEn: "A simple work-app interface that helps beginners understand the next action.",
  },
};

export function detectProjectDomain(idea: string): ProjectDomain {
  const lower = idea.toLowerCase();

  if (includesAny(lower, ["finance", "financial", "keuangan", "pengeluaran", "pemasukan", "saldo", "transaksi", "tagihan", "budget"])) {
    return "finance-tracker";
  }
  if (includesAny(lower, ["inventory", "stok", "stock", "gudang", "warehouse", "barang", "sku", "rak", "batch"])) {
    return "inventory";
  }
  if (includesAny(lower, ["booking", "reservasi", "jadwal", "appointment", "slot", "janji temu", "laundry", "cuci"])) {
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

function getProfile(domain: ProjectDomain) {
  return profiles[domain] || profiles["generic-web-app"];
}

export function getDynamicQuestions(domain: ProjectDomain, language: AppLanguage = "id") {
  const profile = getProfile(domain);
  return language === "en" ? profile.questionsEn : profile.questionsId;
}

export function getDynamicQuestionChips(domain: ProjectDomain, language: AppLanguage = "id") {
  const profile = getProfile(domain);
  return language === "en" ? profile.chipsEn : profile.chipsId;
}

function getStack(input: GeneratePRDInput) {
  if (input.techMode === "manual") {
    return {
      frontend: input.selectedTech.frontend || "Next.js",
      backend: input.selectedTech.backend || "Next.js Server Actions",
      database: input.selectedTech.database || "PostgreSQL/Supabase",
      deployment: input.selectedTech.deployment || "Vercel",
    };
  }

  return {
    frontend: "Next.js App Router",
    backend: "Next.js Server Actions atau API Routes",
    database: "PostgreSQL/Supabase atau SQLite untuk MVP lokal",
    deployment: "Vercel",
  };
}

function answersBlock(answers: PrdAnswer[], language: AppLanguage) {
  const filled = answers.filter((answer) => cleanText(answer.answer));
  if (!filled.length) {
    return language === "en"
      ? "- No clarification answers yet. Ask questions before generating a final PRD if this is used interactively."
      : "- Belum ada jawaban klarifikasi. Jika dipakai secara interaktif, assistant wajib bertanya dulu sebelum PRD final.";
  }

  return filled
    .map((answer, index) =>
      language === "en"
        ? `${index + 1}. ${answer.question}\n   Answer: ${cleanText(answer.answer)}`
        : `${index + 1}. ${answer.question}\n   Jawaban: ${cleanText(answer.answer)}`,
    )
    .join("\n");
}

function renderFeatures(features: Feature[], language: AppLanguage) {
  return features
    .map(
      (item, index) => `${index + 1}. **${item.name}**
   - ${item.description}
   - ${language === "en" ? "Main input" : "Input utama"}: ${item.input}
   - ${language === "en" ? "Main output" : "Output utama"}: ${item.output}
   - ${language === "en" ? "Important note" : "Catatan penting"}: ${item.notes}`,
    )
    .join("\n\n");
}

function renderFlow(flow: string[], language: AppLanguage) {
  const labels =
    language === "en"
      ? ["Login / Initial Access", "Initial Setup", "Main Action", "Monitoring / Dashboard", "Verification / History", "Reports / Export"]
      : ["Login / Akses Awal", "Setup Awal", "Aksi Utama", "Monitoring / Dashboard", "Verifikasi / Riwayat", "Laporan / Export"];

  return labels.map((label, index) => `${index + 1}. **${label}:** ${flow[index] || flow[flow.length - 1]}`).join("\n");
}

function renderArchitecture(profile: DomainProfile, language: AppLanguage) {
  const isEn = language === "en";
  const label = isEn ? profile.labelEn : profile.labelId;
  const primary = profile.tables[1]?.name || "items";

  return `${isEn ? "The system uses a simple web architecture. The user works in the browser, the frontend sends validated actions to the backend, and the backend stores domain data in the database." : "Arsitektur sistem dibuat sederhana. User bekerja dari browser, frontend mengirim aksi tervalidasi ke backend, lalu backend menyimpan data domain ke database."}

\`\`\`mermaid
sequenceDiagram
    participant User as ${isEn ? "User (Browser)" : "User (Browser)"}
    participant UI as Frontend (Next.js)
    participant Server as Backend Logic
    participant DB as Database

    Note over User, DB: ${isEn ? `Main ${label} process` : `Proses utama ${label}`}

    User->>UI: ${isEn ? "Input data or choose action" : "Input data atau pilih aksi"}
    UI->>Server: ${isEn ? "Send validated request" : "Kirim request tervalidasi"}
    Server->>Server: ${isEn ? "Validate business rules and user access" : "Validasi aturan bisnis dan akses user"}
    Server->>DB: ${isEn ? `Save/update ${primary}` : `Simpan/update ${primary}`}
    DB-->>Server: ${isEn ? "Return latest data" : "Kirim data terbaru"}
    Server-->>UI: ${isEn ? "Return success/error response" : "Kirim status sukses/error"}
    UI-->>User: ${isEn ? "Show dashboard/list update" : "Tampilkan update di dashboard/list"}
\`\`\``;
}

function renderErd(profile: DomainProfile) {
  const blocks = profile.tables
    .map(
      (table) => `    ${table.name} {
${table.fields.map((field) => `        ${field}`).join("\n")}
    }`,
    )
    .join("\n\n");
  const relationships = profile.tables
    .filter((table) => table.name !== "users")
    .slice(0, 5)
    .map((table) => `    users ||--o{ ${table.name} : "owns"`)
    .join("\n");

  return `\`\`\`mermaid
erDiagram
${blocks}

${relationships}
\`\`\`

| Tabel | Deskripsi |
| --- | --- |
${profile.tables.map((table) => `| ${table.name} | ${table.description} |`).join("\n")}`;
}

function renderApi(profile: DomainProfile, language: AppLanguage) {
  const isEn = language === "en";
  return `${profile.apiActions
    .map(
      (action) => `### ${action}
${isEn ? "Purpose" : "Tujuan"}: ${isEn ? `Run a main action for ${profile.labelEn}.` : `Menjalankan aksi utama terkait ${profile.labelId}.`}
Input: ${isEn ? "Validated data object based on the form/domain." : "Object data tervalidasi sesuai form/domain."}
Output: \`{ success: boolean, data?: unknown, error?: string }\`.
${isEn ? "Validation" : "Validasi"}: ${isEn ? "Required fields cannot be empty, data types must be correct, and users can only access their own data." : "Field wajib tidak boleh kosong, tipe data harus benar, dan user hanya boleh mengakses data miliknya."}`,
    )
    .join("\n\n")}

${isEn ? "Response example" : "Contoh response"}:
\`\`\`json
{
  "success": true,
  "data": {}
}
\`\`\``;
}

function renderPrompt(input: GeneratePRDInput, profile: DomainProfile, features: Feature[], language: AppLanguage) {
  const stack = getStack(input);

  return `\`\`\`text
Build a complete production-ready web application based on this PRD.

PRODUCT DIRECTION:
This PRD was created by an AI Product Interviewer for beginners who want to build a website using AI coding tools. Do not turn this into an AI agent builder. Build the actual website described by the PRD.

TECH STACK:
- Frontend: ${stack.frontend}
- Backend/API: ${stack.backend}
- Database: ${stack.database}
- Deployment: ${stack.deployment}
- Language: TypeScript
- UI language: ${language === "en" ? "English" : "Bahasa Indonesia"}

PAGES:
${profile.pages.map((page) => `- ${page}`).join("\n")}

CORE FEATURES:
${features.map((item) => `- ${item.name}: ${item.description}`).join("\n")}

DATABASE SCHEMA:
${profile.tables.map((table) => `- ${table.name}: ${table.fields.join(", ")}`).join("\n")}

API / SERVER ACTIONS:
${profile.apiActions.map((action) => `- ${action}`).join("\n")}

UI RULES:
- Build the real usable app, not only a landing page.
- Include dashboard, forms, tables/lists, detail views, empty states, loading states, error states, and success feedback.
- Use clear labels for non-technical users.
- Responsive design must work on mobile and desktop.
- Typography:
  - Sans: Geist Mono, ui-monospace, monospace
  - Serif: serif
  - Mono: JetBrains Mono, monospace

SECURITY RULES:
- Validate all inputs on client and server/server-action layer.
- Never expose API keys in frontend code.
- Protect user-owned data by userId/session when auth is implemented.
- Sanitize displayed user-generated text.

ENVIRONMENT VARIABLES:
- No API key is required for the MVP unless you add a real external service.
- If database credentials are needed, document them in .env.example.
- Do not expose secrets in client components.

DEPLOYMENT TARGET:
- Deploy to ${stack.deployment}.

README REQUIREMENT:
- Include setup instructions.
- Include local development command.
- Include build command.
- Include deployment notes.
- Include environment variable documentation.

FINAL CHECK:
- Run npm run build.
- Fix all TypeScript/build/runtime errors before finishing.
\`\`\``;
}

function generateIndonesianPRD(input: GeneratePRDInput, domain: ProjectDomain) {
  const profile = getProfile(domain);
  const idea = cleanText(input.idea);
  const stack = getStack(input);
  const features = profile.featuresId;

  return `# PRD — Project Requirements Document

## 1. Overview
Produk ini adalah AI Product Interviewer untuk pemula yang ingin membuat website dengan bantuan AI coding tools.

Ide website: "${idea}"

Tujuan aplikasi adalah membantu ${profile.usersId.join(", ")} menyelesaikan proses ${profile.labelId} dengan alur yang lebih rapi, mudah dipantau, dan siap dikembangkan menjadi website nyata. Masalah utama yang ingin diselesaikan adalah proses lama yang masih manual, tersebar di catatan/chat/spreadsheet, sulit dicari ulang, dan tidak memiliki dashboard yang jelas. Kondisi lama/manual tersebut diganti dengan aplikasi web yang punya form input, penyimpanan data, dashboard, riwayat, validasi, dan laporan.

Target pengguna utama adalah ${profile.usersId.join(", ")}. Ringkasan solusi: website ${profile.labelId} dengan fitur inti yang spesifik terhadap ide user, bukan AI agent builder dan bukan output generik.

Konteks jawaban wawancara:
${answersBlock(input.answers, "id")}

## 2. Requirements
- **Aksesibilitas:** Website responsive, mudah dipakai pemula, label input jelas, kontras cukup, dan bisa digunakan di mobile maupun desktop.
- **Pengguna:** ${profile.usersId.join(", ")}.
- **Role Pengguna:** ${profile.rolesId.join(", ")}.
- **Data Input:** ${profile.inputsId.join(", ")}.
- **Spesifisitas Data:** Data harus mengikuti domain ${profile.labelId}; gunakan tabel ${profile.tables.map((table) => table.name).join(", ")} dan hindari nama tabel generic jika domain sudah jelas.
- **Notifikasi:** ${profile.notificationsId}
- **Keamanan:** Validasi input, pisahkan data per user/role, jangan expose API key di frontend, dan gunakan OPENROUTER_API_KEY hanya server-side bila dipakai.
- **Batasan MVP:** Fokus pada flow utama, dashboard, CRUD data utama, riwayat, laporan/export bila relevan, fallback data lokal/dummy, dan build production berhasil.

## 3. Core Features
${renderFeatures(features, "id")}

## 4. User Flow
${renderFlow(profile.flowId, "id")}

## 5. Architecture
${renderArchitecture(profile, "id")}

## 6. Database Schema
${renderErd(profile)}

## 7. Design & Technical Constraints
- **High-Level Technology:** Frontend ${stack.frontend}, backend ${stack.backend}, database ${stack.database}, deployment ${stack.deployment}.
- **Typography Rules:** Sans: Geist Mono, ui-monospace, monospace. Serif: serif. Mono: JetBrains Mono, monospace.
- **UI Style:** ${profile.designToneId}
- **Responsive Design:** Semua halaman harus nyaman di mobile 360px, tablet, dan desktop. Form, tabel, dan dashboard tidak boleh overflow.
- **Performance:** Hindari request eksternal yang tidak perlu, gunakan data lokal/dummy untuk MVP, cache hasil wizard di localStorage, dan jangan panggil API saat user mengetik.
- **Security:** OPENROUTER_API_KEY hanya server-side, validasi semua mutation, sanitasi teks user, dan jangan expose secret di client component.
- **Deployment:** Target ${stack.deployment}. Build dengan \`npm run build\` wajib berhasil.

## 8. API Specification / Server Actions
${renderApi(profile, "id")}

## 9. Acceptance Criteria
- [ ] User bisa menambahkan data utama.
- [ ] User bisa melihat dashboard.
- [ ] User bisa mengedit data.
- [ ] User bisa menghapus data.
- [ ] Sistem menampilkan validasi error.
- [ ] UI responsive di mobile dan desktop.
- [ ] User bisa melihat riwayat atau status data utama.
- [ ] User bisa export laporan jika fitur laporan relevan.
- [ ] Build production berhasil.
- [ ] Tidak ada API key terekspos di frontend.

## 10. Prompt untuk AI Coding Tool
${renderPrompt(input, profile, features, "id")}`;
}

function generateEnglishPRD(input: GeneratePRDInput, domain: ProjectDomain) {
  const profile = getProfile(domain);
  const idea = cleanText(input.idea);
  const stack = getStack(input);
  const features = profile.featuresEn;

  return `# PRD — Project Requirements Document

## 1. Overview
This product is an AI Product Interviewer for beginners who want to build a website with AI coding tools.

Website idea: "${idea}"

The application helps ${profile.usersEn.join(", ")} handle ${profile.labelEn} with a clearer, more trackable workflow. The main problem is that the old/manual process is scattered across notes, chats, spreadsheets, or memory, making it hard to search, validate, monitor, and report. The solution replaces that process with a real web application with input forms, stored data, dashboard, history, validation, and reports.

The primary users are ${profile.usersEn.join(", ")}. Solution summary: a ${profile.labelEn} website with domain-specific features, not an AI agent builder and not a generic app output.

Interview context:
${answersBlock(input.answers, "en")}

## 2. Requirements
- **Accessibility:** Responsive website, beginner-friendly language, clear labels, sufficient contrast, and usable on mobile and desktop.
- **Users:** ${profile.usersEn.join(", ")}.
- **User Roles:** ${profile.rolesEn.join(", ")}.
- **Data Input:** ${profile.inputsEn.join(", ")}.
- **Data Specificity:** Data must match the ${profile.labelEn} domain; use tables ${profile.tables.map((table) => table.name).join(", ")} and avoid generic table names when the domain is clear.
- **Notifications:** ${profile.notificationsEn}
- **Security:** Validate input, separate data by user/role, never expose API keys in frontend, and use OPENROUTER_API_KEY only server-side if used.
- **MVP Scope:** Focus on main flow, dashboard, core CRUD, history, reports/export when relevant, local/dummy fallback data, and successful production build.

## 3. Core Features
${renderFeatures(features, "en")}

## 4. User Flow
${renderFlow(profile.flowEn, "en")}

## 5. Architecture
${renderArchitecture(profile, "en")}

## 6. Database Schema
${renderErd(profile)}

## 7. Design & Technical Constraints
- **High-Level Technology:** Frontend ${stack.frontend}, backend ${stack.backend}, database ${stack.database}, deployment ${stack.deployment}.
- **Typography Rules:** Sans: Geist Mono, ui-monospace, monospace. Serif: serif. Mono: JetBrains Mono, monospace.
- **UI Style:** ${profile.designToneEn}
- **Responsive Design:** All pages must work well on 360px mobile, tablet, and desktop. Forms, tables, and dashboard must not overflow.
- **Performance:** Avoid unnecessary external requests, use local/dummy data for MVP, cache wizard output in localStorage, and never call API while the user is typing.
- **Security:** OPENROUTER_API_KEY is server-side only, validate all mutations, sanitize user text, and never expose secrets in client components.
- **Deployment:** Target ${stack.deployment}. \`npm run build\` must pass.

## 8. API Specification / Server Actions
${renderApi(profile, "en")}

## 9. Acceptance Criteria
- [ ] User can add the main data.
- [ ] User can view the dashboard.
- [ ] User can edit data.
- [ ] User can delete data.
- [ ] System shows validation errors.
- [ ] UI is responsive on mobile and desktop.
- [ ] User can view history or main data status.
- [ ] User can export reports when reporting is relevant.
- [ ] Production build passes.
- [ ] No API key is exposed in frontend code.

## 10. Prompt for AI Coding Tool
${renderPrompt(input, profile, features, "en")}`;
}

export function generatePRD(input: GeneratePRDInput) {
  const domain = input.domain || detectProjectDomain(input.idea);
  return input.language === "en" ? generateEnglishPRD(input, domain) : generateIndonesianPRD(input, domain);
}

export { discoveryQuestionsId as defaultQuestions };
