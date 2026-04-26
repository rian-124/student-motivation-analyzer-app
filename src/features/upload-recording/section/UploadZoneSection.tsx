"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Play, FileAudio, X, Music, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UploadZoneSection() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [waveformHeights, setWaveformHeights] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    // Validasi file
    const validTypes = ['audio/wav', 'audio/mpeg', 'audio/ogg', 'audio/flac'];
    const validExtensions = ['.wav', '.mp3', '.ogg', '.flac'];
    
    const isValidType = validTypes.includes(selectedFile.type) || 
                        validExtensions.some(ext => selectedFile.name.toLowerCase().endsWith(ext));
    
    if (!isValidType) {
      toast.error("Format Berkas Tidak Valid", {
        description: "Harap unggah berkas dengan format WAV, MP3, OGG, atau FLAC.",
      });
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) { // 50MB max
      toast.error("Ukuran Berkas Terlalu Besar", {
        description: "Maksimal ukuran berkas yang diizinkan adalah 50MB.",
      });
      return;
    }

    setFile(selectedFile);
    const heights = Array.from(
      { length: 30 },
      () => Math.floor(Math.random() * 70) + 30
    );
    setWaveformHeights(heights);
  };

  const handleStartAnalysis = () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    const steps = [
      "Mengunggah berkas ke server...",
      "Ekstraksi fitur akustik (MFCC)...",
      "Transkripsi Speech-to-Text (STT)...",
      "Analisis sentimen dan intonasi...",
      "Menghitung skor motivasi...",
      "Menyusun laporan hasil..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAnalysisStep(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        toast.success("Analisis Selesai", {
          description: "Berkas berhasil diproses. Membuka laporan hasil...",
        });
        router.push("/analysis-result");
      }
    }, 800);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnalyzing) return;
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isAnalyzing) return;
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isAnalyzing) return;
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Card className="w-full border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand via-brand-accent to-brand-secondary" />
      
      <CardHeader className="pb-2 pt-5">
        <div className="flex items-center justify-between px-2">
          <CardTitle className="text-xl font-bold tracking-tight text-brand-secondary dark:text-white">
            Panel Unggah Rekaman
          </CardTitle>
          <Badge variant="outline" className="border-brand/20 text-brand font-medium text-[10px]">
            Sistem Cerdas v1.0
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-2 pb-6 px-6">
        {/* UPLOAD ZONE */}
        <div
          onClick={() => !isAnalyzing && fileRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            "relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ease-in-out",
            isAnalyzing ? "cursor-wait opacity-80" : "cursor-pointer",
            isDragging 
              ? "border-brand bg-brand/5 scale-[1.01]" 
              : "border-slate-100 dark:border-slate-800 hover:border-brand/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/50",
            file && "border-brand/40 bg-brand/5"
          )}
        >
          <Input
            type="file"
            ref={fileRef}
            onChange={handleFile}
            className="hidden"
            accept=".wav,.mp3,.ogg,.flac"
          />

          {isAnalyzing && (
            <div className="absolute inset-0 z-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-2xl animate-in fade-in duration-500">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-brand animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
                </div>
              </div>
              <p className="mt-4 text-sm font-bold text-slate-700 dark:text-slate-200 animate-pulse">
                {analysisStep}
              </p>
            </div>
          )}

          {!file ? (
            <div className="space-y-3">
              <div className="mx-auto w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <UploadCloud className="w-7 h-7 text-brand" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-700 dark:text-slate-200 leading-tight">
                  Tarik & Letakkan Berkas Audio
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  Mendukung format WAV, MP3, OGG, dan FLAC
                </p>
              </div>
              <div className="flex justify-center gap-1.5 pt-1">
                {['WAV', 'MP3', 'OGG', 'FLAC'].map((ext) => (
                  <span key={ext} className="px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800 text-[9px] font-bold text-slate-400">
                    {ext}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative z-10 py-2">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
                  <FileAudio className="w-7 h-7 text-white" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-base font-bold text-slate-800 dark:text-white truncate max-w-[260px]">
                    {file.name}
                  </p>
                  <p className="text-[11px] text-brand font-bold">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Siap Dianalisis
                  </p>
                </div>
                
                {/* WAVEFORM ANIMATION */}
                <div className="flex items-end justify-center gap-[2px] h-12 w-full max-w-xs mx-auto mt-2 px-6">
                  {waveformHeights.map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 min-w-[2px] bg-brand/40 rounded-full transition-all duration-500"
                      style={{ 
                        height: isAnalyzing ? `${Math.random() * 80 + 20}%` : `${height}%`,
                        backgroundColor: i % 3 === 0 ? 'var(--color-brand)' : undefined,
                        opacity: 0.4 + (height / 100) * 0.6
                      }}
                    />
                  ))}
                </div>

                {!isAnalyzing && (
                  <button 
                    onClick={removeFile}
                    className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-red-500 transition-colors font-bold"
                  >
                    <X className="w-3.5 h-3.5" />
                    Ganti File
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10" />
        </div>

        {/* ACTIONS */}
        <div className="pt-1">
          <Button 
            disabled={!file || isAnalyzing}
            onClick={handleStartAnalysis}
            className={cn(
              "w-full h-12 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg",
              file && !isAnalyzing
                ? "bg-brand hover:bg-brand-hover text-white shadow-brand/20 scale-[1.01]" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            )}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2.5 h-4 w-4 animate-spin" />
                Menganalisis...
              </>
            ) : file ? (
              <>
                <Play className="mr-2.5 h-4 w-4 fill-current" />
                Mulai Analisis Sekarang
              </>
            ) : (
              "Pilih File Untuk Memulai"
            )}
          </Button>
          
          {file && !isAnalyzing && (
            <p className="text-center text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
              <Music className="w-3 h-3" />
              Estimasi waktu proses: 5-10 detik per menit audio
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
