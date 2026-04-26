import StatCard from "@/components/common/StatCard";
import { Users, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function ClassStatsSection() {
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
