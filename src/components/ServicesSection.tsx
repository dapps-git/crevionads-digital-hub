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
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="section-badge">Our Services</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-100 mt-6 mb-4">
          Empowering Business with <span className="gradient-text">Software & Marketing</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
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
              className="glass-card-hover p-4 sm:p-8 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/30 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-sm sm:text-lg font-bold text-zinc-100 mb-2 sm:mb-3">{service.title}</h3>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">{service.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
