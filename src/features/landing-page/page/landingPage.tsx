import FeatureSection from "../section/FeatureSection";
import FlowSystemSection from "../section/FlowSystemSection";
import HeroSection from "../section/HeroSection";
import StartNowSection from "../section/StartNowSection";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <div id="home">
        <HeroSection />
      </div>
      <div id="features">
        <FeatureSection />
      </div>
      <div id="flow">
        <FlowSystemSection />
      </div>
      <div id="contact">
        <StartNowSection />
      </div>
    </main>
  );
}
