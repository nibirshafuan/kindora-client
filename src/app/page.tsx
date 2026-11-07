import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { StatisticsSection } from "@/components/statistics-section";
import { FeaturesSection } from "@/components/features-section";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <StatisticsSection />
        <FeaturesSection />
      </main>
    </>
  );
}
