"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import HistoryTableSection from "../section/HistoryTableSection";

export default function AnalysisResultsPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Semua Hasil Analisis"
        description="Riwayat analisis motivasi seluruh mahasiswa"
        actions={
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        }
      />
      <HistoryTableSection />
    </div>
  );
}