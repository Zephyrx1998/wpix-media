import React from 'react';
import { Target, Eye, Zap, Globe } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              About <span className="text-primary">WPIX Media</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Born in India with a global outlook, we operate through four powerful verticals — 7DC, AVER, WCF, and VYBE — each specializing in a core pillar of brand building and growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          <ScrollReveal animation="fade-right">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Our Story</h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                WPIX Media is a Full Spectrum Creative-Tech Agency delivering end-to-end brand solutions across design, marketing, technology, and storytelling. We combine creative excellence with data-driven strategies to help brands grow, engage, and dominate their markets.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card/50 rounded-xl border border-primary/10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">Fast Execution</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">High Impact</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card/50 rounded-xl border border-primary/10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">Global Standards</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Local Culture</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <ScrollReveal animation="zoom-in" delay={100}>
              <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft border border-primary/10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 text-foreground">Vision</h4>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  To be the go-to creative-tech powerhouse for brands aiming to stand out and scale globally.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={200} className="mt-6 sm:mt-8">
              <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-soft border border-primary/10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2 text-foreground">Mission</h4>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  We empower brands with creativity, technology, and strategy, ensuring they stay relevant today and build a legacy for tomorrow.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal animation="fade-up">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">Why Choose WPIX Media?</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <ScrollReveal animation="fade-up" delay={0}>
                <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300 active:scale-[0.98] touch-manipulation">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                    <span className="text-xl sm:text-2xl font-bold text-primary-foreground">4</span>
                  </div>
                  <h4 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-foreground">Multi-vertical Creative Power</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">Four specialized arms, one powerful agency delivering comprehensive solutions.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300 active:scale-[0.98] touch-manipulation">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                    <Globe className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-foreground">India-born, Globally Inspired</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">Understanding local culture while applying global standards and best practices.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={200}>
                <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300 active:scale-[0.98] touch-manipulation sm:col-span-2 md:col-span-1">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                    <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-foreground">Fast Execution + High Impact</h4>
                  <p className="text-muted-foreground text-sm sm:text-base">Agile processes delivering results quickly without compromising quality.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;