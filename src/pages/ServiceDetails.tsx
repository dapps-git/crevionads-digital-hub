import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchServiceBySlug, fetchWorks } from "@/lib/api";

// --- CUSTOM CSS MOCKUPS FOR VISUAL EXCLLENCE ---

const BrowserMockup = () => (
  <div className="relative w-full aspect-[16/10] bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl">
    {/* Browser Bar */}
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-white/5">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      <div className="h-4 w-40 sm:w-60 bg-white/5 rounded-full mx-auto flex items-center justify-center text-[8px] text-zinc-500 font-mono tracking-wider">
        https://crevionads.com/secure-portal
      </div>
    </div>
    {/* Code Rows */}
    <div className="p-6 font-mono text-[9px] sm:text-xs text-zinc-400 space-y-3 flex flex-col justify-center h-[calc(100%-40px)]">
      <div className="flex gap-2"><span className="text-zinc-600">01</span><span className="text-brand-primary">const</span><span>crevionApp = <span className="text-brand-accent">new</span> CrevionDigitalHub();</span></div>
      <div className="flex gap-2"><span className="text-zinc-600">02</span><span className="text-brand-primary">await</span><span>crevionApp.initialize(&#123;</span></div>
      <div className="flex gap-2"><span className="text-zinc-600">03</span><span className="pl-4 text-zinc-500">uxFocus:</span><span className="text-brand-accent">"absolute-perfection"</span><span>,</span></div>
      <div className="flex gap-2"><span className="text-zinc-600">04</span><span className="pl-4 text-zinc-500">performance:</span><span className="text-brand-accent">"light-speed"</span><span>,</span></div>
      <div className="flex gap-2"><span className="text-zinc-600">05</span><span className="pl-4 text-zinc-500">security:</span><span className="text-brand-accent">"military-grade"</span></div>
      <div className="flex gap-2"><span className="text-zinc-600">06</span><span>&#125;);</span></div>
      <div className="flex gap-2"><span className="text-zinc-600">07</span><span>crevionApp.scaleGlobalReach();</span></div>
      
      {/* Floating Status Card */}
      <div className="absolute bottom-4 right-4 p-3 glass-card border border-white/10 bg-[#0a0616]/80 flex items-center gap-3 rounded-xl shadow-lg">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        <div className="flex flex-col">
          <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">Server Status</span>
          <span className="text-[10px] font-bold text-white font-sans">99.98% Live SLA</span>
        </div>
      </div>
    </div>
  </div>
);

const DashboardMockup = () => (
  <div className="relative w-full aspect-[16/10] bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-4">
    <div className="flex justify-between items-center pb-3 border-b border-white/10">
      <span className="text-xs font-bold text-white font-sans">Real-time Analytics Core</span>
      <span className="text-[8px] bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Active</span>
    </div>
    <div className="grid grid-cols-3 gap-3">
      <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1">
        <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">Speed Score</span>
        <span className="text-xs sm:text-sm font-bold text-brand-accent font-sans">100/100</span>
      </div>
      <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1">
        <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">Accuracy</span>
        <span className="text-xs sm:text-sm font-bold text-green-400 font-sans">99.92%</span>
      </div>
      <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-1">
        <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-widest">Latency</span>
        <span className="text-xs sm:text-sm font-bold text-brand-primary font-sans">12ms</span>
      </div>
    </div>
    <div className="flex-grow flex items-end gap-2 pt-2">
      <div className="w-full bg-white/5 border border-white/5 rounded-t h-[40%] hover:bg-brand-primary/30 transition-colors" />
      <div className="w-full bg-white/5 border border-white/5 rounded-t h-[60%] hover:bg-brand-primary/30 transition-colors" />
      <div className="w-full bg-white/5 border border-white/5 rounded-t h-[50%] hover:bg-brand-primary/30 transition-colors" />
      <div className="w-full bg-white/5 border border-white/5 rounded-t h-[80%] hover:bg-brand-primary/30 transition-colors" />
      <div className="w-full bg-white/5 border border-white/5 rounded-t h-[95%] hover:bg-brand-primary/30 transition-colors" />
      <div className="w-full bg-white/5 border border-white/5 rounded-t h-[75%] hover:bg-brand-primary/30 transition-colors" />
    </div>
  </div>
);

const MarketingMockup = () => (
  <div className="relative w-full aspect-[16/10] bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-between gap-3">
    <div className="flex justify-between items-center pb-2 border-b border-white/10">
      <span className="text-xs font-bold text-white font-sans">Campaign ROAS & Metrics</span>
      <span className="text-[8px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-bold uppercase">ROI Audited</span>
    </div>
    <div className="flex-grow flex flex-col justify-center gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] text-zinc-400 font-mono font-bold w-1/3">Target Ads</span>
        <div className="w-1/2 h-2 bg-zinc-700 rounded-full overflow-hidden">
          <div className="h-full bg-brand-primary w-[85%]" />
        </div>
        <span className="text-[9px] text-brand-primary font-mono font-bold">85%</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] text-zinc-400 font-mono font-bold w-1/3">Organic SEO</span>
        <div className="w-1/2 h-2 bg-zinc-700 rounded-full overflow-hidden">
          <div className="h-full bg-brand-accent w-[75%]" />
        </div>
        <span className="text-[9px] text-brand-accent font-mono font-bold">75%</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[9px] text-zinc-400 font-mono font-bold w-1/3">Social Campaigns</span>
        <div className="w-1/2 h-2 bg-zinc-700 rounded-full overflow-hidden">
          <div className="h-full bg-green-400 w-[65%]" />
        </div>
        <span className="text-[9px] text-green-400 font-mono font-bold">65%</span>
      </div>
    </div>
    <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center mt-1">
      <span className="text-[8px] text-zinc-500 font-bold uppercase">Conversion Scaling</span>
      <span className="text-xs font-bold text-white font-sans">+340% Traffic Inbound</span>
    </div>
  </div>
);

