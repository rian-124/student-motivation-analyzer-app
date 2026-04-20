import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Shield } from "lucide-react";

export default function ProfileView() {
  return (
    <section className="p-6 space-y-6 w-full min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Profil Saya</h1>
        <p className="text-sm text-muted-foreground">
          Kelola informasi akun dan pengaturan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT PROFILE CARD */}
        <Card className="lg:col-span-4">
          <CardContent className="p-6 text-center space-y-4">

            {/* AVATAR */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              A
            </div>

            {/* NAME */}
            <div>
              <h2 className="font-semibold text-lg">Admin Sistem</h2>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>

            {/* STATUS */}
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
              ● Akun Aktif
            </Badge>

            <Separator />

            {/* INFO */}
            <div className="space-y-2 text-sm text-left">

              <div className="flex justify-between">
                <span className="text-muted-foreground">Bergabung</span>
                <span>Jan 2024</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Login Terakhir</span>
                <span>Hari ini</span>
              </div>

            </div>

          </CardContent>
        </Card>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-8 space-y-6">

          {/* PERSONAL INFO */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Informasi Pribadi
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <label className="text-sm">Nama Lengkap</label>
                  <Input defaultValue="Admin Sistem" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm">NIM / NIP</label>
                  <Input defaultValue="ADM001" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm">Email</label>
                  <Input type="email" defaultValue="admin@kampus.ac.id" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm">No. Telepon</label>
                  <Input defaultValue="+62 812-3456-7890" />
                </div>

              </div>

              <Button className="mt-4">
                Simpan Perubahan
              </Button>

            </CardContent>
          </Card>

          {/* SECURITY */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Keamanan Akun
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-2">
                  <label className="text-sm">Password Lama</label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm">Password Baru</label>
                  <Input type="password" placeholder="Min. 8 karakter" />
                </div>

              </div>

              <Button variant="outline" className="mt-4">
                Ubah Password
              </Button>

            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}