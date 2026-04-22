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
import OverallBarChartSection from "../section/OverallBarChartSection";
import TopLowClassesSection from "../section/TopLowClassesSection";

export default function GraphOverallPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Grafik Motivasi — Keseluruhan"
        description="Analisis motivasi seluruh kelas dan mahasiswa"
        actions={
          <Select defaultValue="genap">
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Pilih semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genap">Semester Genap 2025/26</SelectItem>
              <SelectItem value="ganjil">Semester Ganjil 2025/26</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <OverallStatsSection />
      <OverallBarChartSection />
      <TopLowClassesSection />
    </div>
  );
}