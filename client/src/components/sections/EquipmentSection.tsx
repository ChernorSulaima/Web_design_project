/* AgriLink Sierra – Equipment Rental Section */
import { useEffect, useRef } from "react";
import { MapPin, Phone, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const equipment = [
  {
    name: "Tractor (4WD)",
    emoji: "🚜",
    price: "Le 250,000/day",
    available: true,
    location: "Bo",
    desc: "John Deere 5075E, 75HP. Suitable for land preparation and cultivation.",
  },
  {
    name: "Combine Harvester",
    emoji: "🌾",
    price: "Le 400,000/day",
    available: false,
    location: "Kenema",
    desc: "Rice and maize harvester. Reduces harvest time by 80%.",
  },
  {
    name: "Water Pump (5HP)",
    emoji: "💧",
    price: "Le 80,000/day",
    available: true,
    location: "Freetown",
    desc: "Diesel water pump for irrigation. Capacity: 500L/min.",
  },
  {
    name: "Generator (10KVA)",
    emoji: "⚡",
    price: "Le 120,000/day",
    available: true,
    location: "Makeni",
    desc: "Reliable power for irrigation systems and farm equipment.",
  },
  {
    name: "Disc Plough",
    emoji: "🔧",
    price: "Le 150,000/day",
    available: true,
    location: "Tonkolili",
    desc: "3-disc plough for deep tillage. Attaches to standard tractor.",
  },
  {
    name: "Sprayer (Motorized)",
    emoji: "🌿",
    price: "Le 60,000/day",
    available: true,
    location: "Moyamba",
    desc: "16L motorized backpack sprayer for pesticides and fertilizers.",
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

export default function EquipmentSection() {
  const ref = useReveal();

  return (
    <section id="equipment" className="py-20 md:py-28 bg-[#F8FFF8]" ref={ref}>
      <div className="container">
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-4">
            Equipment Rental
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Rent Farm Equipment
            <br />
            <span className="text-orange-600">At Affordable Rates</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Access tractors, harvesters, pumps, and more without the high cost
            of ownership.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {equipment.map((item, i) => (
            <div
              key={item.name}
              className="reveal bg-white rounded-2xl p-5 shadow-md border border-orange-50 card-hover"
              style={{ transitionDelay: `${0.07 * i}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{item.emoji}</span>
                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.available ? (
                    <CheckCircle size={12} />
                  ) : (
                    <XCircle size={12} />
                  )}
                  {item.available ? "Available" : "Booked"}
                </span>
              </div>
              <h3 className="font-bold text-[#1B4332] text-lg mb-1">
                {item.name}
              </h3>
              <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                {item.desc}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                <MapPin size={12} />
                {item.location}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#2E7D32] text-base">
                  {item.price}
                </span>
                <button
                  onClick={() =>
                    item.available
                      ? toast.success(`Booking request sent for ${item.name}!`)
                      : toast.error(`${item.name} is currently unavailable.`)
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 btn-active ${
                    item.available
                      ? "bg-[#2E7D32] text-white hover:bg-[#1B4332]"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {item.available ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
