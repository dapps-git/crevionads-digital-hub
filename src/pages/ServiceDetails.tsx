import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchServiceBySlug } from "@/lib/api";

const ServiceDetails = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();
  
  const { data: service, isLoading, error } = useQuery({
    queryKey: ['service', serviceSlug],
    queryFn: () => fetchServiceBySlug(serviceSlug || ''),
    enabled: !!serviceSlug,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-zinc-400 text-xl">Loading service details...</div>;

  if (!service || error) {
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
           <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-background to-brand-secondary/10" />
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
             <p className="text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
               {service.detailedContent || service.desc}
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
