"use client";

import { useMemo, useState } from "react";
import { ArrowUp, ClipboardList, Languages, TerminalSquare, WandSparkles } from "lucide-react";
import GeneratedPRD from "@/components/GeneratedPRD";
import { generatePRD } from "@/lib/generate-prd";

const examples = [
  "Aplikasi tracking pengeluaran harian dengan input WhatsApp dan dashboard bulanan",
  "Website booking jasa cuci sepatu untuk UMKM dengan pencatatan pembayaran manual",
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
    <div className="w-full">
      <div className="glass-panel overflow-hidden rounded-lg">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <ClipboardList size={17} className="text-cyan-300" />
            Idea to Agent Brief
          </div>
          <span className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-400">
            ID output
          </span>
        </div>

        <div className="relative min-h-[245px]">
          <textarea
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            placeholder={'Tulis ide kamu di sini. Contoh: "Aplikasi invoice untuk freelancer, bisa kelola klien, item invoice, status paid/unpaid, dashboard pemasukan, dan data dummy dulu tanpa API eksternal."'}
            className="h-[278px] w-full resize-none bg-transparent px-5 py-6 pb-32 text-base leading-8 text-slate-100 outline-none placeholder:text-slate-500 sm:px-6 sm:text-lg"
          />

          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06]">
                <Languages size={16} />
                ID
              </button>
              <span className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-500">
                {charCount} karakter
              </span>
              <span className="hidden items-center gap-2 rounded-md border border-violet-300/20 bg-violet-300/10 px-3 py-2 text-xs text-violet-100 sm:inline-flex">
                <TerminalSquare size={14} />
                Codex ready
              </span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-300 via-lime-200 to-violet-300 px-5 py-3 text-sm font-black text-slate-950 shadow-neon transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <WandSparkles size={18} />
                  Menyusun...
                </>
              ) : (
                <>
                  Generate Brief
                  <ArrowUp size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={example}
            onClick={() => setIdea(example)}
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

      {isGenerating ? (
        <div className="mt-6 rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-5 text-cyan-100">
          Mengubah ide menjadi product brief lengkap untuk AI coding agent...
        </div>
      ) : null}

      {result ? <GeneratedPRD content={result} /> : null}
    </div>
  );
}
