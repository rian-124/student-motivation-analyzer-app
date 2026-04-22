import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function PersonalInfoSection() {
  return (
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

        <Button className="mt-4">Simpan Perubahan</Button>
      </CardContent>
    </Card>
  );
}
