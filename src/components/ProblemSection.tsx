import { motion } from "framer-motion";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import busImage from "../assets/bus.jpeg"; // Adjust the path if needed
export const ProblemSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#FFF9EF] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto pt-4 md:pt-0">
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-[2.2rem] font-extrabold text-[#341F60] leading-[1.2] text-center tracking-tight">
              Software & Marketing Challenges<br />and their Best Solutions
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

          {/* Left Column - Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-900 group">
              {/* Loading State */}
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#341F60]/10 backdrop-blur-sm">
                  <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                // @ts-ignore
                webkit-playsinline="true"
                preload="auto"
                onCanPlay={() => setIsVideoLoading(false)}
                onPlaying={() => setIsVideoLoading(false)}
                onLoadedData={() => setIsVideoLoading(false)}
                onError={(e) => {
                  // @ts-ignore
                  const videoError = e.target?.error;
                  console.error("Detailed Video Error:", {
                    code: videoError?.code,
                    message: videoError?.message,
                    event: e
                  });
                  setIsVideoLoading(false);
                }}
              >
                <source src="/assets/problem-section.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Audio Toggle Overlay */}
              <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 p-3.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all z-20 border border-white/20 shadow-xl"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

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
            <p className="text-lg lg:text-[1.2rem] font-medium text-[#8A32C6]/90 leading-relaxed max-w-2xl font-sans">
              Modern businesses often struggle with scaling their software infrastructure, generating sustainable leads, and standing out in a crowded market.
              The ideal solution is a unified, result-driven approach using cutting-edge IT systems, intelligent marketing strategies, and data-backed
              optimization to deliver consistent growth and scalable results.
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
                  <text className="text-[10.5px] font-extrabold fill-[#8A32C6] uppercase tracking-[0.22em]">
                    <textPath href="#spinTextPath" startOffset="0%">
                      Leading IT company since 2024
                    </textPath>
                  </text>
                </svg>

                {/* Center Icon */}
                <div className="w-16 h-16 rounded-full bg-[#8A32C6]/10 flex items-center justify-center text-[#341F60] transition-transform duration-300 group-hover:scale-110 shadow-sm border border-[#8A32C6]/20">
                  <ArrowUpRight size={32} />
                </div>
              </div>

              {/* Horizontal Image */}
              <div className="w-full flex-grow max-w-lg h-48 sm:h-56 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(52,31,96,0.3)] bg-slate-100">
                <img
                  src={busImage}
                  alt="Business"
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
