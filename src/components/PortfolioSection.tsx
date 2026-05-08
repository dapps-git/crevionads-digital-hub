import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchWorks } from "@/lib/api";

export const PortfolioSection = () => {
  const { data: works, isLoading, error } = useQuery({
    queryKey: ['works'],
    queryFn: fetchWorks,
  });

  if (isLoading) return <div className="py-20 text-center text-zinc-400">Loading portfolio...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Error loading portfolio</div>;

  return (
    <section id="work" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-accent mb-4">Work Showcase</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
        {works?.map((w: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover overflow-hidden group"
          >
            <div className="overflow-hidden rounded-t-2xl bg-white flex items-center justify-center h-28 sm:h-52 p-2 sm:p-3">
              <img
                src={w.image}
                alt={w.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 sm:p-6 text-center flex flex-col flex-grow">
              <h3 className="font-display font-semibold text-zinc-100 text-sm sm:text-lg">{w.title}</h3>
              <p className="text-brand-primary text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 mb-2 sm:mb-3">{w.category}</p>
              {w.description && (
                <p className="text-zinc-400 text-xs sm:text-sm mt-auto line-clamp-2">{w.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
