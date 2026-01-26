import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-[100svh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/30 pt-16 sm:pt-20">
      {/* Glass Orb Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glass-orb w-64 sm:w-96 h-64 sm:h-96 top-10 -left-20 opacity-60 animate-pulse"></div>
        <div className="glass-orb w-48 sm:w-80 h-48 sm:h-80 top-1/4 -right-16 opacity-40 animate-pulse delay-1000"></div>
        <div className="glass-orb w-56 sm:w-72 h-56 sm:h-72 -bottom-20 left-1/4 opacity-50 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <ScrollReveal animation="fade-down" delay={0}>
            <div className="inline-flex items-center gap-2 glass-badge mb-6 sm:mb-8">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Full Spectrum Creative-Tech Agency</span>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal animation="fade-up" delay={100}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground via-primary to-primary-dark bg-clip-text text-transparent leading-tight">
              Designing for Now.<br />
              <span className="text-primary">Building for Tomorrow.</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              We combine creative excellence with data-driven strategies to help brands grow, engage, and dominate their markets through our four specialized verticals.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => scrollToSection('verticals')}
                className="group w-full sm:w-auto h-12 sm:h-auto text-base touch-manipulation"
              >
                Explore Our Verticals
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto h-12 sm:h-auto text-base touch-manipulation"
              >
                Start Your Project
              </Button>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal animation="fade-up" delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4">
              <div className="glass-stat">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">4</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Specialized Verticals</div>
              </div>
              <div className="glass-stat">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">360°</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Creative Solutions</div>
              </div>
              <div className="glass-stat">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Client Focused</div>
              </div>
              <div className="glass-stat">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">∞</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Creative Possibilities</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center glass">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;