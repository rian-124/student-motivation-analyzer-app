"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Play } from "lucide-react";
import { useRef, useState } from "react";

export default function UploadRecording() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [waveformHeights, setWaveformHeights] = useState<number[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {

      setFile(e.target.files[0]);
      const heights = Array.from({ length: 30 }, () => 
        Math.floor(Math.random() * 80) + 20
      );setWaveformHeights(heights);
    }
  };

  return (
    <section className="p-6 space-y-6 w-full min-h-screen">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Upload Rekaman Suara</h1>
        <p className="text-sm text-muted-foreground">
          Upload file rekaman untuk dianalisis tingkat motivasinya
        </p>
      </div>

      {/* LAYOUT CONTAINER */}
      <div className="w-full flex flex-col lg:flex-row gap-6">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 min-w-0">
          
          {/* UPLOAD CARD */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Upload File Rekaman</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* UPLOAD ZONE */}
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted transition"
              >
                <Input
                  type="file"
                  ref={fileRef}
                  onChange={handleFile}
                  className="hidden"
                  accept=".wav,.mp3,.ogg,.flac"
                />

                <UploadCloud className="mx-auto mb-2" />

                <p className="font-medium">
                  Seret & lepas file audio di sini
                </p>

                <p className="text-xs text-muted-foreground">
                  atau klik untuk memilih file
                </p>

                <div className="flex justify-center gap-2 mt-3 text-xs">
                  <Badge variant="secondary">WAV</Badge>
                  <Badge variant="secondary">MP3</Badge>
                  <Badge variant="secondary">OGG</Badge>
                  <Badge variant="secondary">FLAC</Badge>
                </div>
              </div>

              {/* FILE PREVIEW */}
              {file && (
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Badge>Siap diproses</Badge>
                  </div>

                  {/* FAKE WAVEFORM */}
                  <div className="flex items-end gap-[2px] h-10">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[3px] bg-primary animate-pulse"
                        style={{ height: `${waveformHeights[i]}%` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* BUTTON */}
              <Button className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Mulai Analisis MFCC + Speech-to-Text
              </Button>
            </CardContent>
          </Card>

          {/* GUIDE */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Panduan Upload</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="flex gap-3">
                <Badge>1</Badge>
                <div>
                  <p className="font-semibold">Format & Kualitas</p>
                  <p className="text-muted-foreground">
                    Gunakan WAV minimal 16kHz untuk hasil terbaik
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Badge>2</Badge>
                <div>
                  <p className="font-semibold">Durasi Rekaman</p>
                  <p className="text-muted-foreground">
                    Optimal 30–120 detik
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Badge>3</Badge>
                <div>
                  <p className="font-semibold">Lingkungan</p>
                  <p className="text-muted-foreground">
                    Hindari noise berlebih
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}