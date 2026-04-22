import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Mic } from "lucide-react";

export default function TopStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* MAIN SCORE */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Motivasi Tinggi</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">87.4</span>
            <span className="text-green-600 text-sm">/100</span>
          </div>

          <p className="text-sm text-muted-foreground">
            Berdasarkan MFCC dan Speech-to-Text, tingkat motivasi Anda berada
            pada kategori{" "}
            <span className="font-semibold text-foreground">Tinggi</span>.
          </p>
        </CardContent>
      </Card>

      {/* MFCC SCORE */}
      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
          {/* ICON */}
          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-brand" />
          </div>

          {/* SCORE */}
          <div className="text-3xl font-semibold">92.1</div>

          {/* LABEL */}
          <p className="text-sm text-brand-secondary/70">
            Skor MFCC Processing
          </p>
        </CardContent>
      </Card>

      {/* SPEECH TO TEXT SCORE */}
      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
          {/* ICON */}
          <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center">
            <Mic className="w-5 h-5 text-brand-secondary" />
          </div>

          {/* SCORE */}
          <div className="text-3xl font-semibold">83.7</div>

          {/* LABEL */}
          <p className="text-sm text-brand-secondary/70">Skor Speech-to-Text</p>
        </CardContent>
      </Card>
    </div>
  );
}
