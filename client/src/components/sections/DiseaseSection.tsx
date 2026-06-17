/* AgriLink Sierra – Disease & Pest Detection Section
   Interactive: choose crop + symptoms → get diagnosis + treatment
*/
import { useEffect, useRef, useState } from "react";
import { Bug, Search, AlertTriangle, CheckCircle, Shield } from "lucide-react";

const diseaseData: Record<
  string,
  Record<
    string,
    {
      disease: string;
      description: string;
      treatment: string;
      prevention: string;
      action: string;
      severity: "Low" | "Medium" | "High" | "Critical";
    }
  >
> = {
  Rice: {
    "Yellow leaves": {
      disease: "Rice Yellow Mottle Virus (RYMV)",
      description:
        "Viral disease causing yellowing of leaves, stunted growth, and reduced tillering. Spreads through insects and contaminated water.",
      treatment:
        "No direct cure. Remove and destroy infected plants. Apply insecticides to control vector insects.",
      prevention:
        "Use certified disease-free seeds. Control irrigation water flow between fields. Remove weeds that harbor insects.",
      action:
        "Immediately isolate affected area. Contact agricultural extension officer. Consider replanting with resistant varieties.",
      severity: "High",
    },
    "Brown spots": {
      disease: "Rice Brown Spot (Bipolaris oryzae)",
      description:
        "Fungal disease causing oval brown spots with yellow halos on leaves. Worsens in nutrient-deficient soils.",
      treatment:
        "Apply Mancozeb or Propiconazole fungicide. Improve soil nutrition with balanced NPK fertilizer.",
      prevention:
        "Use resistant varieties. Treat seeds with fungicide before planting. Maintain proper plant nutrition.",
      action:
        "Apply fungicide within 48 hours. Increase potassium fertilization. Monitor spread over next 7 days.",
      severity: "Medium",
    },
    "Holes in stems": {
      disease: "Rice Stem Borer (Scirpophaga spp.)",
      description:
        "Insect pest larvae bore into stems causing 'dead heart' in vegetative stage and 'white ear' at heading.",
      treatment:
        "Apply Carbofuran granules at 1kg AI/ha. Use Chlorpyrifos spray when infestation exceeds 5%.",
      prevention:
        "Destroy crop residues after harvest. Flood fields before planting. Use resistant varieties.",
      action:
        "Count dead hearts — if >5%, apply insecticide immediately. Set up light traps to monitor adult moths.",
      severity: "High",
    },
  },
  Cassava: {
    "Mosaic patterns": {
      disease: "Cassava Mosaic Disease (CMD)",
      description:
        "Viral disease causing mosaic patterns, leaf distortion, and severe yield loss. Spread by whiteflies and infected cuttings.",
      treatment:
        "No cure. Remove and destroy all infected plants. Control whitefly populations with insecticides.",
      prevention:
        "Use certified disease-free stem cuttings. Plant resistant varieties (TME 419, IITA TMS 30572). Control whiteflies.",
      action:
        "Rogue out all infected plants within 100m radius. Source clean planting material. Report to extension officer.",
      severity: "Critical",
    },
    Wilting: {
      disease: "Cassava Bacterial Blight (CBB)",
      description:
        "Bacterial disease causing leaf wilting, angular leaf spots, stem dieback, and gummosis in humid conditions.",
      treatment:
        "No effective chemical control. Remove infected plants. Copper-based sprays may reduce spread.",
      prevention:
        "Use disease-free cuttings. Avoid overhead irrigation. Crop rotation with non-host crops.",
      action:
        "Remove and burn infected plants. Disinfect cutting tools with bleach. Avoid moving plant material between fields.",
      severity: "High",
    },
    "White powder on leaves": {
      disease: "Cassava Mealybug (Phenacoccus manihoti)",
      description:
        "Insect pest causing white cottony masses on growing tips, leaf curling, and stunted growth.",
      treatment:
        "Apply neem oil spray or insecticidal soap. Introduce natural predators (Epidinocarsis lopezi).",
      prevention:
        "Inspect planting material before use. Maintain field hygiene. Avoid over-fertilizing with nitrogen.",
      action:
        "Apply neem-based pesticide immediately. Check neighboring fields. Contact extension officer for biological control.",
      severity: "Medium",
    },
  },
  Maize: {
    "Streaks on leaves": {
      disease: "Maize Streak Virus (MSV)",
      description:
        "Viral disease causing yellow streaks on leaves, stunted growth, and poor ear development. Spread by leafhoppers.",
      treatment:
        "No cure. Remove severely infected plants. Apply insecticides to control leafhopper vectors.",
      prevention:
        "Plant early in the season. Use resistant varieties (TZSR-W, TZSR-Y). Control weeds that harbor leafhoppers.",
      action:
        "Apply insecticide to control leafhoppers. Remove infected plants. Monitor remaining crop weekly.",
      severity: "High",
    },
    "Rotting cobs": {
      disease: "Maize Ear Rot (Fusarium spp.)",
      description:
        "Fungal disease causing pink/white mold on cobs, mycotoxin contamination, and significant yield loss.",
      treatment:
        "Harvest at correct moisture (23%). Dry grain quickly below 13% moisture. Apply fungicide at silking.",
      prevention:
        "Use resistant hybrids. Control stalk borers that create entry points. Harvest promptly at maturity.",
      action:
        "Harvest immediately if possible. Do not feed moldy grain to animals. Dry remaining grain urgently.",
      severity: "Critical",
    },
    "Holes in leaves": {
      disease: "Fall Armyworm (Spodoptera frugiperda)",
      description:
        "Devastating invasive pest causing ragged holes in leaves, frass in whorls, and complete defoliation if uncontrolled.",
      treatment:
        "Apply Emamectin benzoate or Spinosad at first sign. Bacillus thuringiensis for organic control.",
      prevention:
        "Scout fields twice weekly. Use pheromone traps. Intercrop with legumes. Encourage natural predators.",
      action:
        "Apply insecticide within 24 hours of detection. Scout entire field. Report to district agricultural office.",
      severity: "Critical",
    },
  },
  Tomatoes: {
    "Dark spots on fruits": {
      disease: "Early Blight (Alternaria solani)",
      description:
        "Fungal disease causing dark concentric spots on leaves and fruits. Worsens in warm, humid conditions.",
      treatment:
        "Apply Mancozeb or Chlorothalonil fungicide every 7–10 days. Remove infected leaves.",
      prevention:
        "Stake plants for air circulation. Avoid overhead watering. Mulch to prevent soil splash.",
      action:
        "Apply fungicide immediately. Remove and destroy infected plant parts. Improve drainage.",
      severity: "Medium",
    },
    "Wilting suddenly": {
      disease: "Bacterial Wilt (Ralstonia solanacearum)",
      description:
        "Soil-borne bacterial disease causing sudden wilting and death. No effective chemical treatment.",
      treatment:
        "No cure. Remove and destroy infected plants immediately. Solarize soil.",
      prevention:
        "Use resistant varieties. Crop rotation (avoid solanaceous crops for 3 years). Improve drainage.",
      action:
        "Remove infected plants immediately. Do not compost. Solarize soil for 6 weeks before replanting.",
      severity: "Critical",
    },
  },
};

