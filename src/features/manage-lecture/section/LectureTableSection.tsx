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

export default function LectureTableSection() {
  const lectures = [
    { name: "Dr. Ahmad Fauzi, M.T.", nip: "198501012010011001", subject: "Pemrograman Web", classes: "A, B, C" },
    { name: "Dr. Sari Dewi, M.Kom.", nip: "198703152012012002", subject: "Basis Data", classes: "D, E" },
    { name: "M. Rizal, S.T., M.T.", nip: "199001202015011003", subject: "Jaringan Komputer", classes: "F, G" },
    { name: "Prof. Dr. Ir. Hadi", nip: "197505121998031002", subject: "Kecerdasan Buatan", classes: "A" },
  ];

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
      {/* TOOLBAR */}
      <CardHeader className="p-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-white px-1">Daftar Dosen Pengajar</CardTitle>
          
          <div className="relative w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Cari Dosen/NIP..." 
              className="pl-9 w-full sm:w-[240px] h-9 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" 
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Dosen</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Mata Kuliah</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">Kelas</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">Opsi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {lectures.map((lecture, idx) => (
                <TableRow key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors">
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
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-brand hover:bg-brand/5" title="Ubah Data">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50" title="Hapus Dosen">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* FOOTER */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/10">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total {lectures.length} Dosen Terdaftar</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-slate-400" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-7 h-7 rounded-md text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
