import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-8 sm:py-12 glass-panel">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img 
                src="/lovable-uploads/4b5c977e-5268-4f4d-9366-aa3566e2f422.png" 
                alt="WPIX Media" 
                className="h-7 sm:h-8 w-auto"
              />
              <span className="text-lg sm:text-xl font-bold text-primary">WPIX Media</span>
            </div>
            <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              Designing for Now. Building for Tomorrow.
            </p>
            <p className="text-muted-foreground text-[10px] sm:text-xs">
              Full Spectrum Creative-Tech Agency delivering end-to-end brand solutions.
            </p>
          </div>

          {/* Verticals */}
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Our Verticals</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-foreground/80">
              <li><span className="font-medium text-primary">7DC</span> - Design</li>
              <li><span className="font-medium text-primary">AVER</span> - VR</li>
              <li><span className="font-medium text-primary">WCF</span> - Video</li>
              <li><span className="font-medium text-primary">VYBE</span> - Marketing</li>
            </ul>
          </div>

          {/* Services */}
          <div className="hidden md:block">
            <h3 className="font-bold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Services</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-foreground/80">
              <li>Brand Identity & Strategy</li>
              <li>Virtual Reality Experiences</li>
              <li>Video Content Production</li>
              <li>Performance Marketing</li>
              <li>Social Media Management</li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-bold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Programs</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-foreground/80">
              <li>
                <Link to="/fellowship" className="hover:text-primary transition-colors touch-manipulation">
                  Learn & Earn Fellowship
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors touch-manipulation">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">Contact</h3>
            <div className="space-y-2 sm:space-y-3">
              <a 
                href="mailto:bd@wpixmedia.com" 
                className="flex items-center gap-2 sm:gap-3 touch-manipulation"
              >
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors truncate">
                  bd@wpixmedia.com
                </span>
              </a>
              <div className="space-y-1.5 sm:space-y-2">
                <a 
                  href="tel:+918249695463" 
                  className="flex items-center gap-2 sm:gap-3 touch-manipulation"
                >
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors">
                    +91 82496 95463
                  </span>
                </a>
                <a 
                  href="tel:+919454560032" 
                  className="flex items-center gap-2 sm:gap-3 ml-5 sm:ml-7 touch-manipulation"
                >
                  <span className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                    +91 94545 60032
                  </span>
                </a>
              </div>
              {/* Social Media */}
              <div className="flex items-center gap-2 sm:gap-3 pt-2">
                <a 
                  href="https://www.linkedin.com/company/wpix-media/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl glass hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground transition-all touch-manipulation"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </a>
                <a 
                  href="https://www.instagram.com/wpixmedia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl glass hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground transition-all touch-manipulation"
                  aria-label="Instagram"
                >
                  <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </a>
                <a 
                  href="https://youtube.com/@wpixone" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl glass hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground transition-all touch-manipulation"
                  aria-label="YouTube"
                >
                  <Youtube className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </a>
                <a 
                  href="https://www.x.com/wpixmedia/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl glass hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground transition-all touch-manipulation"
                  aria-label="X (Twitter)"
                >
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--glass-border))] mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-muted-foreground text-[10px] sm:text-sm">
            © 2024 WPIX Media. All rights reserved. | Born in India, Globally Inspired.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;