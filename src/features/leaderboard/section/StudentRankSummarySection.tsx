"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Target, Trophy, Users } from "lucide-react";

type Summary = {
  total: number;
  averageScore: number;
  myRank: number | null;
  myScore: number | null;
  myPercentile: number | null;
  gapToTop: number | null;
  topScore: number | null;
  topStudentName: string | null;
  classStrength: number;
};

type Props = {
  summary: Summary;
};

export default function StudentRankSummarySection({ summary }: Props) {
  const hasMe = summary.myRank !== null && summary.myScore !== null;

  return (
    <Card className="border border-brand/10 bg-gradient-to-br from-brand/5 to-brand-secondary/5 rounded-2xl overflow-hidden shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-brand-secondary flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              Ringkasan Peringkat Anda
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
              Lihat performa skor motivasi Anda di kelas ini.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/70 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800 px-4 py-3">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                Total
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {summary.total}
              </div>
            </div>
            <div className="rounded-xl bg-white/70 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800 px-4 py-3">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                Rata-rata
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {summary.averageScore.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800 p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Peringkat Anda
            </div>
            <div
              className={cn(
                "mt-1 text-2xl font-bold",
                hasMe ? "text-brand-secondary" : "text-slate-400",
              )}
            >
              {hasMe ? `#${summary.myRank}` : "-"}
            </div>
            <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
              {hasMe
                ? `Skor ${summary.myScore?.toFixed(1)} dari ${summary.total} mahasiswa`
                : "Belum ada data Anda di kelas ini."}
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800 p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Persentil
            </div>
            <div
              className={cn(
                "mt-1 text-2xl font-bold",
                summary.myPercentile !== null
                  ? "text-emerald-600"
                  : "text-slate-400",
              )}
            >
              {summary.myPercentile !== null ? `${summary.myPercentile}%` : "-"}
            </div>
            <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              Semakin besar, semakin baik.
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800 p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Kekuatan Kelas
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {summary.classStrength}%
            </div>
            <div className="mt-3">
              <Progress
                value={summary.classStrength}
                className="h-2 bg-white/70 dark:bg-slate-800"
                indicatorClassName="bg-brand"
              />
            </div>
          </div>
        </div>

        {summary.gapToTop !== null && summary.topScore !== null && (
          <div className="rounded-2xl bg-white/60 dark:bg-slate-900/30 border border-white/40 dark:border-slate-800 p-5">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Target Dekat
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
              Selisih Anda ke peringkat 1:{" "}
              <span className="font-mono">{summary.gapToTop.toFixed(1)}</span>{" "}
              poin (Top: {summary.topStudentName ?? "Mahasiswa"} -{" "}
              {summary.topScore.toFixed(1)}).
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
