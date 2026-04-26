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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, FileText, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function StudentDetailTableSection() {
  const students = [
    { name: "Andi Pratama", nim: "2021010001", status: "High", score: 87.4, lastUpload: "18 Apr 2026", color: "emerald" },
    { name: "Siti Rahayu", nim: "2021010008", status: "Medium", score: 63.1, lastUpload: "18 Apr 2026", color: "amber" },
    { name: "Budi Santoso", nim: "2021010015", status: "Low", score: 31.8, lastUpload: "17 Apr 2026", color: "rose" },
    { name: "Diana Putri", nim: "2021010022", status: "High", score: 91.2, lastUpload: "20 Apr 2026", color: "emerald" },
    { name: "Eko Prasetyo", nim: "2021010029", status: "Medium", score: 58.5, lastUpload: "15 Apr 2026", color: "amber" },
  ];

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
      {/* TOOLBAR */}
      <CardHeader className="p-4 space-y-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-white px-1">Daftar Mahasiswa di Kelas</CardTitle>
          
          <div className="relative w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Cari Nama/NIM..." 
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
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Mahasiswa</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">Skor Motivasi</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Terakhir Update</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">Opsi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, i) => (
                <TableRow key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors">
                  <TableCell className="py-3.5 px-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{student.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider">{student.nim}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={`rounded-full px-2.5 py-0 border-none font-bold text-[9px] uppercase tracking-widest
                        ${student.color === 'emerald' ? 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : ''}
                        ${student.color === 'amber' ? 'bg-amber-100/50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : ''}
                        ${student.color === 'rose' ? 'bg-rose-100/50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' : ''}
                      `}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-5">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{student.score.toFixed(1)}</span>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs px-5">{student.lastUpload}</TableCell>
                  <TableCell className="text-right px-5">
                    <Button size="sm" variant="outline" className="h-7 px-3 text-[11px] font-bold border-slate-200 dark:border-slate-800 text-slate-500 hover:text-brand hover:border-brand/30 transition-all">
                      <FileText className="w-3 h-3 mr-1.5" />
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/10">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Menampilkan 5 dari 24 Mahasiswa</p>
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
