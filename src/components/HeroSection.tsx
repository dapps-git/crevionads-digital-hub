import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWorks } from "@/lib/api";
import hero from "/heroo.jpg";

/* ─── Heading animation config ─── */
const headingWords = [
  { text: "Grow Your Brand.", highlight: false, typewriter: false },
  { text: "Reach The Right Audience.", highlight: true, typewriter: true },
  { text: "Drive Measurable Results.", highlight: false, typewriter: false },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const typewriterContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 1.5 } },
};
const typewriterChar = {
  hidden: { opacity: 0, display: "none", y: 5 },
  visible: { opacity: 1, display: "inline-block", y: 0 },
};

const TypewriterWord = ({ word }: { word: any }) => (
  <motion.span
    variants={typewriterContainer}
    initial="hidden"
    animate="visible"
    className={`inline-block ${word.highlight ? "bg-gradient-to-r from-[#F4CE45] to-[#694CD0] bg-clip-text text-transparent" : "text-white"}`}
  >
    {word.text.split("").map((c: string, i: number) => (
      <motion.span key={i} variants={typewriterChar}>{c === " " ? "\u00A0" : c}</motion.span>
    ))}
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      className="inline-block w-1.5 h-[0.8em] bg-[#F4CE45] align-middle ml-1 rounded-sm"
    />
    {" "}
  </motion.span>
);

/* ─── Placeholder images ─── */


/* ─── Infinite CSS-animated marquee (NEVER stops on scroll) ─── */
const Marquee = ({ images }: { images: string[] }) => {
  // Duplicate 3× so the strip is always longer than viewport with no gaps
  const items = [...images, ...images];

  return (
    <div className="relative overflow-hidden w-full">
      {/* Fade left */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #090412, transparent)" }} />
      {/* Fade right */}
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #090412, transparent)" }} />

      {/* Inject keyframe — pure CSS, runs on compositor, scroll never interrupts it */}


      <div className="hero-marquee-track">
        {items.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 mx-1.5 rounded-2xl overflow-hidden
             w-[180px] h-[120px]
             md:w-[300px] md:h-[190px]"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover block"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Main section ─── */
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
      className="relative min-h-screen flex flex-col justify-start items-center overflow-hidden bg-brand-dark pt-40 md:pt-36 pb-10"
    >      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-[120%] h-[120%] -left-[10%] -top-[10%] absolute origin-center"
        >
          <img src={hero} alt="" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
        </motion.div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#F4CE45] shadow-[0_0_12px_rgba(244,206,69,0.9)]"
              initial={{ x: Math.random() * windowDimensions.width, y: Math.random() * windowDimensions.height, opacity: 0 }}
              animate={{ y: [null, Math.random() * -220 - 80], opacity: [0, 0.85, 0] }}
              transition={{ duration: Math.random() * 4 + 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
            />
          ))}
          <motion.div
            className="absolute left-[-10%] top-[30%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#F4CE45]/40 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute right-[-10%] bottom-[35%] w-[70%] h-[1px] bg-gradient-to-r from-transparent via-[#8A32C6]/40 to-transparent"
            animate={{ x: ["160%", "-100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#090412] via-[#090412]/80 to-[#090412] z-10" />
      </div>

      {/* ── Hero text ── */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center ">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.15] mb-6 max-w-3xl mt-16"        >
          {headingWords.map((word, i) => {
            if (word.typewriter) return <TypewriterWord key={i} word={word} />;
            return (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`inline-block ${word.highlight ? "bg-gradient-to-r from-[#F4CE45] to-[#694CD0] bg-clip-text text-transparent" : "text-white"}`}
              >
                {word.text}{" "}
              </motion.span>
            );
          })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed"
        >
          Build better. Market smarter. Grow faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-row gap-3 justify-center w-full max-w-md"        >
          <a href="#footer" className="px-4 py-3 rounded-full bg-[#F4CE45] text-[#341F60] font-bold text-center tracking-wide shadow-[0_0_20px_rgba(244,206,69,0.3)] hover:bg-[#ffe374] transition-colors text-sm">
            Start Your Journey
          </a>
          <a href="#work" className="px-4 py-3 rounded-full border border-white/10 text-white font-semibold text-center hover:bg-white/5 transition-colors text-sm">
            View Our Work
          </a>
        </motion.div>
      </div>


    </section>
  );
};
