import { motion } from "framer-motion";
import aboutImg from "@/assets/about-team.jpg";

export const ProblemSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-100 mb-6">
            Digital Agency Problem<br />and their <span className="gradient-text">Best Solutions</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Digital agencies often struggle with visibility, lead generation, and standing out in a crowded market.
            The best solution is a result-driven approach using smart strategies, creative content, and data-backed
            optimization to deliver consistent growth and measurable results.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {["3.4x Avg ROAS", "500+ Projects", "99.9% Uptime", "50+ Clients"].map((stat) => (
              <div key={stat} className="glass-card p-4 text-center">
                <span className="text-accent font-display font-bold text-lg">{stat.split(" ")[0]}</span>
                <p className="text-zinc-400 text-sm mt-1">{stat.split(" ").slice(1).join(" ")}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="glass-card overflow-hidden rounded-3xl">
            <img src={aboutImg} alt="CrevionAds team" className="w-full h-auto object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
