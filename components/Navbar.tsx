import { Menu, Sparkles, Zap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="relative z-20 mx-auto flex h-[76px] w-full max-w-7xl items-center justify-between px-5 sm:px-7">
      <div className="flex items-center gap-4">
        <button
          aria-label="Open menu"
          className="grid h-11 w-11 place-items-center rounded-md border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100"
        >
          <Menu size={23} />
        </button>

        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-cyan-300 via-lime-200 to-violet-400 text-slate-950 shadow-neon">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-lg font-black text-white sm:text-2xl">
              PromptForge<span className="text-cyan-300"> AI</span>
            </div>
            <div className="-mt-1 hidden text-[11px] uppercase text-slate-500 sm:block">
              build ready prompts
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden rounded-md border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-xs font-bold uppercase text-lime-200 sm:inline-flex">
          MVP
        </span>
        <button className="group hidden items-center gap-2 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-2.5 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20 sm:inline-flex">
          <Zap size={16} className="transition group-hover:rotate-12" />
          Generate
        </button>
        <div className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-black text-slate-100">
          J
        </div>
      </div>
    </header>
  );
}
