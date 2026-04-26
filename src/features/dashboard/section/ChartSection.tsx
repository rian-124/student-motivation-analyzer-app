"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart, ArrowRight } from "lucide-react";
import MotivationBarChart from "@/components/common/MotivationBarChart";
import MotivationPieChart from "@/components/common/MotivationPieChart";

export default function ChartSection() {
  const barData = [
    { label: "A", value: 80 },
    { label: "B", value: 60 },
    { label: "C", value: 90 },
    { label: "D", value: 50 },
    { label: "E", value: 70 },
    { label: "F", value: 85 },
    { label: "G", value: 55 },
    { label: "H", value: 75 },
  ];

  const pieData = [
    { category: "Motivasi Tinggi", value: 57, fill: "#10b981" },
    { category: "Motivasi Sedang", value: 29, fill: "#f59e0b" },
    { category: "Motivasi Rendah", value: 14, fill: "#f43f5e" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* BAR CHART */}
      <Card className="lg:col-span-8 border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <BarChart3 className="w-4 h-4 text-brand" />
            Motivasi per Kelas
          </CardTitle>
          <p className="text-xs text-slate-500">Rata-rata skor motivasi mahasiswa di tiap kelas.</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <MotivationBarChart data={barData} color="#5841EA" />
        </CardContent>
      </Card>

      {/* PIE CHART */}
      <Card className="lg:col-span-4 border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <PieChart className="w-4 h-4 text-slate-400" />
            Distribusi Global
          </CardTitle>
          <p className="text-xs text-slate-500">Total 124 Mahasiswa terdaftar.</p>
        </CardHeader>
        
        <CardContent className="p-6 flex flex-col items-center justify-between">
          <MotivationPieChart data={pieData} />

          <Button variant="ghost" size="sm" className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-brand">
            Detail Analisis
            <ArrowRight className="w-3 h-3 ml-1.5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
