import { motion } from "framer-motion";
import { Target, Award, TrendingUp, Eye } from "lucide-react";

const differentiators = [
  { title: "Result-Driven Approach", desc: "Every strategy is designed to deliver measurable outcomes and sustainable growth.", icon: Target },
  { title: "Industry Expertise", desc: "Years of experience across diverse industries from startups to enterprises.", icon: Award },
  { title: "Outcome-Oriented Planning", desc: "We focus on strategies that convert insights into measurable growth.", icon: TrendingUp },
  { title: "Transparent Process", desc: "Clear communication, regular reporting, and honest insights every step of the way.", icon: Eye },
];

export const ClientsSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-4">
        <span className="section-badge">About Us</span>
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 text-center mb-4">
        Why Our Clients Believe<br />We're <span className="gradient-text">Different</span>
      </h2>

      <div className="mt-12 space-y-4 max-w-3xl mx-auto">
        {differentiators.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <d.icon size={20} strokeWidth={1.5} className="text-accent" />
            </div>
            <div>
              <h3 className="font-display font-bold text-zinc-100 mb-1">{d.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{d.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
