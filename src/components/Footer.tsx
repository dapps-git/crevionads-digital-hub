import logo from "@/assets/crevionads_logo.png";
import bgImage from "@/assets/hero-bg.png";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-[#090412] pt-24 pb-10 overflow-hidden font-body">
      {/* Background Image Setup */}
      <div 
        className="absolute inset-0 opacity-60 mix-blend-screen pointer-events-none"
        style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />
      {/* Subtle overlay gradient to ensure text remains highly readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090412]/50 via-transparent to-[#090412] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Top Section: Contact & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-28">
          
          {/* Left: Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-12 font-display tracking-tight">
              Contact <span className="text-[#8A32C6]">Us</span>
            </h2>
            
            <div className="border-l-[3px] border-[#F4CE45] pl-6 sm:pl-8 space-y-8 py-2">
              <div>
                <p className="text-zinc-400 text-sm font-medium mb-1">Address</p>
                <p className="text-zinc-100 text-lg sm:text-xl font-medium leading-snug">
                  123 street<br/>
                  al ain<br/>
                  mn road
                </p>
              </div>
              
              <div>
                <p className="text-zinc-400 text-sm font-medium mb-1">Contact</p>
                <p className="text-zinc-100 text-lg sm:text-xl font-medium">
                  +3678299273
                </p>
              </div>
              
              <div>
                <p className="text-zinc-400 text-sm font-medium mb-1">Email</p>
                <p className="text-zinc-100 text-lg sm:text-xl font-medium">
                  villa1223@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="relative group">
            {/* Apple-like gradient glow behind the glass card */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Glassmorphic Form Container */}
            <div className="relative bg-[#090412]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl h-full">
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-8 text-center font-display tracking-tight">
                Send Us a <span className="text-[#F4CE45]">Message</span>
              </h3>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-zinc-300 text-sm mb-2 ml-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-sm mb-2 ml-1">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-zinc-300 text-sm mb-2 ml-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 text-sm mb-2 ml-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-zinc-300 text-sm mb-2 ml-1">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.05] transition-all resize-none"
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button type="submit" className="w-full py-3.5 bg-white text-[#090412] font-semibold rounded-xl hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        </div>

        {/* Middle Section: Logo, Description & Links */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-16">
          <img src={logo} alt="CrevionAds" className="h-10 sm:h-12 mb-8 drop-shadow-lg" />
          
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-12 max-w-3xl">
            We deliver result-driven digital marketing solutions that help businesses increase visibility, generate quality leads, and boost revenue.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 mb-12 text-sm font-semibold text-zinc-100 tracking-wide">
            <a href="#work" className="hover:text-[#F4CE45] transition-colors">Work</a>
            <a href="#service" className="hover:text-[#F4CE45] transition-colors">Service</a>
            <a href="#about" className="hover:text-[#F4CE45] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#F4CE45] transition-colors">Contact</a>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a href="#" className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <Facebook size={22} strokeWidth={1.5} />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <Instagram size={22} strokeWidth={1.5} />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <Youtube size={24} strokeWidth={1.5} />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <Linkedin size={22} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-white/10 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-400 tracking-wide">
          <p>© 2026 CREVIONads. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span className="w-px h-4 bg-white/20"></span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};