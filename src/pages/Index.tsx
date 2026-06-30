import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ClientsTrustSection } from "@/components/ClientsTrustSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";

import { BlogSection } from "@/components/BlogSection";
import { ClientsSection } from "@/components/ClientsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEO
        title="Leading Web & AI Development Agency in Kerala, India | CrevionAds"
        description="CrevionAds is the premier digital marketing, AI app development, and Web Design agency mainly focusing in India, Kerala. We build performance-driven solutions."
      />
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <ClientsTrustSection />
      <WhyChooseSection />

      <BlogSection />
      <ClientsSection />
      <TestimonialsSection />
      <MarqueeStrip />
      <Footer />
    </div>
  );
};

export default Index;
