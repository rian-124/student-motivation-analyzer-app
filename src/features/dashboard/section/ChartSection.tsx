"use client";

import MotivationBarChart from "@/components/common/MotivationBarChart";
import MotivationPieChart from "@/components/common/MotivationPieChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type AnalyticsCharts,
  analyticsService,
} from "@/services/analytics.service";
import { useAuthStore } from "@/store/auth.store";
import { ArrowRight, BarChart3, PieChart } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChartSection() {
  const user = useAuthStore((state) => state.user);
  const userRole = (user?.role || "LECTURER").toUpperCase();
  const [charts, setCharts] = useState<AnalyticsCharts | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = userRole === "ADMIN";
  const isStudent = userRole === "STUDENT";

  // Get class info safely
  const lecturerClass = user?.lecturer?.class?.name;
  const studentClass = user?.student?.class?.name;
  const userClassName = isAdmin
    ? "Global"
    : isStudent
      ? studentClass || "Kelas Anda"
      : lecturerClass || "Kelas Bimbingan";

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const data = await analyticsService.getCharts();
        setCharts(data);
      } catch (error) {
        console.error("Failed to fetch analytics charts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Skeleton className="lg:col-span-8 h-[400px] rounded-xl" />
        <Skeleton className="lg:col-span-4 h-[400px] rounded-xl" />
      </div>
    );
  }

  const barData = charts?.barChart || [];
  const pieData = charts?.pieChart || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* BAR CHART */}
      <Card className="lg:col-span-8 border-none shadow-sm bg-white dark:bg-slate-900 rounded-xl">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <BarChart3 className="w-4 h-4 text-brand" />
            {isAdmin
              ? "Motivasi per Jurusan"
              : isStudent
                ? "Tren Motivasi Saya"
                : "Tren Motivasi Kelas"}
          </CardTitle>
          <p className="text-xs text-slate-500">
            {isAdmin
              ? "Rata-rata skor motivasi mahasiswa di tiap jurusan."
              : `Statistik motivasi harian untuk kelas ${userClassName}.`}
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
            {isAdmin
              ? "Distribusi Global"
              : `Distribusi Kelas ${userClassName}`}
          </CardTitle>
          <p className="text-xs text-slate-500">
            {isAdmin
              ? "Distribusi tingkat motivasi seluruh mahasiswa."
              : "Berdasarkan hasil analisis bimbingan terbaru."}
          </p>
        </CardHeader>

        <CardContent className="p-6 flex flex-col items-center justify-between">
          <MotivationPieChart data={pieData} />

          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-brand transition-all"
          >
            {isAdmin
              ? "Lihat Semua Jurusan"
              : isStudent
                ? "Hasil Analisis Saya"
                : "Detail Mahasiswa"}
            <ArrowRight className="w-3 h-3 ml-1.5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
