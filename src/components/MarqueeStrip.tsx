const items = [
  "Social Media Marketing",
  "AI Powered App Development",
  "Social Media Marketing",
  "AI Powered App Development",
  "SEO Optimization",
  "Content Marketing",
];

export const MarqueeStrip = () => {
  return (
    <div className="py-6 bg-primary/20 border-y border-secondary/10 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-sm font-medium text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
