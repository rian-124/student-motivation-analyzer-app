"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Student } from "@/lib/types/student.type";
import { studentService } from "@/services/student.service";
import { useAuthStore } from "@/store/auth.store";
import {
  ChevronLeft,
  ChevronRight,
  ListCollapse,
  Loader2,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StudentAnalysisListSection() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // Panggil data mahasiswa (jika role lecturer, bisa di-filter di backend berdasarkan user,
        // tapi di sini menggunakan findAll standar dulu)
        const response = await studentService.findAll(page);
        setStudents(Array.isArray(response.data) ? response.data : []);
        setMeta(response.meta);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Gagal mengambil data mahasiswa.");
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page]);

  const handleViewHistory = (id: string) => {
    router.push(`/analysis-results/student/${id}`);
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.includes(searchQuery)
    );
  });

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
      <CardHeader className="p-4 space-y-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-white px-1">
            Daftar Mahasiswa
          </CardTitle>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Mahasiswa/NIM..."
                className="pl-9 w-full sm:w-[240px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">
                  Mahasiswa
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">
                  Kelas
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">
                  Total Analisis
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">
                  Opsi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredStudents.length === 0 && !loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center">
                    <p className="text-sm text-slate-400 font-medium">
                      Belum ada mahasiswa yang ditemukan.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors"
                  >
                    <TableCell className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {student.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                          {student.nim}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                        {student.class?.name || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {student._count?.analyses || 0}
                      </span>
                    </TableCell>
                    <TableCell className="text-right px-5">
                      <Button
                        onClick={() => handleViewHistory(student.id)}
                        size="sm"
                        variant="outline"
                        className="h-7 px-3 text-[11px] font-bold border-slate-200 dark:border-slate-800 text-slate-500 hover:text-brand hover:border-brand/30 transition-all"
                      >
                        <ListCollapse className="w-3 h-3 mr-1.5" />
                        Lihat Riwayat
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* FOOTER / PAGINATION */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/10">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Total {meta?.total ?? students.length} Mahasiswa
          </p>
          {meta && meta.lastPage > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 rounded-md text-slate-400"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: meta.lastPage }).map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-md cursor-pointer transition-colors
                      ${
                        page === i + 1
                          ? "bg-brand text-white"
                          : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 rounded-md text-slate-400"
                disabled={page === meta.lastPage}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
