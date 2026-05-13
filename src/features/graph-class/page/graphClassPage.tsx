"use client";

import PageHeader from "@/components/common/PageHeader";
import { useAuthStore } from "@/store/auth.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClassStatsSection from "../section/ClassStatsSection";
import ClassChartsSection from "../section/ClassChartsSection";
import StudentDetailTableSection from "../section/StudentDetailTableSection";
import { useState, useEffect } from "react";
import { motivationAnalysisService } from "@/services/motivation-analysis.service";
import { Loader2 } from "lucide-react";

const GraphClassSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-8">
      <div className="space-y-3">
        <div className="h-9 w-72 bg-slate-200 rounded-xl" />
        <div className="h-4 w-[450px] bg-slate-100 rounded-lg" />
      </div>
      <div className="h-10 w-32 bg-brand/5 rounded-xl border border-brand/10" />
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100 shadow-sm" />
      ))}
    </div>

    {/* Charts Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 h-[400px] bg-white rounded-2xl border border-slate-100 shadow-sm" />
      <div className="lg:col-span-5 h-[400px] bg-white rounded-2xl border border-slate-100 shadow-sm" />
    </div>

    {/* Insight Skeleton */}
    <div className="h-32 bg-brand/5 rounded-[2rem] border border-brand/10" />
  </div>
);

export default function GraphClassPage() {
  const user = useAuthStore((state) => state.user);
  const [graphData, setGraphData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userRole = (user?.role || "STUDENT").toUpperCase();
  const isStudent = userRole === "STUDENT";
  const isAdmin = userRole === "ADMIN";
  const isLecturer = userRole === "LECTURER";
  
  // Get studentId from user profile
  const studentId = (user as any)?.student?.id;

  useEffect(() => {
    if (isStudent && studentId) {
      fetchStudentGraph();
    } else {
      setLoading(false);
    }
  }, [isStudent, studentId]);

  const fetchStudentGraph = async () => {
    try {
      setLoading(true);
      const res = await motivationAnalysisService.getStudentGraphData(studentId);
      setGraphData(res);
    } catch (error) {
      console.error("Failed to fetch graph data", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <GraphClassSkeleton />
      </div>
    );
  }

  // Placeholder for user's class - in real app would come from profile
  const userClassName = isStudent ? ((user as any)?.student?.class?.name || "Kelas Anda") : "Kelas B — Web Dev";

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title={isStudent ? "Analisis Motivasi Anda di Kelas" : "Grafik Motivasi — Analisis Kelas"}
        description={isStudent 
          ? "Lihat bagaimana performa motivasi Anda dibandingkan dengan rata-rata teman sekelas secara anonim." 
          : "Detail perkembangan motivasi mahasiswa untuk kelas spesifik"
        }
        actions={isAdmin || isLecturer ? (
          <div className="flex gap-3">
            <Select defaultValue="genap">
              <SelectTrigger className="w-[200px] bg-white dark:bg-slate-900 border-none shadow-sm">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="genap">Genap 2025/26</SelectItem>
                <SelectItem value="ganjil">Ganjil 2025/26</SelectItem>
              </SelectContent>
            </Select>
            
            {isAdmin ? (
              <Select defaultValue="kelas-a">
                <SelectTrigger className="w-[240px] bg-white dark:bg-slate-900 border-none shadow-sm font-medium">
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kelas-a">Kelas A — Web Dev</SelectItem>
                  <SelectItem value="kelas-b">Kelas B — Web Dev</SelectItem>
                  <SelectItem value="kelas-c">Kelas C — UI/UX</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex items-center px-4 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-sm font-bold text-brand">
                {userClassName}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center px-4 h-10 rounded-xl bg-brand/10 text-brand border border-brand/20 shadow-sm text-sm font-bold">
            {userClassName}
          </div>
        )}
      />
      
      {!isStudent && <ClassStatsSection isStudent={isStudent} />}
      {isStudent && graphData && <ClassStatsSection isStudent={isStudent} stats={graphData.stats} />}
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-12">
          <ClassChartsSection 
            isStudent={isStudent} 
            weeklyTrend={graphData?.weeklyTrend} 
            benchmark={graphData?.benchmark} 
          />
        </div>
      </div>

      {!isStudent && <StudentDetailTableSection />}
      
      {isStudent && (
        <div className="bg-gradient-to-br from-brand/5 to-brand-secondary/5 border border-brand/10 rounded-[2rem] p-8">
          <h3 className="text-xl font-bold text-brand-secondary mb-4 flex items-center gap-2">
            💡 Insight Motivasi Anda
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {graphData?.stats?.growth > 0 
              ? `Luar biasa! Motivasi Anda meningkat sebesar ${graphData.stats.growth}% dibandingkan rekaman sebelumnya. Pertahankan energi dan kejelasan bicara Anda!` 
              : `Berdasarkan analisis terbaru, Anda memiliki stabilitas yang cukup baik. Cobalah untuk lebih mengekspresikan minat Anda saat berbicara agar motivasi intrinsik Anda semakin terlihat.`
            }
            Tetap semangat dalam proses belajar mandiri di kelas ini!
          </p>
        </div>
      )}
    </div>
  );
}