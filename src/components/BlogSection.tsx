import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/lib/api";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const BlogSection = () => {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <div className="py-20 text-center text-zinc-400">Loading blog...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Error loading blog</div>;

  return (
    <section id="blog" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="section-badge">Latest News</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-100 mt-6 mb-4">
          Insights from <span className="gradient-text">Our Experts</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs?.map((blog: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover group flex flex-col h-full"
          >
            <div className="overflow-hidden rounded-t-2xl aspect-video">
              <img
                src={blog.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {blog.author}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-zinc-100 mb-3 group-hover:text-accent transition-colors">
                {blog.title}
              </h3>
              <p className="text-zinc-500 text-sm line-clamp-3 mb-6">
                {blog.content.replace(/<[^>]*>?/gm, '')}
              </p>
              <div className="mt-auto">
                <Link
                  to={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
