/* AgriLink Sierra – FAQ Section with animated accordion */
import { useEffect, useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How do I join AgriLink Sierra?",
    a: "Joining is free and easy! Click the 'Join Now' button at the top of the page, fill in your name, district, phone number, and farm type. You'll receive a confirmation SMS and can start using all features immediately.",
  },
  {
    q: "How do I sell my crops through the platform?",
    a: "Once registered, go to the Buyer Marketplace section to browse verified buyers looking for your crops. Click 'Contact' on any buyer card to send them a message. You can also list your produce by contacting our team via the Contact form.",
  },
  {
    q: "How do I receive weather updates for my area?",
    a: "The Weather Dashboard automatically shows conditions for your registered district. You can also set up SMS alerts by updating your profile preferences. Weather data is updated every hour from meteorological stations across Sierra Leone.",
  },
  {
    q: "How can buyers contact me?",
    a: "After registering, buyers can find your listing in the Farmer Directory (coming soon). You can also proactively contact buyers through the Marketplace. All communications are facilitated through our secure messaging system.",
  },
  {
    q: "Is AgriLink Sierra available in local languages?",
    a: "Currently the platform is in English, but we are actively working on Krio and Temne language support. Our SMS alerts are available in Krio. Contact us if you need assistance in your local language.",
  },
  {
    q: "How accurate are the market prices?",
    a: "Market prices are collected daily from major markets in Freetown, Bo, Kenema, Makeni, and other district capitals. Our field agents verify prices each morning. Prices may vary slightly by location and quality.",
  },
  {
    q: "Is the platform free to use?",
    a: "Basic features including market prices, weather forecasts, crop advisory, and disease detection are completely free. Premium features like direct buyer connections and equipment rental booking are available with a small subscription fee.",
  },
  {
    q: "What should I do if I detect a disease in my crops?",
    a: "Use our Disease Detection tool immediately — select your crop and describe the symptoms to get an instant diagnosis. Follow the treatment recommendations provided. For severe outbreaks, contact your district agricultural extension officer and report through our platform.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-green-100 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-green-50/50 transition-colors"
      >
        <span className="font-semibold text-[#1B4332] pr-4 text-sm md:text-base">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`text-[#2E7D32] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-green-50 pt-4">
          {a}
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

export default function FAQSection() {
  const ref = useReveal();

  return (
    <section id="faq" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container">
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-[#2E7D32] text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Frequently Asked
            <br />
            <span className="text-[#2E7D32]">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Everything you need to know about AgriLink Sierra. Can't find an
            answer? Contact us directly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="reveal"
              style={{ transitionDelay: `${0.05 * i}s` }}
            >
              <FAQItem q={faq.q} a={faq.a} index={i} />
            </div>
          ))}
        </div>

        <div
          className="text-center mt-10 reveal"
          style={{ transitionDelay: "0.4s" }}
        >
          <p className="text-gray-500 text-sm">
            Still have questions?{" "}
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-[#2E7D32] font-semibold hover:underline"
            >
              Contact our team →
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
