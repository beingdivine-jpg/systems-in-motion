import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { HowIWorkSection } from "@/components/HowIWorkSection";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { InnovationSection } from "@/components/InnovationSection";
import { VisualSection } from "@/components/VisualSection";
import { TimelineSection } from "@/components/TimelineSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HeroSection />

        {/* Section divider */}
        <div className="section-divider" />

        <HowIWorkSection />

        {/* Section divider */}
        <div className="section-divider" />

        <EnterpriseSection />

        <InnovationSection />

        {/* Section divider */}
        <div className="section-divider" />

        <VisualSection />

        <TimelineSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
