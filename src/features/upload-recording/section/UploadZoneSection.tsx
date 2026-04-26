"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Play, FileAudio, X, Music } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UploadZoneSection() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [waveformHeights, setWaveformHeights] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    const heights = Array.from(
      { length: 40 },
      () => Math.floor(Math.random() * 70) + 30
    );
    setWaveformHeights(heights);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Card className="w-full border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand via-brand-accent to-brand-secondary" />
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold tracking-tight text-brand-secondary dark:text-white">
            Panel Unggah Rekaman
          </CardTitle>
          <Badge variant="outline" className="border-brand/30 text-brand font-medium">
            Sistem Cerdas v1.0
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        {/* UPLOAD ZONE */}
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            "relative group border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ease-in-out",
            isDragging 
              ? "border-brand bg-brand/5 scale-[1.02]" 
              : "border-slate-200 dark:border-slate-800 hover:border-brand/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50",
            file && "border-brand/50 bg-brand/5"
          )}
        >
          <Input
            type="file"
            ref={fileRef}
            onChange={handleFile}
            className="hidden"
            accept=".wav,.mp3,.ogg,.flac"
          />

          {!file ? (
            <div className="space-y-4">
              <div className="mx-auto w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <UploadCloud className="w-10 h-10 text-brand" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  Tarik & Letakkan Berkas Audio
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Mendukung format WAV, MP3, OGG, dan FLAC
                </p>
              </div>
              <div className="flex justify-center gap-2 pt-2">
                {['WAV', 'MP3', 'OGG', 'FLAC'].map((ext) => (
                  <span key={ext} className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                    {ext}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative z-10 py-4">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
                  <FileAudio className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-slate-800 dark:text-white truncate max-w-[300px]">
                    {file.name}
                  </p>
                  <p className="text-sm text-brand font-medium">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Siap Dianalisis
                  </p>
                </div>
                
                {/* WAVEFORM ANIMATION */}
                <div className="flex items-end justify-center gap-[3px] h-16 w-full max-w-md mx-auto mt-4 px-8">
                  {waveformHeights.map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 min-w-[2px] bg-brand/40 rounded-full transition-all duration-500"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: i % 3 === 0 ? 'var(--color-brand)' : undefined,
                        opacity: 0.4 + (height / 100) * 0.6
                      }}
                    />
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={removeFile}
                  className="mt-2 text-slate-400 hover:text-red-500 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Ganti File
                </Button>
              </div>
            </div>
          )}
          
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10" />
        </div>

        {/* ACTIONS */}
        <div className="pt-2">
          <Button 
            disabled={!file}
            className={cn(
              "w-full h-14 text-lg font-bold rounded-2xl transition-all duration-300 shadow-xl",
              file 
                ? "bg-brand hover:bg-brand-hover text-white shadow-brand/20 scale-[1.01]" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            )}
          >
            {file ? (
              <>
                <Play className="mr-3 h-6 w-6 fill-current" />
                Mulai Analisis Sekarang
              </>
            ) : (
              "Pilih File Untuk Memulai"
            )}
          </Button>
          
          {file && (
            <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
              <Music className="w-3 h-3" />
              Estimasi waktu proses: 5-10 detik per menit audio
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
