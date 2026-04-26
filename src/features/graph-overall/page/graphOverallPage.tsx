"use client";

import PageHeader from "@/components/common/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OverallStatsSection from "../section/OverallStatsSection";
import OverallChartsSection from "../section/OverallChartsSection";
import TopLowClassesSection from "../section/TopLowClassesSection";

export default function GraphOverallPage() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Grafik Motivasi — Keseluruhan"
        description="Analisis komprehensif motivasi mahasiswa di seluruh kelas"
        actions={
          <Select defaultValue="genap">
            <SelectTrigger className="w-[240px] bg-white dark:bg-slate-900 border-none shadow-sm font-medium">
              <SelectValue placeholder="Pilih semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genap">Semester Genap 2025/26</SelectItem>
              <SelectItem value="ganjil">Semester Ganjil 2025/26</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      
      {/* Stats Cards */}
      <OverallStatsSection />

      {/* Main Charts (Bar & Pie) */}
      <OverallChartsSection />

      {/* Top & Low Performance Ranking */}
      <TopLowClassesSection />
    </div>
  );
}