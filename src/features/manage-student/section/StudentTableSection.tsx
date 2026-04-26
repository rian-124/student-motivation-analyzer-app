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
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditStudentModal } from "../components/EditStudentModal";
import { DeleteConfirmModal } from "@/components/common/DeleteConfirmModal";
import { useState, useMemo } from "react";

import { Student } from "../page/manageStudentPage";

interface StudentTableSectionProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export default function StudentTableSection({ students, onEdit, onDelete }: StudentTableSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.id.includes(searchQuery);
      const matchesClass = classFilter === "all" || student.class.toLowerCase() === classFilter.toLowerCase();
      
      return matchesSearch && matchesClass;
    });
  }, [students, searchQuery, classFilter]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  // Reset to page 1 if filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, classFilter]);

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
        <div className="overflow-x-auto min-h-[300px]">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Mahasiswa</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">Kelas</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Email Kampus</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">Opsi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-slate-500">
                    Tidak ada data mahasiswa yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedStudents.map((student, idx) => (
                  <TableRow key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors">
                    <TableCell className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{student.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono tracking-wider">{student.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                        {student.class}
                      </span>
                    </TableCell>
                    <TableCell className="px-5">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{student.email}</span>
                    </TableCell>
                    <TableCell className="text-right px-5">
                      <div className="flex items-center justify-end gap-1">
                        <EditStudentModal student={student} onEdit={onEdit}>
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
            Total {filteredStudents.length} Mahasiswa
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

