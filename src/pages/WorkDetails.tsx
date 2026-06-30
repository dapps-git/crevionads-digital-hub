import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkById } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { ArrowLeft, Globe } from "lucide-react";

const WorkDetails = () => {
  const { workId } = useParams();

  const { data: work, isLoading, error } = useQuery({
    queryKey: ['work', workId],
    queryFn: () => fetchWorkById(workId as string),
    enabled: !!workId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-400 text-sm font-medium">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !work) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-display font-bold text-zinc-100 mb-4">Project Not Found</h1>
        <button onClick={() => window.history.back()} className="btn-primary">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-purple-500/30 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-purple-900/5 rounded-full blur-[100px]" />
      </div>

      <SEO
        title={`${work.title} - Work Portfolio | CrevionAds`}
        description={work.description || `View details of ${work.title} created by CrevionAds`}
      />
      <Navbar />

      <main className="pt-24 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-amber-400 transition-all duration-300 group text-xs font-semibold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Compact Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30 text-purple-400 text-[9px] font-bold uppercase tracking-widest">
              {work.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight max-w-3xl mx-auto">
              {work.title}
            </h1>
            {work.description && (
              <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
                {work.description}
              </p>
            )}
            {work.link && (
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-[#F4CE45] hover:bg-[#ffe374] text-[#05030A] font-bold text-xs rounded-full hover:scale-102 transition-all duration-300 shadow-lg shadow-amber-500/10"
              >
                <Globe size={14} />
                Visit Live Project
              </a>
            )}
          </motion.div>
        </div>

        {/* Features Sections */}
        <div className="space-y-12 md:space-y-16 mt-12">
          {work.laptopImage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              <div className="md:col-span-5 space-y-4 order-2 md:order-1">
                <div className="inline-flex items-center gap-2 text-purple-400">
                  <div className="w-6 h-[1px] bg-purple-500/50" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Desktop Experience</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight">
                  Seamless <span className="text-amber-400">Desktop</span> Layout
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                  A high-resolution interface designed for maximum engagement. We focus on crisp typography, intuitive navigation, and performance that scales with your screen.
                </p>
              </div>
              <div className="md:col-span-7 order-1 md:order-2">
                <div className="relative group max-w-lg mx-auto md:mr-0">
                  <div className="absolute -inset-4 bg-purple-500/5 rounded-[2rem] blur-xl group-hover:bg-purple-500/10 transition-colors duration-500" />
                  <div className="relative rounded-xl overflow-hidden bg-white/[0.02] p-1.5 border border-white/5 shadow-2xl backdrop-blur-sm">
                    <img
                      src={work.laptopImage}
                      alt={`${work.title} Desktop View`}
                      className="w-full h-auto rounded-lg transform group-hover:scale-[1.01] transition-transform duration-700"
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
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              <div className="md:col-span-5 flex justify-center md:justify-start">
                <div className="relative group max-w-[160px] w-full">
                  <div className="absolute -inset-6 bg-amber-400/5 rounded-full blur-3xl group-hover:bg-amber-400/10 transition-colors duration-500" />
                  <div className="relative rounded-[2rem] overflow-hidden bg-zinc-950 p-1.5 border-[4px] border-zinc-900 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
                    <img
                      src={work.mobileImage}
                      alt={`${work.title} Mobile View`}
                      className="w-full h-auto rounded-[1.5rem]"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-purple-400">
                  <div className="w-6 h-[1px] bg-purple-500/50" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Mobile First</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight">
                  Adaptive Design for <br /><span className="text-amber-400">On-The-Go Users</span>
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
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
                <div className="absolute -inset-4 bg-purple-500/5 rounded-[2rem] blur-xl" />
                <div className="relative rounded-xl overflow-hidden bg-white/[0.02] p-1.5 border border-white/5 shadow-2xl">
                  <img
                    src={work.image}
                    alt={`${work.title}`}
                    className="w-full h-auto rounded-lg"
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
