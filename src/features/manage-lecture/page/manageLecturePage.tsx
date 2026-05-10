"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { UserPlus, Download } from "lucide-react";
import LectureStatsSection from "../section/LectureStatsSection";
import LectureTableSection from "../section/LectureTableSection";
import { AddLectureModal } from "../components/AddLectureModal";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { lecturerService } from "@/services/lecturer.service";
import { Lecturer } from "@/lib/types/lecturer.type";

export default function ManageLecturePage() {
  const [lectures, setLectures] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    lastPage: 1,
  });

  const fetchLecturers = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await lecturerService.findAll(page);
      setLectures(response.data);
      setPagination({
        page: response.meta.page,
        total: response.meta.total,
        lastPage: response.meta.lastPage,
      });
    } catch (error) {
      toast.error("Gagal mengambil data dosen");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLecturers();
  }, [fetchLecturers]);

  const handleAddLecture = async (data: any) => {
    try {
      await lecturerService.create(data);
      fetchLecturers(pagination.page);
      toast.success("Berhasil!", {
        description: `Data dosen ${data.name} berhasil ditambahkan.`,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menambahkan dosen");
    }
  };

  const handleEditLecture = async (id: string, data: any) => {
    try {
      await lecturerService.update(id, data);
      fetchLecturers(pagination.page);
      toast.success("Diperbarui!", {
        description: `Data dosen ${data.name} berhasil diperbarui.`,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal memperbarui dosen");
    }
  };

  const handleDeleteLecture = async (id: string) => {
    try {
      await lecturerService.remove(id);
      fetchLecturers(pagination.page);
      toast.success("Dihapus!", {
        description: `Data dosen berhasil dihapus.`,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menghapus dosen");
    }
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
          loading={loading}
          pagination={pagination}
          onPageChange={fetchLecturers}
          onEdit={handleEditLecture} 
          onDelete={handleDeleteLecture} 
        />
      </div>
    </div>
  );
}