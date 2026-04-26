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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FileText, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoryTableSection() {
  const router = useRouter();
  const data = [
    { id: "2021010001", userId: "4", name: "Andi Pratama", class: "A", status: "High", score: 87.4, mfcc: 92.1, date: "18 Apr 2026", color: "emerald" },
    { id: "2021010022", userId: "6", name: "Dewi Kusuma", class: "C", status: "High", score: 91.2, mfcc: 94.5, date: "17 Apr 2026", color: "emerald" },
    { id: "2021010008", userId: "4", name: "Siti Rahayu", class: "B", status: "Medium", score: 63.1, mfcc: 67.3, date: "18 Apr 2026", color: "amber" }, // fallback userId for demo
    { id: "2021010015", userId: "5", name: "Budi Santoso", class: "A", status: "Low", score: 31.8, mfcc: 28.4, date: "17 Apr 2026", color: "rose" }, // fallback userId for demo
    { id: "2021010031", userId: "5", name: "Rizky Fauzan", class: "D", status: "Processing", score: null, mfcc: null, date: "19 Apr 2026", color: "slate" },
  ];

  const handleViewDetail = (userId: string) => {
    router.push(`/analysis-result?studentId=${userId}`);
  };

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
      {/* TOOLBAR */}
      <CardHeader className="p-4 space-y-4 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-bold text-slate-800 dark:text-white px-1">Riwayat Analisis</CardTitle>
          
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
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Info Mahasiswa</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">Kelas</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">Skor</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">Tanggal</TableHead>
                <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">Opsi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-slate-100 dark:border-slate-800 transition-colors">
                  <TableCell className="py-3.5 px-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{row.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider">{row.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                      {row.class}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={`rounded-full px-2.5 py-0 border-none font-bold text-[9px] uppercase tracking-widest
                        ${row.color === 'emerald' ? 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : ''}
                        ${row.color === 'amber' ? 'bg-amber-100/50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : ''}
                        ${row.color === 'rose' ? 'bg-rose-100/50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' : ''}
                        ${row.color === 'slate' ? 'bg-slate-100/50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400' : ''}
                      `}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-5">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {row.score ? row.score.toFixed(1) : "—"}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs px-5">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-right px-5">
                    <Button 
                      onClick={() => handleViewDetail(row.userId)}
                      size="sm" 
                      variant="outline" 
                      className="h-7 px-3 text-[11px] font-bold border-slate-200 dark:border-slate-800 text-slate-500 hover:text-brand hover:border-brand/30 transition-all"
                      disabled={row.status === "Processing"}
                    >
                      <FileText className="w-3 h-3 mr-1.5" />
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* FOOTER / PAGINATION */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/10">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total 128 Record</p>
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
