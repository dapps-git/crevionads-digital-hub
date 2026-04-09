import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Smartphone, Globe, Palette, Megaphone, Database, Bot,
  ShoppingCart, Layout, Video
} from "lucide-react";

const services = [
  { slug: "ai-powered-app-development", title: "AI-Powered App Development", desc: "Custom mobile solutions driven by artificial intelligence.", icon: Smartphone },
  { slug: "ai-enhanced-web-development", title: "AI-Enhanced Web Development", desc: "Modern websites built with cutting-edge AI technology.", icon: Globe },
  { slug: "smart-branding-solutions", title: "Smart Branding Solutions", desc: "Identity systems that resonate and scale with your business.", icon: Palette },
  { slug: "ai-powered-digital-marketing", title: "AI-Powered Digital Marketing", desc: "Intelligent campaigns that optimize themselves in real-time.", icon: Megaphone },
  { slug: "intelligent-erp-crm-systems", title: "Intelligent ERP & CRM Systems", desc: "Streamline operations with AI-enhanced business tools.", icon: Database },
  { slug: "advanced-ai-agents-automation", title: "Advanced AI Agents & Automation", desc: "Automate workflows with intelligent AI-powered agents.", icon: Bot },
  { slug: "ecommerce-development-marketing", title: "Ecommerce Development & Marketing", desc: "Full-funnel strategies to scale your online store revenue.", icon: ShoppingCart },
  { slug: "ui-ux-design", title: "UI/UX Design", desc: "Beautiful, intuitive interfaces that delight users and drive conversions.", icon: Layout },
  { slug: "video-editing-production", title: "Video Editing & Production", desc: "Professional video content that captivates and tells your brand story.", icon: Video },
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
  const navigate = useNavigate();

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
            onClick={() => navigate(`/services/${service.slug}`)}
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
