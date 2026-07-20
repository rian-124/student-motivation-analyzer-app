import type { MotivationAnalysis } from "@/lib/types/motivation-analysis.type";
import type { Student } from "@/lib/types/student.type";
import * as XLSX from "xlsx";

function makeExport(
  data: Record<string, unknown>[],
  sheetName: string,
  filename: string,
) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename, { bookType: "xlsx" });
}

export function exportAnalysisHistory(
  data: MotivationAnalysis[],
  filename = "riwayat-analisis.xlsx",
) {
  const rows = data.map((item, index) => ({
    No: index + 1,
    "Nama Mahasiswa": item.student?.name || "-",
    NIM: item.student?.nim || "-",
    Kelas: item.student?.className || item.student?.class?.name || "-",
    "Label Prediksi": item.result?.label || item.prediction || "-",
    "Skor (%)":
      item.weightedScore ??
      item.confidencePercent ??
      Math.round(item.confidence * 100),
    Tanggal: new Date(item.createdAt).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));
  makeExport(rows, "Riwayat Analisis", filename);
}

export function exportStudentList(
  data: Student[],
  filename = "daftar-mahasiswa.xlsx",
) {
  const rows = data.map((item, index) => ({
    No: index + 1,
    "Nama Mahasiswa": item.name,
    NIM: item.nim,
    Kelas: item.class?.name || "-",
    "Prediksi Terakhir": item.latestAnalysis?.prediction || "-",
    "Total Analisis": item._count?.analyses || 0,
  }));
  makeExport(rows, "Daftar Mahasiswa", filename);
}
