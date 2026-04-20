"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, Mic } from "lucide-react";

export default function AnalysisResults() {
  return (
    <section className="p-6 space-y-6 w-full min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold">Hasil Analisis Motivasi</h1>
          <p className="text-sm text-muted-foreground">
            rekaman_andi_apr2026.wav · Dianalisis 19 Apr 2026
          </p>
        </div>

        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Upload Baru
        </Button>
      </div>

      {/* ALERT */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="flex items-center gap-2 text-sm py-3">
          <span className="text-green-600 font-medium">✓</span>
          Analisis berhasil! Rekaman suara Anda telah diproses menggunakan MFCC
          dan Speech-to-Text.
        </CardContent>
      </Card>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* MAIN SCORE */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Motivasi Tinggi</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">87.4</span>
              <span className="text-green-600 text-sm">/100</span>
            </div>

            <p className="text-sm text-muted-foreground">
              Berdasarkan MFCC dan Speech-to-Text, tingkat motivasi Anda berada
              pada kategori{" "}
              <span className="font-semibold text-foreground">Tinggi</span>.
            </p>
          </CardContent>
        </Card>

        {/* MFCC SCORE */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
            {/* ICON */}
            <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-teal-500" />
            </div>

            {/* SCORE */}
            <div className="text-3xl font-semibold">92.1</div>

            {/* LABEL */}
            <p className="text-sm text-muted-foreground">
              Skor MFCC Processing
            </p>
          </CardContent>
        </Card>

        {/* SPEECH TO TEXT SCORE */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
            {/* ICON */}
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Mic className="w-5 h-5 text-indigo-500" />
            </div>

            {/* SCORE */}
            <div className="text-3xl font-semibold">83.7</div>

            {/* LABEL */}
            <p className="text-sm text-muted-foreground">Skor Speech-to-Text</p>
          </CardContent>
        </Card>
      </div>

      {/* ANALYSIS GRID */}
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
                <span className="text-green-500">91%</span>
              </div>
              <Progress value={91} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Kecepatan Bicara</span>
                <span className="text-blue-500">78%</span>
              </div>
              <Progress value={78} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Variasi Nada</span>
                <span className="text-teal-500">85%</span>
              </div>
              <Progress value={85} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Kelancaran Bicara</span>
                <span className="text-green-500">88%</span>
              </div>
              <Progress value={88} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Kejelasan Artikulasi</span>
                <span className="text-indigo-500">94%</span>
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
    </section>
  );
}
