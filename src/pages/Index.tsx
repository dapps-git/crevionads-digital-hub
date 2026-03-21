import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { ITSolutionsSection } from "@/components/ITSolutionsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ClientsSection } from "@/components/ClientsSection";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar /> 
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <WhyChooseSection />
      <ITSolutionsSection />
      <PortfolioSection />
      <ClientsSection />
      <MarqueeStrip />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
