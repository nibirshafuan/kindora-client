import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { StatisticsSection } from "@/components/statistics-section";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <StatisticsSection />
      </main>
    </>
  );
}
