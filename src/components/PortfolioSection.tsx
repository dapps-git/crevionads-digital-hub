import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const works = [
  { title: "E-commerce App", category: "SEO", image: portfolio1 },
  { title: "E-commerce App", category: "SEO", image: portfolio2 },
  { title: "E-commerce App", category: "SEO", image: portfolio3 },
];

export const PortfolioSection = () => {
  return (
    <section id="work" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-accent mb-4">Work Showcase</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {works.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover overflow-hidden group"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={w.image}
                alt={w.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="font-display font-semibold text-zinc-100">{w.title}</h3>
              <p className="text-zinc-500 text-sm">{w.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
