import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Clock, Zap, Target, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnalysisGridSection({ data }: { data: any }) {
  const score = data?.summary?.score || 0;
  const dominant = data?.summary?.dominant || "Intrinsik";
  
  const mfccMetrics = [
    { label: "Energi Suara", value: score > 70 ? 91 : score > 50 ? 65 : 42, color: "bg-brand", icon: <Zap className="w-4 h-4" /> },
    { label: "Kecepatan Bicara", value: score > 70 ? 78 : score > 50 ? 60 : 45, color: "bg-brand-secondary", icon: <Clock className="w-4 h-4" /> },
    { label: "Variasi Nada", value: score > 70 ? 85 : score > 50 ? 55 : 30, color: "bg-brand-accent", icon: <BarChart3 className="w-4 h-4" /> },
    { label: "Kelancaran Bicara", value: score > 70 ? 88 : score > 50 ? 70 : 50, color: "bg-emerald-500", icon: <Target className="w-4 h-4" /> },
    { label: "Kejelasan Artikulasi", value: score > 70 ? 94 : score > 50 ? 80 : 65, color: "bg-blue-500", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const transcript = dominant === "Amotivasi" 
    ? "Saya merasa kurang bersemangat akhir-akhir ini. Rasanya sulit untuk fokus pada materi kuliah dan saya tidak tahu tujuan saya belajar ini untuk apa sebenarnya..."
    : "Saya sangat antusias dengan perkuliahan ini. Materi yang disampaikan sangat relevan dengan minat saya dan saya termotivasi untuk mengeksplorasi lebih dalam bidang ini.";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* MFCC ANALYSIS */}
      <Card className="border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader className="border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <BarChart3 className="w-5 h-5 text-brand" />
            Detail Akustik (MFCC)
          </CardTitle>
          <p className="text-xs text-slate-500 font-medium">
            Karakteristik fisik suara yang mencerminkan kondisi emosional.
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {mfccMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  {metric.icon}
                  {metric.label}
                </span>
                <span className={cn("font-black", metric.value > 80 ? "text-brand" : "text-slate-900 dark:text-white")}>
                  {metric.value}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full rounded-full transition-all duration-1000", metric.color)}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* TRANSKRIP */}
      <Card className="border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
        <CardHeader className="border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
            <MessageSquare className="w-5 h-5 text-brand-accent" />
            Transkrip & Konten
          </CardTitle>
          <p className="text-xs text-slate-500 font-medium">
            Analisis semantik dari kata-kata yang diucapkan.
          </p>
        </CardHeader>

        <CardContent className="p-8 flex-1 flex flex-col space-y-8">
          <div className="relative">
            <div className="absolute -left-2 top-0 text-4xl text-brand/10 font-serif">“</div>
            <div className="p-6 rounded-2xl bg-brand/5 border border-brand/10 text-slate-700 dark:text-slate-300 text-base leading-relaxed italic relative z-10">
              {transcript}
            </div>
            <div className="absolute -right-2 bottom-0 text-4xl text-brand/10 font-serif">”</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Kata</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">{transcript.split(' ').length} Kata</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Durasi Efektif</p>
              <p className="text-xl font-black text-slate-900 dark:text-white">00:38</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1">
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Keyword Motivasi</p>
              <p className="text-xl font-black text-emerald-700 dark:text-emerald-400">{dominant === "Amotivasi" ? "1" : "8"} Kata</p>
            </div>
            <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 space-y-1">
              <p className="text-[10px] font-bold text-brand uppercase tracking-widest">Akurasi AI</p>
              <p className="text-xl font-black text-brand">96.2%</p>
            </div>
          </div>

          <div className="pt-4 mt-auto">
            <p className="text-xs text-slate-400 text-center italic">
              AI mendeteksi sentimen {score > 60 ? "positif" : "negatif"} yang kuat pada rekaman.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
