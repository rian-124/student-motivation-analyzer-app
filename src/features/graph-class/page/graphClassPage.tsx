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
    <section className="p-6 space-y-6">
      <PageHeader
        title="Grafik Motivasi — Kelas Saya"
        description="Visualisasi motivasi mahasiswa per kelas yang Anda ampu"
        actions={
          <Select defaultValue="kelas-a">
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Pilih kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kelas-a">Kelas A — Pemrograman Web</SelectItem>
              <SelectItem value="kelas-b">Kelas B — Pemrograman Web</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <ClassStatsSection />
      <ClassChartsSection />
      <StudentDetailTableSection />
    </section>
  );
}