"use client";

import MotivationBarChart from "@/components/common/MotivationBarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type ProgramStats,
  analyticsService,
} from "@/services/analytics.service";
import { BarChart3, GraduationCap, Microscope, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProgramBarChartSection() {
  const [programStats, setProgramStats] = useState<ProgramStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await analyticsService.getPublicProgramStats();
        setProgramStats(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalStudents = programStats.reduce(
    (sum, p) => sum + p.totalStudents,
    0,
  );
  const totalAnalyses = programStats.reduce(
    (sum, p) => sum + p.totalAnalyses,
    0,
  );
  const totalPrograms = programStats.length;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Motivasi Mahasiswa per Program Studi
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Rata-rata skor motivasi berdasarkan hasil analisis suara mahasiswa
            di setiap program studi.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={`skeleton-${n}`} className="h-28 rounded-xl" />
            ))}
            <Skeleton className="md:col-span-4 h-[400px] rounded-xl" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
                <CardHeader className="p-5 pb-2 flex flex-row items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-brand" />
                  <CardTitle className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Program Studi
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-3xl font-bold text-slate-800 dark:text-white">
                    {totalPrograms}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
                <CardHeader className="p-5 pb-2 flex flex-row items-center gap-3">
                  <Microscope className="w-5 h-5 text-brand" />
                  <CardTitle className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Total Analisis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-3xl font-bold text-slate-800 dark:text-white">
                    {totalAnalyses.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
                <CardHeader className="p-5 pb-2 flex flex-row items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-brand" />
                  <CardTitle className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Skor Rata-rata
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-3xl font-bold text-slate-800 dark:text-white">
                    {programStats.length > 0
                      ? Math.round(
                          programStats.reduce((s, p) => s + p.avgScore, 0) /
                            programStats.length,
                        )
                      : 0}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
                <CardHeader className="p-5 pb-2 flex flex-row items-center gap-3">
                  <Users className="w-5 h-5 text-brand" />
                  <CardTitle className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Mahasiswa
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-3xl font-bold text-slate-800 dark:text-white">
                    {totalStudents.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>

            {error ? (
              <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
                <CardContent className="p-12 text-center">
                  <p className="text-slate-400 text-sm">
                    Data tidak dapat dimuat. Pastikan server API berjalan dan
                    coba lagi.
                  </p>
                </CardContent>
              </Card>
            ) : programStats.length > 0 ? (
              <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                    <BarChart3 className="w-4 h-4 text-brand" />
                    Rata-rata Skor Motivasi per Program Studi
                  </CardTitle>
                  <p className="text-xs text-slate-500">
                    Skor dihitung dari rata-rata weighted score atau confidence
                    seluruh analisis mahasiswa di program studi tersebut.
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <MotivationBarChart
                    data={programStats.map((p) => ({
                      label: p.programName,
                      value: p.avgScore,
                    }))}
                    color="#5841EA"
                  />
                </CardContent>
              </Card>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
