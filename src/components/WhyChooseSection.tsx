import { motion } from "framer-motion";
import { Target, Award, TrendingUp, Eye, CheckCircle } from "lucide-react";

const reasons = [
  { title: "Result-Driven Approach", desc: "Every strategy is designed to deliver measurable outcomes and sustainable growth.", icon: Target },
  { title: "Industry Expertise", desc: "Years of experience across diverse industries from startups to enterprises.", icon: Award },
  { title: "Outcome-Oriented Planning", desc: "We focus on strategies that convert insights into measurable growth.", icon: TrendingUp },
  { title: "Transparent Process", desc: "Clear communication, regular reporting, and honest insights every step of the way.", icon: Eye },
];

const values = [
  "Data-driven decision making",
  "Creative excellence",
  "Cutting-edge technology",
  "Full-spectrum digital support",
  "Continuous optimization",
  "Customer-centric strategies",
];

export const WhyChooseSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-4">
        <span className="section-badge">About Us</span>
      </div>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-100 text-center mb-6">
        Why Choose <span className="gradient-text">CREVIONAds?</span>
      </h2>
      <p className="text-zinc-400 max-w-2xl mx-auto text-center leading-relaxed mb-16">
        We combine creativity, data, and technology to deliver digital marketing solutions that truly work.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {values.map((v) => (
              <div key={v} className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle size={14} className="text-accent flex-shrink-0" />
                <span>{v}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center flex-shrink-0">
                <r.icon size={20} strokeWidth={1.5} className="text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-zinc-100 mb-1">{r.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
