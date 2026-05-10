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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditStudentModal } from "../components/EditStudentModal";
import { DeleteConfirmModal } from "@/components/common/DeleteConfirmModal";
import { useState } from "react";
import { Student } from "@/lib/types/student.type";

interface StudentTableSectionProps {
  students: Student[];
  loading?: boolean;
  pagination: {
    page: number;
    total: number;
    lastPage: number;
  };
  onPageChange: (page: number) => void;
  onEdit: (id: string, student: any) => void;
  onDelete: (id: string) => void;
}

export default function StudentTableSection({ 
  students, 
  loading, 
  pagination, 
  onPageChange, 
  onEdit, 
  onDelete 
}: StudentTableSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.nim.includes(searchQuery);
    
    const studentClassName = student.class?.name || "";
    const matchesClass = classFilter === "all" || studentClassName.toLowerCase() === classFilter.toLowerCase();
    
    return matchesSearch && matchesClass;
  });

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
      {/* TOOLBAR */}
      <CardHeader className="p-4 space-y-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-white px-1">Daftar Mahasiswa</CardTitle>
          
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Nama/NIM..." 
                className="pl-9 w-full sm:w-[240px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" 
              />
            </div>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[120px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <SelectValue placeholder="Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                <SelectItem value="a">Kelas A</SelectItem>
                <SelectItem value="b">Kelas B</SelectItem>
                <SelectItem value="c">Kelas C</SelectItem>
                <SelectItem value="d">Kelas D</SelectItem>
              </SelectContent>
            </Select>
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
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Mahasiswa</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kelas</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Dosen Wali</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Semester</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">Opsi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredStudents.length === 0 && !loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                    Tidak ada data mahasiswa yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors">
                    <TableCell className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{student.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono tracking-wider">{student.nim}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-brand/5 text-brand text-[10px] font-black uppercase border border-brand/10 shadow-sm">
                          {student.class?.name || '-'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {student.lecturer ? (
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">{student.lecturer.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium">NIP: {student.lecturer.id.substring(0, 8)}...</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-300 italic">Belum diset</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-xs font-bold text-slate-600">Semester {student.semester || '1'}</span>
                    </TableCell>
                    <TableCell className="text-right px-5">
                      <div className="flex items-center justify-end gap-1">
                        <EditStudentModal student={student} onEdit={(data) => onEdit(student.id, data)}>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-brand hover:bg-brand/5" title="Edit Data">
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                        </EditStudentModal>
                        
                        <DeleteConfirmModal 
                          title="Hapus Mahasiswa?" 
                          description={`Anda akan menghapus data ${student.name}.`}
                          onConfirm={() => onDelete(student.id)}
                        >
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50" title="Hapus Mahasiswa">
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
            Total {pagination.total} Mahasiswa
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
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: pagination.lastPage }).map((_, i) => (
                <span 
                  key={i} 
                  onClick={() => onPageChange(i + 1)}
                  className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-md cursor-pointer transition-colors
                    ${pagination.page === i + 1 
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
