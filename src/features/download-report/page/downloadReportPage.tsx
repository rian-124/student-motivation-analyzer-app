"use client";

import PageHeader from "@/components/common/PageHeader";
import ReportConfigSection from "../section/ReportConfigSection";
import ReportHistorySection from "../section/ReportHistorySection";

export default function DownloadReportPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Unduh Laporan"
        description="Generate dan unduh laporan analisis motivasi mahasiswa"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportConfigSection />
        <ReportHistorySection />
      </div>
    </div>
  );
}