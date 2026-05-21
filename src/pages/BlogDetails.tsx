import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogBySlug } from "@/lib/api";

const BlogDetails = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  const navigate = useNavigate();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', blogSlug],
    queryFn: () => fetchBlogBySlug(blogSlug || ''),
    enabled: !!blogSlug,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogSlug]);

  if (isLoading) return <div className="min-h-screen bg-background flex items-center justify-center text-zinc-400 text-xl">Loading blog post...</div>;

  if (!blog || error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-display font-bold text-zinc-100 mb-4">Blog Post Not Found</h1>
        <button onClick={() => navigate('/')} className="btn-primary">Return Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <SEO title={`${blog.title} | CrevionAds Blog`} description={blog.content.substring(0, 160)} />
      <Navbar />

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-zinc-400 hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <User size={16} />
              {blog.author}
            </span>
            {blog.category && (
              <span className="px-2 py-1 bg-accent/20 text-accent rounded-md text-xs uppercase tracking-wider">
                {blog.category}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 mb-8 leading-tight">
            {blog.title}
          </h1>

          {blog.image && (
            <div className="rounded-3xl overflow-hidden mb-12 aspect-video shadow-2xl">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="glass-card p-8 md:p-12">
            <div
              className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetails;
