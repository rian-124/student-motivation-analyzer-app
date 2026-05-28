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
  TrendingUp,
  Users,
  Zap,
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
      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1 min-w-[200px]">
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {isAdmin || isLecturer ? (
        <StatCard
          icon={Users}
          label={isAdmin ? "Total Mahasiswa" : "Mahasiswa Yang Di Wali"}
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
        icon={AlertTriangle}
        label="Sangat Rendah"
        value={stats?.veryLowMotivation || 0}
        variant="rose"
        trend={{ value: "↓", isUp: false }}
      />

      <StatCard
        icon={AlertTriangle}
        label="Motivasi Rendah"
        value={stats?.lowMotivation || 0}
        variant="orange"
        trend={{ value: "↓", isUp: false }}
      />

      <StatCard
        icon={TrendingUp}
        label="Motivasi Cukup"
        value={stats?.averageMotivation || 0}
        variant="amber"
        trend={{ value: "→", isUp: null }}
      />

      <StatCard
        icon={CheckCircle2}
        label="Motivasi Tinggi"
        value={stats?.highMotivation || 0}
        variant="emerald"
        trend={{ value: "↑", isUp: true }}
      />

      <StatCard
        icon={Zap}
        label="Sangat Tinggi"
        value={stats?.veryHighMotivation || 0}
        variant="green"
        trend={{ value: "↑↑", isUp: true }}
      />

      {isAdmin && (
        <StatCard
          icon={BookOpen}
          label="Kelas Terdaftar"
          value={stats?.totalClasses || 0}
          variant="purple"
          trend={{ value: "0", isUp: null }}
        />
      )}
    </div>
  );
}
