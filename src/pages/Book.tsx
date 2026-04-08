import React, { useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Book = () => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Book a Call | WPIX Media"
        description="Schedule a free consultation with WPIX Media. Let's discuss your project and how we can help."
      />
      <Navigation />
      <main className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Schedule a <span className="text-primary">Free Consultation</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Pick a time that works for you. We'll discuss your project goals and how WPIX Media can help you grow.
            </p>
          </div>
          <div className="glass-card rounded-2xl overflow-hidden p-2 sm:p-4 max-w-4xl mx-auto">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/bd-wpixmedia/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=2d9b63"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Book;
