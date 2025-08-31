import React from 'react';
import { Palette, Box, Camera, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      color: "from-primary to-primary-dark"
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
      color: "from-primary-light to-primary"
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
      color: "from-primary-dark to-primary-light"
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
        "Website Development & Landing Pages (Growth-Focused)",
        "SEO & Content Marketing",
        "Online Reputation Management (ORM)",
        "Lead Generation Funnels & E-commerce Growth"
      ],
      color: "from-primary to-primary-light"
    }
  ];

  return (
    <section id="verticals" className="py-20 bg-gradient-to-b from-accent/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our <span className="text-primary">Verticals</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Four specialized arms working together to deliver comprehensive brand solutions across every aspect of your business growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {verticals.map((vertical, index) => {
            const IconComponent = vertical.icon;
            return (
              <div 
                key={vertical.name}
                className="bg-card rounded-3xl p-8 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300 group"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${vertical.color} rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-foreground">{vertical.name}</h3>
                      <span className="text-sm text-muted-foreground">— {vertical.fullName}</span>
                    </div>
                    <p className="text-lg font-medium text-primary mb-2">{vertical.tagline}</p>
                    <p className="text-muted-foreground">{vertical.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-foreground">Core Services:</h4>
                  <ul className="space-y-2">
                    {vertical.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground text-sm leading-relaxed">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  onClick={() => {
                    if (vertical.name === "WCF") {
                      window.location.href = "/wcf";
                    }
                  }}
                >
                  Learn More About {vertical.name}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VerticalsSection;