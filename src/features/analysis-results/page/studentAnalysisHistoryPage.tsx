"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import type { Student } from "@/lib/types/student.type";
import { studentService } from "@/services/student.service";
import { ArrowLeft, FileDown, Filter } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HistoryTableSection from "../section/HistoryTableSection";

export default function StudentAnalysisHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.studentId as string;
  const [student, setStudent] = useState<Student | null>(null);

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
                variant="outline"
                size="sm"
                className="rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                size="sm"
                className="bg-brand hover:bg-brand/90 text-white rounded-lg shadow-sm"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Ekspor Data
              </Button>
            </div>
          }
        />

        <div className="w-full">
          {/* We pass the studentId to the HistoryTableSection so it specifically fetches for this student */}
          <HistoryTableSection studentId={studentId} />
        </div>
      </div>
    </section>
  );
}
