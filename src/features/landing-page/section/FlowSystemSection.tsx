import WorkFlow from "../components/WorkFlow";

export default function FlowSystemSection() {
  return (
    <section className="w-full min-h-screen py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-brand/10 blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-secondary/10 blur-[150px] rounded-full translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-sm font-bold tracking-wider uppercase mb-4">
            Proses Penelitian
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            <span className="text-brand">Alur</span>{" "}
            <span className="text-brand-secondary">Sistem</span>
          </h2>
          <p className="max-w-2xl mx-auto text-brand-secondary/60 text-lg font-medium">
            Pelajari bagaimana sistem kami menganalisis dan melacak motivasi mahasiswa melalui pendekatan multimodal yang terintegrasi.
          </p>
        </div>
        
        <WorkFlow />
      </div>
    </section>
  );
}
