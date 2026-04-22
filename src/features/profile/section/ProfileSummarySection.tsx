import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProfileSummarySection() {
  return (
    <Card className="lg:col-span-4 h-fit">
      <CardContent className="p-6 text-center space-y-4">
        {/* AVATAR */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-brand to-brand-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand/20">
          A
        </div>

        {/* NAME */}
        <div>
          <h2 className="font-semibold text-lg text-brand-secondary">Admin Sistem</h2>
          <p className="text-sm text-brand-secondary/70">Administrator</p>
        </div>

        {/* STATUS */}
        <Badge className="bg-brand/10 text-brand border-brand/20">
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
  );
}
