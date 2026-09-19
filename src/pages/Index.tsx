import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { HowIWorkSection } from "@/components/HowIWorkSection";
import { EnterpriseSection } from "@/components/EnterpriseSection";
import { InnovationSection } from "@/components/InnovationSection";
import { VisualSection } from "@/components/VisualSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowIWorkSection />
      <EnterpriseSection />
      <InnovationSection />
      <VisualSection />
    </Layout>
  );
};

export default Index;
