"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Download } from "lucide-react";

export default function DownloadReport() {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">
          Unduh Laporan
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate dan unduh laporan analisis motivasi mahasiswa
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CONFIG CARD */}
        <Card>

          <CardHeader>
            <CardTitle>
              Konfigurasi Laporan
            </CardTitle>
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
                  <SelectItem value="all">
                    Laporan Keseluruhan
                  </SelectItem>
                  <SelectItem value="class">
                    Laporan Per Kelas
                  </SelectItem>
                  <SelectItem value="student">
                    Laporan Per Mahasiswa
                  </SelectItem>
                  <SelectItem value="compare">
                    Perbandingan Semester
                  </SelectItem>
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
                  <SelectItem value="genap">
                    Semester Genap 2025/2026
                  </SelectItem>
                  <SelectItem value="ganjil">
                    Semester Ganjil 2025/2026
                  </SelectItem>
                  <SelectItem value="year">
                    Tahun Ajaran 2025/2026
                  </SelectItem>
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
                  <SelectItem value="all">
                    Semua Kelas
                  </SelectItem>
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

        {/* HISTORY CARD */}
        <Card>

          <CardHeader>
            <CardTitle>
              Laporan Tersedia
            </CardTitle>
          </CardHeader>

          <CardContent>

            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead>Laporan</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      Laporan Q1 2026
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Semua Kelas · PDF
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    01 Apr 2026
                  </TableCell>

                  <TableCell>
                    <Button size="sm" variant="ghost">
                      Download PDF
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      Laporan Semester Ganjil
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Semua Kelas · Excel
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    15 Jan 2026
                  </TableCell>

                  <TableCell>
                    <Button size="sm" variant="ghost">
                      Download XLS
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <div className="font-medium">
                      Laporan Kelas A
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Kelas A · PDF
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    10 Mar 2026
                  </TableCell>

                  <TableCell>
                    <Button size="sm" variant="ghost">
                      Download PDF
                    </Button>
                  </TableCell>
                </TableRow>

              </TableBody>

            </Table>

          </CardContent>

        </Card>

      </div>
    </div>
  );
}