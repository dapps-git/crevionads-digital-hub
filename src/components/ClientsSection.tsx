import { motion } from "framer-motion";
import { Target, Award, TrendingUp, Eye } from "lucide-react";

const differentiators = [
  { title: "Result-Driven Approach", desc: "Every strategy is designed to deliver measurable outcomes and sustainable growth.", icon: Target },
  { title: "Industry Expertise", desc: "Years of experience across diverse industries from startups to enterprises.", icon: Award },
  { title: "Outcome-Oriented Planning", desc: "We focus on strategies that convert insights into measurable growth.", icon: TrendingUp },
  { title: "Transparent Process", desc: "Clear communication, regular reporting, and honest insights every step of the way.", icon: Eye },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export const ClientsSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-4">
        <span className="section-badge">About Us</span>
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 text-center mb-12">
        Why Our Clients Believe<br />We're <span className="gradient-text">Different</span>
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
      >
        {differentiators.map((d, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="glass-card p-5 sm:p-6 flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <d.icon size={20} strokeWidth={1.5} className="text-accent" />
            </div>
            <div>
              <h3 className="font-display font-bold text-zinc-100 mb-1 text-sm sm:text-base">{d.title}</h3>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">{d.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
