import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AIToolkitHero from "@/components/AIToolkitHero";
import AIToolsSection from "@/components/AIToolsSection";
import AIToolkitCTA from "@/components/AIToolkitCTA";

const AIToolkit = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AIToolkitHero />
      <AIToolsSection />
      <AIToolkitCTA />
      <Footer />
    </div>
  );
};

export default AIToolkit;