/* AgriLink Sierra – Resources Page
   Educational Resources, Success Stories, FAQ
*/
import ResourcesSection from "@/components/sections/ResourcesSection";
import StoriesSection from "@/components/sections/StoriesSection";
import FAQSection from "@/components/sections/FAQSection";

export default function Resources() {
  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <ResourcesSection />
        <StoriesSection />
        <FAQSection />
      </div>
    </div>
  );
}
