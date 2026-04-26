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
import { Badge } from "@/components/ui/badge";
import { History, Download, FileText, Trash2, Clock } from "lucide-react";

export default function ReportHistorySection() {
  const history = [
    { name: "Laporan_Kelas_A_Genap.pdf", date: "24 Apr 2026", type: "PDF", size: "2.4 MB" },
    { name: "Summary_Semester_Ganjil.xlsx", date: "20 Apr 2026", type: "Excel", size: "1.1 MB" },
    { name: "Detail_Mhs_All_Classes.pdf", date: "15 Apr 2026", type: "PDF", size: "4.8 MB" },
    { name: "Analisis_Komparatif_2025.pdf", date: "10 Apr 2026", type: "PDF", size: "3.2 MB" },
  ];

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden h-full">
      <CardHeader className="p-6 border-b border-slate-50 dark:border-slate-800">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <History className="w-4 h-4 text-slate-400" />
          Riwayat Unduhan
        </CardTitle>
        <p className="text-xs text-slate-500">Daftar laporan yang telah Anda buat sebelumnya.</p>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
              <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 h-10 px-6">Nama File</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 h-10 text-center">Format</TableHead>
                <TableHead className="font-semibold text-slate-600 dark:text-slate-400 h-10 text-right px-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item, i) => (
                <TableRow key={i} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 border-slate-100 dark:border-slate-800 transition-colors">
                  <TableCell className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">{item.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.date}
                        </span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-[10px] text-slate-400">{item.size}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={`rounded-md px-2 py-0 border-none font-bold text-[9px] uppercase tracking-wider
                        ${item.type === 'PDF' ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400' : ''}
                        ${item.type === 'Excel' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : ''}
                      `}
                    >
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg text-slate-400 hover:text-brand hover:bg-brand/5">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50/50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {history.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <FileText className="w-12 h-12 opacity-20" />
            <p className="text-sm font-medium">Belum ada riwayat laporan.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
