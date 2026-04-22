"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ChartSection() {
  return (
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
          <p className="text-sm text-muted-foreground">124 mahasiswa</p>
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
  );
}
