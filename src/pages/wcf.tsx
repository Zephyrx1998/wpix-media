import React, { useState } from 'react';
import { Camera, Video, FileVideo, Zap, Users, Award, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WCF = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Video,
      title: "Ad Films & Commercials",
      description: "TV & digital commercials that captivate and convert"
    },
    {
      icon: Film,
      title: "Corporate Films",
      description: "Professional brand stories and founder narratives"
    },
    {
      icon: Camera,
      title: "Product Launch Videos",
      description: "High-impact product showcases and launch campaigns"
    },
    {
      icon: Zap,
      title: "Social Media Reels & Shorts",
      description: "Viral-ready content for Instagram, TikTok, and YouTube"
    },
    {
      icon: Users,
      title: "Influencer Ads (UGC)",
      description: "Authentic user-generated content and influencer partnerships"
    },
    {
      icon: FileVideo,
      title: "Post-Production & Motion Graphics",
      description: "Professional editing, VFX, and motion design services"
    }
  ];

  const portfolioCategories = {
    "Social Media Reels": [
      { id: 1, title: "Social Reel 1", videoUrl: "https://drive.google.com/file/d/1R25ZtAfQsCXOJEG3poR5gYAA3Sp68x_r/preview" },
      { id: 2, title: "Social Reel 2", videoUrl: "https://drive.google.com/file/d/16TvLUnbxQU_RvBxeQxBVtz25H4wRWcVq/preview" },
      { id: 3, title: "Social Reel 4", videoUrl: "https://drive.google.com/file/d/14D1f4yAgvV8JU3jCHpXA61cZru9Upacu/preview" },
      { id: 4, title: "Social Reel 6", videoUrl: "https://drive.google.com/file/d/1akRnZVu9xW5yOpmikyMISXF0VZrRCB14/preview" },
    ],
    "Ad Film/TVC": [
      { id: 1, title: "Ad Film 1", videoUrl: "https://drive.google.com/file/d/16C6Xmt7biCXGI7OW58_dbHoIsLQPEjiu/preview" },
      { id: 2, title: "Ad Film 2", videoUrl: "https://drive.google.com/file/d/1sV7xMkmxvWCjc2d27HuWcIK0CtWB6cxq/preview" },
    ],
    "Real Estate": [
      { id: 1, title: "Real Estate 1", videoUrl: "https://drive.google.com/file/d/1Pr8nDZHLQ1-r9f7PnMx3s8mHogAUY_lA/preview" },
      { id: 2, title: "Real Estate 2", videoUrl: "https://drive.google.com/file/d/1t5krFPS_O3TBT8hwJl0ObL32242SnHyS/preview" },
    ],
    "UGC": [
      { id: 1, title: "UGC 1", videoUrl: "https://drive.google.com/file/d/18aci0v-zVaYk-8VP5_A1hJ4O2cNn3dbv/preview" },
      { id: 2, title: "UGC 2", videoUrl: "https://drive.google.com/file/d/1T7kwssyvYFVIb7fu00sJLOYZ93RS2x3C/preview" },
      { id: 3, title: "UGC 3", videoUrl: "https://drive.google.com/file/d/1K4E2hf6tdKiabEa0xsOh6zASmXMTionI/preview" },
    ],
    "Corporate": [
      { id: 1, title: "Corporate Film", videoUrl: "https://drive.google.com/file/d/1_X8Uc9l2SZbMQ_gndBGcVk12gaLHf0hO/preview" },
    ],
  };

  const clientLogos = [
    { name: "Srinivasa Jewellers", logo: "/lovable-uploads/srinivasa-jewellers.png" },
    { name: "Trendio", logo: "/lovable-uploads/trendio.png" },
    { name: "Husqvarna", logo: "/lovable-uploads/husqvarna.png" },
    { name: "Kelly Louren", logo: "/lovable-uploads/kelly-louren.png" },
    { name: "Nextrack", logo: "/lovable-uploads/nextrack.png" },
    { name: "ShednAway", logo: "/lovable-uploads/shednaway.png" },
    { name: "Natural Olera", logo: "/lovable-uploads/natural-olera.png" },
    { name: "Hot! Momo", logo: "/lovable-uploads/hot-momo.png" },
    { name: "Hot Pizza", logo: "/lovable-uploads/hot-pizza.png" },
    { name: "Hot Burger", logo: "/lovable-uploads/hot-burger.png" },
    { name: "Similipal Prakruti Niwas", logo: "/lovable-uploads/similipal-prakruti.jpg" },
    { name: "HV", logo: "/lovable-uploads/hv-logo.jpg" }
  ];

  const testimonials = [
    {
      text: "The WCF team delivered exactly what we needed – a product launch film that boosted our sales by 30%.",
      author: "Marketing Head",
      company: "FMCG Brand"
    },
    {
      text: "Working with WPIX Media felt seamless. Their team handled everything from script to screen.",
      author: "Founder",
      company: "Tech Startup"
    },
    {
      text: "Professional, creative, and results-driven. Our brand film exceeded all expectations.",
      author: "Brand Manager",
      company: "Fashion Retail"
    }
  ];

  const whyChooseWCF = [
    {
      icon: Award,
      title: "Multi-genre expertise",
      description: "From commercials to documentaries, we master every format"
    },
    {
      icon: Zap,
      title: "Seamless execution: concept to delivery",
      description: "End-to-end production with no gaps in quality"
    },
    {
      icon: Film,
      title: "Storytelling + Strategy",
      description: "Creative narratives backed by business objectives"
    },
    {
      icon: Users,
      title: "Agile & globally inspired",
      description: "Fast turnarounds with international production standards"
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
                <span className="text-primary-foreground font-bold text-lg">W</span>
              </div>
              <div>
                <div className="font-bold text-foreground">WPIX Media</div>
                <div className="text-xs text-muted-foreground">White Crayon Films</div>
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
              We don't just shoot ads –<br />
              <span className="text-primary">We tell stories that sell.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The film & content production powerhouse of WPIX Media.
            </p>
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={() => navigate('/#contact')}
            >
              Work With Us
              <Camera className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* About WCF */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-foreground">About White Crayon Films</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              White Crayon Films (WCF) is the film and production vertical of WPIX Media. We specialize in creating ad films, branded content, and high-impact video campaigns that blend creativity with strategy. From TV commercials to digital-first reels, our focus is on content that performs as well as it inspires.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-card rounded-2xl p-6 shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Work in Action</h2>
          <Tabs defaultValue="Social Media Reels" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent h-auto">
              {Object.keys(portfolioCategories).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(portfolioCategories).map(([category, items]) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((item) => (
                    <div key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-soft border border-primary/10 hover:shadow-medium transition-all duration-300">
                      <div className="aspect-video bg-background">
                        <iframe
                          src={item.videoUrl}
                          className="w-full h-full"
                          allow="autoplay"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Clientele Section */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Trusted by Brands Across Industries</h2>
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

      {/* Why Choose WCF */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose WCF</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseWCF.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-soft border border-primary/10">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary-dark/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to create films that move hearts and drive business?
          </h2>
          <Button 
            variant="hero" 
            size="lg" 
            className="group"
            onClick={() => navigate('/#contact')}
          >
            Let's Build Together
            <Film className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WCF;