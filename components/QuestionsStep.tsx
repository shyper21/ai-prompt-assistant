"use client";

import { ArrowLeft, ClipboardList, WandSparkles } from "lucide-react";
import type { PrdAnswer } from "@/lib/generate-prd";

type QuestionsStepProps = {
  questions: string[];
  chips: string[][];
  answers: PrdAnswer[];
  activeQuestion: number;
  isGenerating: boolean;
  onAnswerChange: (index: number, answer: string) => void;
  onChipSelect: (index: number, value: string) => void;
  onSkip: () => void;
  onBackQuestion: () => void;
  onBackToTech: () => void;
  onGenerate: () => void;
};

export default function QuestionsStep({
  questions,
  chips,
  answers,
  activeQuestion,
  isGenerating,
  onAnswerChange,
  onChipSelect,
  onSkip,
  onBackQuestion,
  onBackToTech,
  onGenerate,
}: QuestionsStepProps) {
  const currentQuestion = questions[activeQuestion];
  const currentAnswer = answers[activeQuestion]?.answer || "";
  const answeredCount = answers.filter((item) => item.answer.trim()).length;
  const isLast = activeQuestion === questions.length - 1;

  return (
    <section className="glass-panel overflow-hidden rounded-lg">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-300">
          <ClipboardList size={16} />
          Step 3
        </div>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Beberapa Pertanyaan</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Jawaban tambahan membuat PRD lebih akurat. Kamu bisa melewati pertanyaan yang belum jelas.
            </p>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-cyan-100">
            {answeredCount}/{questions.length} terjawab
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-5 h-2 overflow-hidden rounded-md bg-white/[0.06]">
          <div
            className="h-full rounded-md bg-gradient-to-r from-cyan-300 to-violet-300 transition-all"
            style={{ width: `${((activeQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="rounded-lg border border-white/10 bg-slate-950/45 p-4">
          <div className="text-xs font-bold uppercase text-slate-500">
            Pertanyaan {activeQuestion + 1} dari {questions.length}
          </div>
          <h3 className="mt-2 text-xl font-black leading-8 text-white">{currentQuestion}</h3>

          <textarea
            value={currentAnswer}
            onChange={(event) => onAnswerChange(activeQuestion, event.target.value)}
            placeholder="Tulis jawaban bebas di sini..."
            className="mt-4 min-h-[150px] w-full resize-none rounded-lg border border-white/10 bg-slate-950/70 px-4 py-4 text-sm leading-7 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {(chips[activeQuestion] || chips[0] || []).map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => onChipSelect(activeQuestion, chip)}
                className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={activeQuestion === 0 ? onBackToTech : onBackQuestion}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/[0.06]"
            >
              <ArrowLeft size={18} />
              Kembali
            </button>

            <button
              type="button"
              onClick={onSkip}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/10 px-5 py-3 text-sm font-bold text-slate-400 transition hover:bg-white/[0.06] hover:text-slate-100"
            >
              Lewati
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {!isLast ? (
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/[0.06]"
              >
                Lanjut
              </button>
            ) : null}

            <button
              type="button"
              onClick={onGenerate}
              disabled={isGenerating}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-300 via-lime-200 to-violet-300 px-5 py-3 text-sm font-black text-slate-950 shadow-neon transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <WandSparkles size={18} />
              {isGenerating ? "Menyusun PRD..." : "Generate PRD"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