const BrandingMockup = () => (
  <div className="relative w-full aspect-[16/10] bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl p-4 sm:p-6 flex flex-col gap-4 items-center justify-center">
    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 relative">
      <div className="absolute inset-2 rounded-full border border-dashed border-white/20 animate-spin" style={{ animationDuration: '20s' }} />
      <div className="text-white text-lg font-display font-extrabold uppercase tracking-tighter">C.</div>
    </div>
    <div className="text-center space-y-1 mt-2">
      <h4 className="text-xs font-bold text-white font-sans uppercase tracking-widest">Brand UI Framework</h4>
      <p className="text-[8px] text-zinc-500 font-medium">Inter Typography • Pure Geometry • Glass Architecture</p>
    </div>
  </div>
);

const PhoneMockup = () => (
  <div className="relative w-44 sm:w-52 aspect-[9/18] bg-black/90 rounded-[35px] border-[6px] border-zinc-800/80 overflow-hidden shadow-2xl flex flex-col p-4 gap-4">
    {/* Notch */}
    <div className="w-16 h-3.5 bg-zinc-800 rounded-full mx-auto mb-2 flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-black" />
    </div>
    {/* Inner Screen */}
    <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
      <span className="text-[5px] text-zinc-500 font-bold uppercase tracking-widest">Real-time Metrics</span>
      <span className="text-[8px] font-bold text-white font-sans">Inbound Growth</span>
      <span className="text-xs font-bold text-brand-primary font-sans">+18.24% ROI</span>
    </div>
    <div className="flex-grow flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-brand-accent/20 border-t-brand-accent flex items-center justify-center relative animate-spin" style={{ animationDuration: '4s' }}>
        <span className="text-[7px] font-bold text-white font-sans absolute">Secure App</span>
      </div>
    </div>
  </div>
);

// --- DYNAMIC CONTENT SERVICE RESOLUTION ---

