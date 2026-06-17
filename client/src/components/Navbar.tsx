/* AgriLink Sierra – Navbar
   4 main tabs: Home, Market, Tools, Resources
   Tools has a dropdown menu with additional pages
*/
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Market", href: "/market" },
  {
    label: "Tools",
    href: "/tools",
    dropdown: [
      { label: "Farm Calculator", href: "/tools#calculator" },
      { label: "Farm Planner", href: "/tools#planner" },
      { label: "Disease Detection", href: "/tools#disease" },
      { label: "Equipment Rental", href: "/tools#equipment" },
      { label: "Livestock", href: "/livestock" },
      { label: "Buyer Marketplace", href: "/livestock#marketplace" },
    ],
  },
  { label: "Resources", href: "/resources" },
];

function DropdownMenu({ items }: { items: (typeof navItems)[0]["dropdown"] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-gray-700 hover:text-[#2E7D32] transition-colors font-medium">
        Tools
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50 transition-all duration-200 ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {items?.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            <a
              className={`block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-[#2E7D32] transition-colors ${
                i !== items.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (href: string) => location === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2.5 font-bold text-xl hover:opacity-80 transition-opacity">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663769906012/gYjNRkJ4sprEcDQXrTs6jn/agrilink-logo-AdseiYh9MYaQs4pnLmfGvW.webp"
              alt="AgriLink Sierra"
              className="w-8 h-8 object-contain"
            />
            <span style={{ fontFamily: "'Sora', sans-serif" }}>
              AgriLink <span className="text-[#FFC107]">Sierra</span>
            </span>
          </a>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <div key={item.label}>
              {item.dropdown ? (
                <DropdownMenu items={item.dropdown} />
              ) : (
                <Link href={item.href}>
                  <a
                    className={`font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-[#2E7D32]"
                        : "text-gray-700 hover:text-[#2E7D32]"
                    }`}
                  >
                    {item.label}
                  </a>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="hidden md:inline-flex bg-[#FFC107] text-[#1B4332] font-bold hover:bg-[#FFB300] rounded-full px-6 py-2.5 transition-colors btn-active"
        >
          Join Now
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="container py-4 space-y-3">
            {navItems.map(item => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <div className="font-medium text-gray-700 py-2 px-3">
                      {item.label}
                    </div>
                    <div className="pl-4 space-y-2">
                      {item.dropdown.map(subitem => (
                        <Link key={subitem.label} href={subitem.href}>
                          <a
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm text-gray-600 hover:text-[#2E7D32] py-1.5 transition-colors"
                          >
                            {subitem.label}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href}>
                    <a
                      onClick={() => setMobileOpen(false)}
                      className={`block font-medium py-2 px-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-green-50 text-[#2E7D32]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#2E7D32]"
                      }`}
                    >
                      {item.label}
                    </a>
                  </Link>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-[#FFC107] text-[#1B4332] font-bold hover:bg-[#FFB300] rounded-full mt-3 py-2.5 transition-colors btn-active"
            >
              Join Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
