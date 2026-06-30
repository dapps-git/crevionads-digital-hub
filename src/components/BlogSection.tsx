import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/api";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export const BlogSection = () => {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="py-24 text-center text-zinc-400 font-sans">
        <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>Loading insights...</p>
      </div>
    );
  }

  if (error || !blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-24 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30 text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            Our Journal
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
            Insights from <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">Our Experts</span>
          </h2>
        </div>

      </div>

      {/* Unified Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {blogs.map((blog: any, i: number) => (
          <motion.div
            key={blog._id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden transition-all duration-500 flex flex-col h-full shadow-xl relative backdrop-blur-sm"
          >
            {/* Glow border overlay */}
            <div
              className="absolute inset-0 border border-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: hoveredIndex === i ? "radial-gradient(200px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(138, 50, 198, 0.15), transparent 80%)" : ""
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
              }}
            />

            {/* Card Image */}
            <div className="overflow-hidden aspect-video relative">
              <img
                src={blog.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {blog.category && (
                <span className="absolute top-4 left-4 z-10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black bg-[#F4CE45] rounded-full shadow-md">
                  {blog.category}
                </span>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow relative z-10">
              <div className="flex items-center gap-3.5 text-[10px] sm:text-xs text-zinc-500 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-purple-400" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-purple-400" />
                  {blog.author}
                </span>
              </div>

              <h3 className="font-display text-base md:text-lg font-bold text-white mb-2 group-hover:text-[#F4CE45] transition-colors duration-300 line-clamp-2">
                {blog.title}
              </h3>

              <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed">
                {blog.content.replace(/<[^>]*>?/gm, "")}
              </p>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-[#F4CE45] font-semibold text-xs sm:text-sm transition-colors group/link"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
                <BookOpen className="w-4 h-4 text-zinc-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
