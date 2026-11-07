import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { StatisticsSection } from "@/components/statistics-section";
import { FeaturesSection } from "@/components/features-section";
import { RecentEventsSection } from "@/components/recent-events-section";
import { PastEventsSection } from "@/components/past-events-section";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <StatisticsSection />
        <FeaturesSection />
        <RecentEventsSection />
        <PastEventsSection />
      </main>
    </>
  );
}
