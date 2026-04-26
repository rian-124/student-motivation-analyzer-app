"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import TopStatsSection from "../section/TopStatsSection";
import AnalysisGridSection from "../section/AnalysisGridSection";

export default function AnalysisResultPage() {
  return (
    <section className="p-6 lg:p-10 space-y-8 w-full min-h-screen bg-slate-50/30 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="pl-0 text-slate-500 hover:text-brand transition-colors h-auto py-0">
              <ArrowLeft className="w-3 h-3 mr-1.5" />
              Kembali ke Riwayat
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Hasil Analisis Motivasi
            </h1>
            <p className="text-slate-500 text-sm">
              Berkas: <span className="font-semibold text-slate-700 dark:text-slate-200">rekaman_andi_apr2026.wav</span> • 19 April 2026
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Share2 className="w-3.5 h-3.5 mr-2" />
              Bagikan
            </Button>
            <Button size="sm" className="bg-brand hover:bg-brand-hover text-white rounded-lg shadow-sm">
              <Download className="w-3.5 h-3.5 mr-2" />
              Unduh PDF
            </Button>
          </div>
        </div>

        {/* SUCCESS ALERT */}
        <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <p className="text-sm text-emerald-800 dark:text-emerald-400 font-medium leading-tight">
            Analisis berhasil diproses dengan akurasi 96.2%.
          </p>
        </div>

        <div className="space-y-8">
          <TopStatsSection />
          <AnalysisGridSection />
        </div>
      </div>
    </section>
  );
}
