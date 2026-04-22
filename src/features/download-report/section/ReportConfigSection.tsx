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
import { Download } from "lucide-react";

export default function ReportConfigSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Konfigurasi Laporan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* JENIS LAPORAN */}
        <div className="space-y-2">
          <Label>Jenis Laporan</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis laporan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Laporan Keseluruhan</SelectItem>
              <SelectItem value="class">Laporan Per Kelas</SelectItem>
              <SelectItem value="student">Laporan Per Mahasiswa</SelectItem>
              <SelectItem value="compare">Perbandingan Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* PERIODE */}
        <div className="space-y-2">
          <Label>Periode</Label>
          <Select defaultValue="genap">
            <SelectTrigger>
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="genap">Semester Genap 2025/2026</SelectItem>
              <SelectItem value="ganjil">Semester Ganjil 2025/2026</SelectItem>
              <SelectItem value="year">Tahun Ajaran 2025/2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KELAS */}
        <div className="space-y-2">
          <Label>Kelas</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Pilih kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              <SelectItem value="a">Kelas A</SelectItem>
              <SelectItem value="b">Kelas B</SelectItem>
              <SelectItem value="c">Kelas C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* FORMAT */}
        <div className="space-y-2">
          <Label>Format File</Label>
          <div className="flex gap-2">
            <Button size="sm">PDF</Button>
            <Button size="sm" variant="outline">
              Excel
            </Button>
            <Button size="sm" variant="outline">
              CSV
            </Button>
          </div>
        </div>

        {/* GENERATE BUTTON */}
        <Button className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Generate & Unduh Laporan
        </Button>
      </CardContent>
    </Card>
  );
}
