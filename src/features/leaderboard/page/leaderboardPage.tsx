"use client";

import PageHeader from "@/components/common/PageHeader";
import type { Class, ClassLeaderboardData } from "@/lib/types/class.type";
import { classesService } from "@/services/classes.service";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import ClassLeaderboardSection from "../section/ClassLeaderboardSection";
import StudentLeaderboardSection from "../section/StudentLeaderboardSection";
import StudentRankSummarySection from "../section/StudentRankSummarySection";

const LeaderboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-8">
      <div className="space-y-3">
        <div className="h-9 w-72 bg-slate-200 rounded-xl" />
        <div className="h-4 w-[450px] bg-slate-100 rounded-lg" />
      </div>
      <div className="h-10 w-32 bg-brand/5 rounded-xl border border-brand/10" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-[420px] bg-white rounded-2xl border border-slate-100 shadow-sm" />
      <div className="h-[420px] bg-white rounded-2xl border border-slate-100 shadow-sm" />
    </div>
  </div>
);

export default function LeaderboardPage() {
  const user = useAuthStore((state) => state.user);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [leaderboardData, setLeaderboardData] =
    useState<ClassLeaderboardData | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  const userRole = (user?.role || "STUDENT").toUpperCase();
  const isStudent = userRole === "STUDENT";

  const studentId = user?.student?.id;
  const studentClassId = user?.student?.classId;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await classesService.findAll();
        setClasses(res.data);
        if (isStudent && studentClassId) {
          setSelectedClassId(studentClassId);
        } else if (res.data.length > 0) {
          setSelectedClassId(res.data[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingClasses(false);
      }
    };
    fetchClasses();
  }, [isStudent, studentClassId]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!selectedClassId) return;
      setLoadingLeaderboard(true);
      try {
        const data = await classesService.getLeaderboard(selectedClassId);
        setLeaderboardData(data);
      } catch (err) {
        console.error(err);
        setLeaderboardData(null);
      } finally {
        setLoadingLeaderboard(false);
      }
    };
    fetchLeaderboard();
  }, [selectedClassId]);

  if (loadingClasses) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <LeaderboardSkeleton />
      </div>
    );
  }

  const selectedClass = classes.find((c) => c.id === selectedClassId);
  const selectedClassName = selectedClass?.name ?? "Kelas";

  const students = leaderboardData?.students ?? [];
  const myRank = students.find((s) => s.studentId === studentId);

  const totalStudents = leaderboardData?.totalStudents ?? 1;
  const mySummary = {
    total: leaderboardData?.totalStudents ?? 0,
    averageScore: leaderboardData?.averageScore ?? 0,
    myRank: myRank?.rank ?? null,
    myScore: myRank?.score ?? null,
    myPercentile: myRank
      ? Math.round(((totalStudents - myRank.rank) / totalStudents) * 100)
      : null,
    gapToTop:
      myRank && students[0]
        ? Math.max(0, students[0].score - myRank.score)
        : null,
    topScore: students[0]?.score ?? null,
    topStudentName: students[0]?.name ?? null,
    classStrength: leaderboardData
      ? Math.round(leaderboardData.averageScore)
      : 0,
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Leaderboard Motivasi"
        description={
          isStudent
            ? "Lihat posisi Anda dan perbandingan skor motivasi di kelas Anda."
            : "Pantau urutan performa motivasi antar kelas dan peringkat mahasiswa di tiap kelas."
        }
      />

      {isStudent && myRank && <StudentRankSummarySection summary={mySummary} />}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {!isStudent && (
          <div className="xl:col-span-5">
            <ClassLeaderboardSection
              items={classes}
              selectedClassId={selectedClassId}
              onSelectClass={setSelectedClassId}
            />
          </div>
        )}

        <div className={isStudent ? "xl:col-span-12" : "xl:col-span-7"}>
          {loadingLeaderboard ? (
            <div className="h-64 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400">Memuat Leaderboard...</span>
            </div>
          ) : (
            <StudentLeaderboardSection
              title={
                isStudent
                  ? "Leaderboard Mahasiswa Kelas Anda"
                  : `Leaderboard Mahasiswa - ${selectedClassName}`
              }
              items={students}
              currentStudentId={studentId}
              highlightCurrentUser={isStudent}
              anonymizeNames={isStudent}
            />
          )}
        </div>
      </div>
    </div>
  );
}
