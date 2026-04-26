import CardFeature from "../components/CardFeature";

export default function FeatureSection() {
  return (
    <section className="w-full py-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold tracking-widest uppercase">
              Modul Sistem
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              <span className="text-brand-secondary">Metodologi Utama untuk</span><br />
              <span className="bg-gradient-to-r from-brand to-indigo-600 bg-clip-text text-transparent">Analisis Keterlibatan.</span>
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p className="text-brand-secondary/60 text-lg font-medium leading-relaxed">
              Sistem ini memanfaatkan berbagai teknik pemrosesan data untuk mengklasifikasikan dan mengukur metrik keterlibatan mahasiswa melalui titik data multimodal.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardFeature
            title="Pemrosesan Bahasa Alami (NLP)"
            description="Analisis linguistik data teks untuk mengekstrak sentimen emosional dan mengidentifikasi indikator motivasi dari refleksi mahasiswa."
            imageSrc="/nlp.svg"
          />
          <CardFeature
            title="Pengenalan Emosi Suara (SER)"
            description="Analisis akustik menggunakan pembelajaran mesin untuk mendeteksi keadaan emosional dari karakteristik vokal dalam audio kelas."
            imageSrc="/audio.svg"
          />
          <CardFeature
            title="Mesin Integrasi Data"
            description="Mensintesis aliran data terpisah menjadi profil keterlibatan yang terpadu untuk memastikan reliabilitas analisis yang tinggi."
            imageSrc="/quizzes.svg"
          />
          <CardFeature
            title="Metrik Kuantitatif"
            description="Pembuatan skor keterlibatan objektif berdasarkan kombinasi isyarat perilaku dan linguistik yang dianalisis."
            imageSrc="/materials.svg"
            className="md:col-span-2 lg:col-span-1"
          />
          <CardFeature
            title="Pelaporan Analisis"
            description="Visualisasi mendetail dari tren motivasi mahasiswa untuk memberikan wawasan berbasis data bagi riset pendidikan."
            imageSrc="/feedback.svg"
            className="md:col-span-2 lg:col-span-2"
          />
        </div>
      </div>
    </section>
  );
}
