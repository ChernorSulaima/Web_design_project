/* AgriLink Sierra – Educational Resources Section */
import { useEffect, useRef } from "react";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const resources = [
  {
    title: "Modern Farming Techniques",
    type: "Guide",
    icon: BookOpen,
    color: "bg-green-100 text-green-700",
    desc: "Comprehensive guide to modern agricultural practices adapted for Sierra Leone's climate and soil conditions.",
    tag: "PDF",
  },
  {
    title: "Organic Farming in West Africa",
    type: "Guide",
    icon: BookOpen,
    color: "bg-lime-100 text-lime-700",
    desc: "Learn how to transition to organic farming while maintaining profitability and soil health.",
    tag: "PDF",
  },
  {
    title: "Integrated Pest Management",
    type: "Guide",
    icon: BookOpen,
    color: "bg-red-100 text-red-700",
    desc: "Identify, prevent, and manage crop pests using eco-friendly integrated approaches.",
    tag: "PDF",
  },
  {
    title: "Greenhouse Farming Basics",
    type: "Video",
    icon: Video,
    color: "bg-blue-100 text-blue-700",
    desc: "Step-by-step video tutorial on setting up and managing a small greenhouse farm.",
    tag: "Video",
  },
  {
    title: "Livestock Care Fundamentals",
    type: "Video",
    icon: Video,
    color: "bg-orange-100 text-orange-700",
    desc: "Essential livestock management practices for cattle, goats, sheep, and poultry.",
    tag: "Video",
  },
  {
    title: "Post-Harvest Handling",
    type: "Guide",
    icon: FileText,
    color: "bg-amber-100 text-amber-700",
    desc: "Reduce post-harvest losses with proper storage, processing, and packaging techniques.",
    tag: "PDF",
  },
  {
    title: "Soil Health & Fertility",
    type: "Guide",
    icon: BookOpen,
    color: "bg-yellow-100 text-yellow-700",
    desc: "Test your soil and improve fertility with organic and inorganic amendments.",
    tag: "PDF",
  },
  {
    title: "Irrigation Systems Setup",
    type: "Video",
    icon: Video,
    color: "bg-cyan-100 text-cyan-700",
    desc: "Install drip and sprinkler irrigation systems on small to medium farms.",
    tag: "Video",
  },
  {
    title: "Farm Business Planning",
    type: "Guide",
    icon: FileText,
    color: "bg-purple-100 text-purple-700",
    desc: "Create a business plan for your farm, access credit, and manage farm finances.",
    tag: "PDF",
  },
];

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

export default function ResourcesSection() {
  const ref = useReveal();

  return (
    <section id="resources" className="py-20 md:py-28 bg-[#F8FFF8]" ref={ref}>
      <div className="container">
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-sm font-semibold mb-4">
            Educational Resources
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Learn, Grow,
            <br />
            <span className="text-purple-600">Succeed</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Free guides, videos, and PDFs to help you master modern farming
            techniques and grow your agricultural business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((resource, i) => (
            <div
              key={resource.title}
              className="reveal bg-white rounded-2xl p-5 shadow-md border border-gray-100 card-hover"
              style={{ transitionDelay: `${0.05 * i}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl ${resource.color} flex items-center justify-center`}
                >
                  <resource.icon size={18} />
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    resource.tag === "Video"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {resource.tag}
                </span>
              </div>
              <h3 className="font-bold text-[#1B4332] text-base mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {resource.desc}
              </p>
              <button
                onClick={() => toast.info(`Opening "${resource.title}"...`)}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#2E7D32] hover:text-[#1B4332] transition-colors"
              >
                <ExternalLink size={14} />
                {resource.tag === "Video" ? "Watch Now" : "Download PDF"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
