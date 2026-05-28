"use client";

import { DeleteConfirmModal } from "@/components/common/DeleteConfirmModal";
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
import type {
  Lecturer,
  UpdateLecturerPayload,
} from "@/lib/types/lecturer.type";
import { getPaginationPages } from "@/utils/pagination";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Loader2,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { EditLectureModal } from "../components/EditLectureModal";

interface LectureTableSectionProps {
  lectures?: Lecturer[];
  loading?: boolean;
  pagination: {
    page: number;
    total: number;
    lastPage: number;
  };
  onPageChange: (page: number) => void;
  onEdit: (id: string, data: UpdateLecturerPayload) => void;
  onDelete: (id: string) => void;
}

export default function LectureTableSection({
  lectures,
  loading,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
}: LectureTableSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const paginationItems = getPaginationPages(
    pagination.page,
    pagination.lastPage,
    5,
  ).reduce<Array<{ key: string; pageNum: number | null }>>((acc, pageNum) => {
    if (pageNum === null) {
      const previousPageNum = acc[acc.length - 1]?.pageNum ?? "start";
      acc.push({ key: `ellipsis-${previousPageNum}`, pageNum: null });
      return acc;
    }
    acc.push({ key: `page-${pageNum}`, pageNum });
    return acc;
  }, []);

  const filteredLectures = (lectures ?? []).filter((lecture) => {
    return (
      lecture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lecture.nip.includes(searchQuery) ||
      (lecture.user?.email ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
      {/* TOOLBAR */}
      <CardHeader className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-white px-1">
            Daftar Dosen Wali
          </CardTitle>

          <div className="relative w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Dosen/NIP..."
              className="pl-9 w-full sm:w-[240px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto min-h-[300px] relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">
                  Dosen Wali
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">
                  Akun
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">
                  Kelas Wali
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">
                  Mahasiswa
                </TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5 text-right">
                  Opsi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredLectures.length === 0 && !loading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-slate-500"
                  >
                    Tidak ada data dosen yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLectures.map((lecture) => (
                  <TableRow
                    key={lecture.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors"
                  >
                    <TableCell className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {lecture.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                          {lecture.nip}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 px-5">
                      <span className="text-xs text-slate-600 dark:text-slate-300">
                        {lecture.user?.email || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5 px-5">
                      <div className="flex flex-col gap-1">
                        {(lecture.supervisedClasses?.length ?? 0) > 0 ? (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {lecture.supervisedClasses?.slice(0, 2).join(", ")}
                            {(lecture.supervisedClasses?.length ?? 0) > 2
                              ? "..."
                              : ""}
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Belum ada kelas
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5 px-5">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {lecture._count?.students ?? 0} mahasiswa
                      </span>
                    </TableCell>
                    <TableCell className="text-right px-5">
                      <div className="flex items-center justify-end gap-1">
                        <EditLectureModal
                          lecturer={lecture}
                          onUpdate={(data) => onEdit(lecture.id, data)}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-slate-400 hover:text-brand hover:bg-brand/5"
                            title="Ubah Data"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                        </EditLectureModal>

                        <DeleteConfirmModal
                          title="Hapus Dosen Wali?"
                          description={`Anda akan menghapus data ${lecture.name}.`}
                          onConfirm={() => onDelete(lecture.id)}
                        >
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Hapus Dosen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </DeleteConfirmModal>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-slate-50/30 dark:bg-slate-800/10">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Total {pagination.total} Dosen Wali Aktif
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 rounded-md text-slate-400"
              disabled={pagination.page === 1}
              onClick={() => onPageChange(pagination.page - 1)}
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
                    aria-label={`Buka halaman ${pageNum}`}
                    aria-current={
                      pagination.page === pageNum ? "page" : undefined
                    }
                    onClick={() => onPageChange(pageNum)}
                    className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-md cursor-pointer transition-colors
                      ${
                        pagination.page === pageNum
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
              disabled={pagination.page === pagination.lastPage}
              onClick={() => onPageChange(pagination.page + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
