import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import hero from "/heroo.jpg";

/* ─── Heading animation config ─── */
const headingWords = [
  { text: "Grow Your Brand.", highlight: false, typewriter: false },
  { text: "Reach The Right Audience.", highlight: true, typewriter: true },
  { text: "Drive Measurable Results.", highlight: false, typewriter: false },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const typewriterContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 1.0 } },
};

const typewriterChar = {
  hidden: { opacity: 0, display: "none", y: 4 },
  visible: { opacity: 1, display: "inline-block", y: 0 },
};

const TypewriterWord = ({ word }: { word: any }) => (
  <motion.span
    variants={typewriterContainer}
    initial="hidden"
    animate="visible"
    className="inline-block bg-gradient-to-r from-amber-400 via-purple-400 to-[#8A32C6] bg-clip-text text-transparent"
  >
    {word.text.split("").map((c: string, i: number) => (
      <motion.span key={i} variants={typewriterChar}>
        {c === " " ? "\u00A0" : c}
      </motion.span>
    ))}
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      className="inline-block w-1 h-[0.8em] bg-[#F4CE45] align-middle ml-1 rounded-sm"
    />
    {" "}
  </motion.span>
);

export const HeroSection = () => {
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    const update = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#05030A] pt-32 pb-20 font-sans"
    >
      {/* ── Background Grid & Glows ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Background Image */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full absolute origin-center"
        >
          <img
            src={hero}
            alt=""
            className="w-full h-full object-cover opacity-20 mix-blend-lighten"
          />
        </motion.div>

        {/* CSS Mesh Grid */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: "radial-gradient(#8A32C6 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Gradient Blows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] mix-blend-screen" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] mix-blend-screen" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#F4CE45] shadow-[0_0_10px_rgba(244,206,69,0.8)]"
              initial={{
                x: Math.random() * windowDimensions.width,
                y: Math.random() * windowDimensions.height + 200,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -300 - 100],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Bottom Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05030A]/90 via-transparent to-[#05030A] z-10" />
      </div>

      {/* ── Hero Content ── */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-12 sm:mt-16">
        
        {/* Glow Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/30 text-zinc-300 text-xs font-medium tracking-wide mb-8 backdrop-blur-md shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Transforming Brands with AI & Software</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12] mb-6 max-w-3xl"
        >
          {headingWords.map((word, i) => {
            if (word.typewriter) return <TypewriterWord key={i} word={word} />;
            return (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`inline-block ${
                  word.highlight
                    ? "bg-gradient-to-r from-amber-400 to-[#8A32C6] bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                {word.text}{" "}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-zinc-400 mb-10 max-w-xl leading-relaxed font-light"
        >
          We deliver custom web architectures, high-converting digital marketing, and intelligent AI models that scale companies.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-none"
        >
          <a
            href="https://wa.me/918113908262"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#F4CE45] hover:bg-[#ffe374] text-[#05030A] font-bold text-center tracking-wider transition-all duration-300 transform hover:scale-[1.03] shadow-[0_0_30px_rgba(244,206,69,0.2)] text-sm"
          >
            Start Your Journey
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-full border border-white/10 hover:border-white/20 text-white hover:bg-white/5 font-semibold text-center tracking-wider transition-all duration-300 text-sm backdrop-blur-sm"
          >
            Explore Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};
