"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GrafikKelasPage() {
  return (
    <section className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Grafik Motivasi — Kelas Saya
          </h1>
          <p className="text-sm text-muted-foreground">
            Visualisasi motivasi mahasiswa per kelas yang Anda ampu
          </p>
        </div>

        <Select defaultValue="kelas-a">
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Pilih kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kelas-a">
              Kelas A — Pemrograman Web
            </SelectItem>
            <SelectItem value="kelas-b">
              Kelas B — Pemrograman Web
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Total Mahasiswa
            </p>
            <p className="text-2xl font-bold">32</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Motivasi Tinggi
            </p>
            <p className="text-2xl font-bold text-green-600">
              18
            </p>
            <p className="text-xs text-green-600">57%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Motivasi Sedang
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              9
            </p>
            <p className="text-xs text-yellow-600">28%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Motivasi Rendah
            </p>
            <p className="text-2xl font-bold text-red-600">
              5
            </p>
            <p className="text-xs text-red-600">15%</p>
          </CardContent>
        </Card>

      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* BAR CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Tren Motivasi Mingguan</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-[180px] flex items-end gap-3">

              {[70, 60, 80, 65, 90, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-4 bg-blue-500 rounded"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    M{i + 1}
                  </span>
                </div>
              ))}

            </div>
          </CardContent>
        </Card>

        {/* DONUT */}
        <Card>
          <CardHeader>
            <CardTitle>Persentase Motivasi</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center gap-4">

              {/* simple donut (placeholder modern UI) */}
              <div className="relative w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center">
                <span className="text-lg font-bold">89%</span>
              </div>

              <div className="space-y-2 text-sm w-full">

                <div className="flex justify-between">
                  <span className="text-green-600">Tinggi</span>
                  <span>57%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-yellow-600">Sedang</span>
                  <span>28%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-red-600">Rendah</span>
                  <span>15%</span>
                </div>

              </div>

            </div>
          </CardContent>
        </Card>

      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Detail Mahasiswa</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Mahasiswa</TableHead>
                <TableHead>NIM</TableHead>
                <TableHead>Motivasi</TableHead>
                <TableHead>Skor</TableHead>
                <TableHead>Terakhir Upload</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              <TableRow>
                <TableCell>Andi Pratama</TableCell>
                <TableCell>2021010001</TableCell>
                <TableCell>
                  <Badge>High</Badge>
                </TableCell>
                <TableCell>87.4</TableCell>
                <TableCell>18 Apr 2026</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">
                    Lihat
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Siti Rahayu</TableCell>
                <TableCell>2021010008</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    Medium
                  </Badge>
                </TableCell>
                <TableCell>63.1</TableCell>
                <TableCell>18 Apr 2026</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">
                    Lihat
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Budi Santoso</TableCell>
                <TableCell>2021010015</TableCell>
                <TableCell>
                  <Badge variant="destructive">
                    Low
                  </Badge>
                </TableCell>
                <TableCell>31.8</TableCell>
                <TableCell>17 Apr 2026</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">
                    Lihat
                  </Button>
                </TableCell>
              </TableRow>

            </TableBody>

          </Table>
        </CardContent>
      </Card>

    </section>
  );
}