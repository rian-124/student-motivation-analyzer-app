"use client";

import { Button } from "@/components/ui/button";
import { FileDown, Filter } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import HistoryTableSection from "../section/HistoryTableSection";

export default function AnalysisResultsPage() {
  return (
    <section className="p-6 lg:p-8 space-y-6 w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader
          title="Database Hasil Analisis"
          description="Daftar riwayat analisis motivasi mahasiswa untuk kebutuhan manajemen data."
          actions={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm" className="bg-brand hover:bg-brand/90 text-white rounded-lg shadow-sm">
                <FileDown className="w-4 h-4 mr-2" />
                Ekspor Data
              </Button>
            </div>
          }
        />

        <div className="w-full">
          <HistoryTableSection />
        </div>
      </div>
    </section>
  );
}