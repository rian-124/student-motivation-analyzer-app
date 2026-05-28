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
import type {
  Lecturer,
  UpdateLecturerPayload,
} from "@/lib/types/lecturer.type";
import { classesService } from "@/services/classes.service";
import { Edit, Hash, Lock, Mail, User, X } from "lucide-react";
import { useEffect, useState } from "react";

interface EditLectureModalProps {
  lecturer: Lecturer;
  onUpdate: (data: UpdateLecturerPayload) => void;
  children: React.ReactNode;
}

export function EditLectureModal({
  lecturer,
  onUpdate,
  children,
}: EditLectureModalProps) {
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    email: "",
    password: "",
    selectedClassId: "none",
    classIds: [] as string[],
  });

  useEffect(() => {
    if (open) {
      fetchClasses();
    }
  }, [open]);

  const fetchClasses = async () => {
    try {
      const response = await classesService.findAll();
      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  };

  useEffect(() => {
    if (lecturer) {
      setFormData({
        name: lecturer.name || "",
        nip: lecturer.nip || "",
        email: lecturer.user?.email || "",
        password: "",
        selectedClassId: "none",
        classIds:
          lecturer.supervisedClassIds ||
          (lecturer.classId ? [lecturer.classId] : []),
      });
    }
  }, [lecturer]);

  const handleSave = () => {
    const payload: UpdateLecturerPayload = {
      nip: formData.nip || undefined,
      name: formData.name || undefined,
      email: formData.email || undefined,
      password: formData.password || undefined,
      classIds: formData.classIds,
    };

    onUpdate(payload);
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
            Ubah Data Dosen
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
            Perbarui informasi dosen wali dalam sistem.
          </DialogDescription>
        </DialogHeader>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
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
                placeholder="Nama dosen..."
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              NIP
            </Label>
            <div className="relative">
              <Hash className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={formData.nip}
                onChange={(e) =>
                  setFormData({ ...formData, nip: e.target.value })
                }
                placeholder="198501..."
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              Password Baru (Opsional)
            </Label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder="Kosongkan jika tidak diubah"
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              Email
            </Label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder="email@kampus.ac.id"
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              Pilih Kelas Perwalian
            </Label>
            <Select
              value={formData.selectedClassId}
              onValueChange={(val) => {
                if (val !== "none" && !formData.classIds.includes(val)) {
                  setFormData({
                    ...formData,
                    selectedClassId: "none",
                    classIds: [...formData.classIds, val],
                  });
                  return;
                }
                setFormData({ ...formData, selectedClassId: val });
              }}
            >
              <SelectTrigger className="h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none">
                <SelectValue placeholder="Tambah kelas..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100">
                <SelectItem value="none">Pilih kelas</SelectItem>
                {classes.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.studyProgram?.name} - {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2 pt-1">
              {formData.classIds.length === 0 && (
                <span className="text-[11px] text-slate-400">
                  Belum ada kelas dipilih.
                </span>
              )}
              {formData.classIds.map((classId) => {
                const selectedClass = classes.find((c) => c.id === classId);
                if (!selectedClass) return null;
                return (
                  <span
                    key={classId}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {selectedClass.studyProgram?.name} - {selectedClass.name}
                    <button
                      type="button"
                      className="rounded-full p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          classIds: formData.classIds.filter(
                            (id) => id !== classId,
                          ),
                        })
                      }
                      aria-label={`Hapus kelas ${selectedClass.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}
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
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
