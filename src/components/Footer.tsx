import logo from "@/assets/crevionads_logo.png";
import img from "@/assets/hero-bg.png";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Product: ["Home", "Services", "About", "Contact"],
  Resources: ["Blog", "Case Studies", "FAQ"],
  Legal: ["Terms & Conditions", "Privacy Policy"],
};

export const Footer = () => {
  return (
    <footer
      className="  border-t border-white/10"
      style={{ 
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundColor: "rgba(0, 0, 0, 0.7)", // Fallback color if image fails to load
      }}
    >
    
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* GRID */}
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* LOGO + DESC */}
          <div>
            <img src={logo} alt="CrevionAds" className="h-16 mb-4" />
            <p className="text-zinc-100 text-sm leading-relaxed">
              Performance-driven digital marketing agency helping brands grow faster with AI-powered strategies.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">
              <a href="#" target="_blank" className="text-zinc-100 hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a href="#" target="_blank" className="text-zinc-100 hover:text-white transition">
                <Instagram size={18} />
              </a>
              <a href="#" target="_blank" className="text-zinc-100 hover:text-white transition">
                <Twitter size={18} />
              </a>
              <a href="#" target="_blank" className="text-zinc-100 hover:text-white transition">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-zinc-100 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-100 text-sm">
          <p>© {new Date().getFullYear()} CrevionAds. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};