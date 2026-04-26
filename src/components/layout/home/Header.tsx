import Link from "next/link";
import Navbar from "./Navbar";
import { Button } from "../../ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-secondary flex items-center justify-center text-white text-xl font-black shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform">
            M
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black text-brand-secondary tracking-tight">Motivation</span>
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em] -mt-0.5">Analyzer</span>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Navbar />
          <Button
            asChild
            className="hidden lg:inline-flex h-11 px-6 rounded-xl bg-brand hover:bg-brand-hover text-white font-bold shadow-lg shadow-brand/20 transition-all hover:scale-105"
          >
            <Link href="/login">Masuk</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
