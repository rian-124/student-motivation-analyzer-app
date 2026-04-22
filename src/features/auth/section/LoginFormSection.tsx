"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LogIn } from "lucide-react";

export default function LoginFormSection() {
  return (
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
          Sistem ini digunakan untuk menganalisis tingkat motivasi mahasiswa
          berdasarkan data audio dan MFCC secara otomatis untuk membantu dosen
          dalam proses evaluasi akademik.
        </p>
      </CardContent>
    </Card>
  );
}
