import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.1] mb-6">
            Grow Your Brand.{" "}
            <span className="gradient-text">Reach the Right Audience.</span>{" "}
            Drive Measurable Results.
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed">
            CrevionAds is a performance-driven digital marketing agency helping brands grow faster with smart strategies and creative solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="btn-primary text-center">
              Start Your Journey
            </a>
            <a href="#services" className="btn-outline-accent text-center">
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
