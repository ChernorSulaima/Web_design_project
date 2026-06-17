/* AgriLink Sierra – Farm Calculator Section
   JavaScript calculator: farm size + crop + yield + price → revenue, cost, profit, ROI
*/
import { useEffect, useRef, useState } from "react";
import { Calculator, TrendingUp, DollarSign, BarChart3 } from "lucide-react";

const cropCosts: Record<
  string,
  { costPerHa: number; unit: string; avgYield: number }
> = {
  Rice: { costPerHa: 1800000, unit: "kg", avgYield: 2500 },
  Cassava: { costPerHa: 1200000, unit: "kg", avgYield: 18000 },
  Maize: { costPerHa: 1400000, unit: "kg", avgYield: 3000 },
  "Palm Oil": { costPerHa: 2500000, unit: "litres", avgYield: 3000 },
  Cocoa: { costPerHa: 3000000, unit: "kg", avgYield: 500 },
  Coffee: { costPerHa: 2800000, unit: "kg", avgYield: 400 },
  Groundnuts: { costPerHa: 1600000, unit: "kg", avgYield: 1500 },
  Tomatoes: { costPerHa: 3500000, unit: "kg", avgYield: 20000 },
};

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

export default function CalculatorSection() {
  const ref = useReveal();
  const [farmSize, setFarmSize] = useState("1");
  const [crop, setCrop] = useState("Rice");
  const [yieldPerHa, setYieldPerHa] = useState("2500");
  const [pricePerKg, setPricePerKg] = useState("1700");
  const [result, setResult] = useState<{
    revenue: number;
    cost: number;
    profit: number;
    roi: number;
    breakEven: number;
  } | null>(null);

  const handleCropChange = (c: string) => {
    setCrop(c);
    const data = cropCosts[c];
    if (data) {
      setYieldPerHa(String(data.avgYield));
    }
  };

  const calculate = () => {
    const size = parseFloat(farmSize) || 0;
    const yld = parseFloat(yieldPerHa) || 0;
    const price = parseFloat(pricePerKg) || 0;
    const costPerHa = cropCosts[crop]?.costPerHa || 1500000;

    const totalYield = size * yld;
    const revenue = totalYield * price;
    const cost = size * costPerHa;
    const profit = revenue - cost;
    const roi = cost > 0 ? (profit / cost) * 100 : 0;
    const breakEven = cost > 0 && price > 0 ? cost / price : 0;

    setResult({ revenue, cost, profit, roi, breakEven });
  };

  const formatSLL = (n: number) => `Le ${Math.round(n).toLocaleString()}`;

  return (
    <section id="calculator" className="py-20 md:py-28 bg-[#F8FFF8]" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-[#2E7D32] text-sm font-semibold mb-4">
            Farm Calculator
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Know Your Numbers
            <br />
            <span className="text-[#2E7D32]">Before You Plant</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Calculate your estimated revenue, production costs, profit, and ROI
            before investing in your next farming season.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input form */}
          <div className="reveal" style={{ transitionDelay: "0.1s" }}>
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-green-100">
              <div className="flex items-center gap-2 text-[#1B4332] font-bold text-lg mb-6">
                <Calculator size={22} className="text-[#2E7D32]" />
                Farm Details
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Farm Size (Hectares)
                  </label>
                  <input
                    type="number"
                    value={farmSize}
                    onChange={e => setFarmSize(e.target.value)}
                    min="0.1"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] text-[#1B4332] font-medium"
                    placeholder="e.g. 2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Crop Type
                  </label>
                  <select
                    value={crop}
                    onChange={e => handleCropChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] text-[#1B4332] font-medium"
                  >
                    {Object.keys(cropCosts).map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Yield (kg/ha)
                  </label>
                  <input
                    type="number"
                    value={yieldPerHa}
                    onChange={e => setYieldPerHa(e.target.value)}
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] text-[#1B4332] font-medium"
                    placeholder="e.g. 2500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Average for {crop}:{" "}
                    {cropCosts[crop]?.avgYield?.toLocaleString()}{" "}
                    {cropCosts[crop]?.unit}/ha
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Market Price (SLL per kg)
                  </label>
                  <input
                    type="number"
                    value={pricePerKg}
                    onChange={e => setPricePerKg(e.target.value)}
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] text-[#1B4332] font-medium"
                    placeholder="e.g. 1700"
                  />
                </div>

                <button
                  onClick={calculate}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white font-bold text-base hover:from-[#1B4332] hover:to-[#2E7D32] transition-all duration-200 btn-active shadow-lg hover:shadow-xl"
                >
                  Calculate Profit & ROI
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="reveal" style={{ transitionDelay: "0.2s" }}>
            {result ? (
              <div className="space-y-4">
                {/* Main metrics */}
                {[
                  {
                    icon: DollarSign,
                    label: "Estimated Revenue",
                    value: formatSLL(result.revenue),
                    color: "bg-blue-50 border-blue-200",
                    iconColor: "text-blue-600",
                    valColor: "text-blue-700",
                  },
                  {
                    icon: BarChart3,
                    label: "Production Cost",
                    value: formatSLL(result.cost),
                    color: "bg-orange-50 border-orange-200",
                    iconColor: "text-orange-600",
                    valColor: "text-orange-700",
                  },
                  {
                    icon: TrendingUp,
                    label: "Estimated Profit",
                    value: formatSLL(result.profit),
                    color:
                      result.profit >= 0
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200",
                    iconColor:
                      result.profit >= 0 ? "text-green-600" : "text-red-600",
                    valColor:
                      result.profit >= 0 ? "text-green-700" : "text-red-700",
                  },
                ].map(item => (
                  <div
                    key={item.label}
                    className={`${item.color} border rounded-2xl p-5 flex items-center gap-4`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm`}
                    >
                      <item.icon size={22} className={item.iconColor} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">
                        {item.label}
                      </div>
                      <div
                        className={`text-2xl font-extrabold ${item.valColor}`}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}

                {/* ROI & Break-even */}
                <div className="bg-gradient-to-br from-[#1B4332] to-[#2E7D32] rounded-2xl p-5 text-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-white/70 text-sm mb-1">
                        Return on Investment
                      </div>
                      <div className="text-3xl font-extrabold text-[#FFC107]">
                        {result.roi.toFixed(1)}%
                      </div>
                      <div className="text-white/60 text-xs mt-1">
                        {result.roi >= 20
                          ? "✅ Excellent"
                          : result.roi >= 0
                            ? "⚠️ Marginal"
                            : "❌ Loss"}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/70 text-sm mb-1">
                        Break-even Yield
                      </div>
                      <div className="text-3xl font-extrabold text-white">
                        {Math.round(result.breakEven).toLocaleString()}
                      </div>
                      <div className="text-white/60 text-xs mt-1">
                        kg needed to break even
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advice */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
                  <span className="font-semibold">💡 Tip: </span>
                  {result.roi >= 30
                    ? "Excellent returns! Consider scaling up your farm size next season."
                    : result.roi >= 0
                      ? "Profitable but consider reducing costs or finding better market prices."
                      : "This scenario shows a loss. Try increasing yield or finding higher-paying buyers."}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-white rounded-3xl border border-dashed border-green-200">
                <Calculator size={64} className="text-green-200 mb-4" />
                <h3 className="text-[#1B4332] font-bold text-lg mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-gray-400 text-sm max-w-xs">
                  Fill in your farm details on the left and click "Calculate" to
                  see your projected revenue, costs, profit, and ROI.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
