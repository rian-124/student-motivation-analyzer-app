"use client";

import PageHeader from "@/components/common/PageHeader";
import UploadZoneSection from "../section/UploadZoneSection";
import UploadGuideSection from "../section/UploadGuideSection";

export default function UploadRecordingPage() {
  return (
    <section className="p-6 space-y-6 w-full min-h-screen">
      <PageHeader
        title="Upload Rekaman Suara"
        description="Upload file rekaman untuk dianalisis tingkat motivasinya"
      />

      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <UploadZoneSection />
          <UploadGuideSection />
        </div>
      </div>
    </section>
  );
}