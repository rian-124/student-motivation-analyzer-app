"use client";

import StatCard from "@/components/common/StatCard";
import { Users, CheckCircle2, AlertTriangle, BookOpen, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { GLOBAL_STATS, CLASS_DATA } from "@/lib/data/dummyData";

export default function StatsSection() {
  const { userRole, user } = useAuth();
  const isAdmin = userRole === "admin";
  
  const isStudent = userRole === "student";
  const isLecturer = userRole === "lecturer";
  
  // Get class info safely
  // In a real app, this would come from the user's student or lecturer profile
  const userClassName = isAdmin ? "Global" : (isStudent ? "TI-A" : "TI-B"); // Placeholder
  const classInfo = CLASS_DATA.find(c => c.label === userClassName) || CLASS_DATA[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Students - Only for Admin/Lecturer */}
      {isAdmin || isLecturer ? (
        <StatCard 
          icon={Users} 
          label={isAdmin ? "Total Mahasiswa" : "Mahasiswa Bimbingan"} 
          value={isAdmin ? GLOBAL_STATS.totalStudents : classInfo.students} 
          variant="blue"
          trend={{ value: isAdmin ? "+4" : "+2", isUp: true }}
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
        value={isAdmin ? 89 : (isStudent ? 3 : Math.round(classInfo.students * 0.7))} 
        variant="emerald"
        trend={{ value: "12.5%", isUp: true }}
      />

      <StatCard 
        icon={AlertTriangle} 
        label={isStudent ? "Perlu Perhatian" : "Motivasi Rendah"} 
        value={isAdmin ? 14 : (isStudent ? "Tidak" : Math.round(classInfo.students * 0.15))} 
        variant="rose"
        trend={{ value: isStudent ? "Aman" : "2", isUp: isStudent ? true : false }}
      />

      {isAdmin ? (
        <StatCard 
          icon={BookOpen} 
          label="Kelas Terdaftar" 
          value={CLASS_DATA.length} 
          variant="amber"
          trend={{ value: "0", isUp: null }}
        />
      ) : (
        <StatCard 
          icon={GraduationCap} 
          label="Rata-rata Kelas" 
          value={`${classInfo.value}%`} 
          variant="amber"
          trend={{ value: "+2%", isUp: true }}
        />
      )}
    </div>
  );
}
