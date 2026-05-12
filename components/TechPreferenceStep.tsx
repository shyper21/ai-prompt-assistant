"use client";

import { ArrowLeft, ArrowRight, Bot, Check, Cpu, SlidersHorizontal } from "lucide-react";
import type { SelectedTech, TechMode } from "@/lib/generate-prd";

type TechPreferenceStepProps = {
  techMode: TechMode;
  selectedTech: SelectedTech;
  onModeChange: (mode: TechMode) => void;
  onTechChange: (key: keyof SelectedTech, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  isAnalyzing?: boolean;
};

const techOptions = {
  frontend: ["Next.js", "React", "Vue", "Svelte"],
  backend: ["Next.js API Routes", "Express", "FastAPI", "Laravel"],
  database: ["Supabase", "Firebase", "PostgreSQL", "SQLite", "MongoDB"],
  deployment: ["Vercel", "Netlify", "Railway", "Render"],
};

const fields: Array<{ key: keyof SelectedTech; label: string }> = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "deployment", label: "Deployment" },
];

export default function TechPreferenceStep({
  techMode,
  selectedTech,
  onModeChange,
  onTechChange,
  onBack,
  onNext,
  isAnalyzing = false,
}: TechPreferenceStepProps) {
  return (
    <section className="glass-panel overflow-hidden rounded-lg">
      <div className="border-b border-white/10 p-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-cyan-300">
          <Cpu size={16} />
          Step 2
        </div>
        <h2 className="mt-2 text-2xl font-black text-white">Preferensi Teknologi</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Pilih apakah AI boleh menentukan stack terbaik, atau tentukan stack sendiri untuk PRD akhir.
        </p>
      </div>

      <div className="space-y-4 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onModeChange("ai")}
            className={`rounded-lg border p-4 text-left transition ${
              techMode === "ai"
                ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-50"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/25"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-bold">
                <Bot size={18} />
                Biarkan AI pilih
              </div>
              {techMode === "ai" ? <Check size={18} className="text-lime-300" /> : null}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              AI menentukan stack paling cocok berdasarkan domain ide, MVP, dan target deploy.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onModeChange("manual")}
            className={`rounded-lg border p-4 text-left transition ${
              techMode === "manual"
                ? "border-violet-300/50 bg-violet-300/10 text-violet-50"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-violet-300/25"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-bold">
                <SlidersHorizontal size={18} />
                Pilih sendiri
              </div>
              {techMode === "manual" ? <Check size={18} className="text-lime-300" /> : null}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              User memilih frontend, backend, database, dan deployment yang ingin dipakai.
            </p>
          </button>
        </div>

        {techMode === "manual" ? (
          <div className="grid gap-4 rounded-lg border border-white/10 bg-slate-950/45 p-4 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className="block">
                <span className="text-sm font-bold text-slate-200">{field.label}</span>
                <select
                  value={selectedTech[field.key] || ""}
                  onChange={(event) => onTechChange(field.key, event.target.value)}
                  className="mt-2 w-full rounded-md border border-white/10 bg-slate-950 px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
                >
                  <option value="">Pilih {field.label}</option>
                  {techOptions[field.key].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50">
            Rekomendasi stack otomatis akan ditulis di PRD. Untuk MVP awal, generator tetap menghindari API eksternal,
            secret key, dan service yang wajib dikonfigurasi.
          </div>
        )}

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/10 px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/[0.06]"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={isAnalyzing}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan-300 via-lime-200 to-violet-300 px-5 py-3 text-sm font-black text-slate-950 shadow-neon transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAnalyzing ? "Menganalisis ide..." : "Lanjut"}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
