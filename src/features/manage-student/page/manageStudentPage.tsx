"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";
import StudentStatsSection from "../section/StudentStatsSection";
import StudentTableSection from "../section/StudentTableSection";

export default function ManageStudentPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Kelola Akun Mahasiswa"
        description="Manajemen data dan verifikasi akun mahasiswa"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Tambah Mahasiswa
            </Button>
          </>
        }
      />
      <StudentStatsSection />
      <StudentTableSection />
    </div>
  );
}