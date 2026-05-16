import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/heroo.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge text-[10px]">Our Services</span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-100 mt-5 mb-4 tracking-tight">
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
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {services?.map((service: any, i: number) => {
            const IconComponent = iconMap[service.icon] || HelpCircle;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="glass-card-hover p-4 sm:p-8 group bg-[#2D1B69]/20 border-primary/30 hover:bg-[#2D1B69]/40 hover:border-primary/60"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/40 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 shadow-lg shadow-primary/20">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-sm sm:text-base font-bold text-zinc-100 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed line-clamp-3 sm:line-clamp-none font-medium">{service.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
