import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/lib/api";
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

  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  });

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
          initial={{ y: -100, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 120, damping: 20 }}
          style={{
            background: scrolled
              ? "rgba(10, 6, 22, 0.45)"
              : "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: scrolled 
              ? "1px solid rgba(255, 255, 255, 0.12)" 
              : "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "60px",
            boxShadow: scrolled
              ? "inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), 0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 50px -12px rgba(102, 89, 165, 0.2)"
              : "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), none",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => smoothScroll(e, "#home")}
              className="flex-shrink-0"
            >
              <img
                src={logo}
                alt="CrevionAds"
                className={`h-10 md:h-12 w-auto transition-all duration-300 ${scrolled ? 'brightness-110' : ''}`}
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => {
                if (link.label === "Services") {
                  return (
                    <div key={link.label} className="relative group py-2">
                      <button
                        onClick={(e) => smoothScroll(e as any, link.href)}
                        className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 ${
                          activeSection === link.href 
                            ? "text-brand-primary" 
                            : scrolled 
                              ? "text-white hover:text-brand-primary" 
                              : "text-zinc-200 hover:text-white"
                        }`}
                      >
                        {link.label}
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Glassmorphism Dropdown */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                        <div className="glass-card p-2 border border-white/10 shadow-2xl backdrop-blur-2xl bg-[#0a0616]/90 rounded-2xl flex flex-col gap-1">
                          {services && services.length > 0 ? (
                            services.map((service: any) => (
                              <Link
                                key={service._id}
                                to={`/services/${service.slug}`}
                                className="px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-zinc-300 hover:text-brand-primary hover:bg-white/5 rounded-xl transition-all duration-200"
                              >
                                {service.title}
                              </Link>
                            ))
                          ) : (
                            <span className="px-4 py-2 text-xs text-zinc-500 italic">No services loaded</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => smoothScroll(e, link.href)}
                    className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-brand-primary after:transition-all after:duration-300 ${
                      activeSection === link.href 
                        ? "text-brand-primary after:w-full" 
                        : scrolled 
                          ? "text-white hover:text-brand-primary after:w-0 hover:after:w-full" 
                          : "text-zinc-200 hover:text-white after:w-0 hover:after:w-full"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
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
                  {navLinks.map((link) => {
                    if (link.label === "Services") {
                      return (
                        <div key={link.label} className="flex flex-col gap-1.5 py-1">
                          <button
                            onClick={(e) => smoothScroll(e as any, link.href)}
                            className="text-base font-bold uppercase tracking-widest text-left text-zinc-400 py-1.5 px-2 hover:text-white transition-colors"
                          >
                            Services
                          </button>
                          <div className="flex flex-col gap-2 pl-4 border-l border-white/10 ml-2">
                            {services && services.length > 0 ? (
                              services.map((service: any) => (
                                <Link
                                  key={service._id}
                                  to={`/services/${service.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-brand-primary py-1.5 px-2 transition-colors"
                                >
                                  {service.title}
                                </Link>
                              ))
                            ) : (
                              <span className="text-xs text-zinc-500 italic py-1 px-2">No services loaded</span>
                            )}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => smoothScroll(e, link.href)}
                        className={`text-base font-bold uppercase tracking-widest transition-colors py-2 px-2 ${
                          activeSection === link.href ? "text-brand-primary" : "text-zinc-200 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}

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

    </div>
  );
};