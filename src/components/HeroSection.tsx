import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
           animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="w-[120%] h-[120%] -left-[10%] -top-[10%] absolute origin-center"
        >
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
        </motion.div>
        
        {/* Abstract Tech Nodes */}
        <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
          {/* Glowing floating main particles */}
          {[...Array(15)].map((_, i) => (
             <motion.div
               key={`particle-${i}`}
               className="absolute w-2 h-2 rounded-full bg-[#F4CE45] shadow-[0_0_20px_rgba(244,206,69,1)]"
               initial={{ 
                 x: Math.random() * windowDimensions.width, 
                 y: Math.random() * windowDimensions.height,
                 opacity: Math.random() * 0.5 + 0.2
               }}
               animate={{ 
                 y: [null, Math.random() * -300 - 100],
                 x: [null, Math.random() * 100 - 50],
                 opacity: [0, 0.9, 0]
               }}
               transition={{ 
                 duration: Math.random() * 3 + 3, 
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: Math.random() * 5
               }}
             />
          ))}

          {/* Tech/Cyber nexus floating objects */}
          {[...Array(10)].map((_, i) => (
             <motion.div
               key={`nexus-${i}`}
               className="absolute w-1.5 h-1.5 bg-[#8A32C6] rounded-sm shadow-[0_0_15px_rgba(138,50,198,1)]"
               initial={{ 
                 x: Math.random() * windowDimensions.width, 
                 y: Math.random() * windowDimensions.height,
                 rotate: 45
               }}
               animate={{ 
                 y: [null, Math.random() * 200 + 100],
                 opacity: [0, 0.8, 0],
                 rotate: [45, 135]
               }}
               transition={{ 
                 duration: Math.random() * 4 + 3, 
                 repeat: Infinity,
                 ease: "linear",
                 delay: Math.random() * 4
               }}
             />
          ))}
          
          {/* High-Speed Racing Tech Lines */}
          <motion.div 
            className="absolute left-[-10%] top-[20%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#F4CE45]/60 to-transparent"
            animate={{ x: ["-100%", "180%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
          <motion.div 
            className="absolute right-[-10%] bottom-[30%] w-[70%] h-[1px] bg-gradient-to-r from-transparent via-[#8A32C6]/60 to-transparent"
            animate={{ x: ["150%", "-100%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <motion.div 
            className="absolute left-[-10%] bottom-[15%] w-[40%] h-[1px] bg-gradient-to-r from-transparent via-[#F4CE45]/50 to-transparent"
            animate={{ x: ["-100%", "250%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 3 }}
          />
          <motion.div 
            className="absolute left-[30%] top-[-10%] w-[1px] h-[60%] bg-gradient-to-b from-transparent via-[#694CD0]/60 to-transparent shadow-[0_0_15px_rgba(105,76,208,0.8)]"
            animate={{ y: ["-100%", "180%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.5 }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#090412] via-[#090412]/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090412] via-transparent to-[#090412]/30 z-10" />
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
                 className={`inline-block ${word.highlight ? "bg-gradient-to-r from-[#F4CE45] to-[#694CD0] bg-clip-text text-transparent" : ""}`}
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
            <a href="#contact" className="px-6 py-3.5 rounded-full bg-[#F4CE45] text-[#341F60] font-bold text-center tracking-wide shadow-[0_0_20px_rgba(244,206,69,0.4)] hover:bg-[#ffe374] transition-colors">
              Start Your Journey
            </a>
            <a href="#services" className="px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-center hover:bg-white/10 transition-colors">
              View Our Work
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

