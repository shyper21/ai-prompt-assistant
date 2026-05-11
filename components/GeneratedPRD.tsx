"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type GeneratedPRDProps = {
  content: string;
};

export default function GeneratedPRD({ content }: GeneratedPRDProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="mt-6 rounded-3xl border border-white/10 bg-panel/90 p-5 shadow-soft sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Hasil PRD Singkat</h2>
          <p className="text-sm text-slate-400">
            Bisa kamu salin lalu tempel ke ChatGPT, Claude, Gemini, atau Codex.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-slate-200"
        >
          {copied ? <Check size={17} /> : <Copy size={17} />}
          {copied ? "Tersalin" : "Copy hasil"}
        </button>
      </div>

      <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-2xl bg-[#151c2b] p-4 text-sm leading-7 text-slate-200">
        {content}
      </pre>
    </section>
  );
}