const severityColors: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  Critical: "bg-red-100 text-red-700",
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

export default function DiseaseSection() {
  const ref = useReveal();
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [result, setResult] = useState<
    (typeof diseaseData)[string][string] | null
  >(null);

  const crops = Object.keys(diseaseData);
  const symptoms = selectedCrop
    ? Object.keys(diseaseData[selectedCrop] || {})
    : [];

  const handleDetect = () => {
    if (
      selectedCrop &&
      selectedSymptom &&
      diseaseData[selectedCrop]?.[selectedSymptom]
    ) {
      setResult(diseaseData[selectedCrop][selectedSymptom]);
    }
  };

  const handleReset = () => {
    setSelectedCrop("");
    setSelectedSymptom("");
    setResult(null);
  };

  return (
    <section id="disease" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-sm font-semibold mb-4">
            Disease & Pest Detection
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Identify & Treat Crop
            <br />
            <span className="text-red-600">Diseases Instantly</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Select your crop and describe the symptoms. Our system will identify
            the likely disease and provide treatment and prevention advice.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Detection form */}
          <div
            className="reveal bg-gradient-to-br from-[#1B4332] to-[#2E7D32] rounded-3xl p-6 md:p-8 mb-6"
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="flex items-center gap-2 text-[#FFC107] font-bold text-lg mb-6">
              <Bug size={22} />
              Disease Detector
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Select Your Crop
                </label>
                <select
                  value={selectedCrop}
                  onChange={e => {
                    setSelectedCrop(e.target.value);
                    setSelectedSymptom("");
                    setResult(null);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FFC107]/50 focus:border-[#FFC107]"
                >
                  <option value="" className="text-gray-800">
                    Choose a crop...
                  </option>
                  {crops.map(c => (
                    <option key={c} value={c} className="text-gray-800">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Describe Symptoms
                </label>
                <select
                  value={selectedSymptom}
                  onChange={e => {
                    setSelectedSymptom(e.target.value);
                    setResult(null);
                  }}
                  disabled={!selectedCrop}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#FFC107]/50 focus:border-[#FFC107] disabled:opacity-50"
                >
                  <option value="" className="text-gray-800">
                    Select symptom...
                  </option>
                  {symptoms.map(s => (
                    <option key={s} value={s} className="text-gray-800">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDetect}
                disabled={!selectedCrop || !selectedSymptom}
                className="flex-1 py-3 rounded-xl bg-[#FFC107] text-[#1B4332] font-bold hover:bg-[#FFB300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Search size={18} />
                Detect Disease
              </button>
              {result && (
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="reveal visible bg-white rounded-3xl border border-red-100 shadow-xl overflow-hidden">
              {/* Disease header */}
              <div className="bg-red-50 p-6 border-b border-red-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={18} className="text-red-500" />
                      <span className="text-red-600 font-semibold text-sm">
                        Disease Identified
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-[#1B4332]">
                      {result.disease}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${severityColors[result.severity]}`}
                  >
                    {result.severity} Severity
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {result.description}
                </p>
              </div>

              <div className="p-6 space-y-4">
                {[
                  {
                    icon: CheckCircle,
                    label: "Treatment",
                    value: result.treatment,
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    icon: Shield,
                    label: "Prevention",
                    value: result.prevention,
                    color: "text-green-600",
                    bg: "bg-green-50",
                  },
                  {
                    icon: AlertTriangle,
                    label: "Recommended Action",
                    value: result.action,
                    color: "text-orange-600",
                    bg: "bg-orange-50",
                  },
                ].map(item => (
                  <div
                    key={item.label}
                    className={`${item.bg} rounded-2xl p-4`}
                  >
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
              </div>
            </div>
          )}

          {/* Placeholder when no result */}
          {!result && (
            <div
              className="reveal text-center py-12 text-gray-400"
              style={{ transitionDelay: "0.2s" }}
            >
              <Bug size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                Select a crop and symptom above to identify diseases
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
