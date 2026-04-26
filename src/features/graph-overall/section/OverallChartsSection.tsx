"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import MotivationBarChart from "@/components/common/MotivationBarChart";

export default function OverallChartsSection() {
  const barData = [
    { label: "Kelas A", value: 80 },
    { label: "Kelas B", value: 60 },
    { label: "Kelas C", value: 92 },
    { label: "Kelas D", value: 45 },
    { label: "Kelas E", value: 70 },
    { label: "Kelas F", value: 85 },
    { label: "Kelas G", value: 30 },
    { label: "Kelas H", value: 75 },
  ];

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <BarChart3 className="w-4 h-4 text-brand" />
          Perbandingan Rata-rata Skor per Kelas
        </CardTitle>
        <p className="text-xs text-slate-500">Distribusi rata-rata motivasi mahasiswa di seluruh kelas terdaftar.</p>
      </CardHeader>
      
      <CardContent className="p-6">
        <MotivationBarChart data={barData} color="#5841EA" />
      </CardContent>
    </Card>
  );
}
