import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function AnalysisGridSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* MFCC ANALYSIS */}
      <Card>
        <CardHeader>
          <CardTitle>Analisis MFCC</CardTitle>
          <p className="text-xs text-muted-foreground">
            Mel-Frequency Cepstral Coefficients
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Energi Suara</span>
              <span className="text-brand">91%</span>
            </div>
            <Progress value={91} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Kecepatan Bicara</span>
              <span className="text-brand-secondary">78%</span>
            </div>
            <Progress value={78} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Variasi Nada</span>
              <span className="text-brand-accent">85%</span>
            </div>
            <Progress value={85} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Kelancaran Bicara</span>
              <span className="text-brand-hover">88%</span>
            </div>
            <Progress value={88} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Kejelasan Artikulasi</span>
              <span className="text-brand">94%</span>
            </div>
            <Progress value={94} />
          </div>
        </CardContent>
      </Card>

      {/* TRANSKRIP */}
      <Card>
        <CardHeader>
          <CardTitle>Hasil Speech-to-Text</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border bg-muted/40 text-sm leading-relaxed">
            <p className="text-xs text-muted-foreground mb-2">
              TRANSKRIP REKAMAN
            </p>
            “Saya sangat antusias dengan mata kuliah ini. Saya sudah
            mempelajari materi tentang pemrograman web dan merasa sangat
            termotivasi untuk terus belajar dan mengembangkan kemampuan saya
            dalam bidang teknologi...”
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kata terdeteksi</span>
              <span>47 kata</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Durasi bicara efektif
              </span>
              <span>00:38</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Kata kunci motivasi
              </span>
              <span className="text-green-500">8 terdeteksi</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Akurasi transkripsi
              </span>
              <span>96.2%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
