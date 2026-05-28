"use client";

import ClassChartsSection from "@/features/leaderboard/section/ClassChartsSection";
import ClassStatsSection from "@/features/leaderboard/section/ClassStatsSection";
import {
  type StudentGraphData,
  motivationAnalysisService,
} from "@/services/motivation-analysis.service";
import { useAuthStore } from "@/store/auth.store";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import ChartSection from "../section/ChartSection";
import StatsSection from "../section/StatsSection";

const StudentDashboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-8">
      <div className="space-y-3">
        <div className="h-9 w-72 bg-slate-200 rounded-xl" />
        <div className="h-4 w-[450px] max-w-full bg-slate-100 rounded-lg" />
      </div>
      <div className="h-10 w-32 bg-brand/5 rounded-xl border border-brand/10" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm"
        />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 h-[400px] bg-white rounded-2xl border border-slate-100 shadow-sm" />
      <div className="lg:col-span-5 h-[400px] bg-white rounded-2xl border border-slate-100 shadow-sm" />
    </div>
    <div className="h-32 bg-brand/5 rounded-[2rem] border border-brand/10" />
  </div>
);

function StudentDashboard() {
  const user = useAuthStore((state) => state.user);
  const [graphData, setGraphData] = useState<StudentGraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const studentId = user?.student?.id;
  const userClassName = user?.student?.class?.name || "Kelas Anda";

  useEffect(() => {
    const fetchStudentGraph = async () => {
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res =
          await motivationAnalysisService.getStudentGraphData(studentId);
        setGraphData(res);
      } catch (error) {
        console.error("Failed to fetch graph data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentGraph();
  }, [studentId]);

  if (loading) {
    return (
      <section className="p-6 lg:p-8 w-full min-h-screen bg-slate-50/50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <StudentDashboardSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 lg:p-8 space-y-8 w-full min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Analisis Motivasi Anda di Kelas
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">
              Lihat bagaimana performa motivasi Anda dibandingkan dengan
              rata-rata teman sekelas secara anonim.
            </p>
          </div>

          <div className="flex items-center px-4 h-10 rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-sm text-sm font-bold">
            {userClassName}
          </div>
        </div>

        {graphData && <ClassStatsSection isStudent stats={graphData.stats} />}

        <ClassChartsSection
          isStudent
          weeklyTrend={graphData?.weeklyTrend}
          benchmark={graphData?.benchmark}
        />

        <div className="bg-gradient-to-br from-brand/5 to-brand-secondary/5 border border-brand/10 rounded-[2rem] p-8">
          <h3 className="text-xl font-bold text-brand-secondary mb-4">
            Insight Motivasi Anda
          </h3>
          {(() => {
            const growth = graphData?.stats?.growth ?? 0;

            return (
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                {growth > 0
                  ? `Luar biasa! Motivasi Anda meningkat sebesar ${growth}% dibandingkan rekaman sebelumnya. Pertahankan energi dan kejelasan bicara Anda!`
                  : "Berdasarkan analisis terbaru, Anda memiliki stabilitas yang cukup baik. Cobalah untuk lebih mengekspresikan minat Anda saat berbicara agar motivasi intrinsik Anda semakin terlihat."}{" "}
                Tetap semangat dalam proses belajar mandiri di kelas ini!
              </p>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const currentYear = new Date().getFullYear();
  const userRole = (user?.role || "LECTURER").toUpperCase();

  if (userRole === "STUDENT") {
    return <StudentDashboard />;
  }

  return (
    <section className="p-6 lg:p-8 space-y-8 w-full min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* WELCOME HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Halo, {user?.name || "Dosen"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Berikut ringkasan performa motivasi mahasiswa periode ini.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <StatsSection />
          <ChartSection />
        </div>

        {/* FOOTER INFO */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-wider">
          <p>© {currentYear} Student Motivation Analyzer</p>
          <div className="flex gap-4">
            <span className="hover:text-brand cursor-pointer">Bantuan</span>
            <span className="hover:text-brand cursor-pointer">Dokumentasi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
