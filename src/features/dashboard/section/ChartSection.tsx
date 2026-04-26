"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, PieChart, ArrowRight, BookOpen } from "lucide-react";
import MotivationBarChart from "@/components/common/MotivationBarChart";
import MotivationPieChart from "@/components/common/MotivationPieChart";
import { useAuth } from "@/context/AuthContext";
import { CLASS_DATA, MOTIVATION_DISTRIBUTION, GLOBAL_STATS } from "@/lib/data/dummyData";

export default function ChartSection() {
  const { userRole, user } = useAuth();
  
  const isAdmin = userRole === "admin";
  // @ts-ignore - assignedClass exists in dummy user data
  const userClass = user?.assignedClass || "2021-A";

  const barData = isAdmin 
    ? CLASS_DATA.map(c => ({ label: c.label, value: c.value }))
    : [
        { label: "Sen", value: 65 },
        { label: "Sel", value: 72 },
        { label: "Rab", value: 85 },
        { label: "Kam", value: 78 },
        { label: "Jum", value: 90 },
      ];

  const pieData = isAdmin 
    ? MOTIVATION_DISTRIBUTION.global 
    : (MOTIVATION_DISTRIBUTION.classes as any)[userClass] || MOTIVATION_DISTRIBUTION.global;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* BAR CHART */}
      <Card className="lg:col-span-8 border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <BarChart3 className="w-4 h-4 text-brand" />
            {isAdmin ? "Motivasi per Kelas" : "Tren Motivasi Mingguan"}
          </CardTitle>
          <p className="text-xs text-slate-500">
            {isAdmin 
              ? "Rata-rata skor motivasi mahasiswa di tiap kelas bimbingan." 
              : `Rata-rata motivasi harian untuk ${userClass}.`}
          </p>
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
            {isAdmin ? "Distribusi Global" : `Distribusi ${userClass}`}
          </CardTitle>
          <p className="text-xs text-slate-500">
            {isAdmin 
              ? `Total ${GLOBAL_STATS.totalStudents} Mahasiswa terdaftar.` 
              : "Berdasarkan hasil analisis bimbingan terbaru."}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 flex flex-col items-center justify-between">
          <MotivationPieChart data={pieData} />

          <Button variant="ghost" size="sm" className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-brand transition-all">
            {isAdmin ? "Lihat Semua Kelas" : "Detail Mahasiswa"}
            <ArrowRight className="w-3 h-3 ml-1.5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
