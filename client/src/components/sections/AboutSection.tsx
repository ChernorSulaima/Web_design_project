/* AgriLink Sierra – About Section
   Mission, Vision, Objectives with refined editorial styling and layout
*/
import { Check, Target, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const objectives = [
  "Verify and list buyers across all 16 districts",
  "Provide daily market price updates for key cash crops",
  "Offer localized crop calendars matching rainfall cycles",
  "Deliver pest diagnostics and control guidelines",
  "List available agricultural machinery and rentals",
  "Support farmer-to-farmer knowledge exchange",
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

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#F8FFF8] overflow-hidden">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={fadeUp}
          className="max-w-3xl mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#2E7D32] mb-3">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-6 leading-tight">
            Direct access to markets, tools, and expertise.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            AgriLink Sierra is a dedicated platform designed to bridge the
            information gap for smallholder farmers. By providing direct access
            to price indices, weather alerts, and diagnostic tools, we help
            farmers across all 16 districts of Sierra Leone make informed
            business decisions.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Text columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="lg:col-span-7 space-y-10"
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-[#2E7D32]">
                  <Target size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#1B4332]">
                  Eliminating Exploitation
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We track market prices daily in Freetown, Bo, Kenema, and
                  Makeni. By putting pricing data directly in farmers' hands, we
                  empower them to negotiate fairly and bypass middleman
                  exploitation.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-[#2E7D32]">
                  <Users size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#1B4332]">
                  Local Coordination
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We work closely with local farmer associations and
                  agricultural extension officers to ensure our advice and
                  calendars match regional soils and rainfall cycles.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-[#2E7D32]">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-lg font-bold text-[#1B4332]">
                  Practical Guidance
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our guides are designed for ease of use in the field. From
                  disease detection to fertilizer calculations, we offer
                  concrete solutions to protect crops and maximize yield.
                </p>
              </motion.div>
            </div>

            {/* Objectives block */}
            <motion.div
              variants={fadeUp}
              className="border-t border-gray-200/60 pt-8"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-6">
                Our Operations Include
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[#2E7D32] flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Image and Floating Stat */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={fadeUp}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-[#2E7D32]/10 to-[#FFC107]/10 rounded-2xl blur-xl" />
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663769906012/gYjNRkJ4sprEcDQXrTs6jn/about-farming-XYDCykZYU4T2vyGrmD5Zs8.webp"
                alt="Sierra Leone agricultural worker"
                className="relative rounded-2xl w-full object-cover shadow-lg border border-gray-100"
                style={{ height: "400px" }}
                loading="lazy"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 bg-[#1B4332] text-white rounded-xl shadow-lg p-5 flex items-center gap-4 border border-white/10">
                <div>
                  <div className="text-2xl font-extrabold text-[#FFC107]">
                    +40%
                  </div>
                  <div className="text-white/70 text-[10px] uppercase tracking-wider font-semibold">
                    Average Income Gain
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
