"use client";

import { Button } from "@/components/ui/button";
import type { MotivationAnalysis } from "@/lib/types/motivation-analysis.type";
import { motivationAnalysisService } from "@/services/motivation-analysis.service";
import { useAuthStore } from "@/store/auth.store";
import { ArrowLeft, Download, Loader2, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnalysisGridSection from "../section/AnalysisGridSection";
import TopStatsSection from "../section/TopStatsSection";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function AnalysisResultPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("id");
  const [analysisData, setAnalysisData] = useState<MotivationAnalysis | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!analysisId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await motivationAnalysisService.findOne(analysisId);
        setAnalysisData(data);
      } catch (err: unknown) {
        console.error("Failed to fetch analysis:", err);
        setError("Gagal mengambil data analisis.");
        toast.error("Gagal mengambil data analisis.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [analysisId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-brand" />
        <span className="ml-3 text-slate-500 font-medium">
          Memuat hasil analisis...
        </span>
      </div>
    );
  }

  if (error || !analysisData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background space-y-4">
        <p className="text-slate-500 font-medium">
          {error || "Data analisis tidak ditemukan."}
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Coba Lagi
        </Button>
      </div>
    );
  }

  const targetUser = analysisData.student || user;
  const confidencePercent =
    analysisData.confidencePercent ?? analysisData.confidence * 100;
  const formattedDate = new Date(analysisData.createdAt).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <section className="p-6 lg:p-10 space-y-8 w-full min-h-screen bg-slate-50/30 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/analysis-results")}
              className="pl-0 text-slate-500 hover:text-brand transition-colors h-auto py-0"
            >
              <ArrowLeft className="w-3 h-3 mr-1.5" />
              Kembali ke Riwayat
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Hasil Analisis Motivasi
            </h1>
            <p className="text-slate-500 text-sm">
              Peserta:{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {targetUser?.name || "Mahasiswa"}
              </span>{" "}
              • {formattedDate}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={() =>
                toast.success("Tautan Disalin", {
                  description: "Tautan laporan berhasil disalin ke papan klip.",
                })
              }
            >
              <Share2 className="w-3.5 h-3.5 mr-2" />
              Bagikan
            </Button>
            <Button
              size="sm"
              className="bg-brand hover:bg-brand-hover text-white rounded-lg shadow-sm"
              onClick={() =>
                toast.success("Unduhan Dimulai", {
                  description: "Laporan PDF sedang dipersiapkan untuk diunduh.",
                })
              }
            >
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
            Analisis berhasil diproses dengan tingkat kepercayaan{" "}
            {confidencePercent.toFixed(1)}%.
          </p>
        </div>

        <div className="space-y-8">
          <TopStatsSection data={analysisData} />
          <AnalysisGridSection data={analysisData} />
        </div>
      </div>
    </section>
  );
}
