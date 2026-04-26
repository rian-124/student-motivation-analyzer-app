import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Mic, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TopStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* MAIN SCORE CIRCULAR */}
      <Card className="md:col-span-6 border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4">
          <Badge className="bg-brand/10 text-brand border-none px-3 py-1">Kategori: Tinggi</Badge>
        </div>
        
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Circular Score Visual */}
          <div className="relative w-40 h-40 shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * 87.4) / 100}
                strokeLinecap="round"
                className="text-brand transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900 dark:text-white">87.4</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skor Total</span>
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start gap-2">
                Motivasi Luar Biasa!
                <Award className="w-6 h-6 text-brand-accent fill-brand-accent/20" />
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Anda menunjukkan antusiasme yang sangat tinggi dalam rekaman ini. 
                Pertahankan ritme dan intonasi bicara Anda yang energik!
              </p>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                <span className="text-sm font-bold text-emerald-500">OPTIMAL</span>
              </div>
              <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase">Tren</span>
                <span className="text-sm font-bold text-brand flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% dari sebelumnya
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MFCC SCORE */}
      <Card className="md:col-span-3 border-none shadow-xl bg-gradient-to-br from-brand to-brand-secondary text-white relative overflow-hidden group">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black italic">92.1</div>
            <p className="text-sm font-bold text-white/70 uppercase tracking-tight">Akustik (MFCC)</p>
          </div>
          <p className="text-[10px] text-white/50 leading-tight">
            Menganalisis frekuensi suara dan ritme vokal Anda.
          </p>
        </CardContent>
        {/* Decorative background circle */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </Card>

      {/* SPEECH TO TEXT SCORE */}
      <Card className="md:col-span-3 border-none shadow-xl bg-white dark:bg-slate-900 relative overflow-hidden group">
        <CardContent className="p-8 flex flex-col items-center text-center space-y-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mic className="w-7 h-7 text-brand-accent" />
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-black text-slate-900 dark:text-white italic">83.7</div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">Konten (STT)</p>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Menganalisis pilihan kata dan sentimen dalam ucapan.
          </p>
        </CardContent>
        {/* Decorative background accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent" />
      </Card>
    </div>
  );
}
