import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileAudio, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import VidioDialog from "../components/VidioDialog";

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-brand/5 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-accent/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 border border-brand/10 text-brand text-xs font-bold tracking-widest uppercase shadow-sm">
            <Sparkles size={14} className="animate-pulse" />
            <span>Proyek Riset Akademik</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-brand-secondary leading-[1.1]">
            Multimodal Student <br />
            <span className="bg-gradient-to-r from-brand via-indigo-600 to-indigo-800 bg-clip-text text-transparent">Motivation Analysis.</span>
          </h1>

          {/* Subtext */}
          <p className="text-brand-secondary/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Implementasi kecerdasan buatan multimodal untuk mengukur dan menganalisis tingkat keterlibatan mahasiswa menggunakan Pemrosesan Bahasa Alami dan Analisis Sentimen Audio.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 w-full justify-center">
            <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-brand hover:bg-brand-hover text-white font-bold text-lg shadow-2xl shadow-brand/20 transition-all hover:scale-105 group w-full sm:w-auto">
              <Link href="/login" className="flex items-center gap-2">
                Mulai Analisis
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <div className="flex items-center gap-3 group cursor-pointer">
              <VidioDialog />
              <span className="text-brand-secondary/70 font-bold text-sm uppercase tracking-widest group-hover:text-brand transition-colors border-b-2 border-transparent hover:border-brand">Demonstrasi Sistem</span>
            </div>
          </div>

          {/* Visual Preview / Mockup */}
        
        </div>
      </div>
    </section>
  );
}
