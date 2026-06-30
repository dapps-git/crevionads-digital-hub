import { useState } from "react";
import logo from "@/assets/crevionads_logo.png";
import bgImage from "@/assets/hero-bg.webp";
import { Facebook, Instagram, Linkedin, Send, MapPin, Phone, Mail, CheckCircle } from "lucide-react";

export const Footer = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email && !form.phone) return;
    setLoading(true);

    const body = `Name: ${form.firstName} ${form.lastName}%0APhone: ${form.phone}%0AMessage: ${form.message}`;
    const mailtoLink = `mailto:crevionads@gmail.com?subject=New Enquiry from ${encodeURIComponent(form.firstName + " " + form.lastName)}&body=${body}`;

    setTimeout(() => {
      window.open(mailtoLink, "_blank");
      setSubmitted(true);
      setLoading(false);
    }, 600);
  };
  return (
    <footer className="relative bg-[#05030A] pt-20 pb-8 overflow-hidden font-sans border-t border-white/5">
      {/* Background Image & Overlay Grid */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-color-dodge pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#8A32C6 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Soft Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05030A] via-[#05030A]/90 to-transparent pointer-events-none" />
      <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Top Section: Contact & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Left Column: Contact details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight font-display">
              Let's Create Something <span className="bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">Extraordinary</span>
            </h2>

            <div className="space-y-6">
              {/* Location */}
              <div 
                onClick={() => setShowMap(true)} 
                className="flex gap-4 items-start group cursor-pointer hover:bg-white/[0.02] p-2 -m-2 rounded-xl transition-all duration-300"
                title="Click to view map location"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-center text-amber-400 group-hover:bg-purple-900/40 group-hover:border-purple-500/40 transition-all duration-300 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Location</p>
                  <p className="text-zinc-200 text-sm font-medium hover:text-[#F4CE45] transition-colors">V3QC+WQ Valanchery, Kerala, India</p>
                </div>
              </div>

              {/* Contact numbers */}
              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-center text-amber-400 group-hover:bg-purple-900/40 group-hover:border-purple-500/40 transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">WhatsApp & Call</p>
                  <div className="flex flex-col gap-1.5">
                    <a
                      href="https://wa.me/918113908262"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 text-sm hover:text-[#25D366] transition-colors font-medium flex items-center gap-1.5"
                    >
                      <span>🇮🇳 +91 81139 08262</span>
                    </a>
                    <a
                      href="https://wa.me/971542545909"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 text-sm hover:text-[#25D366] transition-colors font-medium flex items-center gap-1.5"
                    >
                      <span>🇦🇪 +971 54 254 5909</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-center text-amber-400 group-hover:bg-purple-900/40 group-hover:border-purple-500/40 transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-0.5">Email Support</p>
                  <a
                    href="mailto:crevionads@gmail.com"
                    className="text-zinc-200 text-sm hover:text-[#F4CE45] transition-colors font-medium"
                  >
                    crevionads@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form (7 cols) */}
          <div className="lg:col-span-7 relative group">
            {/* Soft glowing purple overlay behind form card */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600/10 to-amber-500/5 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000" />

            <div className="relative bg-[#0a0616]/75 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 font-display tracking-tight text-center">
                Send Us a <span className="text-[#F4CE45]">Message</span>
              </h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                    <CheckCircle className="w-12 h-12 text-green-400" strokeWidth={1.5} />
                    <p className="text-white font-bold text-base">Message Sent!</p>
                    <p className="text-zinc-400 text-xs font-light max-w-xs">
                      Your email client will open with a pre-filled message. We'll get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", phone: "", email: "", message: "" }); }}
                      className="mt-2 text-xs text-zinc-500 hover:text-white underline transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-zinc-400 text-xs mb-1.5 font-medium ml-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.04] transition-all duration-300 placeholder:text-zinc-600"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-xs mb-1.5 font-medium ml-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.04] transition-all duration-300 placeholder:text-zinc-600"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-zinc-400 text-xs mb-1.5 font-medium ml-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.04] transition-all duration-300 placeholder:text-zinc-600"
                        placeholder="+91 99999 99999"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 text-xs mb-1.5 font-medium ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.04] transition-all duration-300 placeholder:text-zinc-600"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 text-xs mb-1.5 font-medium ml-1">Your Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                        required
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#8A32C6]/50 focus:bg-white/[0.04] transition-all duration-300 resize-none placeholder:text-zinc-600"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#F4CE45] hover:bg-[#ffe374] disabled:opacity-70 text-[#05030A] font-bold rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 text-xs"
                      >
                        {loading ? (
                          <><span>Sending...</span><div className="w-4 h-4 border-2 border-[#05030A]/30 border-t-[#05030A] rounded-full animate-spin" /></>
                        ) : (
                          <><span>Send Message</span><Send size={14} /></>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Middle Section: Logo and Description */}
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-10 pt-10 border-t border-white/5">
          <img src={logo} alt="CrevionAds" className="h-8 mb-6 filter drop-shadow-md" />

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 px-4">
            We deliver result-driven software solutions, custom AI systems, and search-optimized marketing assets designed to accelerate user acquisition and corporate growth.
          </p>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8 text-xs font-semibold text-zinc-300 tracking-wider uppercase">
            <a href="#services" className="hover:text-[#F4CE45] transition-colors">Service</a>
            <a href="#about" className="hover:text-[#F4CE45] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#F4CE45] transition-colors">Contact</a>
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-3">
            {[
              { icon: Facebook, url: "https://www.facebook.com/share/193DC9qBVu/?mibextid=wwXIfr", hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/30", label: "Facebook" },
              { icon: Instagram, url: "https://www.instagram.com/crevion.ads?utm_source=qr", hoverColor: "hover:text-[#E4405F] hover:border-[#E4405F]/30", label: "Instagram" },
              { icon: Linkedin, url: "https://www.linkedin.com/company/crevion-ads/", hoverColor: "hover:text-[#0077B5] hover:border-[#0077B5]/30", label: "LinkedIn" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`w-9 h-9 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 ${social.hoverColor} hover:bg-white/[0.05] hover:scale-105 transition-all duration-300`}
              >
                <social.icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 tracking-wider uppercase">
          <p>© 2026 CREVIONads. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span className="w-px h-3 bg-white/10"></span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Google Maps Popover Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-all">
          <div className="relative w-full max-w-2xl bg-[#0a0616] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/5 bg-white/5">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} className="text-amber-400" />
                CrevionAds Office Location
              </span>
              <button 
                onClick={() => setShowMap(false)}
                className="text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-white/20 rounded-md px-2.5 py-1 bg-white/5"
              >
                Close
              </button>
            </div>
            {/* Embedded Google Map */}
            <div className="aspect-[16/10] w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.4926616783399!2d76.07108506459656!3d10.889835268882038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b70002de3c2f%3A0xc5e0646e1b97ce32!2sAtom%20Institute%20of%20Science%20Valanchery%20%7C%20Entrance%20Coaching!5e0!3m2!1sen!2sin!4v1782815644631!5m2!1sen!2sin" 
                className="w-full h-full border-0" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
