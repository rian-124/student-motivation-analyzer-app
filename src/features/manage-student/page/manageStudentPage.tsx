"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";
import StudentStatsSection from "../section/StudentStatsSection";
import StudentTableSection from "../section/StudentTableSection";
import { AddStudentModal } from "../components/AddStudentModal";
import { useState } from "react";
import { toast } from "sonner";

export interface Student {
  id: string;
  name: string;
  class: string;
  email: string;
}

export default function ManageStudentPage() {
  const [students, setStudents] = useState<Student[]>([
    { name: "Andi Pratama", id: "2021010001", class: "A", email: "andi@kampus.ac.id" },
    { name: "Rizky Fauzan", id: "2021010031", class: "D", email: "rizky@kampus.ac.id" },
    { name: "Budi Santoso", id: "2021010015", class: "A", email: "budi@kampus.ac.id" },
    { name: "Dewi Kusuma", id: "2021010022", class: "C", email: "dewi@kampus.ac.id" },
    { name: "Siti Rahayu", id: "2021010008", class: "B", email: "siti@kampus.ac.id" },
  ]);

  const handleAddStudent = (newStudent: Student) => {
    setStudents([newStudent, ...students]);
    toast.success("Berhasil!", {
      description: `Data mahasiswa ${newStudent.name} berhasil ditambahkan.`,
    });
  };

  const handleEditStudent = (updatedStudent: Student) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    toast.success("Diperbarui!", {
      description: `Data mahasiswa ${updatedStudent.name} berhasil diperbarui.`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    const studentName = students.find(s => s.id === id)?.name;
    setStudents(students.filter(s => s.id !== id));
    toast.success("Dihapus!", {
      description: `Data mahasiswa ${studentName} berhasil dihapus.`,
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Kelola Akun Mahasiswa"
        description="Manajemen data mahasiswa dan penempatan kelas perwalian."
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 h-10 px-5 font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <AddStudentModal onAdd={handleAddStudent}>
              <Button className="bg-brand hover:bg-brand-hover text-white rounded-xl h-10 px-5 font-bold shadow-lg shadow-brand/20 transition-all active:scale-95">
                <UserPlus className="w-4 h-4 mr-2" />
                Tambah Mahasiswa
              </Button>
            </AddStudentModal>
          </div>
        }
      />
      <StudentStatsSection />
      <StudentTableSection 
        students={students} 
        onEdit={handleEditStudent} 
        onDelete={handleDeleteStudent} 
      />
    </div>
  );
}