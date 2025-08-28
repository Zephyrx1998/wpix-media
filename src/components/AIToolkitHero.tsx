import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AIToolkitHero = () => {
  return (
    <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          WPIX AI – Your Creative Growth Companion
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Smart tools to plan, create, and amplify your brand.
        </p>
        <Link to="/">
          <Button variant="outline" size="lg" className="shadow-soft hover:shadow-medium">
            Back to Main Site
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default AIToolkitHero;