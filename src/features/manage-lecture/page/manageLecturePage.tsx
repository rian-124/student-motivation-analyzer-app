"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { UserPlus, Download } from "lucide-react";
import LectureStatsSection from "../section/LectureStatsSection";
import LectureTableSection from "../section/LectureTableSection";

import { AddLectureModal } from "../components/AddLectureModal";

export default function ManageLecturePage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Manajemen Akun Dosen"
        description="Kelola data, hak akses, dan monitoring akun dosen pengajar."
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 h-10 px-5 font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <AddLectureModal>
              <Button className="bg-brand hover:bg-brand-hover text-white rounded-xl h-10 px-5 font-bold shadow-lg shadow-brand/20 transition-all active:scale-95">
                <UserPlus className="w-4 h-4 mr-2" />
                Tambah Dosen
              </Button>
            </AddLectureModal>
          </div>
        }
      />
      
      <div className="space-y-8">
        <LectureStatsSection />
        <LectureTableSection />
      </div>
    </div>
  );
}