"use client";

import { useMemo, useState } from "react";
import { ArrowUp, ClipboardList, Languages, WandSparkles } from "lucide-react";
import GeneratedPRD from "@/components/GeneratedPRD";
import { generatePRD } from "@/lib/generate-prd";

const examples = [
  "Aplikasi tracking pengeluaran harian dengan input WhatsApp dan dashboard bulanan",
  "Website booking jasa cuci sepatu untuk UMKM dengan pembayaran online",
  "Aplikasi belajar bahasa Inggris untuk anak SMP dengan kuis dan leaderboard",
];

export default function HeroInput() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const charCount = useMemo(() => idea.trim().length, [idea]);

  function handleGenerate() {
    const cleanIdea = idea.trim();

    if (!cleanIdea) {
      setError("Tulis dulu ide aplikasi kamu. Contoh: aplikasi kasir sederhana untuk warung.");
      setResult("");
      return;
    }

    if (cleanIdea.length < 18) {
      setError("Ide terlalu pendek. Tambahkan konteks: target pengguna, fitur, atau masalah yang ingin diselesaikan.");
      setResult("");
      return;
    }

    setError("");
    setIsGenerating(true);

    window.setTimeout(() => {
      setResult(generatePRD(cleanIdea));
      setIsGenerating(false);
    }, 500);
  }

  return (
    <div className="mt-10 w-full max-w-4xl">
      <div className="glass-panel overflow-hidden rounded-[2rem]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <ClipboardList size={17} className="text-cyan-300" />
            Idea to Product Brief
          </div>
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-slate-400">
            Bahasa Indonesia
          </span>
        </div>

        <div className="relative min-h-[245px]">
          <textarea
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            placeholder={'Tulis ide kamu di sini. Contoh: "Saya ingin membuat aplikasi invoice untuk freelancer, bisa buat klien, generate PDF, tracking status paid/unpaid, dan dashboard pemasukan bulanan."'}
            className="h-[245px] w-full resize-none bg-transparent px-5 py-6 pb-24 text-base leading-8 text-slate-100 outline-none placeholder:text-slate-500 sm:px-6 sm:text-lg"
          />

          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]">
                <Languages size={16} />
                ID
              </button>
              <span className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-500">
                {charCount} karakter
              </span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-violet-400 px-5 py-3 text-sm font-black text-slate-950 shadow-neon transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <WandSparkles size={18} />
                  Menyusun...
                </>
              ) : (
                <>
                  Generate PRD
                  <ArrowUp size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {examples.map((example) => (
          <button
            key={example}
            onClick={() => setIdea(example)}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-400 transition hover:border-cyan-300/30 hover:text-cyan-100"
          >
            {example}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      {isGenerating ? (
        <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-6 text-cyan-100">
          Mengubah ide menjadi PRD yang lebih lengkap...
        </div>
      ) : null}

      {result ? <GeneratedPRD content={result} /> : null}
    </div>
  );
}
