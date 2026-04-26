import StatCard from "@/components/common/StatCard";
import { Users, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function OverallStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard
        icon={Users}
        value={124}
        label="Total Mahasiswa"
        variant="blue"
        trend={{ value: "+12%", isUp: true }}
      />
      <StatCard
        icon={TrendingUp}
        value={71}
        label="Motivasi Tinggi"
        variant="emerald"
        trend={{ value: "+5%", isUp: true }}
      />
      <StatCard
        icon={Minus}
        value={39}
        label="Motivasi Sedang"
        variant="amber"
        trend={{ value: "±0%", isUp: null }}
      />
      <StatCard
        icon={TrendingDown}
        value={14}
        label="Motivasi Rendah"
        variant="rose"
        trend={{ value: "-3%", isUp: false }}
      />
    </div>
  );
}
