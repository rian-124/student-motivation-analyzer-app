"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { motivationAnalysisService } from "@/services/motivation-analysis.service";
import { studentService } from "@/services/student.service";
import { useAuthStore } from "@/store/auth.store";
import { exportAnalysisHistory, exportStudentList } from "@/utils/export-excel";
import { FileDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import HistoryTableSection from "../section/HistoryTableSection";
import StudentAnalysisListSection from "../section/StudentAnalysisListSection";

export default function AnalysisResultsPage() {
  const { user } = useAuthStore();
  const isStudent = user?.role === "student";
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (exporting) return;
    try {
      setExporting(true);
      if (isStudent && user?.student?.id) {
        const data = await motivationAnalysisService.findByStudent(
          user.student.id,
        );
        const ts = new Date().toISOString().slice(0, 10);
        exportAnalysisHistory(data, `riwayat-analisis-saya-${ts}.xlsx`);
      } else {
        const response = await studentService.findAll(1, 999999);
        const ts = new Date().toISOString().slice(0, 10);
        exportStudentList(response.data, `daftar-mahasiswa-${ts}.xlsx`);
      }
      toast.success("Data berhasil diekspor.");
    } catch {
      toast.error("Gagal mengekspor data.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className="p-6 lg:p-8 space-y-6 w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          title={
            isStudent ? "Riwayat Analisis Saya" : "Database Hasil Analisis"
          }
          description={
            isStudent
              ? "Daftar riwayat analisis motivasi yang telah Anda lakukan."
              : "Pilih mahasiswa untuk melihat daftar riwayat analisis motivasinya."
          }
          actions={
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-brand hover:bg-brand/90 text-white rounded-lg shadow-sm"
                onClick={handleExport}
                disabled={exporting}
              >
                {exporting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4 mr-2" />
                )}
                {exporting ? "Mengekspor..." : "Ekspor Data"}
              </Button>
            </div>
          }
        />

        <div className="w-full">
          {isStudent ? <HistoryTableSection /> : <StudentAnalysisListSection />}
        </div>
      </div>
    </section>
  );
}
