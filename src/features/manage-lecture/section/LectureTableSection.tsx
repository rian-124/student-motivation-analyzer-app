"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EditLectureModal } from "../components/EditLectureModal";
import { DeleteConfirmModal } from "@/components/common/DeleteConfirmModal";
import { useState, useMemo } from "react";
import { Lecture } from "../page/manageLecturePage";

interface LectureTableSectionProps {
  lectures: Lecture[];
  onEdit: (lecture: Lecture) => void;
  onDelete: (nip: string) => void;
}

export default function LectureTableSection({ lectures, onEdit, onDelete }: LectureTableSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredLectures = useMemo(() => {
    return lectures.filter((lecture) => {
      return lecture.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             lecture.nip.includes(searchQuery);
    });
  }, [lectures, searchQuery]);

  const totalPages = Math.ceil(filteredLectures.length / itemsPerPage);
  
  const paginatedLectures = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLectures.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLectures, currentPage]);

  // Reset to page 1 if filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
      {/* TOOLBAR */}
      <CardHeader className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-white px-1">Daftar Dosen Wali</CardTitle>
          
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
        <div className="overflow-x-auto min-h-[300px]">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Dosen Wali</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Kelas Perwalian</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">Total Mahasiswa</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">Opsi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedLectures.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                    Tidak ada data dosen yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLectures.map((lecture, idx) => (
                  <TableRow key={lecture.nip} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors">
                    <TableCell className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{lecture.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono tracking-wider">{lecture.nip}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3 h-3 text-brand/50" />
                        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{lecture.subject}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {lecture.classes}
                      </span>
                    </TableCell>
                    <TableCell className="text-right px-5">
                      <div className="flex items-center justify-end gap-1">
                        <EditLectureModal lecture={lecture} onEdit={onEdit}>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-brand hover:bg-brand/5" title="Ubah Data">
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                        </EditLectureModal>
                        
                        <DeleteConfirmModal 
                          title="Hapus Dosen Wali?" 
                          description={`Anda akan menghapus data bimbingan ${lecture.name}.`}
                          onConfirm={() => onDelete(lecture.nip)}
                        >
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50" title="Hapus Dosen">
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
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/10">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Total {filteredLectures.length} Dosen Wali Aktif
          </p>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-7 h-7 rounded-md text-slate-400" 
              disabled={currentPage === 1 || totalPages === 0}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <span 
                  key={i} 
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-md cursor-pointer transition-colors
                    ${currentPage === i + 1 
                      ? 'bg-brand text-white' 
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
