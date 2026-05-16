import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkById } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const WorkDetails = () => {
  const { workId } = useParams();

  const { data: work, isLoading, error } = useQuery({
    queryKey: ['work', workId],
    queryFn: () => fetchWorkById(workId as string),
    enabled: !!workId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-zinc-400">Loading project...</div>
      </div>
    );
  }

  if (error || !work) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-red-500">Error loading project or project not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-primary/30 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <SEO
        title={`${work.title} - Work Portfolio | CrevionAds`}
        description={work.description || `View details of ${work.title} created by CrevionAds`}
      />
      <Navbar />

      <main className="pt-24 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-brand-primary transition-all duration-300 group">
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Showcase</span>
          </Link>
        </div>

        {/* Compact Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
              {work.category}
            </span>
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font text-white mb-6 tracking-tight leading-[1.1]">
              {work.title}
            </h1>
            {work.description && (
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
                {work.description}
              </p>
            )}
            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-8 px-8 py-3 bg-brand-primary text-white text-xs font-bold rounded-full hover:bg-brand-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-brand-primary/20"
              >
                Visit Live Project
              </a>
            )}
          </motion.div>
        </div>

        {/* Features Sections - More Compact */}
        <div className="space-y-16 md:space-y-24 mt-12">
          {work.laptopImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center"
            >
              <div className="md:col-span-5 space-y-5 order-2 md:order-1">
                <div className="inline-flex items-center gap-2 text-brand-primary">
                  <div className="w-8 h-[1px] bg-brand-primary/50" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Desktop Experience</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white leading-tight">
                  Seamless <span className="text-brand-primary">Desktop</span> Layout
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                  A high-resolution interface designed for maximum engagement. We focus on crisp typography, intuitive navigation, and performance that scales with your screen.
                </p>
              </div>
              <div className="md:col-span-7 order-1 md:order-2">
                <div className="relative group max-w-lg mx-auto md:mr-0">
                  <div className="absolute -inset-4 bg-brand-primary/10 rounded-[2rem] blur-2xl group-hover:bg-brand-primary/20 transition-colors duration-500" />
                  <div className="relative rounded-2xl overflow-hidden glass-card p-2 border border-white/10 shadow-2xl backdrop-blur-sm">
                    <img
                      src={work.laptopImage}
                      alt={`${work.title} Desktop View`}
                      className="w-full h-auto rounded-xl transform group-hover:scale-[1.01] transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {work.mobileImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center"
            >
              <div className="md:col-span-5 flex justify-center md:justify-start">
                <div className="relative group max-w-[180px] w-full">
                  <div className="absolute -inset-6 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-500" />
                  <div className="relative rounded-[2.5rem] overflow-hidden glass-card p-1.5 border-[6px] border-zinc-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] bg-zinc-950">
                    <img
                      src={work.mobileImage}
                      alt={`${work.title} Mobile View`}
                      className="w-full h-auto rounded-[2rem]"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 text-brand-primary">
                  <div className="w-8 h-[1px] bg-brand-primary/50" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Mobile First</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white leading-tight">
                  Adaptive Design for <br /><span className="text-brand-primary">On-The-Go Users</span>
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                  Touch-optimized and lightning fast. Every pixel is considered to ensure your brand feels premium and functional, no matter the device size.
                </p>
              </div>
            </motion.div>
          )}

          {(!work.laptopImage && !work.mobileImage && work.image) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-xl group">
                <div className="absolute -inset-4 bg-brand-primary/5 rounded-[2rem] blur-xl" />
                <div className="relative rounded-2xl overflow-hidden glass-card p-2 border border-white/5 shadow-2xl">
                  <img
                    src={work.image}
                    alt={`${work.title}`}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorkDetails;
