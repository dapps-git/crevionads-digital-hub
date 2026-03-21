import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/crevionads_logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/30 backdrop-blur-2xl shadow-[0_4px_30px_rgba(53,37,98,0.25)] border-b border-secondary/15"
          : "bg-transparent backdrop-blur-sm"
      }`}
     style={{
  background: scrolled
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(255, 255, 255, 0.04)",

  WebkitBackdropFilter: scrolled
    ? "blur(30px) saturate(200%)"
    : "blur(20px) saturate(160%)",

  backdropFilter: scrolled
    ? "blur(30px) saturate(200%)"
    : "blur(20px) saturate(160%)",

  border: "1px solid rgba(255, 255, 255, 0.15)",

  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",

  borderRadius: "20px",
}}
    >
      <div className="max-w-7xl  mt-3 rounded-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-22">
          <a href="#home" onClick={(e) => smoothScroll(e, "#home")} className="flex-shrink-0">
            <img src={logo} alt="CrevionAds" className="h-16 md:h-22 w-auto" />
          </a>

          <div className="hidden md:flex items-center font-serif gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => smoothScroll(e, link.href)}
                className="text-lg font-medium text-muted-foreground  hover:text-accent transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
           <a
  href="https://wa.me/918113908262?text=Hi%20I%20would%20like%20to%20know%20more%20about%20your%20services%20(AI%20Development,%20Web%20Development,%20Digital%20Marketing)"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setMobileOpen(false)}
  className="btn-primary text-center text-sm !py-3 mt-2"
>
  Contact Us
</a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-background/20 backdrop-blur-2xl border-b border-secondary/10 overflow-hidden"
            style={{ WebkitBackdropFilter: "blur(40px) saturate(180%)" }}
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { smoothScroll(e, link.href); setMobileOpen(false); }}
                  className="text-base font-medium text-muted-foreground hover:text-accent transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
            <a
  href="https://wa.me/918113908262?text=Hi%20I%20would%20like%20to%20know%20more%20about%20your%20services%20(AI%20Development,%20Web%20Development,%20Digital%20Marketing)"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setMobileOpen(false)}
  className="btn-primary text-center text-sm !py-3 mt-2"
>
  Contact Us
</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
