"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Class } from "@/lib/types/class.type";
import type { Lecturer } from "@/lib/types/lecturer.type";
import type { Student, UpdateStudentPayload } from "@/lib/types/student.type";
import { classesService } from "@/services/classes.service";
import { lecturerService } from "@/services/lecturer.service";
import { useAuthStore } from "@/store/auth.store";
import { Briefcase, Edit, Hash, Mail, Save, User } from "lucide-react";
import { useEffect, useState } from "react";

const SEMESTER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface EditStudentModalProps {
  student: Student;
  onEdit?: (data: UpdateStudentPayload) => void;
  children: React.ReactNode;
}

export function EditStudentModal({
  student,
  onEdit,
  children,
}: EditStudentModalProps) {
  const [open, setOpen] = useState(false);
  const userRole = useAuthStore((state) => state.user?.role?.toUpperCase());
  const isAdmin = userRole === "ADMIN";

  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  // Initialize with safe default values
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    classId: "none",
    email: "",
    semester: "1",
    lecturerId: "none",
  });

  useEffect(() => {
    if (open) {
      fetchClasses();
      if (isAdmin) {
        fetchLecturers();
      }
    }
  }, [open, isAdmin]);

  const fetchClasses = async () => {
    try {
      const response = await classesService.findAll();
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  // Sync data when student prop changes
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        nim: student.nim || "",
        classId: student.classId || "none",
        email: student.user?.email || "",
        semester: student.semester || "1",
        lecturerId: student.lecturerId || "none",
      });
    }
  }, [student]);

  const fetchLecturers = async () => {
    try {
      const response = await lecturerService.findAll(1, 100);
      setLecturers(response.data);
    } catch (error) {
      console.error("Failed to fetch lecturers", error);
    }
  };

  const handleSave = () => {
    if (onEdit) {
      const payload: UpdateStudentPayload = {
        name: formData.name,
        nim: formData.nim,
        classId: formData.classId === "none" ? undefined : formData.classId,
        semester: formData.semester,
        lecturerId:
          formData.lecturerId === "none" ? undefined : formData.lecturerId,
      };
      onEdit(payload);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl p-0 overflow-hidden bg-white dark:bg-slate-900">
        <DialogHeader className="p-5 pb-2">
          <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center mb-3">
            <Edit className="w-5 h-5 text-brand" />
          </div>
          <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white leading-none">
            Ubah Data Mahasiswa
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
            Perbarui informasi detail untuk mahasiswa ini.
          </DialogDescription>
        </DialogHeader>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* NAMA */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              Nama Lengkap
            </Label>
            <div className="relative">
              <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* NIM */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                NIM
              </Label>
              <div className="relative">
                <Hash className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  value={formData.nim}
                  onChange={(e) =>
                    setFormData({ ...formData, nim: e.target.value })
                  }
                  className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
            </div>

            {/* DOSEN WALI (ONLY ADMIN) */}
            {isAdmin && (
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Dosen Wali
                </Label>
                <Select
                  value={formData.lecturerId}
                  onValueChange={(val) =>
                    setFormData({ ...formData, lecturerId: val })
                  }
                >
                  <SelectTrigger className="h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none">
                    <SelectValue placeholder="Pilih Dosen" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100">
                    <SelectItem value="none">Tanpa Dosen Wali</SelectItem>
                    {lecturers.map((l) => (
                      <SelectItem key={l.id} value={l.id}>
                        {l.name} ({l.class?.name || "No Class"})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {(!isAdmin || formData.lecturerId === "none") && (
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                  Pilih Kelas
                </Label>
                <Select
                  value={formData.classId}
                  onValueChange={(val) =>
                    setFormData({ ...formData, classId: val })
                  }
                >
                  <SelectTrigger className="h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none">
                    <SelectValue placeholder="Pilih Kelas" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100">
                    <SelectItem value="none">Tanpa Kelas</SelectItem>
                    {classes.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.studyProgram?.name} — {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* SEMESTER */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                Semester
              </Label>
              <Select
                value={formData.semester}
                onValueChange={(val) =>
                  setFormData({ ...formData, semester: val })
                }
              >
                <SelectTrigger className="h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none">
                  <SelectValue placeholder="Pilih Semester" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100">
                  {SEMESTER_OPTIONS.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      Semester {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* EMAIL (READONLY) */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                Email
              </Label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  value={formData.email}
                  disabled
                  className="pl-9 h-10 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-400 italic"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 border-none">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="rounded-xl text-xs font-bold text-slate-400 h-9"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            className="bg-brand hover:bg-brand-hover text-white rounded-xl px-6 h-9 text-xs font-bold shadow-md shadow-brand/20 transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5 mr-2" />
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
