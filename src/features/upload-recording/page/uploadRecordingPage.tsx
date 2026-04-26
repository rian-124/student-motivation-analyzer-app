"use client";

import PageHeader from "@/components/common/PageHeader";
import UploadZoneSection from "../section/UploadZoneSection";
import UploadGuideSection from "../section/UploadGuideSection";

export default function UploadRecordingPage() {
  return (
    <section className="p-6 lg:p-10 space-y-8 w-full min-h-screen bg-slate-50/30 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto space-y-8">
        <PageHeader
          title="Upload Rekaman Suara"
          description="Analisis fitur akustik (MFCC) dan teks (STT) untuk menentukan tingkat motivasi siswa."
        />

        <div className="space-y-8">
          <UploadZoneSection />
          <UploadGuideSection />
        </div>
      </div>
    </section>
  );
}