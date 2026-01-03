import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { OperationsSection } from "@/components/OperationsSection";
import { VisualSection } from "@/components/VisualSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HeroSection />
        
        {/* Section divider */}
        <div className="section-divider" />
        
        <EnterpriseSection />
        
        {/* Section divider */}
        <div className="section-divider" />
        
        <OperationsSection />
        
        {/* Section divider */}
        <div className="section-divider" />
        
        <VisualSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
