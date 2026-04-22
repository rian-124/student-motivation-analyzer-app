import StatCard from "@/components/common/StatCard";
import { Users, CheckCircle2, AlertTriangle, BookOpen } from "lucide-react";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard icon={Users} iconColor="text-brand" value={124} label="Total Mahasiswa" />
      <StatCard icon={CheckCircle2} iconColor="text-brand-secondary" value={89} label="Analisis Selesai" />
      <StatCard icon={AlertTriangle} iconColor="text-brand-accent" value={14} label="Motivasi Rendah" />
      <StatCard icon={BookOpen} iconColor="text-brand-hover" value={8} label="Kelas Terdaftar" />
    </div>
  );
}
