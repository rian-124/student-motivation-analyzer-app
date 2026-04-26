import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ShieldCheck, Zap, Headphones } from "lucide-react";

export default function UploadGuideSection() {
  const guides = [
    {
      title: "Format & Kualitas",
      description: "Gunakan format WAV minimal 16kHz untuk akurasi ekstraksi fitur MFCC terbaik.",
      icon: <Headphones className="w-5 h-5 text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Durasi Optimal",
      description: "Rekaman dengan durasi 30–120 detik memberikan data yang cukup untuk analisis tren motivasi.",
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      color: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      title: "Lingkungan Rekam",
      description: "Pastikan suara vokal jelas dan minim gangguan noise latar belakang untuk hasil maksimal.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      color: "bg-emerald-50 dark:bg-emerald-900/20"
    }
  ];

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {guides.map((guide, idx) => (
        <Card key={idx} className="border-none shadow-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
          <CardContent className="pt-6">
            <div className={`w-10 h-10 ${guide.color} rounded-xl flex items-center justify-center mb-4`}>
              {guide.icon}
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{guide.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {guide.description}
            </p>
          </CardContent>
        </Card>
      ))}
      
      <div className="md:col-span-3 flex items-center gap-3 p-4 bg-brand/5 rounded-2xl border border-brand/10">
        <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center shrink-0">
          <Info className="w-4 h-4 text-brand" />
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          <strong>Catatan:</strong> Data audio Anda diproses secara lokal untuk privasi dan akan dihapus setelah analisis selesai.
        </p>
      </div>
    </div>
  );
}
