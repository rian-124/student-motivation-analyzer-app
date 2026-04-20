"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Download,
  Clock,
  Users,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

export default function Dashboard() {
  return (
    <section className="p-6 space-y-6 w-full min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan data motivasi mahasiswa semester ini
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Unduh Laporan
          </Button>

          <Button>
            <Clock className="w-4 h-4 mr-2" />
            Semester Genap 2025/26
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <Card>
          <CardContent className="p-5 space-y-2">
            <Users className="w-5 h-5 text-blue-500" />
            <p className="text-2xl font-bold">124</p>
            <p className="text-sm text-muted-foreground">Total Mahasiswa</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <p className="text-2xl font-bold">89</p>
            <p className="text-sm text-muted-foreground">Analisis Selesai</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <p className="text-2xl font-bold">14</p>
            <p className="text-sm text-muted-foreground">Motivasi Rendah</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <p className="text-2xl font-bold">8</p>
            <p className="text-sm text-muted-foreground">Kelas Terdaftar</p>
          </CardContent>
        </Card>

      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* BAR CHART MOCK */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribusi Motivasi per Kelas</CardTitle>
            <p className="text-sm text-muted-foreground">
              Perbandingan tingkat motivasi tiap kelas
            </p>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="grid grid-cols-8 gap-2 h-40 items-end">

              {[80, 60, 90, 50, 70, 85, 55, 75].map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className="w-4 bg-green-500 rounded"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}

            </div>

          </CardContent>
        </Card>

        {/* DONUT MOCK */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Keseluruhan</CardTitle>
            <p className="text-sm text-muted-foreground">
              124 mahasiswa
            </p>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Motivasi Tinggi</span>
                <span className="text-green-500">57%</span>
              </div>
              <Progress value={57} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Motivasi Sedang</span>
                <span className="text-yellow-500">29%</span>
              </div>
              <Progress value={29} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Motivasi Rendah</span>
                <span className="text-red-500">14%</span>
              </div>
              <Progress value={14} />
            </div>

          </CardContent>
        </Card>
      </div>

    </section>
  );
}