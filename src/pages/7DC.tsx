import React from 'react';
import { Palette, Layers, Smartphone, Monitor, Package, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import startupLogo from '@/assets/portfolio/startup-logo.jpg';
import socialMediaKit from '@/assets/portfolio/social-media-kit.png';
import corporateBrochure from '@/assets/portfolio/corporate-brochure.png';
import appInterface from '@/assets/portfolio/app-interface.png';
import brandGuidelines from '@/assets/portfolio/brand-guidelines.png';
import packagingDesign from '@/assets/portfolio/packaging-design.jpg';

const SevenDC = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Palette,
      title: "Brand Identity Creation",
      items: ["Logo Design", "Typography & Color System", "Brand Guidelines Kit"]
    },
    {
      icon: Layers,
      title: "Graphic Design",
      items: ["Posters & Brochures", "Banners & Social Media Creatives", "Packaging Design"]
    },
    {
      icon: Smartphone,
      title: "Digital Brand Presence",
      items: ["Social Media Kits & Templates", "Collateral Design"]
    },
    {
      icon: Monitor,
      title: "UI/UX Design",
      items: ["Website Interfaces", "Mobile App Design", "User Experience Optimization"]
    }
  ];

  const portfolioItems = [
    { id: 1, title: "Startup Logo", category: "Brand Identity", image: startupLogo },
    { id: 2, title: "Social Media Kit", category: "Digital Design", image: socialMediaKit },
    { id: 3, title: "Corporate Brochure", category: "Print Design", image: corporateBrochure },
    { id: 4, title: "App Interface", category: "UI/UX", image: appInterface },
    { id: 5, title: "Brand Guidelines", category: "Brand Identity", image: brandGuidelines },
    { id: 6, title: "Packaging Design", category: "Packaging", image: packagingDesign }
  ];

  const clientLogos = [
    { name: "Waldorf Astoria", logo: "/lovable-uploads/1bfc63c2-2f24-4cca-8b3a-3a9ca701d18e.png" },
    { name: "Netflix", logo: "/lovable-uploads/3b742dbc-264c-4be9-875c-2c9ba0001ec7.png" },
    { name: "Choice Hotels", logo: "/lovable-uploads/e0916b03-cbaf-4877-a725-df30e8228106.png" },
    { name: "WeWork", logo: "/lovable-uploads/64ca5ac2-f24a-44e6-b6bf-62179c2c82ee.png" },
    { name: "VMware", logo: "/lovable-uploads/d68f43b8-b91d-4989-8149-cc3d20ebfabd.png" }
  ];

  const testimonials = [
    {
      text: "7DC gave our startup a premium identity that helped us stand out in a crowded market.",
      author: "Executive Director",
      company: "Kelly Louren"
    },
    {
      text: "The team understood our vision perfectly and delivered a brand identity that exceeded our expectations.",
      author: "Marketing Head",
      company: "Tech Innovation"
    },
    {
      text: "Professional, creative, and detail-oriented. Our brand transformation was remarkable.",
      author: "Founder",
      company: "Fashion Forward"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">7</span>
              </div>
              <div>
                <div className="font-bold text-foreground">7DC</div>
                <div className="text-xs text-muted-foreground">7 Design Corp</div>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Main Site
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Your Brand, <span className="text-primary">Our Blueprint.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From logo to complete digital identity, we craft brands that stand out, connect, and leave a lasting impression.
            </p>
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-primary/10 mb-8">
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 aspect-square flex items-center justify-center">
                  <Palette className="h-12 w-12 text-primary" />
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 aspect-square flex items-center justify-center">
                  <Layers className="h-12 w-12 text-primary" />
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 aspect-square flex items-center justify-center">
                  <Monitor className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={() => navigate('/#contact')}
            >
              Start Your Branding Journey
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Portfolio Showcase</h2>
            <Button 
              variant="outline" 
              className="group"
              onClick={() => window.open('https://drive.google.com/drive/folders/1YnRrs8mczG3jLMiRngWcPnH97ijrgk2h?usp=drive_link', '_blank', 'noopener,noreferrer')}
            >
              View Full Portfolio
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <div key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300 cursor-pointer group">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientele Section */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Trusted by Leading Brands</h2>
          <div className="overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap">
              {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
                <div key={index} className="bg-card px-6 py-4 rounded-lg shadow-soft border border-primary/10 w-40 h-20 flex items-center justify-center flex-shrink-0 mx-4">
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Feedback Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 shadow-soft border border-primary/10">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary-dark/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Let's Build a Brand That Lasts.
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to transform your brand identity and make a lasting impression?
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            className="group"
            onClick={() => navigate('/#contact')}
          >
            Start Your Branding Journey
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SevenDC;