/* AgriLink Sierra – Livestock Page
   Livestock Management, Buyer Marketplace
*/
import LivestockSection from "@/components/sections/LivestockSection";
import MarketplaceSection from "@/components/sections/MarketplaceSection";

export default function Livestock() {
  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <LivestockSection />
        <MarketplaceSection />
      </div>
    </div>
  );
}
