/* AgriLink Sierra – Livestock Management Section
   Cards for cattle, goats, sheep, poultry, pigs with health info
*/
import { useEffect, useRef, useState } from "react";
import {
  Syringe,
  Utensils,
  Weight,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Livestock {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  vaccination: string[];
  feeding: string;
  weight: string;
  healthTips: string[];
  population: string;
}

const livestock: Livestock[] = [
  {
    name: "Cattle",
    emoji: "🐄",
    color: "text-amber-800",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    vaccination: [
      "FMD vaccine – every 6 months",
      "Anthrax – annually",
      "Blackquarter – annually",
      "Brucellosis – once at 6 months",
    ],
    feeding:
      "Provide 10–15kg dry matter daily. Mix grass, legume hay, and crop residues. Supplement with salt licks and mineral blocks. Ensure 30–50L clean water daily.",
    weight:
      "Local breeds: 150–250kg. Improved breeds: 300–500kg. Monitor monthly — weight loss indicates health issues.",
    healthTips: [
      "Deworm every 3 months",
      "Check hooves monthly for foot rot",
      "Provide shade during dry season",
      "Separate sick animals immediately",
    ],
    population: "~400,000 head in Sierra Leone",
  },
  {
    name: "Goats",
    emoji: "🐐",
    color: "text-stone-700",
    bgColor: "bg-stone-50",
    borderColor: "border-stone-200",
    vaccination: [
      "PPR vaccine – every 2 years",
      "FMD – every 6 months",
      "Goat pox – annually",
    ],
    feeding:
      "Goats are browsers — provide browse plants, shrubs, and hay. Supplement with 200–400g concentrate daily for lactating does. Water 3–5L daily.",
    weight:
      "West African Dwarf: 20–35kg. Sahel breeds: 35–60kg. Weigh monthly for growth tracking.",
    healthTips: [
      "Deworm every 2 months",
      "Trim hooves every 3 months",
      "Check for mange and lice weekly",
      "Vaccinate kids at 3 months",
    ],
    population: "~600,000 head — most common livestock in Sierra Leone",
  },
  {
    name: "Sheep",
    emoji: "🐑",
    color: "text-gray-700",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    vaccination: [
      "PPR – every 2 years",
      "Enterotoxaemia – annually",
      "Sheep pox – annually",
    ],
    feeding:
      "Graze on grass and legumes. Supplement with 300g concentrate for ewes in late pregnancy. Provide mineral licks. Water 3–4L daily.",
    weight:
      "Djallonké breed: 25–40kg. Monitor for parasitic worm burden causing weight loss.",
    healthTips: [
      "Shear wool twice yearly",
      "Foot bath monthly for foot rot prevention",
      "Separate ewes before lambing",
      "Check for internal parasites monthly",
    ],
    population: "~200,000 head in Sierra Leone",
  },
  {
    name: "Poultry",
    emoji: "🐔",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    vaccination: [
      "Newcastle disease – every 3 months",
      "Gumboro – at 14 & 21 days",
      "Fowl pox – at 6 weeks",
      "Marek's disease – at day 1",
    ],
    feeding:
      "Broilers: 2.5–3kg feed per kg weight gain. Layers: 120g/bird/day. Provide clean water at all times. Use complete commercial feeds or formulate locally.",
    weight:
      "Local breeds: 1.5–2kg at 16 weeks. Broilers: 2–2.5kg at 6–8 weeks. Layers: 1.5–2kg at point of lay.",
    healthTips: [
      "Clean and disinfect houses weekly",
      "Maintain proper ventilation",
      "Biosecurity — restrict farm visitors",
      "Remove dead birds immediately",
    ],
    population: "~5 million birds — most important livestock sector",
  },
  {
    name: "Pigs",
    emoji: "🐷",
    color: "text-pink-700",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    vaccination: [
      "Swine fever – every 6 months",
      "Erysipelas – annually",
      "FMD – every 6 months",
    ],
    feeding:
      "Provide 2–3kg balanced feed daily. Include kitchen waste, cassava peels, and bran. Ensure 5–10L clean water daily. Avoid feeding raw meat or garbage.",
    weight:
      "Local breeds: 50–80kg at 8 months. Improved breeds: 80–120kg at 6 months. Weigh monthly.",
    healthTips: [
      "Wallow area prevents heat stress",
      "Deworm every 3 months",
      "Separate boars from sows except for breeding",
      "Keep pens dry and clean daily",
    ],
    population: "~100,000 head in Sierra Leone",
  },
];

function LivestockCard({ animal }: { animal: Livestock }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${animal.bgColor} ${animal.borderColor} border rounded-2xl overflow-hidden card-hover`}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{animal.emoji}</span>
            <div>
              <h3 className={`font-bold text-xl ${animal.color}`}>
                {animal.name}
              </h3>
              <p className="text-gray-500 text-xs">{animal.population}</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/70 rounded-xl p-2.5 flex items-center gap-2">
            <Weight size={14} className="text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Weight Range</div>
              <div className="text-xs font-semibold text-gray-700 truncate">
                {animal.weight.split(".")[0]}
              </div>
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-2.5 flex items-center gap-2">
            <Syringe size={14} className="text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Vaccines</div>
              <div className="text-xs font-semibold text-gray-700">
                {animal.vaccination.length} required
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-[600px]" : "max-h-0"}`}
      >
        <div className="px-5 pb-5 space-y-4 border-t border-white/50 pt-4">
          {/* Vaccination */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Syringe size={14} className="text-blue-500" />
              Vaccination Schedule
            </div>
            <ul className="space-y-1">
              {animal.vaccination.map(v => (
                <li
                  key={v}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </div>

          {/* Feeding */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Utensils size={14} className="text-green-500" />
              Feeding Guide
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {animal.feeding}
            </p>
          </div>

          {/* Health tips */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Heart size={14} className="text-red-500" />
              Health Tips
            </div>
            <ul className="space-y-1">
              {animal.healthTips.map(tip => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <span className="text-green-500 mt-0.5">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
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

export default function LivestockSection() {
  const ref = useReveal();

  return (
    <section id="livestock" className="py-20 md:py-28 bg-[#F8FFF8]" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-[#2E7D32] text-sm font-semibold mb-4">
            Livestock Management
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Keep Your Animals
            <br />
            <span className="text-[#2E7D32]">Healthy & Productive</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Complete care guides for all major livestock in Sierra Leone. Click
            any animal to expand vaccination schedules, feeding guides, and
            health tips.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {livestock.map((animal, i) => (
            <div
              key={animal.name}
              className="reveal"
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              <LivestockCard animal={animal} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
