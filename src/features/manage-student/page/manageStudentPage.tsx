"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";
import StudentStatsSection from "../section/StudentStatsSection";
import StudentTableSection from "../section/StudentTableSection";
import { AddStudentModal } from "../components/AddStudentModal";

export default function ManageStudentPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Kelola Akun Mahasiswa"
        description="Manajemen data dan verifikasi akun mahasiswa"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 h-10 px-5 font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <AddStudentModal>
              <Button className="bg-brand hover:bg-brand-hover text-white rounded-xl h-10 px-5 font-bold shadow-lg shadow-brand/20 transition-all active:scale-95">
                <UserPlus className="w-4 h-4 mr-2" />
                Tambah Mahasiswa
              </Button>
            </AddStudentModal>
          </div>
        }
      />
      <StudentStatsSection />
      <StudentTableSection />
    </div>
  );
}