import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { theme, setTheme } = useTheme();

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'verticals', label: 'Verticals' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-panel border-b border-[hsl(var(--glass-border))] shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/lovable-uploads/4b5c977e-5268-4f4d-9366-aa3566e2f422.png" 
                alt="WPIX Media" 
                className="h-7 sm:h-8 w-auto"
              />
              <span className="text-lg sm:text-xl font-bold text-primary">WPIX Media</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {isHomePage ? (
              <>
                {menuItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
                  >
                    {item.label}
                  </button>
                ))}
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
              className={`px-3 py-1.5 rounded-lg transition-all duration-300 text-sm lg:text-base ${
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
            className="md:hidden h-10 w-10 touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-background border-l border-border z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="text-lg font-semibold text-foreground">Menu</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 touch-manipulation"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-1 px-3">
                    {isHomePage ? (
                      <>
                        {menuItems.map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => scrollToSection(item.id)}
                            className="flex items-center justify-between w-full p-4 rounded-xl text-left text-foreground hover:bg-accent active:bg-accent/80 transition-colors touch-manipulation"
                          >
                            <span className="text-base font-medium">{item.label}</span>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </motion.button>
                        ))}
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Link 
                          to="/"
                          className="flex items-center justify-between w-full p-4 rounded-xl text-left text-foreground hover:bg-accent transition-colors touch-manipulation"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="text-base font-medium">Back to Home</span>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </Link>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <Link 
                        to="/ai-toolkit"
                        className={`flex items-center justify-between w-full p-4 rounded-xl text-left transition-colors touch-manipulation ${
                          location.pathname === '/ai-toolkit' 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'text-foreground hover:bg-accent'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-base font-medium">AI Toolkit ✨</span>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Link>
                    </motion.div>
                  </div>

                  {/* Theme Toggle */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="px-3 mt-4"
                  >
                    <button
                      onClick={toggleTheme}
                      className="flex items-center justify-between w-full p-4 rounded-xl text-left text-foreground hover:bg-accent transition-colors touch-manipulation"
                    >
                      <span className="text-base font-medium flex items-center gap-3">
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </span>
                    </button>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="p-4 border-t border-border"
                >
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (isHomePage) scrollToSection('contact');
                    }}
                    className="w-full h-12 text-base touch-manipulation"
                    {...(!isHomePage && { asChild: true })}
                  >
                    {!isHomePage ? (
                      <Link to="/#contact">Get Started</Link>
                    ) : (
                      'Get Started'
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;