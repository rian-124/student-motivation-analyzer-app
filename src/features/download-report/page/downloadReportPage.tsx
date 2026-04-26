"use client";

import PageHeader from "@/components/common/PageHeader";
import ReportConfigSection from "../section/ReportConfigSection";
import ReportHistorySection from "../section/ReportHistorySection";

export default function DownloadReportPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Pusat Laporan Analisis"
        description="Konfigurasi dan unduh dokumen hasil analisis motivasi mahasiswa dalam berbagai format."
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-5">
          <ReportConfigSection />
        </div>
        <div className="xl:col-span-7">
          <ReportHistorySection />
        </div>
      </div>
    </div>
  );
}