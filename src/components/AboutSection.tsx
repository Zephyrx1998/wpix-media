import React from 'react';
import { Target, Eye, Zap, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About <span className="text-primary">WPIX Media</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Born in India with a global outlook, we operate through four powerful verticals — 7DC, AVER, WCF, and VYBE — each specializing in a core pillar of brand building and growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-foreground">Our Story</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              WPIX Media is a Full Spectrum Creative-Tech Agency delivering end-to-end brand solutions across design, marketing, technology, and storytelling. We combine creative excellence with data-driven strategies to help brands grow, engage, and dominate their markets.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Fast Execution</div>
                  <div className="text-sm text-muted-foreground">High Impact</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Global Standards</div>
                  <div className="text-sm text-muted-foreground">Local Culture</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-primary/10">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Vision</h4>
              <p className="text-muted-foreground text-sm">
                To be the go-to creative-tech powerhouse for brands aiming to stand out and scale globally.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-primary/10 mt-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Mission</h4>
              <p className="text-muted-foreground text-sm">
                We empower brands with creativity, technology, and strategy, ensuring they stay relevant today and build a legacy for tomorrow.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8 text-foreground">Why Choose WPIX Media?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary-foreground">4</span>
              </div>
              <h4 className="font-bold text-xl mb-4 text-foreground">Multi-vertical Creative Power</h4>
              <p className="text-muted-foreground">Four specialized arms, one powerful agency delivering comprehensive solutions.</p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-6 mx-auto">
                <Globe className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="font-bold text-xl mb-4 text-foreground">India-born, Globally Inspired</h4>
              <p className="text-muted-foreground">Understanding local culture while applying global standards and best practices.</p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-6 mx-auto">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="font-bold text-xl mb-4 text-foreground">Fast Execution + High Impact</h4>
              <p className="text-muted-foreground">Agile processes delivering results quickly without compromising quality.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;