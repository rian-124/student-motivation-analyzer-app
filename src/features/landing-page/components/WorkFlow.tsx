"use client";

import WorkFlowItem from "./WorkFlowItem";

export default function WorkFlow() {
  return (
    <ol className="relative md:flex md:flex-col md:items-center">
      {/* Garis vertikal dengan gradient */}
      <div className="absolute left-4 md:left-1/2 w-1 h-full bg-gradient-to-b from-brand via-brand-secondary to-brand/20 rounded-full transform md:-translate-x-1/2 hidden md:block" />
      
      <WorkFlowItem
        position="left"
        date="Tahap 01"
        title="Perekaman Input"
        subTitle="Pengumpulan Data Multimedia"
        description="Sistem mengumpulkan rekaman audio dan video dari sesi kelas untuk menangkap isyarat verbal dan non-verbal."
      />
      <WorkFlowItem
        position="right"
        date="Tahap 02"
        title="Analisis Multimodal"
        subTitle="Pemrosesan Berbasis AI"
        description="Mesin AI kami memproses rekaman, menganalisis sentimen, ekspresi wajah, dan tingkat keterlibatan secara bersamaan."
      />
      <WorkFlowItem
        position="left"
        date="Tahap 03"
        title="Wawasan Motivasi"
        subTitle="Laporan Analitik"
        description="Analitik terperinci dan skor motivasi dihasilkan, memberikan wawasan yang jelas bagi dosen tentang tingkat keterlibatan mahasiswa."
      />
    </ol>
  );
}
