import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// You can match these with the ones in ServicesSection or move to a shared file
const servicesContent: Record<string, { title: string, desc: string, longDesc: string }> = {
  "ai-powered-app-development": {
    title: "AI-Powered App Development",
    desc: "Custom mobile solutions driven by artificial intelligence.",
    longDesc: "Transform your business with intelligent, learning-capable mobile apps. We leverage AI to create personalized user experiences, automated processes, and data-driven insights tailored for the Kerala and broader Indian market."
  },
  "ai-enhanced-web-development": {
    title: "AI-Enhanced Web Development",
    desc: "Modern websites built with cutting-edge AI technology.",
    longDesc: "Build lightning-fast, highly converting websites that utilize AI for everything from dynamic content personalization to automated A/B testing and intelligent chat integrations."
  },
  "smart-branding-solutions": {
    title: "Smart Branding Solutions",
    desc: "Identity systems that resonate and scale with your business.",
    longDesc: "Create a memorable identity that sets you apart in the competitive Indian and global markets. We use data-driven insights and AI-assisted design to craft compelling narratives and visuals."
  },
  "ai-powered-digital-marketing": {
    title: "AI-Powered Digital Marketing",
    desc: "Intelligent campaigns that optimize themselves in real-time.",
    longDesc: "Maximize your ROI with marketing campaigns that learn and adapt. We use machine learning algorithms to hyper-target audiences, optimize bids, and generate customized ad creatives."
  },
  "intelligent-erp-crm-systems": {
    title: "Intelligent ERP & CRM Systems",
    desc: "Streamline operations with AI-enhanced business tools.",
    longDesc: "Enhance your operational efficiency with customized ERP and CRM solutions that predict customer needs, automate routine tasks, and provide actionable business intelligence."
  },
  "advanced-ai-agents-automation": {
    title: "Advanced AI Agents & Automation",
    desc: "Automate workflows with intelligent AI-powered agents.",
    longDesc: "Deploy sophisticated AI agents to handle customer service, automate complex workflows, and operate your digital infrastructure 24/7 without human intervention."
  },
  "ecommerce-development-marketing": {
    title: "Ecommerce Development & Marketing",
    desc: "Full-funnel strategies to scale your online store revenue.",
    longDesc: "Build and scale profitable ecommerce platforms with advanced product recommendation engines, dynamic pricing algorithms, and conversion-optimized store designs."
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    desc: "Beautiful, intuitive interfaces that delight users and drive conversions.",
    longDesc: "Design intuitive interfaces backed by user behavior analytics. Our designs prioritize ease-of-use and aesthetic appeal to significantly improve user retention and conversion rates."
  },
  "video-editing-production": {
    title: "Video Editing & Production",
    desc: "Professional video content that captivates and tells your brand story.",
    longDesc: "Create captivating visual stories that cut through the noise. From short-form content to detailed corporate explainers, our video production leverages AI for faster turnaround and enhanced visual effects."
  }
};

const ServiceDetails = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();
  
  const service = serviceSlug ? servicesContent[serviceSlug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-display font-bold text-zinc-100 mb-4">Service Not Found</h1>
        <button onClick={() => navigate('/')} className="btn-primary">Return Home</button>
      </div>
    );
  }

  // Generate localized SEO content
  const seoTitle = `${service.title} Agency in Kerala, India | CrevionAds`;
  const seoDesc = `Leading ${service.title} services mainly focusing on businesses in Kerala and across India. ${service.desc} Contact CrevionAds today.`;

  return (
    <div className="min-h-screen bg-background pt-24">
      <SEO title={seoTitle} description={seoDesc} />
      <Navbar />
      
      {/* Dynamic Animated Tech Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Animation elements */}
        <div className="absolute inset-0 z-0">
           {/* Replace this with dynamic glowing/node effect CSS if desired, keeping simple glow for now */}
           <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-background to-brand-secondary/10" />
           {/* Abstract Nodes/Lines simulation */}
           <motion.div 
             animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
             transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
             className="absolute inset-0 opacity-30"
             style={{
               backgroundImage: "radial-gradient(circle at center, #F4CE41 1px, transparent 1px)",
               backgroundSize: "40px 40px"
             }}
           />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center text-zinc-400 hover:text-brand-accent transition-colors mb-8 group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 mb-6"
            >
              {service.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-brand-accent max-w-2xl mx-auto mb-10"
            >
               {service.desc}
            </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24 px-4 sm:px-6 z-10 relative">
        <div className="max-w-3xl mx-auto">
           <div className="glass-card p-8 md:p-12 mb-12">
             <h2 className="text-2xl font-display font-bold text-zinc-100 mb-6 border-b border-white/10 pb-4">About this service</h2>
             <p className="text-zinc-300 leading-relaxed text-lg">
               {service.longDesc}
             </p>
           </div>
           
           <div className="text-center pb-20">
             <a href="https://wa.me/918113908262" target="_blank" rel="noopener noreferrer" className="btn-primary text-lg !px-10 !py-4">
               Get a Free Consultation
             </a>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
