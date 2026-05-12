"use client";

import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";

type IdeaStepProps = {
  idea: string;
  error: string;
  onIdeaChange: (idea: string) => void;
  onNext: () => void;
};

const examples = [
  "Buatkan website financial tracker harian untuk mencatat pemasukan dan pengeluaran. User bisa tambah transaksi, pilih kategori, lihat grafik pengeluaran bulanan, cek saldo, dan export laporan.",
  "Aplikasi booking jasa cuci sepatu untuk UMKM, ada pilihan layanan, jadwal, status pesanan, dan dashboard admin.",
  "Aplikasi belajar bahasa Inggris untuk anak SMP dengan modul, kuis, progress tracking, dan leaderboard sederhana.",
];

export default function IdeaStep({ idea, error, onIdeaChange, onNext }: IdeaStepProps) {
  return (
    <section className="glass-panel overflow-hidden rounded-lg">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-300">
          <Lightbulb size={16} />
          Step 1
        </div>
        <h2 className="mt-2 text-2xl font-black text-white">Input Ide</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Tulis ide aplikasi dalam bahasa sehari-hari. Semakin banyak konteks, semakin tajam PRD yang dihasilkan.
        </p>
      </div>

      <div className="p-5">
        <textarea
          value={idea}
          onChange={(event) => onIdeaChange(event.target.value)}
          placeholder="Contoh: Aplikasi financial tracker harian, bisa catat pemasukan/pengeluaran, ada dashboard bulanan, dan reminder tagihan..."
          className="min-h-[260px] w-full resize-none rounded-lg border border-white/10 bg-slate-950/55 px-4 py-4 text-base leading-8 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => onIdeaChange(example)}
              className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-xs leading-5 text-slate-400 transition hover:border-cyan-300/30 hover:text-cyan-100"
            >
              {example}
            </button>
          ))}
        </div>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <Sparkles size={16} className="text-violet-300" />
            {idea.trim().length} karakter
          </div>

          <button
            type="button"
            onClick={onNext}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-300 via-lime-200 to-violet-300 px-5 py-3 text-sm font-black text-slate-950 shadow-neon transition hover:scale-[1.01]"
          >
            Lanjut
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
