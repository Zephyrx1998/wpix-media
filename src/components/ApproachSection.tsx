import React from 'react';
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

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
    <section id="services" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-accent/20 pointer-events-none" />
      <div className="absolute top-1/3 -left-20 glass-orb w-64 h-64 opacity-25"></div>
      <div className="absolute -bottom-10 right-1/4 glass-orb w-48 h-48 opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              Our <span className="text-primary">Approach</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              A proven methodology that ensures your brand not only meets today's challenges but builds a foundation for tomorrow's opportunities.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <ScrollReveal key={step.title} animation="fade-up" delay={index * 100}>
                <div 
                  className="relative glass-card glass-shimmer p-4 sm:p-6 md:p-8 hover:scale-[1.02] transition-transform group text-center h-full active:scale-[0.98] touch-manipulation"
                >
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold text-primary-foreground">{step.step}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 sm:h-7 md:h-8 sm:w-7 md:w-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">{step.description}</p>

                  {/* Connector Line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Section */}
        <ScrollReveal animation="fade-up" delay={400}>
          <div className="mt-12 sm:mt-16 md:mt-20 text-center">
            <div className="glass-card p-6 sm:p-8 md:p-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Ready to Transform Your Brand?</h3>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                Let's discuss how our four verticals can work together to elevate your brand and drive measurable growth.
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="glass-stat">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-0.5 sm:mb-2">Free</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Strategy Consultation</div>
                </div>
                <div className="glass-stat">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-0.5 sm:mb-2">24-48h</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="glass-stat">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-0.5 sm:mb-2">360°</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">Solution Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ApproachSection;