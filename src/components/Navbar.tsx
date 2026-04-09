import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/crevionads_logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Reach", href: "#about" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy Logic
      if (location.pathname === "/") {
        const sections = navLinks.map(link => document.querySelector(link.href));
        let current = "";
        
        for (const section of sections) {
          if (section) {
            const sectionTop = (section as HTMLElement).offsetTop;
            const sectionHeight = (section as HTMLElement).clientHeight;
            if (window.scrollY >= sectionTop - 150) {
              current = "#" + section.id;
            }
          }
        }
        
        if (current) {
          setActiveSection(current);
        } else if (window.scrollY < 100) {
          setActiveSection("#home");
        }
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation and render, then scroll
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 pt-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: scrolled
              ? "rgba(255, 255, 255, 0.10)"
              : "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(30px) saturate(200%)",
            WebkitBackdropFilter: "blur(30px) saturate(200%)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: "60px",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.15)"
              : "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.10)",
            transition: "all 0.4s ease",
          }}
        >
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5">
            
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => smoothScroll(e, "#home")}
              className="flex-shrink-0"
            >
              <img
                src={logo}
                alt="CrevionAds"
                className="h-12  md:h-14 w-auto"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex  gap-7 ">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => smoothScroll(e, link.href)}
                  className={`text-lg font-semibold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-brand-accent after:transition-all after:duration-300 ${
                    activeSection === link.href ? "text-brand-accent after:w-full" : "text-zinc-200 hover:text-brand-accent after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Button */}
            <div className="hidden md:block">
              <a
                href="https://wa.me/918113908262?text=Hi%20I%20would%20like%20to%20know%20more%20about%20your%20services%20(AI%20Development,%20Web%20Development,%20Digital%20Marketing)"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Let's Talk
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground p-1 hover:text-brand-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-hidden"
              >
                <div
                  className="px-4 py-4 flex flex-col gap-3"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.10)",
                    margin: "0 16px",
                  }}
                >
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => smoothScroll(e, link.href)}
                      className={`text-lg font-medium transition-colors py-2 px-2 ${
                        activeSection === link.href ? "text-brand-accent" : "text-zinc-200 hover:text-brand-accent"
                       }`}
                    >
                      {link.label}
                    </a>
                  ))}

                  <a
                    href="https://wa.me/918113908262?text=Hi%20I%20would%20like%20to%20know%20more%20about%20your%20services%20(AI%20Development,%20Web%20Development,%20Digital%20Marketing)"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary text-center mt-3"
                  >
                    Let's Talk
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Spacer */}
      <div className="h-24" />
    </div>
  );
};