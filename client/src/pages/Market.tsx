/* AgriLink Sierra – Market Page
   Market Prices, Weather Dashboard, Crop Advisory
*/
import MarketSection from "@/components/sections/MarketSection";
import WeatherSection from "@/components/sections/WeatherSection";
import CropAdvisorySection from "@/components/sections/CropAdvisorySection";

export default function Market() {
  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <MarketSection />
        <WeatherSection />
        <CropAdvisorySection />
      </div>
    </div>
  );
}
