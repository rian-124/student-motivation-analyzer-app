"use client";

import PageHeader from "@/components/common/PageHeader";
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
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Grafik Motivasi — Analisis Kelas"
        description="Detail perkembangan motivasi mahasiswa untuk kelas spesifik"
        actions={
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
          </div>
        }
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