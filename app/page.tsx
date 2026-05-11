import { FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroInput from "@/components/HeroInput";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-page text-slate-100">
      <Navbar />

      <section className="mx-auto flex min-h-[calc(100vh-82px)] w-full max-w-6xl flex-col items-center px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col items-center text-center sm:mt-14">
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#2b2231] text-orange-400 shadow-soft sm:hidden">
            <FileText size={26} />
          </div>

          <div className="flex items-center justify-center gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl">
              Mau bikin apa?
            </h1>
            <div className="hidden h-[70px] w-[70px] items-center justify-center rounded-3xl bg-[#2b2231] text-orange-400 shadow-soft sm:flex">
              <FileText size={30} />
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-slate-400 sm:text-2xl">
            Ubah Ide kamu menjadi rencana yang bisa dipahami
            <br className="hidden sm:block" /> AI tools pilihanmu.
          </p>

          <div className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#243552] px-3 py-1 text-sm font-semibold text-slate-200 sm:text-base">
            contoh_prd.md
            <FileText size={15} className="text-slate-400" />
          </div>
        </div>

        <HeroInput />

        <footer className="mt-auto flex flex-wrap items-center justify-center gap-3 pb-2 pt-10 text-sm text-slate-400">
          <span>Product by</span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#202838] px-3 py-2 text-slate-200">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-emerald-500 text-xs font-bold">
              RD
            </span>
            <span className="font-bold">Raf Dev</span>
            <span className="text-slate-400">22.4K</span>
            <span className="grid h-5 w-7 place-items-center rounded-md bg-red-600 text-white">
              <span className="text-[10px] leading-none">▶</span>
            </span>
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#202838] text-white">
            <span className="text-lg">☁</span>
          </span>
        </footer>
      </section>
    </main>
  );
}
