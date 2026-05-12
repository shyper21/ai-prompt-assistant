"use client";

import { useState } from "react";
import { ArrowLeft, Check, Copy, FileDown, RotateCcw, TerminalSquare } from "lucide-react";
import type { I18nText } from "@/lib/i18n";

type GeneratedPRDProps = {
  content: string;
  isGenerating?: boolean;
  message?: string;
  t: I18nText;
  onBackToEdit?: () => void;
  onRegenerate?: () => void;
};

export default function GeneratedPRD({
  content,
  isGenerating = false,
  message,
  t,
  onBackToEdit,
  onRegenerate,
}: GeneratedPRDProps) {
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
    <section className="mt-7 overflow-hidden rounded-lg border border-white/10 bg-slate-950/75 shadow-violet backdrop-blur">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-300">
            <TerminalSquare size={15} />
            {t.outputLabel}
          </div>
          <h2 className="mt-2 text-xl font-black text-white">{t.outputTitle}</h2>
          <p className="mt-1 text-sm text-slate-400">
            {t.outputDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {onBackToEdit ? (
            <button
              type="button"
              onClick={onBackToEdit}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/[0.06]"
            >
              <ArrowLeft size={17} />
              {t.editInput}
            </button>
          ) : null}

          {onRegenerate ? (
            <button
              type="button"
              onClick={onRegenerate}
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-violet-300/25 bg-violet-300/10 px-4 py-2 text-sm font-bold text-violet-100 transition hover:bg-violet-300/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RotateCcw size={17} />
              {isGenerating ? t.regenerating : t.regenerate}
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/[0.06]"
          >
            <FileDown size={17} />
            {t.download}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
          >
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? t.copied : t.copy}
          </button>
        </div>
      </div>

      {message ? (
        <div className="border-b border-cyan-300/15 bg-cyan-300/10 px-5 py-3 text-sm leading-6 text-cyan-50">
          {message}
        </div>
      ) : null}

      <pre className="max-h-[660px] overflow-auto whitespace-pre-wrap p-5 text-sm leading-7 text-slate-200 sm:p-6">
        {content}
      </pre>
    </section>
  );
}
