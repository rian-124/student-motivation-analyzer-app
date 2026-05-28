"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import type { Student } from "@/lib/types/student.type";
import { motivationAnalysisService } from "@/services/motivation-analysis.service";
import { studentService } from "@/services/student.service";
import { exportAnalysisHistory } from "@/utils/export-excel";
import { ArrowLeft, FileDown, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HistoryTableSection from "../section/HistoryTableSection";

export default function StudentAnalysisHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.studentId as string;
  const [student, setStudent] = useState<Student | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) return;
      try {
        const data = await studentService.findOne(studentId);
        setStudent(data);
      } catch (error) {
        console.error("Failed to fetch student details:", error);
      }
    };
    fetchStudent();
  }, [studentId]);

  const handleExport = async () => {
    if (exporting || !studentId) return;
    try {
      setExporting(true);
      const data = await motivationAnalysisService.findByStudent(studentId);
      const ts = new Date().toISOString().slice(0, 10);
      const name = student?.name?.replace(/\s+/g, "_") || studentId;
      exportAnalysisHistory(data, `riwayat-${name}-${ts}.xlsx`);
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
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/analysis-results")}
            className="pl-0 text-slate-500 hover:text-brand transition-colors h-auto py-0 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Kembali ke Daftar Mahasiswa
          </Button>
        </div>

        <PageHeader
          title={`Riwayat Analisis: ${student?.name || "Memuat..."}`}
          description={`NIM: ${student?.nim || "..."} • Kelas: ${student?.class?.name || "..."}`}
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
          <HistoryTableSection studentId={studentId} />
        </div>
      </div>
    </section>
  );
}
