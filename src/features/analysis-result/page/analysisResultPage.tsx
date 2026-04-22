"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import TopStatsSection from "../section/TopStatsSection";
import AnalysisGridSection from "../section/AnalysisGridSection";

export default function AnalysisResultPage() {
  return (
    <section className="p-6 space-y-6 w-full min-h-screen">
      {/* HEADER */}
      <PageHeader
        title="Hasil Analisis Motivasi"
        description="rekaman_andi_apr2026.wav · Dianalisis 19 Apr 2026"
        actions={
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Upload Baru
          </Button>
        }
      />

      {/* ALERT */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="flex items-center gap-2 text-sm py-3">
          <span className="text-green-600 font-medium">✓</span>
          Analisis berhasil! Rekaman suara Anda telah diproses menggunakan MFCC
          dan Speech-to-Text.
        </CardContent>
      </Card>

      <TopStatsSection />
      <AnalysisGridSection />
    </section>
  );
}
