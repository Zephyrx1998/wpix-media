import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 bg-[hsl(var(--glass-bg))] backdrop-blur-xl border-t border-[hsl(var(--glass-border))]">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/4b5c977e-5268-4f4d-9366-aa3566e2f422.png" 
                alt="WPIX Media" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-primary">WPIX Media</span>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed mb-4">
              Designing for Now. Building for Tomorrow.
            </p>
            <p className="text-muted-foreground text-xs">
              Full Spectrum Creative-Tech Agency delivering end-to-end brand solutions.
            </p>
          </div>

          {/* Verticals */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Our Verticals</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li><span className="font-medium text-primary">7DC</span> - Design & Branding</li>
              <li><span className="font-medium text-primary">AVER</span> - VR Solutions</li>
              <li><span className="font-medium text-primary">WCF</span> - Video Production</li>
              <li><span className="font-medium text-primary">VYBE</span> - Digital Marketing</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Services</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>Brand Identity & Strategy</li>
              <li>Virtual Reality Experiences</li>
              <li>Video Content Production</li>
              <li>Performance Marketing</li>
              <li>Social Media Management</li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Programs</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>
                <Link to="/fellowship" className="hover:text-primary transition-colors">
                  WPIX Learn & Earn Fellowship
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:bd@wpixmedia.com" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  bd@wpixmedia.com
                </a>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+918249695463" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                    +91 82496 95463
                  </a>
                </div>
                <div className="flex items-center gap-3 ml-7">
                  <a href="tel:+919454560032" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    +91 94545 60032
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--glass-border))] mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 WPIX Media. All rights reserved. | Born in India, Globally Inspired.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;