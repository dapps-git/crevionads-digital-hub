import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const solutions = [
  { title: "AI Powered App Development", image: portfolio2 },
  { title: "AI Enhanced Web Development", image: portfolio1 },
  { title: "Smart Branding Solutions", image: portfolio3 },
];

export const ITSolutionsSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="section-badge">IT Solutions</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-100 mt-6 mb-4">
          Smart IT Solutions for <span className="gradient-text">Digital Transformation</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {solutions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card-hover overflow-hidden group"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-display font-bold text-zinc-100">{s.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
