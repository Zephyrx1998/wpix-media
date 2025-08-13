import React from 'react';
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/4b5c977e-5268-4f4d-9366-aa3566e2f422.png" 
                alt="WPIX Media" 
                className="h-8 w-auto filter brightness-0 invert"
              />
              <span className="text-xl font-bold">WPIX Media</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed mb-4">
              Designing for Now. Building for Tomorrow.
            </p>
            <p className="text-background/60 text-xs">
              360° Creative-Tech Agency delivering end-to-end brand solutions.
            </p>
          </div>

          {/* Verticals */}
          <div>
            <h3 className="font-bold mb-4">Our Verticals</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li><span className="font-medium">7DC</span> - Design & Branding</li>
              <li><span className="font-medium">AVER</span> - AR/VR Solutions</li>
              <li><span className="font-medium">WCF</span> - Video Production</li>
              <li><span className="font-medium">VYBE</span> - Digital Marketing</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Brand Identity & Strategy</li>
              <li>Virtual Reality Experiences</li>
              <li>Video Content Production</li>
              <li>Performance Marketing</li>
              <li>Social Media Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-background/60" />
                <a href="mailto:bd@wpixmedia.com" className="text-sm text-background/80 hover:text-background transition-colors">
                  bd@wpixmedia.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-background/60" />
                <a href="tel:+918249695463" className="text-sm text-background/80 hover:text-background transition-colors">
                  +91 82496 95463
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 2024 WPIX Media. All rights reserved. | Born in India, Globally Inspired.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;