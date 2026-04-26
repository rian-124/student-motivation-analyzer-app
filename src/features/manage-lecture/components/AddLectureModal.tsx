"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, User, Mail, Hash, BookOpen, Save } from "lucide-react";
import { useState } from "react";
import { Lecture } from "../page/manageLecturePage";

interface AddLectureModalProps {
  children: React.ReactNode;
  onAdd?: (lecture: Lecture) => void;
}

export function AddLectureModal({ children, onAdd }: AddLectureModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    subject: "",
    email: ""
  });

  const handleSave = () => {
    if (onAdd && formData.name && formData.nip) {
      onAdd({
        name: formData.name,
        nip: formData.nip,
        subject: formData.subject || "Belum ditentukan",
        classes: "0 Mhs"
      });
      setFormData({ name: "", nip: "", subject: "", email: "" });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl p-0 overflow-hidden bg-white dark:bg-slate-900">
        <DialogHeader className="p-5 pb-2">
          <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center mb-3">
            <UserPlus className="w-5 h-5 text-brand" />
          </div>
          <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white leading-none">Tambah Dosen Wali</DialogTitle>
          <DialogDescription className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
            Daftarkan akun dosen wali baru untuk manajemen bimbingan akademik.
          </DialogDescription>
        </DialogHeader>

        <div className="p-5 space-y-4">
          {/* NAMA */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Nama Lengkap & Gelar</Label>
            <div className="relative">
              <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Contoh: Dr. Ahmad, M.T." 
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* NIP */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">NIP</Label>
              <div className="relative">
                <Hash className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                  value={formData.nip}
                  onChange={(e) => setFormData({...formData, nip: e.target.value})}
                  placeholder="1985..." 
                  className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
            </div>

            {/* MATA KULIAH */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Kelas Perwalian</Label>
              <div className="relative">
                <BookOpen className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Contoh: 2021-A" 
                  className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Email Institusi</Label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="dosen@kampus.ac.id" 
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 border-none">
          <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl text-xs font-bold text-slate-400 h-9">
            Batal
          </Button>
          <Button onClick={handleSave} className="bg-brand hover:bg-brand-hover text-white rounded-xl px-6 h-9 text-xs font-bold shadow-md shadow-brand/20 transition-all active:scale-95">
            <Save className="w-3.5 h-3.5 mr-2" />
            Daftarkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
