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
import { BookOpen, Hash, Lock, Mail, Save, User, UserPlus } from "lucide-react";
import { useState } from "react";

interface AddLectureModalProps {
  onAdd?: (data: any) => void;
  children: React.ReactNode;
}

export function AddLectureModal({ onAdd, children }: AddLectureModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nip: "",
    name: "",
    email: "",
    password: "",
    department: "",
    class: "",
  });

  const handleSave = () => {
    if (onAdd) {
      onAdd(formData);
    }
    setFormData({ name: "", nip: "", department: "", email: "", password: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl p-0 overflow-hidden bg-white dark:bg-slate-900">
        <DialogHeader className="p-5 pb-2">
          <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center mb-3">
            <UserPlus className="w-5 h-5 text-brand" />
          </div>
          <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white leading-none">
            Tambah Dosen Wali
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
            Daftarkan akun dosen wali baru ke dalam sistem.
          </DialogDescription>
        </DialogHeader>

        <div className="p-5 space-y-4">
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
                placeholder="Nama dosen..."
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* NIP */}
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

            {/* DEPARTEMEN & KELAS */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
                Departemen & Kelas
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  placeholder="Teknik..."
                  className="h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
                <Input
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                  placeholder="Kelas..."
                  className="h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
            </div>
          </div>

          {/* EMAIL */}
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
                placeholder="email@lecturer.com"
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">
              Password
            </Label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder="********"
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
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
            Daftarkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
