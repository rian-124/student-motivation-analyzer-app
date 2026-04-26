import StatCard from "@/components/common/StatCard";
import { Users, CheckCircle2, AlertTriangle, BookOpen } from "lucide-react";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        icon={Users} 
        label="Total Mahasiswa" 
        value={124} 
        variant="blue"
        trend={{ value: "+4", isUp: true }}
      />
      <StatCard 
        icon={CheckCircle2} 
        label="Analisis Selesai" 
        value={89} 
        variant="emerald"
        trend={{ value: "12.5%", isUp: true }}
      />
      <StatCard 
        icon={AlertTriangle} 
        label="Motivasi Rendah" 
        value={14} 
        variant="rose"
        trend={{ value: "2", isUp: false }}
      />
      <StatCard 
        icon={BookOpen} 
        label="Kelas Terdaftar" 
        value={8} 
        variant="amber"
        trend={{ value: "0", isUp: null }}
      />
    </div>
  );
}
