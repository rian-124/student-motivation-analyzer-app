"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Award, AlertCircle } from "lucide-react";

export default function TopLowClassesSection() {
  const topClasses = [
    { name: "Kelas C", value: 92, status: "Excellent" },
    { name: "Kelas F", value: 85, status: "Good" },
    { name: "Kelas A", value: 80, status: "Good" },
  ];

  const lowClasses = [
    { name: "Kelas G", value: 30, status: "Needs Attention" },
    { name: "Kelas D", value: 45, status: "Below Average" },
    { name: "Kelas B", value: 60, status: "Average" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* TOP PERFORMING */}
      <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border-l-4 border-l-emerald-500">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            Top Kelas — Motivasi Tertinggi
          </CardTitle>
          <p className="text-xs text-slate-500">Kelas dengan rata-rata skor motivasi paling optimal.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          {topClasses.map((item, i) => (
            <div key={i} className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.name}</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-500">{item.status}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}%</span>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                </div>
              </div>
              <Progress value={item.value} className="h-1.5 bg-slate-100 dark:bg-slate-800" indicatorClassName="bg-emerald-500" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* NEEDS ATTENTION */}
      <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border-l-4 border-l-rose-500">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg">
              <AlertCircle className="w-4 h-4 text-rose-600" />
            </div>
            Perhatian Khusus — Motivasi Rendah
          </CardTitle>
          <p className="text-xs text-slate-500">Kelas yang memerlukan strategi intervensi peningkatan motivasi.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          {lowClasses.map((item, i) => (
            <div key={i} className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.name}</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-500">{item.status}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}%</span>
                  <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                </div>
              </div>
              <Progress value={item.value} className="h-1.5 bg-slate-100 dark:bg-slate-800" indicatorClassName="bg-rose-500" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
