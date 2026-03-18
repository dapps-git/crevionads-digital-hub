import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export const ContactSection = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">
          Get Your Free Quota Today!
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl font-bold text-zinc-100 mb-8">Contact Us</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-zinc-100 font-medium">Address</p>
                <p className="text-zinc-400 text-sm">K.P.M. Arcade, Kerala, Valanchery, India - 676552</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-zinc-100 font-medium">Contact</p>
                <p className="text-zinc-400 text-sm">+91 81139 08262</p>
                <p className="text-zinc-400 text-sm">+91 9947400278</p>
                <p className="text-zinc-400 text-sm">+971 542545909</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={20} className="text-accent mt-1 flex-shrink-0" />
              <div>
                <p className="text-zinc-100 font-medium">Email</p>
                <p className="text-zinc-400 text-sm">crevionads@gmail.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form className="glass-card p-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                className="bg-muted/50 border border-secondary/20 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-secondary/50 transition-colors"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                className="bg-muted/50 border border-secondary/20 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-secondary/50 transition-colors"
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-muted/50 border border-secondary/20 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-secondary/50 transition-colors"
            />
            <input
              name="phone"
              placeholder="Phone No"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-muted/50 border border-secondary/20 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-secondary/50 transition-colors"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full bg-muted/50 border border-secondary/20 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-secondary/50 transition-colors resize-none"
            />
            <button type="submit" className="btn-primary w-full text-center">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
