import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWorks, fetchWorkById } from "@/lib/api";

const categories = [
  "All",
  "Web Development",
  "Marketing",
  "Branding",
  "Graphic Design",
  "App Development"
];

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const queryClient = useQueryClient();

  const { data: works, isLoading, error } = useQuery({
    queryKey: ['works'],
    queryFn: fetchWorks,
  });

  const prefetchWork = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['work', id],
      queryFn: () => fetchWorkById(id),
      staleTime: 60000, // 1 minute
    });
  };

  if (isLoading) return <div className="py-20 text-center text-zinc-400">Loading portfolio...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Error loading portfolio</div>;

  const filteredWorks = activeCategory === "All" 
    ? works 
    : works?.filter((w: any) => w.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="work" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-brand-dark font-sans">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6">
          Our Portfolio
        </span>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
          Recent <span className="gradient-text">Work Showcase</span>
        </h2>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 mt-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredWorks?.map((w: any, i: number) => (
            <motion.div
              layout
              key={w._id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onMouseEnter={() => prefetchWork(w._id)}
              className="group relative bg-white border border-zinc-100/80 rounded-xl flex items-center justify-center aspect-[16/10] p-3 sm:p-4 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_-4px_rgba(102,89,165,0.14)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <Link to={`/work/${w._id}`} className="absolute inset-0 z-10" aria-label={`View ${w.title} details`}></Link>
              
              <img
                src={w.image}
                alt={w.title}
                className="w-full h-full max-h-full object-contain filter group-hover:scale-105 transition-all duration-500 ease-out"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredWorks?.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-zinc-500 text-sm font-medium italic">No projects found in this category yet.</p>
        </div>
      )}
    </section>
  );
};
