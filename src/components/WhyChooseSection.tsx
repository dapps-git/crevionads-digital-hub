import { motion, useInView, animate } from "framer-motion";
import { Rocket, Award, Shield, CheckSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import bgImage from "@/assets/hero-bg.webp";

const reasons = [
  { title: "Result-Driven Approach", desc: "Every strategy is designed to deliver measurable outcomes and sustainable growth.", icon: Rocket },
  { title: "Industry Expertise", desc: "Years of experience across diverse industries from startups to enterprises.", icon: Award },
  { title: "Transparent Process", desc: "Clear communication, regular reporting, and honest insights every step of the way.", icon: Shield },
];

const values = [
  "Data-driven decision making",
  "Creative excellence",
  "Cutting-edge technology",
  "24/7 dedicated support",
  "Continuous optimization",
  "Customized strategies",
];

const stats = [
  { value: "100+", label: "Delivered Projects" },
  { value: "80+", label: "Clients" },
  { value: "4+", label: "Country" },
  { value: "20+", label: "Expert teams" },
  { value: "3+", label: "Years of experience" },
];

const AnimatedCounter = ({ to }: { to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [to, isInView]);

  return <span ref={nodeRef}>0</span>;
};

export const WhyChooseSection = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-[#090412] font-sans">
      {/* Liquid Glass / Wavy Background */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090412]/80 via-[#090412]/40 to-[#090412] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* Top Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 inline-flex"
            >
              <span className="bg-[#F4CE45] text-[#341F60] px-5 py-2 rounded-full font-bold text-[10px] tracking-wide shadow-[0_0_20px_rgba(244,206,69,0.3)] uppercase">
                About Us
              </span>
            </motion.div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.2] mb-6 tracking-tight">
              {["Why", "Choose", "Crevionads ?"].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                  className={`inline-block mr-2 sm:mr-2.5 ${word === "Crevionads ?"
                    ? "bg-gradient-to-r from-[#F4CE45] via-[#A888E0] to-[#694CD0] bg-clip-text text-transparent"
                    : "text-white"
                    }`}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
            >
              We combine creativity, data, and technology to deliver digital marketing solutions that truly work. Our team of experts is passionate about helping businesses thrive in the digital landscape.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6"
            >
              {values.map((v, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded border border-[#F4CE45] flex items-center justify-center flex-shrink-0">
                    <CheckSquare size={12} className="text-[#F4CE45]" strokeWidth={3} />
                  </div>
                  <span className="text-zinc-200 font-medium tracking-wide text-[11px] uppercase">{v}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column (Cards) */}
          <div className="lg:col-span-6 flex flex-col gap-5 justify-center mt-8 lg:mt-0 lg:pl-10">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.15), type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, x: -8 }}
                className="relative group p-[2px] rounded-[1.25rem] overflow-hidden"
              >
                <div className={`absolute inset-0 transition-opacity duration-500 ${i === 0 ? 'opacity-100 bg-[#341F60] border-[2px] border-[#0ea5e9]' : 'opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#F4CE45] to-[#694CD0]'}`}></div>
                <div className={`absolute inset-0 transition-opacity duration-500 ${i === 0 ? 'opacity-100 bg-gradient-to-r from-[#00ffff] to-[#007fff]' : 'opacity-0 bg-gradient-to-r from-[#F4CE45] to-[#694CD0] group-hover:opacity-100'}`}></div>

                <div className="relative bg-[#341F60]/60 backdrop-blur-3xl rounded-[1.15rem] p-5 sm:p-6 flex gap-5 items-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <div className="text-white flex-shrink-0">
                    <r.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-1.5 text-lg">{r.title}</h3>
                    <p className="text-zinc-300 text-[11px] leading-relaxed max-w-sm">{r.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-20 py-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center text-center ${idx !== stats.length - 1 ? 'lg:border-r border-white/10' : ''
                  }`}
              >
                <div className="flex items-center justify-center">
                  <h4
                    className="text-[3rem] lg:text-[4rem] font-bold font-display tracking-tighter"
                    style={{
                      WebkitTextStroke: '1px rgba(255, 255, 255, 0.8)',
                      color: 'rgba(255, 255, 255, 0.05)',
                      textShadow: '0 8px 32px rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <AnimatedCounter to={parseInt(stat.value.replace('+', ''))} />
                  </h4>
                  <span className="text-[#F4CE45] text-[2.5rem] lg:text-[3rem] font-bold ml-1 mb-1">+</span>
                </div>
                <p className="text-zinc-400 text-[10px] font-semibold mt-3 tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
