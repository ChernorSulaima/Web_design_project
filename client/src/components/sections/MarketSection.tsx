/* AgriLink Sierra – Market Prices Section
   Interactive table with today's/yesterday's prices, trend indicators, locations
*/
import { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Search,
} from "lucide-react";

interface CropPrice {
  crop: string;
  emoji: string;
  today: number;
  yesterday: number;
  unit: string;
  location: string;
  category: string;
}

const cropPrices: CropPrice[] = [
  {
    crop: "Rice (Local)",
    emoji: "🌾",
    today: 85000,
    yesterday: 82000,
    unit: "50kg bag",
    location: "Freetown",
    category: "Grains",
  },
  {
    crop: "Rice (Imported)",
    emoji: "🌾",
    today: 95000,
    yesterday: 95000,
    unit: "50kg bag",
    location: "Freetown",
    category: "Grains",
  },
  {
    crop: "Cassava",
    emoji: "🥔",
    today: 12000,
    yesterday: 13500,
    unit: "100kg",
    location: "Bo",
    category: "Roots",
  },
  {
    crop: "Palm Oil",
    emoji: "🫙",
    today: 45000,
    yesterday: 42000,
    unit: "20L",
    location: "Kenema",
    category: "Oils",
  },
  {
    crop: "Cocoa",
    emoji: "🍫",
    today: 320000,
    yesterday: 315000,
    unit: "100kg",
    location: "Kailahun",
    category: "Export",
  },
  {
    crop: "Coffee",
    emoji: "☕",
    today: 280000,
    yesterday: 290000,
    unit: "100kg",
    location: "Kono",
    category: "Export",
  },
  {
    crop: "Groundnuts",
    emoji: "🥜",
    today: 35000,
    yesterday: 33000,
    unit: "50kg",
    location: "Makeni",
    category: "Legumes",
  },
  {
    crop: "Maize",
    emoji: "🌽",
    today: 28000,
    yesterday: 28000,
    unit: "50kg",
    location: "Tonkolili",
    category: "Grains",
  },
  {
    crop: "Sweet Potato",
    emoji: "🍠",
    today: 18000,
    yesterday: 16000,
    unit: "50kg",
    location: "Moyamba",
    category: "Roots",
  },
  {
    crop: "Tomatoes",
    emoji: "🍅",
    today: 22000,
    yesterday: 25000,
    unit: "crate",
    location: "Freetown",
    category: "Vegetables",
  },
  {
    crop: "Onions",
    emoji: "🧅",
    today: 40000,
    yesterday: 38000,
    unit: "50kg",
    location: "Freetown",
    category: "Vegetables",
  },
  {
    crop: "Pepper",
    emoji: "🌶️",
    today: 15000,
    yesterday: 14000,
    unit: "20kg",
    location: "Bo",
    category: "Vegetables",
  },
];

const categories = [
  "All",
  "Grains",
  "Roots",
  "Oils",
  "Export",
  "Legumes",
  "Vegetables",
];

function TrendIcon({ today, yesterday }: { today: number; yesterday: number }) {
  const diff = today - yesterday;
  if (diff > 0) return <TrendingUp size={16} className="trend-up" />;
  if (diff < 0) return <TrendingDown size={16} className="trend-down" />;
  return <Minus size={16} className="trend-neutral" />;
}

function TrendBadge({
  today,
  yesterday,
}: {
  today: number;
  yesterday: number;
}) {
  const diff = today - yesterday;
  const pct = yesterday > 0 ? ((diff / yesterday) * 100).toFixed(1) : "0";
  if (diff > 0)
    return <span className="text-xs font-semibold trend-up">+{pct}%</span>;
  if (diff < 0)
    return <span className="text-xs font-semibold trend-down">{pct}%</span>;
  return <span className="text-xs font-semibold trend-neutral">0%</span>;
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

export default function MarketSection() {
  const ref = useReveal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [lastUpdated] = useState(new Date().toLocaleTimeString());

  const filtered = cropPrices.filter(c => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.crop.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="market" className="py-20 md:py-28 bg-[#F8FFF8]" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-[#2E7D32] text-sm font-semibold mb-4">
            Live Market Prices
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Today's Crop Prices
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Real-time prices from markets across Sierra Leone. Updated daily to
            help you sell at the best price.
          </p>
        </div>

        {/* Controls */}
        <div
          className="reveal flex flex-col sm:flex-row gap-4 mb-6"
          style={{ transitionDelay: "0.1s" }}
        >
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search crops..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-green-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32]"
            />
          </div>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#2E7D32] text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#2E7D32] hover:text-[#2E7D32]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Last updated */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 ml-auto">
            <RefreshCw size={12} className="text-[#2E7D32]" />
            Updated: {lastUpdated}
          </div>
        </div>

        {/* Table */}
        <div
          className="reveal overflow-x-auto rounded-2xl shadow-lg border border-green-100"
          style={{ transitionDelay: "0.2s" }}
        >
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-[#1B4332] to-[#2E7D32] text-white">
                <th className="text-left px-4 py-4 text-sm font-semibold">
                  Crop
                </th>
                <th className="text-right px-4 py-4 text-sm font-semibold">
                  Today (SLL)
                </th>
                <th className="text-right px-4 py-4 text-sm font-semibold">
                  Yesterday
                </th>
                <th className="text-center px-4 py-4 text-sm font-semibold">
                  Trend
                </th>
                <th className="text-left px-4 py-4 text-sm font-semibold">
                  Unit
                </th>
                <th className="text-left px-4 py-4 text-sm font-semibold">
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((crop, i) => (
                <tr
                  key={crop.crop}
                  className={`border-b border-green-50 hover:bg-green-50/50 transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-[#F8FFF8]"
                  }`}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{crop.emoji}</span>
                      <div>
                        <div className="font-semibold text-[#1B4332] text-sm">
                          {crop.crop}
                        </div>
                        <div className="text-xs text-gray-400">
                          {crop.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-bold text-[#1B4332]">
                      {crop.today.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right text-gray-500 text-sm">
                    {crop.yesterday.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1.5">
                      <TrendIcon
                        today={crop.today}
                        yesterday={crop.yesterday}
                      />
                      <TrendBadge
                        today={crop.today}
                        yesterday={crop.yesterday}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">
                    /{crop.unit}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-[#2E7D32] text-xs font-medium">
                      📍 {crop.location}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    No crops found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary cards */}
        <div
          className="grid sm:grid-cols-3 gap-4 mt-8 reveal"
          style={{ transitionDelay: "0.3s" }}
        >
          {[
            {
              label: "Highest Today",
              crop: "Cocoa",
              value: "Le 320,000/100kg",
              color: "bg-green-50 border-green-200",
              icon: "🍫",
            },
            {
              label: "Most Traded",
              crop: "Rice (Local)",
              value: "Le 85,000/50kg",
              color: "bg-amber-50 border-amber-200",
              icon: "🌾",
            },
            {
              label: "Best Growth",
              crop: "Palm Oil",
              value: "+7.1% today",
              color: "bg-blue-50 border-blue-200",
              icon: "🫙",
            },
          ].map(item => (
            <div
              key={item.label}
              className={`${item.color} border rounded-2xl p-4 flex items-center gap-3`}
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <div className="text-xs text-gray-500 font-medium">
                  {item.label}
                </div>
                <div className="font-bold text-[#1B4332]">{item.crop}</div>
                <div className="text-sm text-[#2E7D32] font-semibold">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
