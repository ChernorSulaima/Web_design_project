/* AgriLink Sierra – Crop Advisory Section
   Popular Sierra Leone crops with modals containing full growing guides
*/
import { useEffect, useRef, useState } from "react";
import {
  X,
  Calendar,
  Leaf,
  Droplets,
  TrendingUp,
  Bug,
  ShoppingBag,
} from "lucide-react";

interface Crop {
  name: string;
  emoji: string;
  season: string;
  planting: string;
  harvest: string;
  fertilizer: string;
  yield: string;
  diseases: string[];
  demand: string;
  color: string;
  bgColor: string;
  description: string;
}

const crops: Crop[] = [
  {
    name: "Rice",
    emoji: "🌾",
    season: "May – November (Rainy Season)",
    planting:
      "Transplant seedlings 21 days after nursery sowing. Space 20×20cm. Flood fields 5cm deep after transplanting.",
    harvest:
      "120–150 days after planting. Harvest when 80% of grains are golden yellow.",
    fertilizer:
      "Apply NPK 15-15-15 at 50kg/acre at planting. Top-dress with urea at 25kg/acre after 30 days.",
    yield:
      "2–4 tonnes per hectare (local varieties); 5–8 tonnes (improved varieties)",
    diseases: [
      "Rice blast",
      "Brown spot",
      "Bacterial leaf blight",
      "Stem borer",
    ],
    demand: "Very High — staple food, always in demand year-round",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    description:
      "Sierra Leone's most important food crop, grown across all 14 districts.",
  },
  {
    name: "Cassava",
    emoji: "🥔",
    season: "Year-round (best: March – May)",
    planting:
      "Plant stem cuttings 25–30cm long at 45° angle. Space 1m×1m. Mound planting improves drainage.",
    harvest:
      "8–18 months after planting. Harvest when leaves turn yellow and stems begin to dry.",
    fertilizer:
      "Apply 10 tonnes/ha of organic compost. Supplement with NPK 10-10-10 at 200kg/ha.",
    yield: "15–25 tonnes per hectare fresh roots",
    diseases: [
      "Cassava mosaic disease",
      "Cassava brown streak",
      "Mealybug",
      "Green mite",
    ],
    demand: "High — used for gari, fufu, and starch production",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    description:
      "A drought-tolerant root crop that provides food security across Sierra Leone.",
  },
  {
    name: "Palm Oil",
    emoji: "🌴",
    season: "Year-round (harvest peaks: Feb–Apr, Jul–Sep)",
    planting:
      "Transplant 12-month-old seedlings. Space 9m×9m triangular. Requires 2,000+ hours of sunshine/year.",
    harvest:
      "3–4 years to first harvest. Harvest when fruits turn orange-red and detach easily.",
    fertilizer:
      "Apply 1.5kg NPK 12-12-17 per palm per year. Split into 2 applications.",
    yield: "3–5 tonnes crude palm oil per hectare per year",
    diseases: [
      "Ganoderma basal stem rot",
      "Vascular wilt",
      "Rhinoceros beetle",
    ],
    demand: "Very High — major export crop and cooking oil staple",
    color: "text-red-700",
    bgColor: "bg-red-50",
    description:
      "Sierra Leone's leading export crop and a key source of farmer income.",
  },
  {
    name: "Cocoa",
    emoji: "🍫",
    season: "Planting: March–May; Harvest: Oct–Feb",
    planting:
      "Plant seedlings under shade trees. Space 3m×3m. Requires 1,500–2,000mm annual rainfall.",
    harvest:
      "3–5 years to first harvest. Harvest pods when they turn yellow/orange and sound hollow.",
    fertilizer:
      "Apply 100g NPK 10-10-10 per tree at 6 months. Increase to 200g from year 2.",
    yield:
      "400–600kg dry beans per hectare (smallholder); up to 1,500kg (managed farms)",
    diseases: [
      "Black pod disease",
      "Swollen shoot virus",
      "Capsid bugs",
      "Stem canker",
    ],
    demand: "Very High — premium export commodity, prices rising globally",
    color: "text-amber-900",
    bgColor: "bg-amber-50",
    description:
      "A high-value export crop grown primarily in Kailahun and Kenema districts.",
  },
  {
    name: "Groundnuts",
    emoji: "🥜",
    season: "May – September",
    planting:
      "Plant seeds 5cm deep, 15cm apart in rows 45cm wide. Requires well-drained sandy loam soil.",
    harvest:
      "90–120 days. Harvest when leaves turn yellow and pods are firm with dark veins.",
    fertilizer:
      "Apply 200kg/ha of superphosphate at planting. Groundnuts fix their own nitrogen.",
    yield: "1–2 tonnes per hectare (unshelled)",
    diseases: [
      "Early leaf spot",
      "Late leaf spot",
      "Rosette virus",
      "Aflatoxin (storage)",
    ],
    demand: "High — used for oil, paste, and direct consumption",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    description:
      "An important legume crop providing protein and income for northern farmers.",
  },
  {
    name: "Maize",
    emoji: "🌽",
    season: "April – August (first season); Aug – Dec (second)",
    planting:
      "Plant 2 seeds per hole, 5cm deep. Space 75cm×25cm. Thin to 1 plant after germination.",
    harvest: "60–90 days. Harvest when husks are dry and kernels are hard.",
    fertilizer:
      "Apply NPK 15-15-15 at 250kg/ha at planting. Top-dress urea at 100kg/ha at knee height.",
    yield: "2–4 tonnes per hectare (local); 6–8 tonnes (hybrid varieties)",
    diseases: [
      "Maize streak virus",
      "Northern leaf blight",
      "Stalk borer",
      "Downy mildew",
    ],
    demand: "High — used for food, animal feed, and processing",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description:
      "A versatile cereal crop grown across Sierra Leone for food and income.",
  },
  {
    name: "Tomatoes",
    emoji: "🍅",
    season: "November – March (dry season)",
    planting:
      "Transplant 4-week-old seedlings. Space 60cm×45cm. Stake plants at 30cm height.",
    harvest:
      "60–80 days after transplanting. Harvest when fruits are firm and fully colored.",
    fertilizer:
      "Apply compost 10t/ha + NPK 20-20-20 at 300kg/ha. Foliar feed weekly.",
    yield: "15–25 tonnes per hectare",
    diseases: [
      "Early blight",
      "Late blight",
      "Bacterial wilt",
      "Tomato mosaic virus",
    ],
    demand: "Very High — high-value vegetable with year-round urban demand",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description:
      "A high-value vegetable crop with strong market demand in urban centers.",
  },
  {
    name: "Sweet Potato",
    emoji: "🍠",
    season: "Year-round (best: May – August)",
    planting:
      "Plant vine cuttings 30–40cm long. Space 30cm apart in ridges 1m wide.",
    harvest:
      "3–5 months. Harvest when leaves turn yellow and vines begin to dry.",
    fertilizer:
      "Apply 5 tonnes/ha compost. Supplement with potassium-rich fertilizer.",
    yield: "10–20 tonnes per hectare",
    diseases: ["Sweet potato weevil", "Alternaria leaf spot", "Fusarium wilt"],
    demand: "Moderate-High — nutritious food crop with growing urban demand",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description:
      "A nutritious, drought-tolerant crop important for food security.",
  },
];

