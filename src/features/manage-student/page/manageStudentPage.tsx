"use client";

import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import type { Class } from "@/lib/types/class.type";
import type {
  CreateStudentPayload,
  Student,
  UpdateStudentPayload,
} from "@/lib/types/student.type";
import { classesService } from "@/services/classes.service";
import { studentService } from "@/services/student.service";
import { Download, UserPlus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AddStudentModal } from "../components/AddStudentModal";
import StudentTableSection from "../section/StudentTableSection";

export default function ManageStudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(
    undefined,
  );
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    lastPage: 1,
  });

  const fetchStudents = useCallback(async (page = 1, classId?: string) => {
    setLoading(true);
    try {
      const response = await studentService.findAll(page, 10, classId);
      setStudents(response.data);
      setPagination({
        page: response.meta.page,
        total: response.meta.total,
        lastPage:
          Math.ceil(response.meta.total / (response.meta.limit || 10)) || 1,
      });
    } catch (error) {
      toast.error("Gagal mengambil data mahasiswa");
    } finally {
      setLoading(false);
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — only run on mount
  useEffect(() => {
    fetchStudents(1, selectedClassId);
  }, []);

  useEffect(() => {
    classesService.findAll().then((res) => setClasses(res.data));
  }, []);

  const handleAddStudent = async (data: CreateStudentPayload) => {
    try {
      await studentService.create(data);
      fetchStudents(pagination.page, selectedClassId);
      toast.success("Berhasil!", {
        description: `Data mahasiswa ${data.name} berhasil ditambahkan.`,
      });
    } catch (error: unknown) {
      toast.error("Gagal menambahkan mahasiswa");
      console.error(error);
    }
  };

  const handleEditStudent = async (id: string, data: UpdateStudentPayload) => {
    try {
      await studentService.update(id, data);
      fetchStudents(pagination.page, selectedClassId);
      toast.success("Diperbarui!", {
        description: `Data mahasiswa ${data.name ?? id} berhasil diperbarui.`,
      });
    } catch (error: unknown) {
      toast.error("Gagal memperbarui mahasiswa");
      console.error(error);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      await studentService.remove(id);
      fetchStudents(pagination.page, selectedClassId);
      toast.success("Dihapus!", {
        description: "Data mahasiswa berhasil dihapus.",
      });
    } catch (error: unknown) {
      toast.error("Gagal menghapus mahasiswa");
      console.error(error);
    }
  };

  const handleClassFilterChange = (classId: string) => {
    setSelectedClassId(classId === "all" ? undefined : classId);
    fetchStudents(1, classId === "all" ? undefined : classId);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Kelola Akun Mahasiswa"
        description="Manajemen data mahasiswa dan penempatan kelas perwalian."
        actions={
          <div className="flex items-center gap-3">
            <AddStudentModal onAdd={handleAddStudent}>
              <Button className="bg-brand hover:bg-brand-hover text-white rounded-xl h-10 px-5 font-bold shadow-lg shadow-brand/20 transition-all active:scale-95">
                <UserPlus className="w-4 h-4 mr-2" />
                Tambah Mahasiswa
              </Button>
            </AddStudentModal>
          </div>
        }
      />
      <StudentTableSection
        students={students}
        classes={classes}
        loading={loading}
        pagination={pagination}
        selectedClassId={selectedClassId}
        onPageChange={(page) => fetchStudents(page, selectedClassId)}
        onClassFilterChange={handleClassFilterChange}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
}
