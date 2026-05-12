import {
  Bot,
  Boxes,
  Braces,
  ClipboardCheck,
  Code2,
  Database,
  FileText,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PRDWizard from "@/components/PRDWizard";

const chips = [
  { label: "Agent-ready brief", icon: Bot },
  { label: "Server-side OpenRouter", icon: ShieldCheck },
  { label: "Vercel build safe", icon: ClipboardCheck },
];

const featureCards = [
  {
    title: "Prompt untuk coding agent",
    desc: "Output dibuat seperti instruksi kerja untuk Codex, Claude Code, ChatGPT, Gemini, atau agent lain.",
    icon: Code2,
  },
  {
    title: "Blueprint produk lengkap",
    desc: "Mencakup masalah, user flow, MVP, struktur halaman, schema, API, dan acceptance criteria.",
    icon: Boxes,
  },
  {
    title: "Fallback lokal aman",
    desc: "OpenRouter berjalan lewat API Route. Jika env belum ada atau AI gagal, generator lokal tetap menghasilkan PRD.",
    icon: Database,
  },
];

const telemetry = [
  { label: "Wizard", value: "4 steps" },
  { label: "Sections", value: "10" },
  { label: "Target", value: "AI agents" },
];

export default function Home() {
  return (
    <main className="site-shell relative min-h-screen overflow-hidden bg-void text-slate-100">
      <div className="grid-overlay" />
      <div className="scanline-overlay" />
      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-14 pt-7 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,1.08fr)] lg:px-8 lg:pb-20 lg:pt-12">
          <div className="flex min-w-0 flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => {
                const Icon = chip.icon;
                return (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300 backdrop-blur"
                  >
                    <Icon size={14} className="text-cyan-300" />
                    {chip.label}
                  </span>
                );
              })}
            </div>

            <div className="mt-7 max-w-3xl">
              <div className="mb-5 inline-grid h-14 w-14 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 shadow-neon">
                <Sparkles size={28} />
              </div>

              <h1 className="max-w-4xl text-4xl font-black text-white sm:text-5xl lg:text-6xl">
                Buat PRD lengkap yang siap diberikan ke AI coding agent.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                PromptForge memandu user non-teknis lewat wizard: ide, preferensi teknologi,
                pertanyaan tambahan, lalu output Markdown panjang untuk ChatGPT, Claude,
                Gemini, Codex, atau Claude Code.
              </p>
            </div>

            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {telemetry.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-white/10 bg-slate-950/45 p-3 backdrop-blur"
                >
                  <div className="text-[10px] font-bold uppercase text-slate-500">
                    {item.label}
                  </div>
                  <div className="mt-2 text-lg font-black text-cyan-100">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {featureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="glass-panel rounded-lg p-4">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-white/[0.06] text-cyan-200">
                      <Icon size={19} />
                    </div>
                    <h3 className="text-sm font-bold text-white">{card.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{card.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-10 hidden h-24 w-px bg-gradient-to-b from-transparent via-cyan-300/60 to-transparent lg:block" />
            <div className="mb-4 flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/45 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Radar size={16} className="text-lime-300" />
                AI route + local fallback
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Braces size={14} className="text-violet-300" />
                Markdown output
              </div>
            </div>

            <PRDWizard />
          </div>
        </section>

        <footer className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-3 px-5 pb-8 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <FileText size={16} className="text-cyan-300" />
            Product brief, bukan PRD pendek
          </span>
          <span className="hidden text-slate-700 sm:inline">/</span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-lime-300" />
            API key hanya di server
          </span>
        </footer>
      </div>
    </main>
  );
}
