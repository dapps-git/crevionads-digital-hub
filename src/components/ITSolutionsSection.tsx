import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const solutions = [
  { title: "AI Powered App Development", image: portfolio2 },
  { title: "AI Enhanced Web Development", image: portfolio1 },
  { title: "Smart Branding Solutions", image: portfolio3 },
  { title: "Custom API & Cloud Solutions", image: portfolio2 },
];

export const ITSolutionsSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-brand-dark font-sans">
      <div className="text-center mb-16">
        <span className="section-badge text-[10px]">IT Solutions</span>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-100 mt-5 mb-4 tracking-tight">
          Smart IT Solutions for <span className="gradient-text">Digital Transformation</span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
          We architect robust, scalable infrastructure and custom software solutions that serve as the backbone of your digital success.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
        {solutions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card-hover overflow-hidden group rounded-xl md:rounded-2xl"
          >
            <div className="overflow-hidden rounded-t-xl md:rounded-t-2xl">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-20 sm:h-36 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-2 md:p-6 text-center">
              <h3 className="font-display font-bold text-zinc-100 text-[10px] sm:text-sm md:text-base leading-tight">{s.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