const getServiceLayoutData = (slug: string, title: string) => {
  const s = slug.toLowerCase();
  
  if (s.includes('web')) {
    return {
      highlights: [
        { label: "Modern Frontend Stacks", desc: "Crafted with React, Next.js, and lightweight responsive architectures." },
        { label: "Core Web Vitals", desc: "Audited for speed, ensuring 95+ performance metrics on search consoles." },
        { label: "Mobile-First UX", desc: "Perfect scaling, fluid layouts, and tap targets across every screen." }
      ],
      subtitle: "End-to-End Premium Web Engineering",
      checklist1: [
        "Interactive component-driven React & Next.js architectures",
        "Highly-secure and optimized REST & GraphQL backend servers",
        "Modern Headless CMS integration & custom admin panels",
        "Fluid animations, CSS scroll triggers, & premium hover micro-actions"
      ],
      checklist2: [
        "Lightweight media rendering for blazing-fast mobile paint times",
        "Cloud-native hosting architectures & continuous deployment pipelines",
        "Rigorous automated testing across browsers & viewport breakpoints",
        "Comprehensive post-launch technical audits, support & upgrades"
      ],
      mockupType: "browser"
    };
  } else if (s.includes('ai') || s.includes('intelligence') || s.includes('artificial') || s.includes('software')) {
    return {
      highlights: [
        { label: "Intelligent Workflows", desc: "Automate repetitive tasks with predictive learning systems." },
        { label: "Agentic AI Bots", desc: "Custom chatbots, cognitive agents, & NLP retrieval loops." },
        { label: "ML Forecasting Models", desc: "Harness data structures to project trends & automate insights." }
      ],
      subtitle: "Revolutionize Operations with Cognitive Systems",
      checklist1: [
        "Custom LLM fine-tuning & vector data retrieval (RAG setup)",
        "Self-sufficient task automations & AI agent workflows",
        "Robust Natural Language Processing (NLP) classifiers",
        "State-of-the-art Computer Vision & intelligent parsing"
      ],
      checklist2: [
        "Scalable cloud API deployment & optimized model inferences",
        "Comprehensive real-time analytics data pipelines",
        "Highly-interactive UI charts & system process boards",
        "Enterprise-grade sandboxed data security & privacy controls"
      ],
      mockupType: "dashboard"
    };
  } else if (s.includes('marketing') || s.includes('digital') || s.includes('seo')) {
    return {
      highlights: [
        { label: "Targeted PPC Scaling", desc: "Facebook, Google, & LinkedIn ads calibrated for low CPL." },
        { label: "Search Dominance (SEO)", desc: "Elevate pages to Page 1 with structural indexing campaigns." },
        { label: "CRO Heatmap Metrics", desc: "A/B testing user flows to convert visitors into customers." }
      ],
      subtitle: "Calibrated Strategies to Scale Digital Footprints",
      checklist1: [
        "Comprehensive Search Engine Optimization (SEO) roadmap",
        "High-conversion digital copywriting & responsive landing pages",
        "Hyper-targeted demographics mapping & lookalike scaling",
        "Conversion Rate Optimization (CRO) A/B split setups"
      ],
      checklist2: [
        "Sleek monthly reporting metrics & automated progress panels",
        "Omni-channel marketing synchronization across social & web",
        "Engaging visual branding guidelines & marketing asset creations",
        "In-depth competitor auditing & search landscape profiling"
      ],
      mockupType: "marketing"
    };
  } else {
    // Default / Branding / Designing / UIUX
    return {
      highlights: [
        { label: "Iconic Identity Frameworks", desc: "Distinctive logo, typography, and color style systems." },
        { label: "Human-Centered Design", desc: "Interactive layout prototyping centered on user delight." },
        { label: "High-Fidelity Assets", desc: "Stunning custom graphics, layouts, and print vectors." }
      ],
      subtitle: "Crafting Distinctive Digital Identities",
      checklist1: [
        "Stunning geometric logo designs & responsive vectors",
        "Interactive high-fidelity Figma digital system layouts",
        "Cohesive brand colors, styling rules, & identity guides",
        "Premium vector assets & custom isometric UI graphics"
      ],
      checklist2: [
        "User-first UI/UX wireframing & structural prototypes",
        "Uniform visual consistency across digital & physical collateral",
        "Rapid style adjustments validated by direct client feedback",
        "Perfect visual alignment, typography scales, & custom spacing"
      ],
      mockupType: "branding"
    };
  }
};

