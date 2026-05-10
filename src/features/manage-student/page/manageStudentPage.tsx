"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Download, UserPlus } from "lucide-react";
import StudentStatsSection from "../section/StudentStatsSection";
import StudentTableSection from "../section/StudentTableSection";
import { AddStudentModal } from "../components/AddStudentModal";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { studentService } from "@/services/student.service";
import { Student } from "@/lib/types/student.type";

export default function ManageStudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    lastPage: 1,
  });

  const fetchStudents = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await studentService.findAll(page);
      setStudents(response.data);
      setPagination({
        page: response.meta.page,
        total: response.meta.total,
        lastPage: response.meta.lastPage,
      });
    } catch (error) {
      toast.error("Gagal mengambil data mahasiswa");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleAddStudent = async (data: any) => {
    try {
      await studentService.create(data);
      fetchStudents(pagination.page);
      toast.success("Berhasil!", {
        description: `Data mahasiswa ${data.name} berhasil ditambahkan.`,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menambahkan mahasiswa");
    }
  };

  const handleEditStudent = async (id: string, data: any) => {
    try {
      await studentService.update(id, data);
      fetchStudents(pagination.page);
      toast.success("Diperbarui!", {
        description: `Data mahasiswa ${data.name} berhasil diperbarui.`,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal memperbarui mahasiswa");
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      await studentService.remove(id);
      fetchStudents(pagination.page);
      toast.success("Dihapus!", {
        description: `Data mahasiswa berhasil dihapus.`,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menghapus mahasiswa");
    }
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
        loading={loading}
        pagination={pagination}
        onPageChange={fetchStudents}
        onEdit={handleEditStudent} 
        onDelete={handleDeleteStudent} 
      />
    </div>
  );
}