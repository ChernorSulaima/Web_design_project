/* AgriLink Sierra – Hero Section
   Full-screen hero with animated farmland background, stats, clean typography
   and rotating headlines using framer-motion.
*/
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Farmers Connected" },
  { value: 16, suffix: "", label: "Districts Covered" },
  { value: 250, suffix: "+", label: "Verified Buyers" },
  { value: 95, suffix: "%", label: "Satisfaction Rate" },
];

const headlines = [
  "Connecting Sierra Leone's Farms to Markets, Prices, & Advice",
  "Direct Trade Pathways for Farmers & Wholesalers",
  "Localized Weather Forecasts & Seasonal Calendars",
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % headlines.length);
    }, 4500); // Cycles every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#1B4332]"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663769906012/gYjNRkJ4sprEcDQXrTs6jn/hero-farmland-GbSSGwiU88AWzLR83VsCVq.webp)`,
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332]/95 via-[#1B4332]/85 to-[#1B4332]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC107] text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
            Built for Sierra Leone's Agricultural Sector
          </div>

          {/* Headline Container with dynamic layout transition */}
          <motion.div
            layout
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[140px] sm:min-h-[120px] md:min-h-[160px] lg:min-h-[220px] flex items-center mb-6 w-full"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {headlines[index]}
              </motion.h1>
            </AnimatePresence>
          </motion.div>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            AgriLink Sierra provides real-time market data, localized weather
            forecasts, and direct connections to buyers. Build a stronger farm
            business with tools designed for our local districts.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-wrap gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <button
              onClick={() => handleScroll("contact")}
              className="px-8 py-4 rounded-full bg-[#FFC107] text-[#1B4332] font-bold text-base hover:bg-[#FFB300] transition-all duration-200 btn-active shadow-xl hover:shadow-2xl hover:shadow-amber-400/20"
            >
              Get Started
            </button>
            <button
              onClick={() => handleScroll("features")}
              className="px-8 py-4 rounded-full border border-white/30 text-white font-bold text-base hover:bg-white/10 hover:border-white transition-all duration-200 btn-active backdrop-blur-sm"
            >
              Explore Services
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-white/10 animate-fade-in-up"
            style={{ animationDelay: "0.65s" }}
          >
            {stats.map(stat => (
              <div key={stat.label} className="text-left">
                <div
                  className="text-3xl sm:text-4xl font-extrabold text-[#FFC107] mb-1"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/70 text-xs uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => handleScroll("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
