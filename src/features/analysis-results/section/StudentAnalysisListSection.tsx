"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Class } from "@/lib/types/class.type";
import type { Student } from "@/lib/types/student.type";
import { classesService } from "@/services/classes.service";
import { studentService } from "@/services/student.service";
import { useAuthStore } from "@/store/auth.store";
import { getPaginationPages } from "@/utils/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ListCollapse,
  Loader2,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const PREDICTION_LABELS = [
  { value: "all", label: "Semua Label" },
  { value: "Sangat Tinggi", label: "Sangat Tinggi" },
  { value: "Tinggi", label: "Tinggi" },
  { value: "Cukup", label: "Cukup" },
  { value: "Rendah", label: "Rendah" },
  { value: "Sangat Rendah", label: "Sangat Rendah" },
];

const statusColors: Record<string, string> = {
  "Sangat Tinggi":
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Tinggi:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Cukup: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Rendah: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  "Sangat Rendah":
    "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export default function StudentAnalysisListSection() {
  const router = useRouter();
  const { user } = useAuthStore();
  const isLecturer = user?.role === "lecturer";

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  } | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter state
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState("all");
  const [selectedPrediction, setSelectedPrediction] = useState("all");

  // Ambil daftar kelas (admin: semua, lecturer: hanya kelas walinya)
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await classesService.findAll();
        let allClasses = Array.isArray(response.data) ? response.data : [];

        if (isLecturer && user?.lecturer?.classAssignments) {
          const assignedIds = new Set(
            user.lecturer.classAssignments.map((a) => a.class.id),
          );
          allClasses = allClasses.filter((c) => assignedIds.has(c.id));
        }

        setClasses(allClasses);
      } catch {
        toast.error("Gagal memuat daftar kelas.");
      }
    };
    fetchClasses();
  }, [isLecturer, user?.lecturer?.classAssignments]);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const classFilter =
        selectedClassId && selectedClassId !== "all"
          ? selectedClassId
          : undefined;
      const predictionFilter =
        selectedPrediction && selectedPrediction !== "all"
          ? selectedPrediction
          : undefined;
      const response = await studentService.findAll(
        page,
        10,
        classFilter,
        predictionFilter,
      );
      setStudents(Array.isArray(response.data) ? response.data : []);
      setMeta({
        total: response.meta.total,
        page: response.meta.page,
        limit: response.meta.limit,
        lastPage: Math.max(
          1,
          Math.ceil(response.meta.total / response.meta.limit),
        ),
      });
    } catch {
      toast.error("Gagal mengambil data mahasiswa.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [page, selectedClassId, selectedPrediction]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleViewHistory = (id: string) => {
    router.push(`/analysis-results/student/${id}`);
  };

  const filteredStudents = useMemo(
    () =>
      students.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.nim.includes(searchQuery),
      ),
    [students, searchQuery],
  );

  const paginationItems = meta
    ? getPaginationPages(page, meta.lastPage, 5).reduce<
        Array<{ key: string; pageNum: number | null }>
      >((acc, pageNum) => {
        if (pageNum === null) {
          const previousPageNum = acc[acc.length - 1]?.pageNum ?? "start";
          acc.push({ key: `ellipsis-${previousPageNum}`, pageNum: null });
          return acc;
        }
        acc.push({ key: `page-${pageNum}`, pageNum });
        return acc;
      }, [])
    : [];

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
                className="pl-9 w-full sm:w-[200px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 px-1">
          <Select
            value={selectedClassId}
            onValueChange={(v) => {
              setSelectedClassId(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <SelectValue placeholder="Semua Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedPrediction}
            onValueChange={(v) => {
              setSelectedPrediction(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <SelectValue placeholder="Semua Label" />
            </SelectTrigger>
            <SelectContent>
              {PREDICTION_LABELS.map((label) => (
                <SelectItem key={label.value} value={label.value}>
                  {label.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                  Prediksi Terakhir
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
                  <TableCell colSpan={5} className="h-40 text-center">
                    <p className="text-sm text-slate-400 font-medium">
                      Belum ada mahasiswa yang ditemukan.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => {
                  const latest = student.latestAnalysis;
                  const predictionLabel = latest?.prediction || "";
                  const badgeClass =
                    statusColors[predictionLabel] ||
                    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";

                  return (
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
                          {student.class?.name || "\u2014"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {latest ? (
                          <Badge
                            variant="outline"
                            className={`text-[11px] font-semibold px-2.5 py-0.5 border-0 ${badgeClass}`}
                          >
                            {predictionLabel}
                          </Badge>
                        ) : (
                          <span className="text-[11px] text-slate-400">
                            Belum ada
                          </span>
                        )}
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
                  );
                })
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
              <div className="flex items-center gap-0.5 px-1">
                {paginationItems.map(({ key, pageNum }) =>
                  pageNum === null ? (
                    <span
                      key={key}
                      className="w-6 h-6 flex items-center justify-center text-slate-300 text-xs"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPage(pageNum)}
                      className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-md cursor-pointer transition-colors
                        ${
                          page === pageNum
                            ? "bg-brand text-white"
                            : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                    >
                      {pageNum}
                    </button>
                  ),
                )}
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
