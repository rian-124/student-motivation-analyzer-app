"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, KeyRound, Lock, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function SecuritySection() {
  return (
    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="p-6 border-b border-slate-50 dark:border-slate-800">
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <Shield className="w-4 h-4 text-brand" />
          Keamanan & Kata Sandi
        </CardTitle>
        <p className="text-xs text-slate-500">Kelola kredensial keamanan Anda untuk menjaga keamanan akun.</p>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Kata Sandi Saat Ini</Label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Kata Sandi Baru</Label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                type="password" 
                placeholder="Min. 8 Karakter" 
                className="pl-10 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-1 focus:ring-brand/30"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-amber-50 dark:bg-amber-500/5 p-4 flex gap-3 border border-amber-200/50 dark:border-amber-500/20">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
            <span className="font-bold">Tips Keamanan:</span> Gunakan kombinasi huruf besar, angka, dan simbol untuk membuat kata sandi yang lebih kuat.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" className="rounded-xl px-6 h-11 font-bold border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            Perbarui Kata Sandi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
