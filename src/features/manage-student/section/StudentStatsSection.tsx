import StatCard from "@/components/common/StatCard";
import { Users, UserCheck } from "lucide-react";

export default function StudentStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard 
        icon={Users} 
        value={124} 
        label="Total Mahasiswa" 
        variant="blue" 
      />
      <StatCard
        icon={UserCheck}
        value={124}
        label="Mahasiswa Terdaftar"
        variant="emerald"
      />
    </div>
  );
}
