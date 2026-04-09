import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const ProblemSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#FFF9EF] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 w-full">
          {/* Left Yellow Line */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden md:block w-24 lg:w-48 h-[6px] bg-[#F4CE45]"
          />
          
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#341F60] leading-[1.2] text-center">
              Digital Agency Problem<br />and their Best Solutions
            </h2>
          </motion.div>
          
          {/* Right Floating Squares */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-24 h-24 hidden md:block flex-shrink-0"
          >
            <div className="absolute top-0 right-0 w-14 h-14 bg-[#8A32C6]"></div>
            <div className="absolute bottom-0 left-0 w-14 h-14 bg-[#F4CE45]"></div>
          </motion.div>
        </div>

        {/* Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Vertical Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
                alt="Digital Agency Social Media" 
                className="w-full h-full object-cover" 
              />
              {/* Overlay styling if needed */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#341F60]/20 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Right Column - Content & Second Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 flex flex-col justify-center gap-14 h-full pt-4 lg:pt-8"
          >
            <p className="text-xl lg:text-[1.35rem] font-medium text-[#8A32C6]/80 leading-relaxed max-w-2xl">
              Digital agencies often struggle with visibility, lead generation, and standing out in a crowded market.
              The best solution is a result-driven approach using smart strategies, creative content, and data-backed
              optimization to deliver consistent growth and measurable results.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12 mt-auto">
              
              {/* Spinning Button */}
              <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center group cursor-pointer hover:opacity-90 transition-opacity">
                <svg 
                  className="absolute inset-0 w-full h-full origin-center animate-[spin_10s_linear_infinite]" 
                  viewBox="0 0 100 100"
                >
                  <path 
                    id="spinTextPath" 
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" 
                    fill="transparent" 
                  />
                  <text className="text-[10.5px] font-bold fill-[#8A32C6] uppercase tracking-[0.22em]">
                    <textPath href="#spinTextPath" startOffset="0%">
                      Leading IT company since 2024 • Leading
                    </textPath>
                  </text>
                </svg>
                
                {/* Center Icon */}
                <div className="w-16 h-16 rounded-full bg-[#8A32C6]/10 flex items-center justify-center text-[#341F60] transition-transform duration-300 group-hover:scale-110 shadow-sm border border-[#8A32C6]/20">
                  <ArrowUpRight size={32} />
                </div>
              </div>

              {/* Horizontal Image */}
              <div className="w-full flex-grow max-w-lg h-48 sm:h-56 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(52,31,96,0.3)]">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tech Solutions Analytics" 
                  className="w-full h-full object-cover" 
                />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
