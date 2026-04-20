"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LogIn } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
            M
          </div>

          <div>
            <h1 className="text-2xl font-bold">Selamat Datang</h1>
            <p className="text-sm text-muted-foreground">
              Student Motivation Analyzer System
            </p>
          </div>
        </div>

        {/* FORM */}
        <Card>
          <CardContent className="p-6 space-y-4">

            <div className="space-y-2">
              <Label>Email / NIM</Label>
              <Input placeholder="Masukkan email atau NIM" />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="Masukkan password" />
            </div>

            <Button className="w-full gap-2">
              <LogIn className="w-4 h-4" />
              Masuk
            </Button>

            <Separator />

            {/* DESKRIPSI */}
            <p className="text-center text-xs text-muted-foreground leading-relaxed">
              Sistem ini digunakan untuk menganalisis tingkat motivasi mahasiswa berdasarkan data
              audio dan MFCC secara otomatis untuk membantu dosen dalam proses evaluasi akademik.
            </p>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}