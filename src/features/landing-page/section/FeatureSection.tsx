import CardFeature from "../components/CardFeature";


export default function FeatureSection() {
  return (
    <section className="w-full min-h-screen mt-30 mb-20">
      <div className="my-12 flex justify-between">
        <div className="w-[40rem] text-4xl font-bold ">
          <h1 className="text-brand-secondary">What do you get at</h1>
          <h1 className="text-brand">Student Motivation Analyze?</h1>
        </div>
        <div className="w-1/2 text-xs text-gray-500 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            voluptas neque blanditiis facilis. Autem blanditiis quaerat, et
            beatae quo unde corporis delectus quis voluptatibus. Sequi,
            molestias dicta? Pariatur architecto nihil repellat doloribus
            laborum placeat odit accusantium nam vitae neque illo ab sapiente
            minus ea iste enim unde, illum nisi incidunt?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <CardFeature
          title="Analisis Text (NLP)"
          description="Memahami emosi dan motivasi dari refleksi teks mahasiswa secara otomatis."
          imageSrc="/nlp.svg"
        />
        <CardFeature
          title="Analisis Audio (Speech Emotion Recognition)"
          description="Menganalisis emosi dari rekaman suara mahasiswa untuk wawasan lebih dalam."
          imageSrc="/audio.svg"
          className="col-span-2"
        />
        <CardFeature
          title="Practice Quizzes"
          description="Latihan soal untuk mengukur pemahaman dan kemampuan mahasiswa."
          imageSrc="/quizzes.svg"
        />
        <CardFeature
          title="Learning Materials"
          description="Materi pembelajaran yang disusun secara sistematis dan mudah dipahami."
          imageSrc="/materials.svg"
          className="col-span-2"
        />
        <CardFeature
          title="Personalized Feedback"
          description="Umpan balik yang disesuaikan untuk membantu mahasiswa meningkatkan motivasi mereka."
          imageSrc="/feedback.svg"
          className="col-span-2"
        />
      </div>
    </section>
  );
}
