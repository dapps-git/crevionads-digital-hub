import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchServices } from "@/lib/api";
import {
  Smartphone, Globe, Palette, Megaphone, Database, Bot,
  ShoppingCart, Layout, Video, HelpCircle
} from "lucide-react";

const iconMap: Record<string, any> = {
  Smartphone, Globe, Palette, Megaphone, Database, Bot,
  ShoppingCart, Layout, Video
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Reusable 3D Tilt + Spotlight Follow Card
const InteractiveTiltCard = ({ children, className }: { children: React.ReactNode; className: string }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    
    const width = card.width;
    const height = card.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Tilt angle max 12 degrees
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setTilt({ x: rotateX, y: rotateY });
    
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`${className} relative overflow-hidden group select-none`}
    >
      {/* 1. Glow follow spotlight behind content */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(244, 206, 69, 0.07), transparent 80%)",
        }}
      />
      
      {/* 2. Glow follow border spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-2xl sm:rounded-3xl border border-transparent"
        style={{
          background: "radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(138, 50, 198, 0.45), transparent 85%)",
          maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* 3. Outer border container */}
      <div className="absolute inset-0 border border-white/[0.06] rounded-2xl sm:rounded-3xl pointer-events-none" />

      {/* 4. Parallax nested contents */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-20 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

  if (isLoading) return <div className="py-20 text-center text-zinc-400">Loading services...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Error loading services</div>;

  return (
    <section
      id="services"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans bg-[#050505]"
    >
      {/* Dynamic backdrop glow overlays */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="section-badge text-[10px]">Our Services</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-100 mt-5 mb-4 tracking-tight">
            Empowering Business with <span className="gradient-text">Software & Marketing</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            We blend cutting-edge software development with data-driven digital marketing to deliver comprehensive solutions that scale your business.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
        >
          {services?.map((service: any, i: number) => {
            const IconComponent = iconMap[service.icon] || HelpCircle;
            return (
              <Link key={i} to={`/services/${service.slug}`} className="block h-full">
                <InteractiveTiltCard
                  className="p-4 sm:p-6 lg:p-10 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-xl sm:rounded-3xl h-full transition-all duration-300"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-600/35 to-purple-800/35 border border-white/5 flex items-center justify-center mb-4 sm:mb-8 shadow-lg shadow-violet-950/20 group-hover:scale-110 group-hover:shadow-violet-500/20 transition-all duration-500">
                    <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-zinc-100" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="font-display text-sm sm:text-lg lg:text-xl font-bold text-zinc-100 mb-2 sm:mb-4 group-hover:text-amber-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-[10px] sm:text-xs lg:text-sm leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </InteractiveTiltCard>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
