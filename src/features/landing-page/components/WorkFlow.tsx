import WorkFlowItem from "./WorkFlowItem";

export default function WorkFlow() {
  return (
    <ol className="relative md:flex md:flex-col md:items-center">
      {/* Vertical timeline line - visible on all screens */}
      <div className="absolute left-5 md:left-1/2 w-1 h-full bg-gradient-to-b from-brand via-brand-secondary to-brand/20 rounded-full transform md:-translate-x-1/2" />

      <WorkFlowItem
        position="left"
        date="Tahap 01"
        title="Perekaman Input"
        subTitle="Pengumpulan Data Multimedia"
        description="Mahasiswa merekam refleksi lisan melalui peramban, kemudian sistem mengumpulkan dan menyiapkan data audio untuk dianalisis."
      />
      <WorkFlowItem
        position="right"
        date="Tahap 02"
        title="Analisis Multimodal"
        subTitle="Pemrosesan Berbasis AI"
        description="AI memproses audio melalui speech-to-text (Whisper), mengekstrak fitur akustik (MFCC), dan mengklasifikasikan motivasi menggunakan model multimodal."
      />
      <WorkFlowItem
        position="left"
        date="Tahap 03"
        title="Wawasan Motivasi"
        subTitle="Laporan Analitik"
        description="Skor motivasi, tingkat kepercayaan, metrik akustik, dan transkripsi teks disajikan dalam dashboard untuk dosen mengevaluasi keterlibatan mahasiswa."
      />
    </ol>
  );
}
