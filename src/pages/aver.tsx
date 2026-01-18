import React from 'react';
import { ArrowRight, Globe, Eye, Camera, Users, Star, Phone, Mail, Play } from 'lucide-react';
import AVERPricingSection from '@/components/AVERPricingSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AVER = () => {
  const services = [{
    title: "VR / 360° Virtual Tours",
    icon: Globe,
    features: ["Real-estate: Flats, Villas, Commercial Spaces, Showrooms", "Hospitality: Hotels, Resorts, Farmhouses", "Education & Tourism walkthroughs", "Created using Matterport, Insta360, Ricoh Theta for high-quality immersive experiences"]
  }];
  const clientLogos = [{
    name: "Srinivasa Jewellers",
    logo: "/lovable-uploads/srinivasa-jewellers.png"
  }, {
    name: "Trendio",
    logo: "/lovable-uploads/trendio.png"
  }, {
    name: "Husqvarna",
    logo: "/lovable-uploads/husqvarna.png"
  }, {
    name: "Kelly Louren",
    logo: "/lovable-uploads/kelly-louren.png"
  }, {
    name: "Nextrack",
    logo: "/lovable-uploads/nextrack.png"
  }, {
    name: "ShednAway",
    logo: "/lovable-uploads/shednaway.png"
  }, {
    name: "Natural Olera",
    logo: "/lovable-uploads/natural-olera.png"
  }, {
    name: "Hot! Momo",
    logo: "/lovable-uploads/hot-momo.png"
  }, {
    name: "Hot Pizza",
    logo: "/lovable-uploads/hot-pizza.png"
  }, {
    name: "Hot Burger",
    logo: "/lovable-uploads/hot-burger.png"
  }, {
    name: "Similipal Prakruti Niwas",
    logo: "/lovable-uploads/similipal-prakruti.jpg"
  }, {
    name: "HV",
    logo: "/lovable-uploads/hv-logo.jpg"
  }];
  const testimonials = [{
    quote: "AVER's virtual tour helped us close deals faster by giving customers a real feel of the property.",
    author: "Real Estate Director",
    company: "Premium Homes"
  }, {
    quote: "The 360° virtual tour created by AVER increased our engagement rates significantly. Truly immersive experiences!",
    author: "Marketing Head",
    company: "Tech Innovation"
  }];
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-background via-accent/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              360° Virtual Tours, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Real Impact</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Immersive VR virtual walkthroughs that bring your spaces to life and help you close deals faster.
            </p>
            <div className="flex justify-center mb-12">
              <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 max-w-md">
                <Globe className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">360° VR Tours</h3>
                <p className="text-muted-foreground">Immersive virtual walkthroughs for real estate, hospitality & more</p>
              </div>
            </div>
            <Button variant="hero" size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25" onClick={() => window.location.href = '/#contact'}>
              Work With Us <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works - Video Tutorial Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How Our <span className="text-green-500">360° Virtual Tours</span> Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Watch this quick tutorial to see how we create immersive virtual experiences for your spaces.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-green-500/20 shadow-xl shadow-green-500/10">
              <div className="aspect-video bg-black">
                <iframe 
                  src="https://drive.google.com/file/d/1bqmShQNXw6w2x2Z99za0s5sIgLAc7Q0Y/preview" 
                  title="How VR 360 Virtual Tour Works - WPIX Media Tutorial" 
                  frameBorder="0" 
                  allow="autoplay; encrypted-media" 
                  allowFullScreen 
                  className="w-full h-full"
                  loading="eager"
                ></iframe>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-6">
              Learn how we capture, process, and deliver stunning 360° virtual tours for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our <span className="text-green-500">VR Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional 360° virtual tour solutions that transform how your audience experiences your spaces.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {services.map((service, index) => {
            const IconComponent = service.icon;
            return <Card key={index} className="bg-card/80 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground leading-relaxed">{feature}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our <span className="text-green-500">360° VR Experiences</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Immerse yourself in our virtual tours and experience spaces like never before.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Commercial Real Estate */}
            <div className="bg-gradient-to-br from-card to-card/80 rounded-3xl p-6 shadow-soft border border-green-500/10 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">Educational Institution</h3>
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-green-500/20">
                <iframe src="https://my.matterport.com/show/?m=PvNtnccxW4r&play=1&brand=0" width="100%" height="100%" frameBorder="0" allowFullScreen allow="xr-spatial-tracking" className="rounded-2xl"></iframe>
              </div>
              <p className="text-muted-foreground text-center mt-4">Explore premium commercial spaces in immersive detail</p>
            </div>

            {/* Travel Hospitality */}
            <div className="bg-gradient-to-br from-card to-card/80 rounded-3xl p-6 shadow-soft border border-green-500/10 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">Travel Hospitality</h3>
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-green-500/20">
                <iframe src="https://my.matterport.com/show/?m=vP3MtKxs35G&play=1&brand=0" width="100%" height="100%" frameBorder="0" allowFullScreen allow="xr-spatial-tracking" className="rounded-2xl"></iframe>
              </div>
              <p className="text-muted-foreground text-center mt-4">Experience luxury hospitality venues virtually</p>
            </div>

            {/* Residential Villa */}
            <div className="bg-gradient-to-br from-card to-card/80 rounded-3xl p-6 shadow-soft border border-green-500/10 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">Residential Villa</h3>
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-green-500/20">
                <iframe src="https://my.matterport.com/show/?m=jm5WwEA3HUN&log=0&help=0&nt=0&play=1&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=0&kb=1&lp=0&title=0&tourcta=1&vr=1" width="100%" height="100%" frameBorder="0" allowFullScreen allow="xr-spatial-tracking" className="rounded-2xl"></iframe>
              </div>
              <p className="text-muted-foreground text-center mt-4">Tour beautiful residential properties in stunning detail</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clientele Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Trusted by <span className="text-green-500">Industry Leaders</span>
            </h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left whitespace-nowrap">
              {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => <div key={index} className="flex-shrink-0 mx-8 w-40 h-20 bg-card rounded-xl border border-green-500/10 flex items-center justify-center shadow-soft hover:shadow-medium hover:border-green-500/30 transition-all duration-300 p-4">
                  <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Client Feedback Section */}
      <section className="py-20 bg-gradient-to-b from-accent/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              What Our <span className="text-green-500">Clients Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => <Card key={index} className="bg-card/80 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-green-500 text-green-500" />)}
                  </div>
                  <blockquote className="text-lg text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-green-500 font-medium">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <AVERPricingSection />

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-green-500/10 via-emerald-600/10 to-green-500/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Ready to Go <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Beyond Reality?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your spaces with immersive 360° VR experiences that captivate, engage, and convert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25" onClick={() => window.location.href = '/#contact'}>
                Let's Create Your VR Experience <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-500/30 text-green-500 hover:bg-green-500 hover:text-white" onClick={() => window.location.href = 'tel:+918249695463'}>
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default AVER;