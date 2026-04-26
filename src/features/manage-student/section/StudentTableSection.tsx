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

export default function StudentTableSection() {
  const students = [
    { name: "Andi Pratama", id: "2021010001", class: "A", email: "andi@kampus.ac.id" },
    { name: "Rizky Fauzan", id: "2021010031", class: "D", email: "rizky@kampus.ac.id" },
    { name: "Budi Santoso", id: "2021010015", class: "A", email: "budi@kampus.ac.id" },
    { name: "Dewi Kusuma", id: "2021010022", class: "C", email: "dewi@kampus.ac.id" },
    { name: "Siti Rahayu", id: "2021010008", class: "B", email: "siti@kampus.ac.id" },
  ];

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
                placeholder="Cari Mahasiswa..." 
                className="pl-9 w-full sm:w-[240px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" 
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <SelectValue placeholder="Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                <SelectItem value="a">Kelas A</SelectItem>
                <SelectItem value="b">Kelas B</SelectItem>
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
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Mahasiswa</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">Kelas</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Email Kampus</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">Opsi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students.map((student, idx) => (
                <TableRow key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors">
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
                      <EditStudentModal student={student}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-brand hover:bg-brand/5" title="Edit Data">
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                      </EditStudentModal>
                      
                      <DeleteConfirmModal 
                        title="Hapus Mahasiswa?" 
                        description={`Anda akan menghapus data ${student.name}.`}
                      >
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50" title="Hapus Mahasiswa">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </DeleteConfirmModal>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/10">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total 124 Mahasiswa</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-slate-400" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1 px-1">
              <span className="w-6 h-6 flex items-center justify-center text-[11px] font-bold bg-brand text-white rounded-md">1</span>
              <span className="w-6 h-6 flex items-center justify-center text-[11px] font-bold text-slate-400 hover:bg-slate-100 rounded-md cursor-pointer">2</span>
            </div>
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
