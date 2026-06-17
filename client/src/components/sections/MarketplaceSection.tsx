/* AgriLink Sierra – Buyer Marketplace Section */
import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, ShoppingBag, Search } from "lucide-react";
import { toast } from "sonner";

const buyers = [
  {
    name: "Freetown Rice Traders Ltd",
    products: ["Rice"],
    location: "Freetown",
    phone: "+232 76 123 456",
    quantity: "50 tonnes/month",
    avatar: "🏢",
    verified: true,
  },
  {
    name: "Bo Agricultural Cooperative",
    products: ["Cassava", "Maize"],
    location: "Bo",
    phone: "+232 77 234 567",
    quantity: "20 tonnes/month",
    avatar: "🤝",
    verified: true,
  },
  {
    name: "Sierra Leone Palm Oil Co.",
    products: ["Palm Oil"],
    location: "Kenema",
    phone: "+232 78 345 678",
    quantity: "10,000 litres/month",
    avatar: "🏭",
    verified: true,
  },
  {
    name: "West Africa Cocoa Exporters",
    products: ["Cocoa", "Coffee"],
    location: "Kailahun",
    phone: "+232 79 456 789",
    quantity: "100 tonnes/season",
    avatar: "🌍",
    verified: true,
  },
  {
    name: "Makeni Fresh Produce Market",
    products: ["Tomatoes", "Vegetables", "Pepper"],
    location: "Makeni",
    phone: "+232 76 567 890",
    quantity: "5 tonnes/week",
    avatar: "🥬",
    verified: false,
  },
  {
    name: "Kono Groundnut Processors",
    products: ["Groundnuts"],
    location: "Kono",
    phone: "+232 77 678 901",
    quantity: "15 tonnes/month",
    avatar: "🥜",
    verified: true,
  },
  {
    name: "National Food Reserve Agency",
    products: ["Rice", "Maize", "Cassava"],
    location: "Freetown",
    phone: "+232 78 789 012",
    quantity: "200 tonnes/month",
    avatar: "🏛️",
    verified: true,
  },
  {
    name: "Moyamba Vegetable Buyers",
    products: ["Vegetables", "Sweet Potato"],
    location: "Moyamba",
    phone: "+232 79 890 123",
    quantity: "3 tonnes/week",
    avatar: "🌿",
    verified: false,
  },
];

const allProducts = [
  "All",
  "Rice",
  "Cassava",
  "Palm Oil",
  "Cocoa",
  "Coffee",
  "Vegetables",
  "Groundnuts",
  "Maize",
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

export default function MarketplaceSection() {
  const ref = useReveal();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = buyers.filter(b => {
    const matchFilter = filter === "All" || b.products.includes(filter);
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <section id="marketplace" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
            Buyer Marketplace
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4332] mb-4">
            Connect Directly
            <br />
            <span className="text-blue-600">With Verified Buyers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Skip the middlemen. Connect directly with buyers across Sierra Leone
            who are actively looking for your produce.
          </p>
        </div>

        {/* Background image strip */}
        <div
          className="reveal rounded-3xl overflow-hidden mb-8 relative"
          style={{ transitionDelay: "0.1s" }}
        >
          <div
            className="h-32 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663769906012/gYjNRkJ4sprEcDQXrTs6jn/marketplace-bg-JxdyGsCSTHfvgLiYPDGECE.webp)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332]/80 to-transparent flex items-center px-8">
            <div>
              <div className="text-white font-extrabold text-xl">
                250+ Active Buyers
              </div>
              <div className="text-white/70 text-sm">
                Across all 14 districts of Sierra Leone
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className="reveal flex flex-col sm:flex-row gap-4 mb-6"
          style={{ transitionDelay: "0.15s" }}
        >
          <div className="relative flex-1 max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search buyers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allProducts.map(p => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  filter === p
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Buyer cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((buyer, i) => (
            <div
              key={buyer.name}
              className="reveal bg-white rounded-2xl p-5 shadow-md border border-gray-100 card-hover"
              style={{ transitionDelay: `${0.05 * i}s` }}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{buyer.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-[#1B4332] text-sm leading-tight truncate">
                      {buyer.name}
                    </h3>
                    {buyer.verified && (
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">
                          ✓
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <MapPin size={10} />
                    {buyer.location}
                  </div>
                </div>
              </div>

              {/* Products wanted */}
              <div className="mb-3">
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                  <ShoppingBag size={11} />
                  Products Wanted
                </div>
                <div className="flex flex-wrap gap-1">
                  {buyer.products.map(p => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                <span className="font-semibold text-[#1B4332]">Quantity: </span>
                {buyer.quantity}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    toast.success(`Contact request sent to ${buyer.name}!`)
                  }
                  className="flex-1 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-semibold hover:bg-[#1B4332] transition-colors btn-active flex items-center justify-center gap-1"
                >
                  <Phone size={12} />
                  Contact
                </button>
                <button
                  onClick={() => toast.info(`${buyer.phone}`)}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors"
                >
                  📞
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              <ShoppingBag size={48} className="mx-auto mb-3 opacity-30" />
              <p>No buyers found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
