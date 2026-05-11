"use client";

import { useState } from "react";
import { Check, Copy, FileDown } from "lucide-react";

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

  function handleDownload() {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = "prd-ai-prompt.md";
    element.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mt-7 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-violet backdrop-blur">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-white">PRD + Prompt Agent</h2>
          <p className="mt-1 text-sm text-slate-400">
            Gunakan hasil ini untuk ChatGPT, Claude, Gemini, Codex, atau developer.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/[0.06]"
          >
            <FileDown size={17} />
            Download .md
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? "Tersalin" : "Copy"}
          </button>
        </div>
      </div>

      <pre className="max-h-[620px] overflow-auto whitespace-pre-wrap p-5 text-sm leading-7 text-slate-200 sm:p-6">
        {content}
      </pre>
    </section>
  );
}
