/* AgriLink Sierra – Newsletter + Footer */
import { useState } from "react";
import {
  Mail,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

const footerLinks = {
  Platform: [
    "Market Prices",
    "Weather Forecast",
    "Crop Advisory",
    "Disease Detection",
    "Farm Calculator",
  ],
  Services: [
    "Equipment Rental",
    "Buyer Marketplace",
    "Livestock Management",
    "Farm Planner",
    "Educational Resources",
  ],
  Company: ["About Us", "Our Mission", "Success Stories", "Contact Us", "FAQ"],
  Support: [
    "Help Center",
    "Report an Issue",
    "Privacy Policy",
    "Terms of Service",
    "Sitemap",
  ],
};

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
    toast.success("You're subscribed! Welcome to AgriLink Sierra.");
  };

  return (
    <>
      {/* Newsletter */}
      <section
        id="newsletter"
        className="py-16 bg-gradient-to-r from-[#FFC107] to-[#FFB300]"
      >
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1B4332] flex items-center justify-center mx-auto mb-4">
              <Mail size={26} className="text-[#FFC107]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B4332] mb-2">
              Stay Ahead of Every Season
            </h2>
            <p className="text-[#1B4332]/70 mb-6">
              Get weekly market prices, weather alerts, farming tips, and
              AgriLink Sierra updates delivered to your inbox.
            </p>
            {subscribed ? (
              <div className="bg-[#1B4332] text-white rounded-2xl px-6 py-4 inline-flex items-center gap-2 font-semibold">
                ✅ You're subscribed! Check your inbox.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-[#1B4332]/20 bg-white text-[#1B4332] placeholder-[#1B4332]/40 focus:outline-none focus:border-[#1B4332] text-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#1B4332] text-white font-bold hover:bg-[#0d2b1e] transition-colors btn-active flex items-center gap-2 text-sm"
                >
                  <Send size={16} />
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-[#1B4332]/50 text-xs mt-3">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d2b1e] text-white">
        <div className="container py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663769906012/gYjNRkJ4sprEcDQXrTs6jn/agrilink-logo-AdseiYh9MYaQs4pnLmfGvW.webp"
                  alt="AgriLink Sierra"
                  className="w-9 h-9 object-contain"
                />
                <span
                  className="font-bold text-xl"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  AgriLink <span className="text-[#FFC107]">Sierra</span>
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                A coordinating platform for Sierra Leone's agricultural sector.
                Connecting farmers across all 16 districts with direct market
                prices, crop calendars, and buyer networks.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#FFC107]" /> +232 76 123 456
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#FFC107]" />{" "}
                  hello@agrilink.sl
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-[#FFC107] mt-0.5" /> 15
                  Wilberforce Street, Freetown, Sierra Leone
                </div>
              </div>
              {/* Social */}
              <div className="flex gap-3 mt-5">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Youtube, label: "YouTube" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    onClick={() => toast.info(`Follow us on ${label}!`)}
                    className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#2E7D32] transition-colors"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-sm text-white mb-4">
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map(link => (
                    <li key={link}>
                      <button
                        onClick={() => toast.info(`${link} — coming soon!`)}
                        className="text-white/50 text-sm hover:text-[#4CAF50] transition-colors text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} AgriLink Sierra. All rights
              reserved.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <span>Made with</span>
              <span className="text-[#FFC107]">❤</span>
              <span>for Sierra Leone farmers</span>
            </div>
            <div className="flex gap-4 text-white/40 text-xs">
              <button
                onClick={() => toast.info("Privacy Policy")}
                className="hover:text-white transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => toast.info("Terms of Service")}
                className="hover:text-white transition-colors"
              >
                Terms
              </button>
              <button
                onClick={() => toast.info("Cookie Policy")}
                className="hover:text-white transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
