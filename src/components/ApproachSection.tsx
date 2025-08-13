import React from 'react';
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";

const ApproachSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Understand",
      description: "Understand your brand's DNA and business goals",
      step: "01"
    },
    {
      icon: Lightbulb,
      title: "Create",
      description: "Create a custom growth blueprint",
      step: "02"
    },
    {
      icon: Rocket,
      title: "Execute",
      description: "Execute across relevant verticals",
      step: "03"
    },
    {
      icon: BarChart3,
      title: "Optimize",
      description: "Measure, optimize, and scale",
      step: "04"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our <span className="text-primary">Approach</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A proven methodology that ensures your brand not only meets today's challenges but builds a foundation for tomorrow's opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={step.title}
                className="relative bg-card rounded-3xl p-8 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300 group text-center"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-medium">
                  <span className="text-sm font-bold text-primary-foreground">{step.step}</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                {/* Connector Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-primary-dark/5 rounded-3xl p-12 border border-primary/10">
            <h3 className="text-3xl font-bold mb-6 text-foreground">Ready to Transform Your Brand?</h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our four verticals can work together to elevate your brand and drive measurable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-card rounded-xl p-6 shadow-soft border border-primary/10">
                <div className="text-2xl font-bold text-primary mb-2">Free</div>
                <div className="text-sm text-muted-foreground">Strategy Consultation</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-soft border border-primary/10">
                <div className="text-2xl font-bold text-primary mb-2">24-48h</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-soft border border-primary/10">
                <div className="text-2xl font-bold text-primary mb-2">360°</div>
                <div className="text-sm text-muted-foreground">Solution Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;