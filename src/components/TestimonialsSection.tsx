import { useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTestimonials } from "@/lib/api";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
  rating: number;
}

// Placeholder cards shown while loading or when no data
const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    _id: "p1",
    name: "Arjun Menon",
    role: "CEO",
    company: "NovaTech Solutions",
    quote:
      "CrevionAds transformed our digital presence completely. Their AI-driven campaigns delivered 3x more leads within the first month. The team is brilliant and always ahead of the curve.",
    rating: 5,
  },
  {
    _id: "p2",
    name: "Priya Nair",
    role: "Marketing Director",
    company: "BloomRetail",
    quote:
      "Working with CrevionAds was a game-changer. Their branding strategy gave us a fresh identity that resonates perfectly with our audience. Results speak for themselves.",
    rating: 5,
  },
  {
    _id: "p3",
    name: "Rahul Krishnan",
    role: "Founder",
    company: "StartupForge",
    quote:
      "Exceptional work on our web platform. The team understood our vision from day one and delivered a product that exceeded every expectation. Highly recommend!",
    rating: 5,
  },
  {
    _id: "p4",
    name: "Sneha George",
    role: "Head of Growth",
    company: "EduConnect",
    quote:
      "The SEO and content strategy from CrevionAds took us from page 5 to page 1 on Google in just 8 weeks. Their approach is methodical, data-driven, and incredibly effective.",
    rating: 5,
  },
  {
    _id: "p5",
    name: "Arun Thomas",
    role: "CTO",
    company: "FinEdge",
    quote:
      "Their app development team built our fintech solution with precision and care. Security, performance, and UX — they nailed all three. Outstanding technical depth.",
    rating: 5,
  },
  {
    _id: "p6",
    name: "Divya Pillai",
    role: "Brand Manager",
    company: "SilkRoute Fashion",
    quote:
      "CrevionAds crafted a visual identity for us that's both timeless and modern. Their creative team truly understands brand storytelling at its finest.",
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "fill-amber-400 text-amber-400" : "text-zinc-700"}
      />
    ))}
  </div>
);

const AvatarInitials = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
      {initials}
    </div>
  );
};

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <div
    className="relative flex-shrink-0 w-[340px] md:w-[380px] bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mx-3 flex flex-col gap-4 backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300 group"
    style={{ willChange: "transform" }}
  >
    {/* Quote icon */}
    <div className="absolute top-5 right-5 text-violet-500/20 group-hover:text-violet-500/40 transition-colors">
      <Quote size={32} fill="currentColor" />
    </div>

    <StarRating rating={t.rating} />

    <p className="text-zinc-300 text-sm leading-relaxed line-clamp-4 flex-grow">
      "{t.quote}"
    </p>

    <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
      {t.image ? (
        <img
          src={t.image}
          alt={t.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-white/10"
        />
      ) : (
        <AvatarInitials name={t.name} />
      )}
      <div>
        <p className="text-zinc-100 font-semibold text-sm">{t.name}</p>
        <p className="text-zinc-500 text-xs">
          {t.role} · {t.company}
        </p>
      </div>
    </div>
  </div>
);

// Infinite auto-scrolling track (inspired by crevion-ads marquee animation)
const ScrollingTrack = ({
  testimonials,
  direction = "left",
  speed = 35,
}: {
  testimonials: Testimonial[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  // Duplicate items for seamless loop
  const items = [...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let position = direction === "left" ? 0 : -(track.scrollWidth / 2);
    const pixelsPerSecond = speed;

    let lastTime: number | null = null;

    const animate = (timestamp: number) => {
      if (lastTime === null) lastTime = timestamp;
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      if (direction === "left") {
        position -= pixelsPerSecond * delta;
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(position) >= halfWidth) position = 0;
      } else {
        position += pixelsPerSecond * delta;
        const halfWidth = track.scrollWidth / 2;
        if (position >= 0) position = -halfWidth;
      }

      track.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { lastTime = null; animationId = requestAnimationFrame(animate); };

    track.parentElement?.addEventListener("mouseenter", pause);
    track.parentElement?.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      track.parentElement?.removeEventListener("mouseenter", pause);
      track.parentElement?.removeEventListener("mouseleave", resume);
    };
  }, [direction, speed, testimonials]);

  return (
    <div className="overflow-hidden relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div ref={trackRef} className="flex" style={{ width: "max-content" }}>
        {items.map((t, i) => (
          <TestimonialCard key={`${t._id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  // Use real data if available, otherwise use placeholders
  const displayData: Testimonial[] =
    testimonials && testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS;

  // Ensure enough items for smooth single-track loop
  const extendedItems = displayData.length < 4 ? [...displayData, ...displayData, ...displayData] : displayData;

  return (
    <section className="py-20 md:py-32 overflow-hidden" id="testimonials">
      {/* Header */}
      <div ref={headingRef} className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <span className="section-badge">Client Love</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-100 text-center mt-4 mb-4"
        >
          Success Stories from the{" "}
          <span className="gradient-text">Brands We've Helped</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-500 text-center max-w-2xl mx-auto"
        >
          Real results from real clients. Here's what businesses say after working
          with CrevionAds to scale their growth.
        </motion.p>
      </div>

      {/* Single scrolling track animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <ScrollingTrack testimonials={extendedItems} direction="left" speed={40} />
      </motion.div>
    </section>
  );
};
