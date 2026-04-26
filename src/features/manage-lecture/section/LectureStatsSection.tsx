import StatCard from "@/components/common/StatCard";
import { Users, UserCheck } from "lucide-react";

export default function LectureStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard 
        icon={Users} 
        value={16} 
        label="Total Dosen Terdaftar" 
        variant="blue" 
      />
      <StatCard
        icon={UserCheck}
        value={16}
        label="Akun Terverifikasi"
        variant="emerald"
      />
    </div>
  );
}