function CropModal({ crop, onClose }: { crop: Crop; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`${crop.bgColor} rounded-t-3xl p-6 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{crop.emoji}</span>
            <div>
              <h3 className={`text-2xl font-extrabold ${crop.color}`}>
                {crop.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{crop.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {[
            {
              icon: Calendar,
              label: "Growing Season",
              value: crop.season,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: Leaf,
              label: "Planting Guide",
              value: crop.planting,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              icon: Calendar,
              label: "Harvest Period",
              value: crop.harvest,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              icon: Droplets,
              label: "Fertilizer Recommendation",
              value: crop.fertilizer,
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              icon: TrendingUp,
              label: "Expected Yield",
              value: crop.yield,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              icon: ShoppingBag,
              label: "Market Demand",
              value: crop.demand,
              color: "text-orange-600",
              bg: "bg-orange-50",
            },
          ].map(item => (
            <div key={item.label} className={`${item.bg} rounded-2xl p-4`}>
              <div
                className={`flex items-center gap-2 ${item.color} font-semibold text-sm mb-2`}
              >
                <item.icon size={16} />
                {item.label}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}

          {/* Diseases */}
          <div className="bg-red-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-red-600 font-semibold text-sm mb-3">
              <Bug size={16} />
              Common Diseases & Pests
            </div>
            <div className="flex flex-wrap gap-2">
              {crop.diseases.map(d => (
                <span
                  key={d}
                  className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium"
                >
                  {d}
                </span>
              ))}
            </div>
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

export default function CropAdvisorySection() {
  const ref = useReveal();
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  return (
    <section id="crops" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-[#2E7D32] text-sm font-semibold mb-4">
            Crop Advisory
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Expert Guidance for
            <br />
            <span className="text-[#2E7D32]">Every Crop You Grow</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Click any crop to access a complete growing guide — from planting to
            harvest, fertilizer to disease management.
          </p>
        </div>

        {/* Crop cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {crops.map((crop, i) => (
            <button
              key={crop.name}
              onClick={() => setSelectedCrop(crop)}
              className={`reveal ${crop.bgColor} rounded-2xl p-5 text-left card-hover border border-white shadow-sm group`}
              style={{ transitionDelay: `${0.05 * i}s` }}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {crop.emoji}
              </div>
              <h3 className={`font-bold text-lg ${crop.color} mb-1`}>
                {crop.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {crop.description}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar size={12} />
                <span>{crop.season.split("(")[0].trim()}</span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#2E7D32] group-hover:gap-2 transition-all">
                View Full Guide →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCrop && (
        <CropModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />
      )}
    </section>
  );
}
