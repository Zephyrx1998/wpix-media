import React from 'react';
import { Palette, Box, Camera, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const VerticalsSection = () => {
  const verticals = [
    {
      name: "7DC",
      fullName: "7 Design Corp",
      icon: Palette,
      tagline: "We shape how the world sees your brand.",
      description: "Focus on Branding, Identity, Digital Design, Social Media Creatives",
      services: [
        "Brand Identity Creation (Logo, Typography, Brand Guidelines)",
        "Graphic Design (Posters, Brochures, Banners, Social Media Creatives)",
        "Packaging Design",
        "Social Media Collaterals & Templates",
        "UI/UX Design"
      ],
      color: "from-primary to-primary-dark",
      route: "/7dc"
    },
    {
      name: "AVER",
      fullName: "Augmented & Virtual Reality Excellence",
      icon: Box,
      tagline: "We bring spaces, products, and dreams to life — virtually.",
      description: "Focus on 3D Visuals, Virtual Tours, AR-based Ads",
      services: [
        "360° Virtual Tours (Real Estate, Commercial Spaces, Automotive Showrooms)",
        "VR Experiences (Educational, Hospitality, Tourism)",
        "AR-based Interactive Ads"
      ],
      color: "from-primary-light to-primary",
      route: "/aver"
    },
    {
      name: "WCF",
      fullName: "White Crayon Films",
      icon: Camera,
      tagline: "We don't just shoot ads — we tell stories that sell.",
      description: "Focus on Ad Films, Content Production, Content-as-a-Service",
      services: [
        "Ad Films & Commercials (TV & Digital)",
        "Product Launch Videos & Product Shoots",
        "Corporate Films & Founder Stories",
        "Social Media Reels, Shorts & UGC Ads"
      ],
      color: "from-primary-dark to-primary-light",
      route: "/wcf"
    },
    {
      name: "VYBE",
      fullName: "Visibility Yield Brand Engagement",
      icon: TrendingUp,
      tagline: "Where growth meets engagement.",
      description: "Focus on Social Media Management, Performance Marketing, Digital Growth",
      services: [
        "Social Media Management & Strategy",
        "Performance Marketing (Meta, Google, LinkedIn Ads)",
        "Influencer Marketing & UGC Campaigns",
        "Website Development & Landing Pages (Growth-Focused)"
      ],
      color: "from-primary to-primary-light",
      route: "/vybe"
    }
  ];

  return (
    <section id="verticals" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-accent/20 to-background">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              Our <span className="text-primary">Verticals</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Four specialized arms working together to deliver comprehensive brand solutions across every aspect of your business growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {verticals.map((vertical, index) => {
            const IconComponent = vertical.icon;
            return (
              <ScrollReveal key={vertical.name} animation="fade-up" delay={index * 100}>
                <div 
                  className="bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300 group h-full active:scale-[0.99] touch-manipulation"
                >
                  <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className={`w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-gradient-to-br ${vertical.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <IconComponent className="h-6 w-6 sm:h-7 md:h-8 sm:w-7 md:w-8 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">{vertical.name}</h3>
                        <span className="text-xs sm:text-sm text-muted-foreground truncate">— {vertical.fullName}</span>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg font-medium text-primary mb-1 sm:mb-2">{vertical.tagline}</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">{vertical.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Core Services:</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {vertical.services.map((service, serviceIndex) => (
                        <li key={serviceIndex} className="flex items-start gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 h-11 sm:h-12 text-sm sm:text-base touch-manipulation"
                    asChild
                  >
                    <Link to={vertical.route}>
                      Learn More About {vertical.name}
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VerticalsSection;