"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Smartphone, Hash, Save } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function PersonalInfoSection() {
  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="p-6 border-b border-slate-50 dark:border-slate-800">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <User className="w-4 h-4 text-brand" />
          Informasi Pribadi
        </CardTitle>
        <p className="text-xs text-slate-500">Perbarui detail profil dasar dan informasi kontak Anda.</p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nama Lengkap</Label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                defaultValue="Admin Sistem" 
                className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">ID Pengguna (NIM/NIP)</Label>
            <div className="relative">
              <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                defaultValue="ADM001" 
                disabled
                className="pl-10 h-11 rounded-xl bg-slate-100 dark:bg-slate-800/50 border-none text-slate-500 italic"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Alamat Email</Label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                type="email" 
                defaultValue="admin@kampus.ac.id" 
                className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Nomor Telepon</Label>
            <div className="relative">
              <Smartphone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                defaultValue="+62 812-3456-7890" 
                className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button className="bg-brand hover:bg-brand-hover text-white rounded-xl px-6 h-11 font-bold shadow-lg shadow-brand/20 transition-all active:scale-95">
            <Save className="w-4 h-4 mr-2" />
            Simpan Perubahan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
