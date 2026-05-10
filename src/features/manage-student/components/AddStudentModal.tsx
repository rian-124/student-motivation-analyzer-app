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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, User, Mail, Hash, Save, Lock, Layers, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { lecturerService } from "@/services/lecturer.service";
import { Lecturer } from "@/lib/types/lecturer.type";
import { useAuthStore } from "@/store/auth.store";

interface AddStudentModalProps {
  onAdd?: (data: any) => void;
  children: React.ReactNode;
}

export function AddStudentModal({ onAdd, children }: AddStudentModalProps) {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role.toUpperCase() === "ADMIN";
  
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    class: "",
    email: "",
    password: "",
    semester: "1",
    lecturerId: "none"
  });

  useEffect(() => {
    if (open && isAdmin) {
      fetchLecturers();
    }
  }, [open, isAdmin]);

  const fetchLecturers = async () => {
    try {
      const response = await lecturerService.findAll(1, 100);
      setLecturers(response.data);
    } catch (error) {
      console.error("Failed to fetch lecturers", error);
    }
  };

  const handleSave = () => {
    if (onAdd) {
      const payload = {
        ...formData,
        class: formData.class.toUpperCase(),
        lecturerId: formData.lecturerId === "none" ? undefined : formData.lecturerId
      };
      onAdd(payload);
    }
    setFormData({ name: "", nim: "", class: "", email: "", password: "", semester: "1", lecturerId: "none" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl p-0 overflow-hidden bg-white dark:bg-slate-900">
        <DialogHeader className="p-5 pb-2">
          <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center mb-3">
            <UserPlus className="w-5 h-5 text-brand" />
          </div>
          <DialogTitle className="text-lg font-bold text-slate-800 dark:text-white leading-none">Tambah Mahasiswa</DialogTitle>
          <DialogDescription className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
            Daftarkan akun mahasiswa baru ke dalam sistem.
          </DialogDescription>
        </DialogHeader>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* NAMA */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Nama Lengkap</Label>
            <div className="relative">
              <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nama mahasiswa..." 
                className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* NIM */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">NIM</Label>
              <div className="relative">
                <Hash className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                  value={formData.nim}
                  onChange={(e) => setFormData({...formData, nim: e.target.value})}
                  placeholder="202101..." 
                  className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
            </div>

            {/* DOSEN WALI (ONLY ADMIN) */}
            {isAdmin && (
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Dosen Wali</Label>
                <Select value={formData.lecturerId} onValueChange={(val) => setFormData({...formData, lecturerId: val})}>
                  <SelectTrigger className="h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none">
                    <SelectValue placeholder="Pilih Dosen" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100">
                    <SelectItem value="none">Tanpa Dosen Wali</SelectItem>
                    {lecturers.map(l => (
                      <SelectItem key={l.id} value={l.id}>
                        {l.name} ({l.class?.name || 'No Class'})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* KELAS (ONLY SHOWN IF NO DOSEN SELECTED OR NOT ADMIN) */}
            {(!isAdmin || formData.lecturerId === "none") && (
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Kelas Manual</Label>
                <Input 
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  placeholder="A / B / C" 
                  className="h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* SEMESTER */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Semester</Label>
              <div className="relative">
                <Layers className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: e.target.value})}
                  placeholder="1" 
                  className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Email</Label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  type="email" 
                  placeholder="email@kampus.ac.id" 
                  className="pl-9 h-10 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
                />
              </div>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Password</Label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                type="password" 
                placeholder="********" 
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
