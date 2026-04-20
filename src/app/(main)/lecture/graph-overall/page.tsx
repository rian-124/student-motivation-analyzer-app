"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Progress } from "@/components/ui/progress";

export default function GraphOverall() {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Grafik Motivasi — Keseluruhan
          </h1>
          <p className="text-sm text-muted-foreground">
            Analisis motivasi seluruh kelas dan mahasiswa
          </p>
        </div>

        <Select defaultValue="genap">
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Pilih semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="genap">
              Semester Genap 2025/26
            </SelectItem>
            <SelectItem value="ganjil">
              Semester Ganjil 2025/26
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
            <p className="text-2xl font-bold">124</p>
            <p className="text-xs text-green-600">+12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Motivasi Tinggi
            </p>
            <p className="text-2xl font-bold text-green-600">
              71
            </p>
            <p className="text-xs text-green-600">+5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Motivasi Sedang
            </p>
            <p className="text-2xl font-bold text-yellow-600">
              39
            </p>
            <p className="text-xs text-muted-foreground">
              ±0%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Motivasi Rendah
            </p>
            <p className="text-2xl font-bold text-red-600">
              14
            </p>
            <p className="text-xs text-red-600">-3%</p>
          </CardContent>
        </Card>

      </div>

      {/* BAR CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Perbandingan Seluruh Kelas</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-end gap-3 h-[200px]">

            {[80, 60, 90, 50, 70, 85, 55, 75].map((h, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-4 bg-blue-500 rounded"
                  style={{ height: `${h}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
            ))}

          </div>
        </CardContent>
      </Card>

      {/* TOP + LOW SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* TOP */}
        <Card>
          <CardHeader>
            <CardTitle>Top Kelas — Motivasi Tertinggi</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {[
              { name: "Kelas C", value: 90 },
              { name: "Kelas F", value: 85 },
              { name: "Kelas A", value: 80 },
              { name: "Kelas H", value: 75 },
              { name: "Kelas E", value: 70 },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <Progress value={item.value} />
              </div>
            ))}

          </CardContent>
        </Card>

        {/* LOW */}
        <Card>
          <CardHeader>
            <CardTitle>
              Perhatian Khusus — Motivasi Rendah
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            {[
              { name: "Kelas D", value: 35 },
              { name: "Kelas G", value: 30 },
              { name: "Kelas B", value: 25 },
              { name: "Kelas E", value: 20 },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="text-red-500">
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} />
              </div>
            ))}

          </CardContent>
        </Card>

      </div>

    </div>
  );
}