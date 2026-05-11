import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-[72px] w-full items-center justify-between px-5 sm:px-7">
      <div className="flex items-center gap-5">
        <button
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-xl text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <Menu size={24} />
        </button>

        <div className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
          ngodingpake<span className="text-slate-300">ai</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden rounded-full bg-[#202838] px-3 py-1 text-sm font-semibold text-slate-400 sm:inline-flex">
          Free
        </span>
        <button className="rounded-2xl bg-[#e45f3f] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition hover:bg-[#f06c4c] sm:text-base">
          Upgrade
        </button>
        <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-700 text-sm font-bold text-slate-300">
          J
        </div>
      </div>
    </header>
  );
}
