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
import { BookOpen, Briefcase, User } from "lucide-react";
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

  // Gunakan nilai default kosong untuk mencegah error saat lecturer belum ada
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    department: "",
    classId: "none",
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

  // Update formData saat lecturer berubah atau modal dibuka
  useEffect(() => {
    if (lecturer) {
      setFormData({
        name: lecturer.name || "",
        nip: lecturer.nip || "",
        department: lecturer.department || "",
        classId: lecturer.classId || "none",
      });
    }
  }, [lecturer]);

  const handleSave = () => {
    const payload: UpdateLecturerPayload = {
      nip: formData.nip || undefined,
      name: formData.name || undefined,
      department: formData.department || undefined,
      class: formData.classId === "none" ? undefined : formData.classId,
    };

    onUpdate(payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white dark:bg-slate-900">
        <DialogHeader className="p-8 pb-4 bg-gradient-to-br from-brand/5 to-transparent">
          <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-brand" />
          </div>
          <DialogTitle className="text-2xl font-black text-slate-800 dark:text-white leading-tight">
            Edit Data Dosen
          </DialogTitle>
          <DialogDescription className="text-slate-400 font-medium">
            Perbarui informasi dosen wali sistem.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 pt-2 space-y-5">
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
                placeholder="Nama lengkap..."
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          {/* NIP */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              NIP
            </Label>
            <div className="relative">
              <Briefcase className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={formData.nip}
                onChange={(e) =>
                  setFormData({ ...formData, nip: e.target.value })
                }
                placeholder="NIP dosen..."
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          {/* DEPARTEMEN & KELAS */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              Departemen & Kelas
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <BookOpen className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  placeholder="Departemen..."
                  className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
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
          </div>
        </div>

        <DialogFooter className="p-8 pt-0 flex gap-2 border-none">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="flex-1 rounded-xl text-xs font-bold text-slate-400 h-11 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-brand hover:bg-brand-hover text-white px-6 h-11 text-xs font-bold shadow-lg shadow-brand/20 transition-all active:scale-95"
          >
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
