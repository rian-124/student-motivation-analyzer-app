"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { MotivationAnalysis } from "@/lib/types/motivation-analysis.type";
import { cn } from "@/lib/utils";
import { motivationAnalysisService } from "@/services/motivation-analysis.service";
import { useAuthStore } from "@/store/auth.store";
import {
  FileAudio,
  Loader2,
  Mic,
  Music,
  Play,
  Square,
  UploadCloud,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UploadZoneSectionProps {
  onSuccess?: (result: MotivationAnalysis) => void;
}

interface UploadAnalysisError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const mergeAudioBuffers = (buffers: Float32Array[]) => {
  const totalLength = buffers.reduce(
    (total, buffer) => total + buffer.length,
    0,
  );
  const merged = new Float32Array(totalLength);
  let offset = 0;

  for (const buffer of buffers) {
    merged.set(buffer, offset);
    offset += buffer.length;
  }

  return merged;
};

const encodeWav = (samples: Float32Array, sampleRate: number) => {
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample;
  const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  const view = new DataView(buffer);

  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i += 1) {
      view.setUint8(offset + i, value.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, samples.length * bytesPerSample, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += bytesPerSample;
  }

  return new Blob([view], { type: "audio/wav" });
};

export default function UploadZoneSection({
  onSuccess,
}: UploadZoneSectionProps) {
  const { user } = useAuthStore();

  const fileRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recordedBuffersRef = useRef<Float32Array[]>([]);
  const recordingSampleRateRef = useRef(44100);

  const [file, setFile] = useState<File | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [waveformBars, setWaveformBars] = useState<
    Array<{ id: string; height: number }>
  >([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  useEffect(() => {
    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
      stopRecorderResources();
    };
  }, [audioPreviewUrl]);

  const stopRecorderResources = () => {
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }

    if (audioProcessorRef.current) {
      audioProcessorRef.current.disconnect();
      audioProcessorRef.current.onaudioprocess = null;
      audioProcessorRef.current = null;
    }

    if (audioSourceRef.current) {
      audioSourceRef.current.disconnect();
      audioSourceRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => undefined);
      audioContextRef.current = null;
    }

    if (mediaStreamRef.current) {
      for (const track of mediaStreamRef.current.getTracks()) {
        track.stop();
      }
      mediaStreamRef.current = null;
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    const validTypes = ["audio/wav", "audio/mpeg", "audio/ogg", "audio/flac"];
    const validExtensions = [".wav", ".mp3", ".ogg", ".flac"];

    const isValidType =
      validTypes.includes(selectedFile.type) ||
      validExtensions.some((ext) =>
        selectedFile.name.toLowerCase().endsWith(ext),
      );

    if (!isValidType) {
      toast.error("Format Berkas Tidak Valid", {
        description:
          "Harap unggah berkas dengan format WAV, MP3, OGG, atau FLAC.",
      });
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error("Ukuran Berkas Terlalu Besar", {
        description: "Maksimal ukuran berkas yang diizinkan adalah 50MB.",
      });
      return;
    }

    setFile(selectedFile);
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
    }
    setAudioPreviewUrl(URL.createObjectURL(selectedFile));
    const bars = Array.from({ length: 30 }, (_, index) => ({
      id: `wave-${index + 1}`,
      height: Math.floor(Math.random() * 70) + 30,
    }));
    setWaveformBars(bars);
  };

  const startLiveRecording = async () => {
    if (isAnalyzing || isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioWindow = window as Window &
        typeof globalThis & { webkitAudioContext?: typeof AudioContext };
      const AudioContextConstructor =
        audioWindow.AudioContext || audioWindow.webkitAudioContext;
      if (!AudioContextConstructor) {
        throw new Error("AudioContext is not supported");
      }
      const audioContext = new AudioContextConstructor();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      recordedBuffersRef.current = [];
      recordingSampleRateRef.current = audioContext.sampleRate;

      processor.onaudioprocess = (event) => {
        const channelData = event.inputBuffer.getChannelData(0);
        recordedBuffersRef.current.push(new Float32Array(channelData));
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      audioSourceRef.current = source;
      audioProcessorRef.current = processor;

      setRecordSeconds(0);
      setIsRecording(true);
      recordTimerRef.current = setInterval(() => {
        setRecordSeconds((prev) => prev + 1);
      }, 1000);

      toast.success("Perekaman Dimulai", {
        description: "Silakan bicara, lalu tekan Stop saat selesai.",
      });
    } catch (error) {
      toast.error("Gagal Akses Mikrofon", {
        description: "Pastikan izin mikrofon sudah diberikan di browser.",
      });
    }
  };

  const stopLiveRecording = () => {
    if (!isRecording) return;

    const samples = mergeAudioBuffers(recordedBuffersRef.current);
    if (samples.length === 0) {
      toast.error("Rekaman Kosong", {
        description: "Tidak ada audio yang terekam. Coba rekam ulang.",
      });
      setIsRecording(false);
      stopRecorderResources();
      return;
    }

    const blob = encodeWav(samples, recordingSampleRateRef.current);
    const recordedFile = new File([blob], `live-recording-${Date.now()}.wav`, {
      type: "audio/wav",
    });

    processFile(recordedFile);
    setIsRecording(false);
    stopRecorderResources();
  };

  const handleStartAnalysis = async () => {
    if (!file || !user?.student?.id) {
      if (!user?.student?.id) {
        toast.error("Profil Siswa Tidak Ditemukan", {
          description: "Harap hubungi admin jika ini adalah kesalahan.",
        });
      }
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep("Menyiapkan berkas...");

    try {
      setAnalysisStep("Mengunggah dan menganalisis berkas ke server...");

      const result = await motivationAnalysisService.uploadAndAnalyze({
        file,
        studentId: user.student.id,
      });

      toast.success("Analisis Selesai", {
        description: "Berkas berhasil diproses.",
      });

      onSuccess?.(result);

      setFile(null);
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
      setAudioPreviewUrl(null);
      setIsAnalyzing(false);
    } catch (error: unknown) {
      const analysisError = error as UploadAnalysisError;
      console.error("Analysis failed:", error);
      toast.error("Gagal Melakukan Analisis", {
        description:
          analysisError.response?.data?.message ||
          "Terjadi kesalahan pada server AI.",
      });
      setIsAnalyzing(false);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAnalyzing || isRecording) return;
    setFile(null);
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
    }
    setAudioPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isAnalyzing || isRecording) return;
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isAnalyzing || isRecording) return;
    if (e.dataTransfer.files?.[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const formatTime = (seconds: number) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <Card className="w-full border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand via-brand-accent to-brand-secondary" />

      <CardHeader className="pb-2 pt-5">
        <div className="flex items-center justify-between px-2">
          <CardTitle className="text-xl font-bold tracking-tight text-brand-secondary dark:text-white">
            Panel Unggah Rekaman
          </CardTitle>
          <Badge
            variant="outline"
            className="border-brand/20 text-brand font-medium text-[10px]"
          >
            Sistem Cerdas v1.0
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-2 pb-6 px-6">
        <div className="flex gap-2">
          <Button
            type="button"
            variant={isRecording ? "destructive" : "outline"}
            className="h-9 text-xs"
            onClick={isRecording ? stopLiveRecording : startLiveRecording}
            disabled={isAnalyzing}
          >
            {isRecording ? (
              <>
                <Square className="w-3.5 h-3.5 mr-1.5" />
                Stop Recording ({formatTime(recordSeconds)})
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 mr-1.5" />
                Live Recording
              </>
            )}
          </Button>
        </div>

        <label
          htmlFor={
            isAnalyzing || isRecording ? undefined : "analysis-upload-file"
          }
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn(
            "relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ease-in-out",
            isAnalyzing ? "cursor-wait opacity-80" : "cursor-pointer",
            isDragging
              ? "border-brand bg-brand/5 scale-[1.01]"
              : "border-slate-100 dark:border-slate-800 hover:border-brand/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/50",
            file && "border-brand/40 bg-brand/5",
          )}
        >
          <Input
            id="analysis-upload-file"
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
                  Mendukung format WAV, MP3, OGG, FLAC
                </p>
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
                    {(file.size / 1024 / 1024).toFixed(2)} MB - Siap Dianalisis
                  </p>
                </div>

                <div className="flex items-end justify-center gap-[2px] h-12 w-full max-w-xs mx-auto mt-2 px-6">
                  {waveformBars.map((bar, index) => (
                    <div
                      key={bar.id}
                      className="flex-1 min-w-[2px] bg-brand/40 rounded-full transition-all duration-500"
                      style={{
                        height: isAnalyzing
                          ? `${Math.random() * 80 + 20}%`
                          : `${bar.height}%`,
                        backgroundColor:
                          index % 3 === 0 ? "var(--color-brand)" : undefined,
                        opacity: 0.4 + (bar.height / 100) * 0.6,
                      }}
                    />
                  ))}
                </div>

                {audioPreviewUrl && (
                  <audio
                    controls
                    className="w-full max-w-xs mt-2"
                    src={audioPreviewUrl}
                  >
                    <track kind="captions" />
                  </audio>
                )}

                {!isAnalyzing && !isRecording && (
                  <button
                    type="button"
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

          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10" />
        </label>

        <div className="pt-1">
          <Button
            disabled={!file || isAnalyzing || isRecording}
            onClick={handleStartAnalysis}
            className={cn(
              "w-full h-12 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg",
              file && !isAnalyzing && !isRecording
                ? "bg-brand hover:bg-brand-hover text-white shadow-brand/20 scale-[1.01]"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed",
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
              "Pilih File Atau Rekam Dulu"
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
