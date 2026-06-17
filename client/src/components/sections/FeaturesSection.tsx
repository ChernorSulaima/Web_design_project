/* AgriLink Sierra – Product Capabilities Section
   Restructured from 10 cards to 4 core professional pillars with Framer Motion animations
*/
import {
  TrendingUp,
  CloudSun,
  ShieldAlert,
  Truck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    desc: "Daily tracking of wholesale and retail prices for staple cash crops from regional trade hubs.",
    features: [
      "Rice, cassava, palm oil, cocoa, and coffee index",
      "Real-time prices from Bo, Kenema, Makeni, and Freetown",
      "Direct price comparisons to prevent buyer exploitation",
    ],
    bg: "bg-white",
  },
  {
    icon: CloudSun,
    title: "Seasonal Crop Calendars",
    desc: "Interactive agricultural planning tools aligned with local rainfall patterns and soil profiles.",
    features: [
      "Custom planting, fertilizing, and harvesting schedules",
      "Localized weather alerts for all 16 districts",
      "Dry/wet season coordination guidelines",
    ],
    bg: "bg-white",
  },
  {
    icon: ShieldAlert,
    title: "Agronomic Diagnostics",
    desc: "Pest and disease identification support built to assist extension officers and farmers in the field.",
    features: [
      "Symptom-based diagnostic checklists",
      "Pest control and crop protection guidelines",
      "Offline-first support for low-connectivity rural areas",
    ],
    bg: "bg-white",
  },
  {
    icon: Truck,
    title: "Machinery & Wholesalers",
    desc: "Coordinated rentals for heavy equipment and direct trading pathways to verified buyers.",
    features: [
      "Tractor, harvester, and water pump rentals",
      "Direct connections to vetted agricultural wholesalers",
      "Simplified transport coordination requests",
    ],
    bg: "bg-white",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
          className="max-w-3xl mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#2E7D32] mb-3">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-6 leading-tight">
            A platform built for the field.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Four core capabilities designed to address the practical challenges
            of farming, logistics, and trading in Sierra Leone.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {pillars.map(pillar => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className={`group ${pillar.bg} border border-gray-200/80 rounded-2xl p-8 hover:border-[#2E7D32]/50 hover:shadow-lg transition-all duration-300`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-6 text-[#2E7D32] group-hover:scale-105 transition-transform duration-200">
                <pillar.icon size={24} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#1B4332] mb-3 group-hover:text-[#2E7D32] transition-colors">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {pillar.desc}
              </p>

              {/* Features list */}
              <ul className="space-y-2 border-t border-gray-100 pt-6">
                {pillar.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-gray-500"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] mt-1.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
          className="rounded-2xl overflow-hidden relative border border-gray-100 shadow-md"
        >
          <div className="bg-[#1B4332] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                Ready to coordinate your next harvest?
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Join over 10,000 farmers and buyers accessing AgriLink Sierra.
                Get in touch with our district coordinators to list your farm.
              </p>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex-shrink-0 px-8 py-4 rounded-full bg-[#FFC107] text-[#1B4332] font-bold text-sm hover:bg-[#FFB300] transition-all duration-200 btn-active flex items-center gap-2"
            >
              Get Registered
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
