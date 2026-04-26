"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-[#F8F9FD] pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <div className="flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-secondary flex items-center justify-center text-white text-xl font-black shadow-lg shadow-brand/20">
                M
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-brand-secondary tracking-tight">Motivation</span>
                <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em] -mt-0.5">Analyzer</span>
              </div>
            </Link>
            <p className="text-brand-secondary/60 text-sm font-medium leading-relaxed max-w-[240px]">
              Proyek Riset Akademik tentang Analisis Motivasi Multimodal.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <ul className="space-y-4">
              <li><Link href="/" className="text-brand-secondary text-sm font-bold hover:text-brand transition-colors">Beranda</Link></li>
              <li><Link href="#features" className="text-brand-secondary text-sm font-bold hover:text-brand transition-colors">Metodologi</Link></li>
              <li><Link href="#flow" className="text-brand-secondary text-sm font-bold hover:text-brand transition-colors">Alur Sistem</Link></li>
              <li><Link href="#contact" className="text-brand-secondary text-sm font-bold hover:text-brand transition-colors">Informasi Proyek</Link></li>
            </ul>
          </div>

          {/* Legal Information */}
          <div className="flex flex-col gap-6">
            <ul className="space-y-4">
              <li><Link href="#" className="text-brand-secondary text-sm font-bold hover:text-brand transition-colors">Ketentuan Penggunaan</Link></li>
              <li><Link href="#" className="text-brand-secondary text-sm font-bold hover:text-brand transition-colors">Privasi Data</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <ul className="space-y-4">
              <li><Link href="mailto:research@university.edu" className="text-brand-secondary text-sm font-bold hover:text-brand transition-colors">research@university.edu</Link></li>
              <li><span className="text-brand-secondary text-sm font-bold">Tahun Akademik 2024/2025</span></li>
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-brand-secondary/20 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-brand-secondary text-xs font-bold">
            © {year} Proyek Analisis Motivasi Mahasiswa. Hak cipta dilindungi undang-undang.
          </p>
          <Link href="#" className="text-brand-secondary text-xs font-bold hover:text-brand transition-colors">
            Pengaturan Cookie
          </Link>
        </div>
      </div>
    </footer>
  );
}
