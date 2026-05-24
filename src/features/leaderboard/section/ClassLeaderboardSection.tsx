"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Class } from "@/lib/types/class.type";
import { cn } from "@/lib/utils";
import { AlertCircle, Award, Users } from "lucide-react";

type Props = {
  items: Class[];
  selectedClassId?: string;
  onSelectClass?: (classId: string) => void;
};

export default function ClassLeaderboardSection({
  items,
  selectedClassId,
  onSelectClass,
}: Props) {
  return (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <Award className="w-4 h-4 text-emerald-500" />
          Leaderboard Kelas
        </CardTitle>
        <p className="text-xs text-slate-500">
          Urutan kelas berdasarkan rata-rata skor motivasi. Data dummy
          menampilkan prodi dan kelas untuk review UI.
        </p>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {items.map((row, idx) => {
          const active = selectedClassId === row.id;
          const variant = "outline";

          return (
            <button
              key={row.id}
              type="button"
              onClick={() => onSelectClass?.(row.id)}
              className={cn(
                "w-full text-left rounded-xl border transition-colors p-4",
                active
                  ? "border-brand/30 bg-brand/5"
                  : "border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/20",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-800 dark:text-white truncate">
                      {row.studyProgram?.name} — {row.name}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {row._count?.students ?? 0} Mahasiswa
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right" />
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
