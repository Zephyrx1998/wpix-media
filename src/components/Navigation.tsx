import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-[hsl(var(--glass-border))]">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/4b5c977e-5268-4f4d-9366-aa3566e2f422.png" 
              alt="WPIX Media" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-primary">WPIX Media</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {isHomePage ? (
            <>
              <button 
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('verticals')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Verticals
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </>
          ) : (
            <Link 
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Back to Home
            </Link>
          )}
          <Link 
            to="/ai-toolkit"
            className={`px-3 py-1.5 rounded-lg transition-all duration-300 ${
              location.pathname === '/ai-toolkit' 
                ? 'bg-primary text-primary-foreground shadow-[var(--glass-shadow)]' 
                : 'text-primary hover:bg-[hsl(var(--glass-bg))] hover:backdrop-blur-md'
            }`}
          >
            AI Toolkit
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button 
            variant="hero" 
            size="sm"
            onClick={() => isHomePage ? scrollToSection('contact') : null}
            {...(!isHomePage && { asChild: true })}
          >
            {!isHomePage ? (
              <Link to="/#contact">Get Started</Link>
            ) : (
              'Get Started'
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="glass"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass-panel border-b border-[hsl(var(--glass-border))] md:hidden">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {isHomePage ? (
                <>
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-left text-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-left text-foreground hover:text-primary transition-colors"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-left text-foreground hover:text-primary transition-colors"
                  >
                    Services
                  </button>
                  <button 
                    onClick={() => scrollToSection('verticals')}
                    className="text-left text-foreground hover:text-primary transition-colors"
                  >
                    Verticals
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-left text-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </button>
                </>
              ) : (
                <Link 
                  to="/"
                  className="text-left text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Back to Home
                </Link>
              )}
              <Link 
                to="/ai-toolkit"
                className={`text-left transition-colors ${
                  location.pathname === '/ai-toolkit' 
                    ? 'text-primary font-medium' 
                    : 'text-foreground hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                AI Toolkit
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-left text-foreground hover:text-primary transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (isHomePage) scrollToSection('contact');
                }}
                className="self-start"
                {...(!isHomePage && { asChild: true })}
              >
                {!isHomePage ? (
                  <Link to="/#contact">Get Started</Link>
                ) : (
                  'Get Started'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;