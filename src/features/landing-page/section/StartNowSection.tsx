import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function StartNowSection() {
  return (
    <section className="w-full py-24 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl aspect-[2/1] bg-gradient-to-br from-brand/10 to-brand-secondary/10 blur-[120px] rounded-[100px] pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="bg-brand-secondary rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl group border border-white/10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-accent text-sm font-bold tracking-wider uppercase">
              <BookOpen size={16} />
              <span>Implementasi Proyek</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Evaluasi Prototipe<br />
                <span className="bg-gradient-to-r from-brand-accent to-yellow-200 bg-clip-text text-transparent">Sistem Analisis.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-white/70 text-lg md:text-xl font-medium">
                Akses dasbor analisis untuk mengeksplorasi bagaimana AI multimodal dapat digunakan untuk memantau 
                keterlibatan dan motivasi mahasiswa di lingkungan pendidikan.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="h-14 px-8 rounded-2xl bg-brand hover:bg-brand-hover text-white font-bold text-lg shadow-xl hover:shadow-brand/20 transition-all hover:scale-105 group">
                <Link href="/login" className="flex items-center gap-2">
                  Masuk ke Sistem
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10 font-bold text-lg backdrop-blur-sm transition-all hover:scale-105">
                <Link href="#features">
                  Tinjauan Metodologi
                </Link>
              </Button>
            </div>
            
            <p className="text-white/40 text-sm font-medium">
              Prototipe Akademik • Dikembangkan untuk Tujuan Riset Pendidikan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
