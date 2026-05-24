"use client";

import MotivationBarChart from "@/components/common/MotivationBarChart";
import MotivationPieChart from "@/components/common/MotivationPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, Target } from "lucide-react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type WeeklyTrendDatum = {
  label: string;
  value: number;
};

type BenchmarkDatum = {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
};

interface ClassChartsSectionProps {
  isStudent?: boolean;
  weeklyTrend?: WeeklyTrendDatum[];
  benchmark?: BenchmarkDatum[];
}

export default function ClassChartsSection({
  isStudent,
  weeklyTrend,
  benchmark,
}: ClassChartsSectionProps) {
  const defaultWeeklyData = [{ label: "M1", value: 0 }];

  const defaultBenchmarkData = [
    { subject: "Motivasi Diri", A: 0, B: 0, fullMark: 100 },
    { subject: "Tujuan Belajar", A: 0, B: 0, fullMark: 100 },
    { subject: "Percaya Diri", A: 0, B: 0, fullMark: 100 },
    { subject: "Konsistensi", A: 0, B: 0, fullMark: 100 },
    { subject: "Kejelasan", A: 0, B: 0, fullMark: 100 },
  ];

  const displayWeekly =
    weeklyTrend && weeklyTrend.length > 0 ? weeklyTrend : defaultWeeklyData;
  const displayBenchmark =
    benchmark && benchmark.length > 0 ? benchmark : defaultBenchmarkData;

  const distributionData = [
    { category: "Motivasi Tinggi", value: 65, fill: "#10b981" },
    { category: "Motivasi Sedang", value: 25, fill: "#f59e0b" },
    { category: "Motivasi Rendah", value: 10, fill: "#f43f5e" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* WEEKLY TREND */}
      <Card className="lg:col-span-7 border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <BarChart3 className="w-4 h-4 text-brand" />
            {isStudent ? "Tren Motivasi Kelas" : "Tren Motivasi Mingguan"}
          </CardTitle>
          <p className="text-xs text-slate-500">
            Statistik perkembangan rata-rata motivasi kelas per minggu.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px] w-full">
            <MotivationBarChart data={displayWeekly} color="#5841EA" />
          </div>
        </CardContent>
      </Card>

      {/* RIGHT SECTION: BENCHMARKING (STUDENT) OR DISTRIBUTION (LECTURER) */}
      <Card className="lg:col-span-5 border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            {isStudent ? (
              <>
                <Target className="w-4 h-4 text-emerald-500" />
                Perbandingan Anda vs Kelas
              </>
            ) : (
              <>
                <PieChart className="w-4 h-4 text-slate-400" />
                Komposisi Kelas
              </>
            )}
          </CardTitle>
          <p className="text-xs text-slate-500">
            {isStudent
              ? "Benchmarking performa Anda dibandingkan rata-rata kelas."
              : "Distribusi tingkat motivasi di dalam kelas ini."}
          </p>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[350px]">
          {isStudent ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={displayBenchmark}
                >
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#64748b", fontSize: 10, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fontSize: 9 }}
                  />
                  <Radar
                    name="Anda"
                    dataKey="A"
                    stroke="#5841EA"
                    fill="#5841EA"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Rata-rata Kelas"
                    dataKey="B"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                  <Legend
                    wrapperStyle={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      paddingTop: "20px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <MotivationPieChart data={distributionData} centerLabel="92%" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