const ServiceDetails = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();
  
  const { data: service, isLoading, error } = useQuery({
    queryKey: ['service', serviceSlug],
    queryFn: () => fetchServiceBySlug(serviceSlug || ''),
    enabled: !!serviceSlug,
  });

  const { data: works } = useQuery({
    queryKey: ['works'],
    queryFn: fetchWorks,
  });

  const matchingWorks = works?.filter(
    (w: any) => w.category?.toLowerCase() === service?.title?.toLowerCase()
  );

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

  const config = getServiceLayoutData(serviceSlug || '', service.title);

  // Generate localized SEO content
  const seoTitle = `${service.title} Agency in Kerala, India | CrevionAds`;
  const seoDesc = `Leading ${service.title} services mainly focusing on businesses in Kerala and across India. ${service.desc} Contact CrevionAds today.`;

  const renderMockup = (type: string) => {
    switch (type) {
      case "browser": return <BrowserMockup />;
      case "dashboard": return <DashboardMockup />;
      case "marketing": return <MarketingMockup />;
      default: return <BrandingMockup />;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 overflow-x-hidden">
      <SEO title={seoTitle} description={seoDesc} />
      <Navbar />
      
      {/* --- HERO SECTION: SPLIT LAYOUT (Mockup Style) --- */}
      <section className="relative py-16 lg:py-24 overflow-hidden border-b border-white/5">
        {/* Background Gradients & Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-background to-brand-secondary/5" />
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: "radial-gradient(circle at center, #F4CE41 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Back Navigation */}
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center text-zinc-500 hover:text-brand-accent transition-colors mb-8 group text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="mr-2 h-3.5 w-3.5 transform group-hover:-translate-x-1 transition-transform" />
            Home / Services / <span className="text-zinc-300 ml-1 font-extrabold">{service.title}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Title & Intro */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="inline-block px-4.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[9px] font-bold uppercase tracking-[0.2em]">
                Active Service Core
              </span>
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
              >
                {service.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base sm:text-lg text-zinc-400 font-medium leading-relaxed"
              >
                {service.desc}
              </motion.p>
            </div>

            {/* Right Column: Dynamic Vertical Highlights Card List */}
            <div className="lg:col-span-5 space-y-4">
              {config.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card border border-white/5 p-4 flex gap-4 hover:border-brand-primary/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold font-sans text-sm group-hover:scale-105 transition-transform">
                    {`0${i + 1}`}
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-100 group-hover:text-brand-primary transition-colors">
                      {h.label}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-zinc-500 font-semibold leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 1: DETAILED BIO & GRAPHIC SPLIT --- */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Full Description Text */}
          <div className="space-y-6 text-left">
            <span className="text-brand-accent text-[9px] font-bold uppercase tracking-[0.25em]">
              Deep Dive
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {config.subtitle}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
              {service.detailedContent || service.desc}
            </p>
          </div>

          {/* Right Column: Custom CSS Tech Graphic Mockup */}
          <div className="w-full">
            {renderMockup(config.mockupType)}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: EXCELLENCE ACCENT BANNER (HORIZONTAL split, Phone mockup) --- */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-brand-primary/10 via-[#0a0616]/80 to-brand-accent/5 backdrop-blur-xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Floating background glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-primary/10 blur-[100px] pointer-events-none" />

          {/* Text block left */}
          <div className="flex-1 text-left space-y-6 relative z-10">
            <span className="text-brand-primary text-[9px] font-bold uppercase tracking-[0.25em]">
              Our Guarantee
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
              Striving for Absolute <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-semibold max-w-xl leading-relaxed">
              We align visual clarity, performance matrices, and bleeding-edge technologies into custom assets that command attention. Your digital product doesn't just launch; it dominates.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Efficiency</span>
                <span className="text-xl font-bold text-white">99% Faster</span>
              </div>
              <div className="w-[1px] h-10 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Scaling</span>
                <span className="text-xl font-bold text-white">100% Secure</span>
              </div>
            </div>
          </div>

          {/* Phone Mockup floating right */}
          <div className="relative z-10 flex-shrink-0 lg:mr-8">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: CHECKLIST BLOCK 1 (Left: Laptop Mockup, Right: Bullet Checklist) --- */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Glass laptop/dashboard mockup */}
          <div className="w-full order-2 lg:order-1">
            <DashboardMockup />
          </div>

          {/* Right Column: Premium tick checklists */}
          <div className="space-y-6 text-left order-1 lg:order-2">
            <span className="text-brand-primary text-[9px] font-bold uppercase tracking-[0.25em]">
              Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Core Deliverables
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Our workflows are meticulously structured to deliver scalable, performant components.
            </p>
            
            <div className="space-y-4 pt-2">
              {config.checklist1.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-xs sm:text-sm font-bold leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CHECKLIST BLOCK 2 (Left: Bullet Checklist, Right: Mockup) --- */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Premium tick checklists */}
          <div className="space-y-6 text-left">
            <span className="text-brand-accent text-[9px] font-bold uppercase tracking-[0.25em]">
              Engineering Quality
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Enterprise Integration
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-semibold leading-relaxed">
              We leverage cloud infrastructures to deploy highly available digital products.
            </p>
            
            <div className="space-y-4 pt-2">
              {config.checklist2.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-xs sm:text-sm font-bold leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Custom CSS Tech Graphic Mockup */}
          <div className="w-full">
            {renderMockup("branding")}
          </div>
        </div>
      </section>

      {/* --- RELATED PROJECTS SHOWCASE SHOWCASE --- */}
      {matchingWorks && matchingWorks.length > 0 && (
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-4">
              Our Portfolio
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Recent <span className="gradient-text">{service.title} Projects</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed font-semibold">
              Discover how we've helped businesses succeed with our top-tier {service.title.toLowerCase()} solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-12">
            {matchingWorks.map((w: any, i: number) => (
              <motion.div
                key={w._id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card-hover overflow-hidden group relative flex flex-col h-full border border-white/5 bg-white/5"
              >
                <Link to={`/work/${w._id}`} className="absolute inset-0 z-10" aria-label={`View ${w.title} details`}></Link>
                
                <div className="overflow-hidden bg-white/10 flex items-center justify-center h-28 sm:h-56 p-2 sm:p-4">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="p-3 sm:p-6 flex flex-col flex-grow">
                  <span className="text-brand-primary text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-1 sm:mb-2">
                    {w.category}
                  </span>
                  <h3 className="font-display font-bold text-white text-xs sm:text-lg mb-1 sm:mb-3 group-hover:text-brand-primary transition-colors line-clamp-1">
                    {w.title}
                  </h3>
                  {w.description && (
                    <p className="text-zinc-400 text-[10px] sm:text-sm leading-relaxed line-clamp-2 font-medium">
                      {w.description}
                    </p>
                  )}
                  
                  <div className="mt-auto pt-3 sm:pt-4 border-t border-white/5 flex items-center text-zinc-500 group-hover:text-white transition-colors">
                    <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">View Project</span>
                    <div className="ml-2 w-4 sm:w-8 h-[1px] bg-zinc-500 group-hover:bg-brand-primary group-hover:w-12 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* --- CONSULTATION FOOTER CTA --- */}
      <section className="py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white mb-6">
            Ready to Accelerate Your <span className="gradient-text">Inbound Success</span>?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-semibold max-w-xl mx-auto mb-10 leading-relaxed">
            Connect with our technical architects today for a free strategic consultation call to scale your digital presence.
          </p>
          <a href="https://wa.me/918113908262" target="_blank" rel="noopener noreferrer" className="btn-primary text-lg !px-10 !py-4 shadow-xl">
            Get a Free Consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetails;
