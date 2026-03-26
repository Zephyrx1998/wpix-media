import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import VerticalsSection from "@/components/VerticalsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WPIX Media",
  "url": "https://www.wpixmedia.com",
  "logo": "https://www.wpixmedia.com/logo.png",
  "foundingDate": "2021-07",
  "description": "Full-spectrum creative-tech agency based in New Delhi, India. Content and growth, brand design, 360 VR tours, and film production.",
  "email": "info@wpixmedia.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "New Delhi",
    "addressRegion": "Delhi",
    "addressCountry": "IN"
  },
  "founder": {
    "@type": "Person",
    "name": "Sambit Rout",
    "jobTitle": "Co-founder and CEO"
  },
  "sameAs": [
    "https://www.linkedin.com/company/wpixmedia",
    "https://www.instagram.com/wpixmedia"
  ]
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <SEOHead
        title="WPIX Media | Creative-Tech Agency New Delhi - Content, Brand & VR"
        description="WPIX Media is a full-spectrum creative-tech agency in New Delhi. Content, brand design, 360° VR tours, and film production. Bootstrapped. Results-first."
        canonical="https://www.wpixmedia.com/"
        jsonLd={homepageJsonLd}
      />
      <ParticleBackground />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ApproachSection />
        <VerticalsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
