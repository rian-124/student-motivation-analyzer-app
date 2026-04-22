import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function SecuritySection() {
  return (
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
  );
}
