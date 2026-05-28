"use client";

import MotivationBarChart from "@/components/common/MotivationBarChart";
import MotivationPieChart from "@/components/common/MotivationPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, Target, TrendingUp, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

  const displayWeekly =
    weeklyTrend && weeklyTrend.length > 0 ? weeklyTrend : defaultWeeklyData;

  const studentScore =
    benchmark && benchmark.length > 0
      ? Math.round(
          benchmark.reduce((sum, b) => sum + b.A, 0) / benchmark.length,
        )
      : 0;

  const classAvgScore =
    benchmark && benchmark.length > 0
      ? Math.round(
          benchmark.reduce((sum, b) => sum + b.B, 0) / benchmark.length,
        )
      : 0;

  const comparisonData = [
    { label: "Anda", value: studentScore },
    { label: "Rata-rata Kelas", value: classAvgScore },
  ];

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
            {isStudent ? "Riwayat Skor Anda" : "Tren Motivasi Mingguan"}
          </CardTitle>
          <p className="text-xs text-slate-500">
            {isStudent
              ? "Skor motivasi Anda dari setiap sesi rekaman."
              : "Statistik perkembangan rata-rata motivasi kelas per minggu."}
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
                Skor Anda vs Kelas
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
              ? "Bandingkan skor rata-rata Anda dengan rata-rata kelas."
              : "Distribusi tingkat motivasi di dalam kelas ini."}
          </p>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[350px]">
          {isStudent ? (
            <div className="w-full space-y-6">
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonData}
                    margin={{ top: 20, right: 20, left: -20, bottom: 10 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      strokeOpacity={0.1}
                    />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      fontSize={13}
                      fontWeight="bold"
                      className="fill-slate-600"
                    />
                    <YAxis
                      domain={[0, 100]}
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                      className="fill-slate-400"
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(0,0,0,0.03)", radius: 4 }}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 shadow-lg text-xs font-bold">
                            <span className="text-slate-500">{data.label}</span>
                            : {data.value}
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={70}>
                      {comparisonData.map((entry) => (
                        <Cell
                          key={entry.label}
                          fill={entry.label === "Anda" ? "#5841EA" : "#10b981"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#5841EA]" />
                  <span className="font-bold text-slate-600">Anda</span>
                  <span className="font-black text-[#5841EA] text-sm">
                    {studentScore}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#10b981]" />
                  <span className="font-bold text-slate-600">
                    Rata-rata Kelas
                  </span>
                  <span className="font-black text-[#10b981] text-sm">
                    {classAvgScore}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <MotivationPieChart data={distributionData} centerLabel="92%" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
