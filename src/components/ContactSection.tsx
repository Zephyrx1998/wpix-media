import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/20 to-background pointer-events-none" />
      <div className="absolute top-10 -right-20 glass-orb w-80 h-80 opacity-25"></div>
      <div className="absolute -bottom-20 left-10 glass-orb w-64 h-64 opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              Let's Build <span className="text-primary">Something Amazing</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Ready to take your brand to the next level? Get in touch with our team and let's discuss how we can help you achieve your goals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Contact Information */}
          <ScrollReveal animation="fade-right">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">Get in Touch</h3>
                <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                  Whether you need a complete brand overhaul, cutting-edge AR/VR experiences, compelling video content, or performance marketing that drives results, we're here to help.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <a 
                  href="mailto:bd@wpixmedia.com" 
                  className="flex items-center gap-3 sm:gap-4 glass-card p-3 sm:p-4 active:scale-[0.98] transition-all touch-manipulation"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">Email</div>
                    <span className="text-primary hover:text-primary-dark transition-colors text-sm sm:text-base">
                      bd@wpixmedia.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4 glass-card p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">Phone</div>
                    <div className="space-y-1">
                      <a href="tel:+918249695463" className="text-primary hover:text-primary-dark transition-colors block text-sm sm:text-base touch-manipulation">
                        +91 82496 95463 <span className="text-xs text-muted-foreground">(Primary)</span>
                      </a>
                      <a href="tel:+919454560032" className="text-primary hover:text-primary-dark transition-colors block text-sm sm:text-base touch-manipulation">
                        +91 94545 60032
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 glass-card p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm sm:text-base">Location</div>
                    <div className="text-muted-foreground text-sm sm:text-base">India | Global Reach</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-4 sm:p-6">
                <h4 className="font-bold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">Quick Response Guarantee</h4>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                  We respond to all inquiries within 24-48 hours and provide a free initial consultation to understand your needs.
                </p>
                <div className="flex items-center gap-2 text-primary text-xs sm:text-sm font-medium">
                  <MessageCircle className="h-4 w-4" />
                  <span>Free Strategy Session Included</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form / CTA */}
          <ScrollReveal animation="fade-left" delay={200}>
            <div className="glass-card p-5 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">Start Your Project</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center glass-stat p-3 sm:p-4 active:scale-[0.98] transition-transform touch-manipulation">
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">7DC</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Design & Branding</div>
                  </div>
                  <div className="text-center glass-stat p-3 sm:p-4 active:scale-[0.98] transition-transform touch-manipulation">
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">AVER</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">AR/VR Solutions</div>
                  </div>
                  <div className="text-center glass-stat p-3 sm:p-4 active:scale-[0.98] transition-transform touch-manipulation">
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">WCF</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Video Production</div>
                  </div>
                  <div className="text-center glass-stat p-3 sm:p-4 active:scale-[0.98] transition-transform touch-manipulation">
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-0.5 sm:mb-1">VYBE</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Digital Marketing</div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">What can we help you with?</h4>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {[
                      "Complete Brand Identity & Strategy",
                      "Immersive AR/VR Experiences",
                      "Video Content & Commercial Production",
                      "Performance Marketing & Growth",
                      "360° Marketing Solution"
                    ].map((service, index) => (
                      <div 
                        key={index}
                        className="p-3 sm:p-4 glass rounded-xl text-center text-xs sm:text-sm text-foreground hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground transition-colors cursor-pointer touch-manipulation"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full group h-12 sm:h-14 text-sm sm:text-base touch-manipulation"
                    onClick={() => window.open('mailto:bd@wpixmedia.com?subject=Project Inquiry from Website', '_blank')}
                  >
                    Start Your Project
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="glass" 
                    size="lg" 
                    className="w-full h-12 sm:h-14 text-sm sm:text-base touch-manipulation"
                    onClick={() => window.open('tel:+918249695463', '_blank')}
                  >
                    Call Now for Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;