"use client";

import StatCard from "@/components/common/StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type AnalyticsStats,
  analyticsService,
} from "@/services/analytics.service";
import { useAuthStore } from "@/store/auth.store";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function StatsSection() {
  const user = useAuthStore((state) => state.user);
  const userRole = (user?.role || "LECTURER").toUpperCase();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = userRole === "ADMIN";
  const isLecturer = userRole === "LECTURER";
  const isStudent = userRole === "STUDENT";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analyticsService.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch analytics stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Students - Only for Admin/Lecturer */}
      {isAdmin || isLecturer ? (
        <StatCard
          icon={Users}
          label={isAdmin ? "Total Mahasiswa" : "Mahasiswa Bimbingan"}
          value={stats?.totalStudents || 0}
          variant="blue"
          trend={{ value: "+4", isUp: true }}
        />
      ) : (
        <StatCard
          icon={GraduationCap}
          label="Skor Motivasi Saya"
          value="84"
          variant="blue"
          trend={{ value: "+5", isUp: true }}
        />
      )}

      <StatCard
        icon={CheckCircle2}
        label="Analisis Selesai"
        value={stats?.totalAnalyses || 0}
        variant="emerald"
        trend={{ value: "12.5%", isUp: true }}
      />

      <StatCard
        icon={AlertTriangle}
        label={isStudent ? "Perlu Perhatian" : "Motivasi Rendah"}
        value={stats?.lowMotivation || 0}
        variant="rose"
        trend={{
          value: isStudent ? "Aman" : "2",
          isUp: isStudent ? true : false,
        }}
      />

      {isAdmin ? (
        <StatCard
          icon={BookOpen}
          label="Kelas Terdaftar"
          value={stats?.totalClasses || 0}
          variant="amber"
          trend={{ value: "0", isUp: null }}
        />
      ) : (
        <StatCard
          icon={GraduationCap}
          label="Rata-rata Kelas"
          value={`${stats?.classAverage || 0}%`}
          variant="amber"
          trend={{ value: "+2%", isUp: true }}
        />
      )}
    </div>
  );
}
