import React from 'react';
import { Camera, Video, FileVideo, Zap, Users, Award, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

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

  const portfolioItems = [
    { 
      id: 1, 
      title: "Brand Commercial", 
      category: "TV Ad",
      videoUrl: "https://drive.google.com/file/d/16C6Xmt7biCXGI7OW58_dbHoIsLQPEjiu/preview"
    },
    { 
      id: 2, 
      title: "Tech Startup", 
      category: "Explainer",
      videoUrl: "https://drive.google.com/file/d/1bqmShQNXw6w2x2Z99za0s5sIgLAc7Q0Y/preview"
    },
    { 
      id: 3, 
      title: "Influencer Campaign", 
      category: "UGC",
      videoUrl: "https://drive.google.com/file/d/1T7kwssyvYFVIb7fu00sJLOYZ93RS2x3C/preview"
    },
    { 
      id: 4, 
      title: "Social Reels", 
      category: "Social Media",
      videoUrl: "https://drive.google.com/file/d/1b5MX68KLY5X1hP78lwfwtqBy45YeFG3y/preview"
    },
    { 
      id: 5, 
      title: "Product Launch", 
      category: "Digital",
      videoUrl: "https://drive.google.com/file/d/1sKpjwKD92FcLoqdowJqMiyYl-R6EoUNi/preview"
    },
    { 
      id: 6, 
      title: "Real-estate", 
      category: "Brand Film",
      videoUrl: "https://drive.google.com/file/d/1t5krFPS_O3TBT8hwJl0ObL32242SnHyS/preview"
    }
  ];

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
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