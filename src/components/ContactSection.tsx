import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-accent/20 to-background">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Let's Build <span className="text-primary">Something Amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to take your brand to the next level? Get in touch with our team and let's discuss how we can help you achieve your goals.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <ScrollReveal animation="fade-right">
            <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you need a complete brand overhaul, cutting-edge AR/VR experiences, compelling video content, or performance marketing that drives results, we're here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft border border-primary/10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <a href="mailto:bd@wpixmedia.com" className="text-primary hover:text-primary-dark transition-colors">
                    bd@wpixmedia.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft border border-primary/10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Phone</div>
                  <div className="space-y-1">
                    <a href="tel:+918249695463" className="text-primary hover:text-primary-dark transition-colors block">
                      +91 82496 95463 <span className="text-xs text-muted-foreground">(Primary)</span>
                    </a>
                    <a href="tel:+919454560032" className="text-primary hover:text-primary-dark transition-colors block">
                      +91 94545 60032
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft border border-primary/10">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Location</div>
                  <div className="text-muted-foreground">India | Global Reach</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-primary-dark/5 rounded-xl p-6 border border-primary/10">
              <h4 className="font-bold text-foreground mb-3">Quick Response Guarantee</h4>
              <p className="text-muted-foreground text-sm mb-4">
                We respond to all inquiries within 24-48 hours and provide a free initial consultation to understand your needs.
              </p>
              <div className="flex items-center gap-2 text-primary text-sm font-medium">
                <MessageCircle className="h-4 w-4" />
                <span>Free Strategy Session Included</span>
              </div>
            </div>
            </div>
          </ScrollReveal>

          {/* Contact Form / CTA */}
          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-card rounded-3xl p-8 shadow-medium border border-primary/10">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Start Your Project</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="text-2xl font-bold text-primary mb-1">7DC</div>
                  <div className="text-xs text-muted-foreground">Design & Branding</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="text-2xl font-bold text-primary mb-1">AVER</div>
                  <div className="text-xs text-muted-foreground">AR/VR Solutions</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="text-2xl font-bold text-primary mb-1">WCF</div>
                  <div className="text-xs text-muted-foreground">Video Production</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="text-2xl font-bold text-primary mb-1">VYBE</div>
                  <div className="text-xs text-muted-foreground">Digital Marketing</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">What can we help you with?</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-secondary rounded-lg text-center text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    Complete Brand Identity & Strategy
                  </div>
                  <div className="p-3 bg-secondary rounded-lg text-center text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    Immersive AR/VR Experiences
                  </div>
                  <div className="p-3 bg-secondary rounded-lg text-center text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    Video Content & Commercial Production
                  </div>
                  <div className="p-3 bg-secondary rounded-lg text-center text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    Performance Marketing & Growth
                  </div>
                  <div className="p-3 bg-secondary rounded-lg text-center text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                    360° Marketing Solution
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full group"
                  onClick={() => window.open('mailto:bd@wpixmedia.com?subject=Project Inquiry from Website', '_blank')}
                >
                  Start Your Project
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
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