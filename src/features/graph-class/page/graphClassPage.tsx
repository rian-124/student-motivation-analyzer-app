"use client";

import PageHeader from "@/components/common/PageHeader";
import { useAuthStore } from "@/store/auth.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClassStatsSection from "../section/ClassStatsSection";
import ClassChartsSection from "../section/ClassChartsSection";
import StudentDetailTableSection from "../section/StudentDetailTableSection";

export default function GraphClassPage() {
  const user = useAuthStore((state) => state.user);
  const userRole = (user?.role || "STUDENT").toUpperCase();
  const isAdmin = userRole === "ADMIN";
  const isLecturer = userRole === "LECTURER";
  
  // Placeholder for user's class - in real app would come from profile
  const userClassName = userRole === "STUDENT" ? "Kelas A — Web Dev" : "Kelas B — Web Dev";

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Grafik Motivasi — Analisis Kelas"
        description="Detail perkembangan motivasi mahasiswa untuk kelas spesifik"
        actions={isAdmin || isLecturer ? (
          <div className="flex gap-3">
            <Select defaultValue="genap">
              <SelectTrigger className="w-[200px] bg-white dark:bg-slate-900 border-none shadow-sm">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="genap">Genap 2025/26</SelectItem>
                <SelectItem value="ganjil">Ganjil 2025/26</SelectItem>
              </SelectContent>
            </Select>
            
            {isAdmin ? (
              <Select defaultValue="kelas-a">
                <SelectTrigger className="w-[240px] bg-white dark:bg-slate-900 border-none shadow-sm font-medium">
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kelas-a">Kelas A — Web Dev</SelectItem>
                  <SelectItem value="kelas-b">Kelas B — Web Dev</SelectItem>
                  <SelectItem value="kelas-c">Kelas C — UI/UX</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex items-center px-4 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm text-sm font-bold text-brand">
                {userClassName}
              </div>
            )}
          </div>
        ) : null}
      />
      
      <ClassStatsSection />
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-12">
          <ClassChartsSection />
        </div>
      </div>

      <StudentDetailTableSection />
    </div>
  );
}