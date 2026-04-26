"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { UserPlus, Download } from "lucide-react";
import LectureStatsSection from "../section/LectureStatsSection";
import LectureTableSection from "../section/LectureTableSection";
import { AddLectureModal } from "../components/AddLectureModal";
import { useState } from "react";
import { toast } from "sonner";

export interface Lecture {
  nip: string;
  name: string;
  subject: string;
  classes: string;
}

export default function ManageLecturePage() {
  const [lectures, setLectures] = useState<Lecture[]>([
    { name: "Dr. Ahmad Fauzi, M.T.", nip: "198501012010011001", subject: "Kelas 2021-A", classes: "42 Mhs" },
    { name: "Dr. Sari Dewi, M.Kom.", nip: "198703152012012002", subject: "Kelas 2021-B", classes: "38 Mhs" },
    { name: "M. Rizal, S.T., M.T.", nip: "199001202015011003", subject: "Kelas 2022-A", classes: "45 Mhs" },
    { name: "Prof. Dr. Ir. Hadi", nip: "197505121998031002", subject: "Kelas 2022-C", classes: "40 Mhs" },
  ]);

  const handleAddLecture = (newLecture: Lecture) => {
    setLectures([newLecture, ...lectures]);
    toast.success("Berhasil!", {
      description: `Data dosen wali ${newLecture.name} berhasil ditambahkan.`,
    });
  };

  const handleEditLecture = (updatedLecture: Lecture) => {
    setLectures(lectures.map(l => l.nip === updatedLecture.nip ? updatedLecture : l));
    toast.success("Diperbarui!", {
      description: `Data dosen wali ${updatedLecture.name} berhasil diperbarui.`,
    });
  };

  const handleDeleteLecture = (nip: string) => {
    const lectureName = lectures.find(l => l.nip === nip)?.name;
    setLectures(lectures.filter(l => l.nip !== nip));
    toast.success("Dihapus!", {
      description: `Data dosen wali ${lectureName} berhasil dihapus.`,
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Manajemen Dosen Wali"
        description="Kelola data dosen wali dan penugasan kelas perwalian mahasiswa."
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 h-10 px-5 font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <AddLectureModal onAdd={handleAddLecture}>
              <Button className="bg-brand hover:bg-brand-hover text-white rounded-xl h-10 px-5 font-bold shadow-lg shadow-brand/20 transition-all active:scale-95">
                <UserPlus className="w-4 h-4 mr-2" />
                Tambah Dosen Wali
              </Button>
            </AddLectureModal>
          </div>
        }
      />
      
      <div className="space-y-8">
        <LectureStatsSection />
        <LectureTableSection 
          lectures={lectures} 
          onEdit={handleEditLecture} 
          onDelete={handleDeleteLecture} 
        />
      </div>
    </div>
  );
}