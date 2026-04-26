"use client";

import { Button } from "@/components/ui/button";
import { Download, Calendar, Sparkles } from "lucide-react";
import StatsSection from "../section/StatsSection";
import ChartSection from "../section/ChartSection";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <section className="p-6 lg:p-8 space-y-8 w-full min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* WELCOME HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Halo, {user?.name || "Dosen"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Berikut ringkasan performa motivasi mahasiswa periode ini.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Semester Genap {currentYear-1}/{currentYear % 100}
              </span>
            </div>
            <Button size="sm" className="bg-brand hover:bg-brand-hover text-white rounded-lg shadow-sm font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Unduh Laporan
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <StatsSection />
          <ChartSection />
        </div>

        {/* FOOTER INFO */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-wider">
          <p>© {currentYear} Student Motivation Analyzer</p>
          <div className="flex gap-4">
            <span className="hover:text-brand cursor-pointer">Bantuan</span>
            <span className="hover:text-brand cursor-pointer">Dokumentasi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
