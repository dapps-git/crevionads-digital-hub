import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-zinc-400 text-sm font-medium">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!blog || error) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl font-display font-bold text-zinc-100 mb-4">Blog Post Not Found</h1>
                <button onClick={() => navigate('/')} className="btn-primary">Return Home</button>
            </div>
        );
    }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <div className="min-h-screen bg-background pt-24 font-sans">
      <SEO title={`${blog.title} | CrevionAds Blog`} description={stripHtml(blog.content).substring(0, 160)} />
            <Navbar />

            {/* Hero Banner */}
            <section className="relative overflow-hidden border-b border-white/5">
                {/* Ambient bg glow */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: "radial-gradient(#8A32C6 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }} />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    {/* Back nav */}
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center text-zinc-500 hover:text-amber-400 transition-colors mb-8 group text-xs font-semibold uppercase tracking-wider"
                    >
                        <ArrowLeft className="mr-2 h-3.5 w-3.5 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-5">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                                {new Date(blog.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                            <span className="w-px h-3 bg-white/10" />
                            <span className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-purple-400" />
                                {blog.author}
                            </span>
                            {blog.category && (
                                <>
                                    <span className="w-px h-3 bg-white/10" />
                                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-full">
                                        <Tag className="w-3 h-3" />
                                        {blog.category}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                            {blog.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Featured Image */}
                {blog.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="rounded-2xl overflow-hidden mb-10 aspect-video shadow-2xl border border-white/5"
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}

                {/* Article Body */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-sm shadow-xl"
                >
                    {/* Decorative left accent line */}
                    <div className="absolute left-0 top-10 bottom-10 w-[2px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent rounded-full" />

                    <div
                        className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-loose text-base md:text-lg
                        prose-h2:text-white prose-h2:font-bold prose-h2:tracking-tight
                        prose-h3:text-zinc-100 prose-h3:font-semibold
                        prose-strong:text-white prose-strong:font-semibold
                        prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-white/10
                        prose-code:text-amber-300 prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
                        prose-blockquote:border-purple-500 prose-blockquote:text-zinc-400 prose-blockquote:italic"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </motion.div>

                {/* Back link at bottom */}
                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white hover:bg-white/5 font-semibold text-sm transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogDetails;
