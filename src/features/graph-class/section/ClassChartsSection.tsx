"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart } from "lucide-react";
import MotivationBarChart from "@/components/common/MotivationBarChart";
import MotivationPieChart from "@/components/common/MotivationPieChart";

export default function ClassChartsSection() {
  const weeklyData = [
    { label: "Minggu 1", value: 70 },
    { label: "Minggu 2", value: 65 },
    { label: "Minggu 3", value: 80 },
    { label: "Minggu 4", value: 60 },
    { label: "Minggu 5", value: 92 },
    { label: "Minggu 6", value: 75 },
    { label: "Minggu 7", value: 85 },
    { label: "Minggu 8", value: 70 },
  ];

  const distributionData = [
    { category: "Motivasi Tinggi", value: 65, fill: "#10b981" },
    { category: "Motivasi Sedang", value: 25, fill: "#f59e0b" },
    { category: "Motivasi Rendah", value: 10, fill: "#f43f5e" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* WEEKLY TREND */}
      <Card className="lg:col-span-8 border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <BarChart3 className="w-4 h-4 text-brand" />
            Tren Motivasi Mingguan
          </CardTitle>
          <p className="text-xs text-slate-500">Statistik perkembangan rata-rata motivasi kelas per minggu.</p>
        </CardHeader>
        <CardContent className="p-6">
          <MotivationBarChart data={weeklyData} color="#5841EA" />
        </CardContent>
      </Card>

      {/* CLASS DISTRIBUTION */}
      <Card className="lg:col-span-4 border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <PieChart className="w-4 h-4 text-slate-400" />
            Komposisi Kelas
          </CardTitle>
          <p className="text-xs text-slate-500">Distribusi tingkat motivasi di dalam kelas ini.</p>
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <MotivationPieChart data={distributionData} centerLabel="92%" />
        </CardContent>
      </Card>
    </div>
  );
}
