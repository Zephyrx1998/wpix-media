import SocialMediaGenerator from "@/components/tools/SocialMediaGenerator";
import HashtagFinder from "@/components/tools/HashtagFinder";
import AdCopyGenerator from "@/components/tools/AdCopyGenerator";
import ContentCalendarGenerator from "@/components/tools/ContentCalendarGenerator";
import MemeGenerator from "@/components/tools/MemeGenerator";
import AdBudgetCalculator from "@/components/tools/AdBudgetCalculator";

const AIToolsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          AI-Powered Marketing Tools
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <SocialMediaGenerator />
          <HashtagFinder />
          <AdCopyGenerator />
          <ContentCalendarGenerator />
          <MemeGenerator />
          <AdBudgetCalculator />
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;