"use client";

import StatCard from "@/components/common/StatCard";
import { Users, CheckCircle2, AlertTriangle, BookOpen, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GLOBAL_STATS, CLASS_DATA } from "@/lib/data/dummyData";

export default function StatsSection() {
  const { userRole, user } = useAuth();
  const isAdmin = userRole === "admin";
  
  // @ts-ignore
  const userClass = user?.assignedClass || "2021-A";
  const classInfo = CLASS_DATA.find(c => c.label === userClass) || CLASS_DATA[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        icon={Users} 
        label={isAdmin ? "Total Mahasiswa" : "Mahasiswa Bimbingan"} 
        value={isAdmin ? GLOBAL_STATS.totalStudents : classInfo.students} 
        variant="blue"
        trend={{ value: isAdmin ? "+4" : "+2", isUp: true }}
      />
      <StatCard 
        icon={CheckCircle2} 
        label="Analisis Selesai" 
        value={isAdmin ? 89 : Math.round(classInfo.students * 0.7)} 
        variant="emerald"
        trend={{ value: "12.5%", isUp: true }}
      />
      <StatCard 
        icon={AlertTriangle} 
        label="Motivasi Rendah" 
        value={isAdmin ? 14 : Math.round(classInfo.students * 0.15)} 
        variant="rose"
        trend={{ value: "2", isUp: false }}
      />
      <StatCard 
        icon={isAdmin ? BookOpen : GraduationCap} 
        label={isAdmin ? "Kelas Terdaftar" : "Target Kelulusan"} 
        value={isAdmin ? CLASS_DATA.length : "94%"} 
        variant="amber"
        trend={{ value: isAdmin ? "0" : "+2%", isUp: isAdmin ? null : true }}
      />
    </div>
  );
}
