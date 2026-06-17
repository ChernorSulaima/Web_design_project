/* AgriLink Sierra – Tools Page
   Farm Calculator, Farm Planner, Disease Detection, Equipment Rental
*/
import CalculatorSection from "@/components/sections/CalculatorSection";
import PlannerSection from "@/components/sections/PlannerSection";
import DiseaseSection from "@/components/sections/DiseaseSection";
import EquipmentSection from "@/components/sections/EquipmentSection";

export default function Tools() {
  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <CalculatorSection />
        <PlannerSection />
        <DiseaseSection />
        <EquipmentSection />
      </div>
    </div>
  );
}
