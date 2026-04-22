import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UploadGuideSection() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Panduan Upload</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        <div className="flex gap-3">
          <Badge>1</Badge>
          <div>
            <p className="font-semibold">Format & Kualitas</p>
            <p className="text-muted-foreground">
              Gunakan WAV minimal 16kHz untuk hasil terbaik
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Badge>2</Badge>
          <div>
            <p className="font-semibold">Durasi Rekaman</p>
            <p className="text-muted-foreground">Optimal 30–120 detik</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Badge>3</Badge>
          <div>
            <p className="font-semibold">Lingkungan</p>
            <p className="text-muted-foreground">Hindari noise berlebih</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
