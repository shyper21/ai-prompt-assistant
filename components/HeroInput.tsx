"use client";

import { useMemo, useState } from "react";
import { ArrowUp, Languages } from "lucide-react";
import GeneratedPRD from "@/components/GeneratedPRD";
import { generatePRD } from "@/lib/generate-prd";

export default function HeroInput() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const charCount = useMemo(() => idea.trim().length, [idea]);

  function handleGenerate() {
    const cleanIdea = idea.trim();

    if (!cleanIdea) {
      setError("Tulis dulu ide aplikasi kamu.");
      setResult("");
      return;
    }

    setError("");
    setIsGenerating(true);

    window.setTimeout(() => {
      setResult(generatePRD(cleanIdea));
      setIsGenerating(false);
    }, 450);
  }

  return (
    <div className="mt-10 w-full max-w-[840px] sm:mt-12">
      <div className="rounded-3xl border border-white/10 bg-panel shadow-soft">
        <div className="relative min-h-[210px]">
          <textarea
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            placeholder={'Contoh: "Aplikasi tracking pengeluaran harian, bisa input lewat WhatsApp, ada dashboard ringkasan bulanan..."'}
            className="h-[210px] w-full resize-none rounded-3xl bg-transparent px-5 py-6 pb-20 text-base leading-8 text-slate-100 outline-none placeholder:text-slate-500 sm:px-6 sm:text-lg"
          />

          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5">
              <Languages size={16} />
              Bahasa Indonesia
            </button>
            <span className="hidden text-xs text-slate-500 sm:inline">
              {charCount} karakter
            </span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-white transition hover:bg-[#ad5a47] disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Generate PRD"
          >
            <ArrowUp size={22} />
          </button>
        </div>
      </div>

      {error ? (
        <p className="mt-3 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      {isGenerating ? (
        <div className="mt-6 rounded-3xl border border-white/10 bg-panel/80 p-6 text-slate-300">
          Sedang menyusun PRD singkat...
        </div>
      ) : null}

      {result ? <GeneratedPRD content={result} /> : null}
    </div>
  );
}
