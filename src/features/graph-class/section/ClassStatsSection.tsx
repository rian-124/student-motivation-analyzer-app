import StatCard from "@/components/common/StatCard";
import { Users, TrendingUp, TrendingDown, Minus, FileText, Activity, Award, BarChart } from "lucide-react";

interface ClassStatsSectionProps {
  isStudent?: boolean;
  stats?: {
    latestStatus: string;
    activityCount: number;
    avgScore: number;
    growth: number;
  };
}

export default function ClassStatsSection({ isStudent, stats }: ClassStatsSectionProps) {
  if (isStudent && stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={Activity}
          value={`${stats.activityCount} Kali`}
          label="Aktivitas Analisis"
          variant="blue"
          trend={{ value: "Total", isUp: true }}
        />
        <StatCard
          icon={Award}
          value={stats.avgScore.toFixed(1)}
          label="Rata-rata Skor"
          variant="emerald"
          trend={{ value: "Akurasi", isUp: true }}
        />
        <StatCard
          icon={BarChart}
          value={`${stats.growth >= 0 ? '+' : ''}${stats.growth}%`}
          label="Perkembangan"
          variant="amber"
          trend={{ 
            value: stats.growth >= 0 ? "Meningkat" : "Menurun", 
            isUp: stats.growth >= 0 
          }}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard 
        icon={Users} 
        value={32} 
        label="Total Mahasiswa" 
        variant="blue" 
      />
      <StatCard
        icon={TrendingUp}
        value={18}
        label="Motivasi Tinggi"
        variant="emerald"
        trend={{ value: "57%", isUp: true }}
      />
      <StatCard
        icon={Minus}
        value={9}
        label="Motivasi Sedang"
        variant="amber"
        trend={{ value: "28%", isUp: null }}
      />
      <StatCard
        icon={TrendingDown}
        value={5}
        label="Motivasi Rendah"
        variant="rose"
        trend={{ value: "15%", isUp: false }}
      />
    </div>
  );
}

