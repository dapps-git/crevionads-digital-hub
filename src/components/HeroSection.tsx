import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

const headingWords = [
  { text: "Grow Your Brand.", highlight: false },
  { text: "Reach the Right Audience.", highlight: true },
  { text: "Drive Measurable Results.", highlight: false },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
           animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="w-full h-full"
        >
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        
        {/* Abstract Tech Nodes */}
        <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
          {[...Array(6)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(244,206,65,0.8)]"
               initial={{ 
                 x: Math.random() * window.innerWidth, 
                 y: Math.random() * window.innerHeight,
                 opacity: Math.random() * 0.5 + 0.3
               }}
               animate={{ 
                 y: [null, Math.random() * -200 - 100],
                 opacity: [0, 0.8, 0]
               }}
               transition={{ 
                 duration: Math.random() * 5 + 5, 
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: Math.random() * 5
               }}
             />
          ))}
          
          {/* Tech Lines */}
          <motion.div 
            className="absolute right-[-10%] top-[20%] w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute left-[-10%] bottom-[30%] w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-2xl">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.1] mb-6"
          >
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`inline-block ${word.highlight ? "gradient-text" : ""}`}
              >
                {word.text}{" "}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed"
          >
            CrevionAds is a performance-driven digital marketing agency helping brands grow faster with smart strategies and creative solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#contact" className="btn-primary text-center">
              Start Your Journey
            </a>
            <a href="#services" className="btn-outline-accent text-center">
              View Our Work
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
