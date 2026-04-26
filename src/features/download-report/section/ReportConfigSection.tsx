"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDown, Settings2, FileText, Table as TableIcon, FileJson } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ReportConfigSection() {
  const [format, setFormat] = useState("pdf");

  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="p-6 border-b border-slate-50 dark:border-slate-800">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <Settings2 className="w-4 h-4 text-brand" />
          Konfigurasi Laporan
        </CardTitle>
        <p className="text-xs text-slate-500">Sesuaikan data yang ingin Anda sertakan dalam laporan.</p>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* JENIS LAPORAN */}
        <div className="space-y-3">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Jenis Laporan</Label>
          <Select defaultValue="all">
            <SelectTrigger className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-none">
              <SelectValue placeholder="Pilih jenis laporan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Laporan Keseluruhan (Summary)</SelectItem>
              <SelectItem value="class">Laporan Detail Per Kelas</SelectItem>
              <SelectItem value="student">Laporan Riwayat Mahasiswa</SelectItem>
              <SelectItem value="compare">Analisis Komparatif Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* PERIODE & KELAS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Periode</Label>
            <Select defaultValue="genap">
              <SelectTrigger className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-none">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="genap">Genap 2025/26</SelectItem>
                <SelectItem value="ganjil">Ganjil 2025/26</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Kelas</Label>
            <Select defaultValue="all">
              <SelectTrigger className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-none">
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

        {/* FORMAT FILE */}
        <div className="space-y-3">
          <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Format Ekspor</Label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "pdf", label: "PDF", icon: FileText, color: "text-rose-500", bg: "bg-rose-50" },
              { id: "excel", label: "Excel", icon: TableIcon, color: "text-emerald-500", bg: "bg-emerald-50" },
              { id: "json", label: "JSON", icon: FileJson, color: "text-amber-500", bg: "bg-amber-50" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFormat(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-2",
                  format === item.id 
                    ? "border-brand bg-brand/5" 
                    : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                )}
              >
                <item.icon className={cn("w-5 h-5", item.color)} />
                <span className="text-xs font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* GENERATE BUTTON */}
        <div className="pt-2">
          <Button className="w-full h-12 bg-brand hover:bg-brand-hover text-white rounded-xl shadow-lg shadow-brand/20 font-bold transition-all active:scale-95">
            <FileDown className="w-4 h-4 mr-2" />
            Generate & Unduh Sekarang
          </Button>
          <p className="text-[10px] text-center text-slate-400 mt-3 px-4">
            Proses generate laporan mungkin membutuhkan waktu beberapa detik tergantung pada volume data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
