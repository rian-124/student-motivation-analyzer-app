"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import LectureStatsSection from "../section/LectureStatsSection";
import LectureTableSection from "../section/LectureTableSection";

export default function ManageLecturePage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Kelola Akun Dosen"
        description="Manajemen data dan hak akses dosen"
        actions={
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Tambah Dosen
          </Button>
        }
      />
      <LectureStatsSection />
      <LectureTableSection />
    </div>
  );
}