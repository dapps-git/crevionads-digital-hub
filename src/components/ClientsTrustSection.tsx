import React from "react";
import { motion } from "framer-motion";

const logoModules = import.meta.glob("../clients/*.{png,PNG,jpg,jpeg,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

const logos = Object.entries(logoModules)
  .map(([path, mod]: [string, any]) => {
    const filename = path.split("/").pop() || "";
    const url = mod.default || mod;
    return { filename, url };
  })
  .filter((item) => {
    const name = item.filename.toLowerCase();
    // Exclude generic filenames or duplicates that don't look like final logos
    return (
      !name.includes("copy") &&
      !name.includes("image.png") &&
      !name.includes("cars.png") &&
      !name.includes("img_6265") // Exclude very large 1.3MB raw screenshots if any
    );
  });

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export const ClientsTrustSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FFF9EF] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-[2.2rem] font-extrabold font-display text-[#341F60] tracking-tight mb-4"
          >
            Clients Who <span className="text-[#8A32C6]">Trust Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Trusted by leading brands to deliver innovative digital solutions
          </motion.p>
        </div>

        {/* Logos Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={logoVariants}
              whileHover={{ scale: 1.08 }}
              className="w-full h-10 sm:h-16 md:h-20 flex items-center justify-center transition-all duration-300 group"
            >
              <img
                src={logo.url}
                alt={logo.filename.replace(/[-_]removebg[-_]preview|[-_]/g, " ").replace(/\.[^/.]+$/, "")}
                className="max-w-[95%] max-h-full object-contain filter group-hover:brightness-105 transition-all duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
