import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AIToolkitCTA = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary-dark/5">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Turn AI Insights into Real Growth
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our team at VYBE executes strategies that deliver results.
        </p>
        <Link to="/#contact">
          <Button variant="hero" size="lg" className="shadow-medium hover:shadow-strong">
            Book a Free Call
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default AIToolkitCTA;