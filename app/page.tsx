import { Bot, Code2, Database, FileText, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroInput from "@/components/HeroInput";

const chips = [
  { label: "PRD Builder", icon: FileText },
  { label: "Prompt Optimizer", icon: Sparkles },
  { label: "Vercel Ready", icon: Rocket },
];

const featureCards = [
  {
    title: "Prompt teknis",
    desc: "Mengubah ide mentah menjadi instruksi yang jelas untuk ChatGPT, Claude, Gemini, atau Codex.",
    icon: Bot,
  },
  {
    title: "Struktur PRD",
    desc: "Output berisi masalah, solusi, user flow, fitur MVP, schema data, API, dan acceptance criteria.",
    icon: FileText,
  },
  {
    title: "Siap coding",
    desc: "Hasilnya langsung bisa dipakai sebagai brief untuk AI coding agent atau developer.",
    icon: Code2,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-slate-100">
      <div className="orb left-[-120px] top-[80px] h-72 w-72 bg-cyan-400/40" />
      <div className="orb right-[-120px] top-[170px] h-96 w-96 bg-violet-500/35" />
      <div className="orb bottom-[-180px] left-1/2 h-96 w-96 -translate-x-1/2 bg-fuchsia-500/20" />

      <div className="absolute inset-0 bg-grid-pattern bg-[length:42px_42px] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(to_bottom,transparent,rgba(7,10,18,0.92)_78%)]" />

      <div className="relative z-10">
        <Navbar />

        <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {chips.map((chip) => {
              const Icon = chip.icon;
              return (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-300 backdrop-blur"
                >
                  <Icon size={14} className="text-cyan-300" />
                  {chip.label}
                </span>
              );
            })}
          </div>

          <div className="mt-8 max-w-5xl text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[1.4rem] border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-neon">
              <Sparkles size={30} />
            </div>

            <h1 className="bg-gradient-to-br from-white via-cyan-100 to-violet-200 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              Dari ide mentah jadi PRD siap build
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-xl">
              Tulis ide aplikasi kamu dalam bahasa biasa. Sistem akan menyusun
              brief produk, prompt coding agent, fitur MVP, dan struktur teknis
              yang lebih siap dipakai.
            </p>
          </div>

          <HeroInput />

          <div className="mt-10 grid w-full max-w-5xl gap-4 md:grid-cols-3">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="glass-panel rounded-3xl p-5">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.06] text-cyan-200">
                    <Icon size={21} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{card.desc}</p>
                </article>
              );
            })}
          </div>

          <footer className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-lime-300" />
              Local generator, tanpa API key
            </span>
            <span className="hidden text-slate-700 sm:inline">•</span>
            <span className="inline-flex items-center gap-2">
              <Database size={16} className="text-violet-300" />
              Siap dikembangkan ke Firebase / Supabase
            </span>
          </footer>
        </section>
      </div>
    </main>
  );
}
