"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ClassLeaderboardStudent } from "@/lib/types/class.type";
import { cn } from "@/lib/utils";
import { Crown, Users } from "lucide-react";

type Props = {
  title?: string;
  subtitle?: string;
  items: ClassLeaderboardStudent[];
  currentStudentId?: string;
  highlightCurrentUser?: boolean;
  anonymizeNames?: boolean;
};

const statusBadgeClass = (status: string) => {
  if (status === "HIGH")
    return "bg-emerald-100/50 text-emerald-700 border-none dark:bg-emerald-500/10 dark:text-emerald-400";
  if (status === "MEDIUM")
    return "bg-amber-100/50 text-amber-700 border-none dark:bg-amber-500/10 dark:text-amber-400";
  return "bg-rose-100/50 text-rose-700 border-none dark:bg-rose-500/10 dark:text-rose-400";
};

const maskName = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Mahasiswa";
  const first = parts[0];
  return `${first} ${"•".repeat(6)}`;
};

export default function StudentLeaderboardSection({
  title = "Leaderboard Mahasiswa",
  subtitle = "Urutan mahasiswa berdasarkan skor motivasi tertinggi ke terendah.",
  items,
  currentStudentId,
  highlightCurrentUser = true,
  anonymizeNames = false,
}: Props) {
  return (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="p-6 pb-2">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <Users className="w-4 h-4 text-brand" />
          {title}
        </CardTitle>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">
                Rank
              </TableHead>
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 px-5">
                Mahasiswa
              </TableHead>
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-center">
                Status
              </TableHead>
              <TableHead className="font-semibold text-slate-500 dark:text-slate-400 h-10 text-right px-5">
                Skor
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((s) => {
              const me = currentStudentId === s.studentId;
              return (
                <TableRow
                  key={s.studentId}
                  className={cn(
                    "border-slate-100 dark:border-slate-800 transition-colors",
                    "hover:bg-slate-50/50 dark:hover:bg-slate-800/20",
                    highlightCurrentUser &&
                      me &&
                      "bg-brand/5 hover:bg-brand/10",
                  )}
                >
                  <TableCell className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-mono font-bold",
                          me
                            ? "text-brand"
                            : "text-slate-700 dark:text-slate-200",
                        )}
                      >
                        #{s.rank}
                      </span>
                      {s.rank === 1 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600">
                          <Crown className="w-3.5 h-3.5" />
                          TOP
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5 px-5">
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {me
                          ? "Anda"
                          : anonymizeNames
                            ? maskName(s.name)
                            : s.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono tracking-wider">
                        {me ? s.nim : anonymizeNames ? "**********" : s.nim}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "h-5 rounded-full px-2.5 py-0 text-[9px] font-bold uppercase tracking-widest",
                        statusBadgeClass(s.status),
                      )}
                    >
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-5">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {s.score.toFixed(1)}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
