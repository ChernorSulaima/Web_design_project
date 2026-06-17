/* AgriLink Sierra – Success Stories Section
   Animated testimonials from Sierra Leone farmers with ratings and income improvements
*/
import { useEffect, useRef, useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Quote,
} from "lucide-react";

const stories = [
  {
    name: "Aminata Koroma",
    location: "Bo District",
    crop: "Rice Farmer",
    avatar: "👩🏾‍🌾",
    rating: 5,
    before: "Le 2.4M/season",
    after: "Le 4.1M/season",
    increase: "+71%",
    quote:
      "Before AgriLink Sierra, I had no idea what the rice price was in Freetown. I was selling to middlemen for almost nothing. Now I sell directly to buyers and my income has nearly doubled in just one season.",
    years: "2 years on platform",
  },
  {
    name: "Mohamed Bangura",
    location: "Kenema District",
    crop: "Cocoa & Coffee Farmer",
    avatar: "👨🏾‍🌾",
    rating: 5,
    before: "Le 8.5M/season",
    after: "Le 14.2M/season",
    increase: "+67%",
    quote:
      "The disease detection tool saved my entire cocoa harvest last year. I noticed the symptoms early, used the treatment guide, and stopped the spread before it became a disaster. AgriLink Sierra is a lifesaver.",
    years: "3 years on platform",
  },
  {
    name: "Fatmata Sesay",
    location: "Tonkolili District",
    crop: "Vegetable Farmer",
    avatar: "👩🏿‍🌾",
    rating: 5,
    before: "Le 1.8M/season",
    after: "Le 3.6M/season",
    increase: "+100%",
    quote:
      "The weather forecast helped me plan my planting perfectly. I avoided two major rain events that would have flooded my tomato beds. The crop calendar is now my farming bible.",
    years: "1.5 years on platform",
  },
  {
    name: "Ibrahim Conteh",
    location: "Kailahun District",
    crop: "Cassava & Palm Oil",
    avatar: "👨🏿‍🌾",
    rating: 5,
    before: "Le 5.2M/season",
    after: "Le 8.9M/season",
    increase: "+71%",
    quote:
      "I used the farm calculator before planting season and realized I was underpricing my cassava by 30%. The market price data showed me exactly what buyers were paying in Freetown. Game changer.",
    years: "2.5 years on platform",
  },
  {
    name: "Mariama Kamara",
    location: "Moyamba District",
    crop: "Poultry Farmer",
    avatar: "👩🏾‍🌾",
    rating: 5,
    before: "Le 3.1M/year",
    after: "Le 5.8M/year",
    increase: "+87%",
    quote:
      "The livestock vaccination schedule reminded me to vaccinate my chickens for Newcastle disease. Last year, my neighbor lost 400 birds to the same disease I prevented. I now have 800 birds and growing.",
    years: "2 years on platform",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating ? "text-[#FFC107] fill-[#FFC107]" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(e =>
          e.target.classList.toggle("visible", e.isIntersecting)
        ),
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) el.querySelectorAll(".reveal").forEach(r => observer.observe(r));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function StoriesSection() {
  const ref = useReveal();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c === 0 ? stories.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === stories.length - 1 ? 0 : c + 1));

  const story = stories[current];

  return (
    <section
      id="stories"
      className="py-20 md:py-28 bg-gradient-to-br from-[#1B4332] to-[#2E7D32] relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FFC107]/10 translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 container">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC107] text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Real Farmers,
            <br />
            <span className="text-[#FFC107]">Real Results</span>
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Hear from Sierra Leone farmers who transformed their livelihoods
            with AgriLink Sierra.
          </p>
        </div>

        {/* Featured story */}
        <div
          className="max-w-4xl mx-auto reveal"
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-white/20">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Farmer info */}
              <div className="text-center md:text-left">
                <div className="text-7xl mb-4">{story.avatar}</div>
                <h3 className="text-white font-extrabold text-xl">
                  {story.name}
                </h3>
                <p className="text-white/60 text-sm">{story.crop}</p>
                <p className="text-white/50 text-xs mt-1">
                  📍 {story.location}
                </p>
                <div className="mt-3">
                  <StarRating rating={story.rating} />
                </div>
                <p className="text-white/40 text-xs mt-2">{story.years}</p>

                {/* Income comparison */}
                <div className="mt-4 bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-1 text-[#FFC107] font-bold text-lg mb-2">
                    <TrendingUp size={18} />
                    {story.increase}
                  </div>
                  <div className="text-xs text-white/60 space-y-1">
                    <div>
                      Before:{" "}
                      <span className="text-white/80 font-medium">
                        {story.before}
                      </span>
                    </div>
                    <div>
                      After:{" "}
                      <span className="text-[#4CAF50] font-bold">
                        {story.after}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <Quote size={40} className="text-[#FFC107]/40 mb-4" />
                  <p className="text-white text-lg leading-relaxed font-medium italic">
                    "{story.quote}"
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                  <div className="flex gap-2">
                    {stories.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                          i === current
                            ? "bg-[#FFC107] w-6"
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={next}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini cards */}
        <div
          className="grid sm:grid-cols-3 gap-4 mt-8 reveal"
          style={{ transitionDelay: "0.2s" }}
        >
          {stories.slice(0, 3).map((s, i) => (
            <button
              key={s.name}
              onClick={() => setCurrent(i)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                current === i
                  ? "bg-white/20 border-[#FFC107]/50"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{s.avatar}</span>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {s.name}
                  </div>
                  <div className="text-white/50 text-xs">{s.location}</div>
                </div>
              </div>
              <div className="text-[#FFC107] font-bold text-sm">
                {s.increase} income
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
