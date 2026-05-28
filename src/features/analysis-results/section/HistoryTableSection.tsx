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
import type { MotivationAnalysis } from "@/lib/types/motivation-analysis.type";
import { motivationAnalysisService } from "@/services/motivation-analysis.service";
import { useAuthStore } from "@/store/auth.store";
import { getPaginationPages } from "@/utils/pagination";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Filter,
  Loader2,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface HistoryTableSectionProps {
  studentId?: string;
}

interface HistoryMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export default function HistoryTableSection({
  studentId,
}: HistoryTableSectionProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [historyData, setHistoryData] = useState<MotivationAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<HistoryMeta | null>(null);
  const [page, setPage] = useState(1);
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

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        if (studentId) {
          // If a specific studentId is provided (e.g. admin viewing a student)
          const data = await motivationAnalysisService.findByStudent(studentId);
          setHistoryData(Array.isArray(data) ? data : []);
        } else if (user?.role === "student" && user?.student?.id) {
          // If the logged in user is a student
          const data = await motivationAnalysisService.findByStudent(
            user.student.id,
          );
          setHistoryData(Array.isArray(data) ? data : []);
        } else {
          // Fallback, fetch all (though we changed the flow to use StudentAnalysisListSection for admins)
          const response = await motivationAnalysisService.findAll(page);
          setHistoryData(Array.isArray(response.data) ? response.data : []);
          setMeta({
            total: response.meta.total,
            page: response.meta.page,
            limit: response.meta.limit,
            lastPage: Math.max(
              1,
              Math.ceil(response.meta.total / response.meta.limit),
            ),
          });
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
        toast.error("Gagal mengambil riwayat analisis.");
        setHistoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, page, studentId]);

  const handleViewDetail = (id: string) => {
    router.push(`/analysis-result?id=${id}`);
  };

  const getStatusColor = (prediction: string) => {
    switch (prediction) {
      case "Sangat Tinggi":
        return "emerald";
      case "Tinggi":
        return "emerald";
      case "Cukup":
        return "amber";
      case "Rendah":
        return "rose";
      case "Sangat Rendah":
        return "rose";
      case "Intrinsik":
        return "emerald";
      case "Identifikasi":
        return "emerald";
      case "Ekstrinsik":
        return "amber";
      case "Eksternal":
        return "amber";
      case "Introjeksi":
        return "amber";
      case "Amotivasi":
        return "rose";
      default:
        return "slate";
    }
  };

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
      {/* TOOLBAR */}
      <CardHeader className="p-4 space-y-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-white px-1">
            {user?.role === "student"
              ? "Riwayat Unggahan Anda"
              : "Riwayat Analisis"}
          </CardTitle>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Cari Mahasiswa/NIM..."
                className="pl-9 w-full sm:w-[240px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <Filter className="w-3.5 h-3.5 mr-2 text-slate-400" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="high">Tinggi</SelectItem>
                <SelectItem value="medium">Sedang</SelectItem>
                <SelectItem value="low">Rendah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">
                  Info Mahasiswa
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">
                  Kelas
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">
                  Skor
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">
                  Tanggal
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">
                  Opsi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from(
                  { length: 5 },
                  (_, skeletonIndex) => `skeleton-${skeletonIndex}`,
                ).map((skeletonKey) => (
                  <TableRow
                    key={skeletonKey}
                    className="animate-pulse border-slate-50 dark:border-slate-800"
                  >
                    <TableCell className="py-4 px-5">
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-slate-100 dark:bg-slate-800 rounded" />
                        <div className="h-2 w-20 bg-slate-50 dark:bg-slate-800/50 rounded" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 rounded mx-auto" />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto" />
                    </TableCell>
                    <TableCell className="text-right px-5">
                      <div className="h-3 w-10 bg-slate-100 dark:bg-slate-800 rounded ml-auto" />
                    </TableCell>
                    <TableCell className="px-5">
                      <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded" />
                    </TableCell>
                    <TableCell className="text-right px-5">
                      <div className="h-7 w-20 bg-slate-100 dark:bg-slate-800 rounded-lg ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              ) : historyData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-40 text-center">
                    <p className="text-sm text-slate-400 font-medium">
                      Belum ada riwayat analisis.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                historyData.map((row) => {
                  const prediction = row.result?.label || row.prediction;
                  const confidencePercent =
                    row.confidencePercent ?? row.confidence * 100;
                  const color = getStatusColor(prediction);
                  const formattedDate = new Date(
                    row.createdAt,
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  return (
                    <TableRow
                      key={row.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors"
                    >
                      <TableCell className="py-3.5 px-5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {row.student?.name || "Mahasiswa"}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                            {row.student?.nim || "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                          {row.student?.className ||
                            row.student?.class?.name ||
                            "-"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`rounded-full px-2.5 py-0 border-none font-bold text-[9px] uppercase tracking-widest
                            ${color === "emerald" ? "bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : ""}
                            ${color === "amber" ? "bg-amber-100/50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" : ""}
                            ${color === "rose" ? "bg-rose-100/50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400" : ""}
                            ${color === "slate" ? "bg-slate-100/50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400" : ""}
                          `}
                        >
                          {prediction}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-5">
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {confidencePercent.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-500 text-xs px-5">
                        {formattedDate}
                      </TableCell>
                      <TableCell className="text-right px-5">
                        <Button
                          onClick={() => handleViewDetail(row.id)}
                          size="sm"
                          variant="outline"
                          className="h-7 px-3 text-[11px] font-bold border-slate-200 dark:border-slate-800 text-slate-500 hover:text-brand hover:border-brand/30 transition-all"
                        >
                          <FileText className="w-3 h-3 mr-1.5" />
                          Detail
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
            Total {meta?.total ?? historyData.length} Record
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
