import { motion } from "framer-motion";
import {
  Smartphone, Globe, Palette, Megaphone, Database, Bot,
  ShoppingCart, Layout, Video
} from "lucide-react";

const services = [
  { title: "Email & WhatsApp Marketing", desc: "Reach customers directly through personalized messaging campaigns.", icon: Megaphone },
  { title: "Post Production & Social Media Ads", desc: "Eye-catching creatives and targeted ad campaigns that convert.", icon: Video },
  { title: "Content Marketing", desc: "Strategic content that builds authority and drives organic growth.", icon: Layout },
  { title: "E-commerce Marketing", desc: "Full-funnel strategies to scale your online store revenue.", icon: ShoppingCart },
  { title: "Social Media Marketing (SMM)", desc: "Build engaged communities across all social platforms.", icon: Globe },
  { title: "Search Engine Optimization (SEO)", desc: "Dominate search rankings with data-driven SEO strategies.", icon: Database },
  { title: "AI-Powered App Development", desc: "Custom mobile solutions driven by artificial intelligence.", icon: Smartphone },
  { title: "AI-Enhanced Web Development", desc: "Modern websites built with cutting-edge AI technology.", icon: Globe },
  { title: "Smart Branding Solutions", desc: "Identity systems that resonate and scale with your business.", icon: Palette },
  { title: "AI-Powered Digital Marketing", desc: "Intelligent campaigns that optimize themselves in real-time.", icon: Bot },
  { title: "Intelligent ERP & CRM Systems", desc: "Streamline operations with AI-enhanced business tools.", icon: Database },
  { title: "Advanced AI Agents & Automation", desc: "Automate workflows with intelligent AI-powered agents.", icon: Bot },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="section-badge">Our Services</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-100 mt-6 mb-4">
          Fueling Growth Through <span className="gradient-text">Digital Innovation</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          We blend creativity with analytics to deliver powerful digital marketing solutions that drive real results.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="glass-card-hover p-8 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/30 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
              <service.icon size={24} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg font-bold text-zinc-100 mb-3">{service.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
