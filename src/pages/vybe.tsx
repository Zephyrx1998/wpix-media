import React from 'react';
import { TrendingUp, Instagram, Youtube, BarChart3, Users, Zap, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VYBE = () => {
  const socialPosts = [
    { platform: 'Instagram', content: 'Brand Story Post', engagement: '2.3K likes' },
    { platform: 'LinkedIn', content: 'B2B Content', engagement: '500 comments' },
    { platform: 'Twitter', content: 'Trending Topic', engagement: '1.2K retweets' },
    { platform: 'Instagram', content: 'Product Launch', engagement: '5.1K likes' },
    { platform: 'LinkedIn', content: 'Thought Leadership', engagement: '300 shares' },
  ];

  const influencers = [
    { name: 'DefiniteOfficial', handle: '@DefiniteOfficial', platform: 'YouTube', followers: '76.2K', link: 'https://www.youtube.com/@DefiniteOfficial', image: '/lovable-uploads/definite-official-logo.jpg' },
    { name: 'Beat The Hunger', handle: '@beatthehunger_', platform: 'Instagram', followers: '112K', link: 'https://www.instagram.com/beatthehunger_', image: '/lovable-uploads/beatthehunger-logo.jpg' },
    { name: 'Mera Pittara', handle: '@Merapittara', platform: 'YouTube', followers: '277K', link: 'https://www.youtube.com/@Merapittara', image: '/lovable-uploads/influencer-merapittara.png' },
    { name: 'Vikin.ing', handle: '@vikin.ing', platform: 'Instagram', followers: '232K', link: 'https://www.instagram.com/vikin.ing', image: '/lovable-uploads/influencer-vikin.png' }
  ];

  const websites = [
    { title: 'Campaign Microsite', description: 'Interactive brand experience', image: '/lovable-uploads/campaign-microsite.webp' }
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
      quote: "VYBE helped us 3x our revenue through targeted campaigns and strategic social media management.",
      author: "Marketing Director",
      company: "Tech Startup"
    },
    {
      quote: "Their influencer partnerships delivered authenticity that traditional ads couldn't match.",
      author: "Brand Manager",
      company: "Fashion Brand"
    },
    {
      quote: "The landing pages they built converted 40% better than our previous campaigns.",
      author: "Growth Lead",
      company: "SaaS Company"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp className="h-12 w-12 text-primary animate-bounce" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-dark to-accent bg-clip-text text-transparent">
                VYBE
              </h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Social Performance. Maximum <span className="text-primary">VYBE</span>.
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              From social media to ads, creators to campaigns — we build momentum that converts.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-primary">3x</div>
                <div className="text-sm text-muted-foreground">Revenue Growth</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-primary">40%</div>
                <div className="text-sm text-muted-foreground">Better Conversions</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-4">
                <div className="text-2xl font-bold text-primary">500K+</div>
                <div className="text-sm text-muted-foreground">Reach Generated</div>
              </div>
            </div>
            
            <Button 
              variant="hero" 
              size="lg" 
              className="animate-pulse hover:animate-none"
              onClick={() => window.location.href = '/#contact'}
            >
              <Zap className="mr-2 h-5 w-5" />
              Work With Us
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media Management Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Social Media Management</h3>
            <p className="text-lg text-muted-foreground">Consistency that builds community and brand voice.</p>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {socialPosts.map((post, index) => (
              <div key={index} className="flex-shrink-0 w-80 bg-card rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-medium">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <Instagram className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{post.platform}</span>
                  </div>
                  <span className="text-sm text-primary font-medium">{post.engagement}</span>
                </div>
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-muted-foreground font-medium">{post.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Marketing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Performance Marketing</h3>
            <p className="text-lg text-muted-foreground">Data-driven campaigns that scale your business.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl p-8 border border-primary/10 hover:shadow-medium transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="h-8 w-8 text-primary" />
                <h4 className="text-xl font-bold text-foreground">Revenue Growth</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Q1 Revenue</span>
                  <span className="text-2xl font-bold text-primary">₹25L</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Q2 Revenue</span>
                  <span className="text-2xl font-bold text-primary">₹75L</span>
                </div>
                <div className="text-center pt-4">
                  <span className="text-3xl font-bold text-primary">+200%</span>
                  <p className="text-sm text-muted-foreground">Growth in 3 months</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-2xl p-8 border border-primary/10 hover:shadow-medium transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h4 className="text-xl font-bold text-foreground">ROAS Improvement</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Previous ROAS</span>
                  <span className="text-2xl font-bold text-muted-foreground">2.1x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current ROAS</span>
                  <span className="text-2xl font-bold text-primary">6.8x</span>
                </div>
                <div className="text-center pt-4">
                  <span className="text-3xl font-bold text-primary">+224%</span>
                  <p className="text-sm text-muted-foreground">ROAS Improvement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Influencer & Creator Partnerships */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Influencer & Creator Partnerships</h3>
            <p className="text-lg text-muted-foreground">We connect brands with voices that matter.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {influencers.map((influencer, index) => (
              <a 
                key={index} 
                href={influencer.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card rounded-2xl p-4 md:p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-medium text-center group cursor-pointer relative"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-3 md:mb-4 overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary transition-all group-hover:scale-110">
                  <img 
                    src={influencer.image} 
                    alt={influencer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  {influencer.platform === 'Instagram' ? 
                    <Instagram className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary-foreground" /> :
                    <Youtube className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary-foreground" />
                  }
                </div>
                <h4 className="font-bold text-foreground mb-1 text-sm md:text-base truncate">{influencer.name}</h4>
                <p className="text-xs md:text-sm text-primary mb-1 md:mb-2 truncate">{influencer.handle}</p>
                <p className="text-xs text-muted-foreground">{influencer.followers}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Website Development Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Campaign Web Support</h3>
            <p className="text-lg text-muted-foreground">From landing pages to campaign sites — we design for impact and conversion.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {websites.map((website, index) => (
              <div key={index} className="bg-card rounded-2xl overflow-hidden border border-primary/10 hover:shadow-medium transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  {website.image ? (
                    <img 
                      src={website.image} 
                      alt={website.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <div className="text-4xl text-muted-foreground">🖥️</div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-foreground mb-2">{website.title}</h4>
                  <p className="text-sm text-muted-foreground">{website.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientele Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Trusted by Leading Brands</h3>
          </div>
          
          <div className="overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap">
              {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
                <div key={index} className="flex-shrink-0 mx-8 w-32 h-16 flex items-center justify-center">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">What Our Clients Say</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 border border-primary/10 hover:shadow-medium transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-primary">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Your Growth Engine <span className="text-primary">Starts Here</span>
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to amplify your brand's visibility and drive real business results?
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => window.location.href = '/#contact'}
            className="animate-pulse hover:animate-none"
          >
            Partner with VYBE
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default VYBE;