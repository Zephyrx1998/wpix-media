import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ApproachSection from "@/components/ApproachSection";
import VerticalsSection from "@/components/VerticalsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <title>WPIX Media | Creative-Tech Agency New Delhi - Content, Brand & VR</title>
        <meta name="description" content="WPIX Media is a full-spectrum creative-tech agency in New Delhi. Content, brand design, 360° VR tours, and film production. Bootstrapped. Results-first." />
        <link rel="canonical" href="https://www.wpixmedia.com/" />
        <meta property="og:title" content="WPIX Media | Creative-Tech Agency New Delhi - Content, Brand & VR" />
        <meta property="og:description" content="WPIX Media is a full-spectrum creative-tech agency in New Delhi. Content, brand design, 360° VR tours, and film production. Bootstrapped. Results-first." />
        <meta property="og:url" content="https://www.wpixmedia.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/UAbP8rN9WyWEWQo6hJIPEXXKYUq2/social-images/social-1757677580507-WPIX New logo-02.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WPIX Media | Creative-Tech Agency New Delhi - Content, Brand & VR" />
        <meta name="twitter:description" content="WPIX Media is a full-spectrum creative-tech agency in New Delhi. Content, brand design, 360° VR tours, and film production. Bootstrapped. Results-first." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WPIX Media",
          "url": "https://www.wpixmedia.com",
          "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/UAbP8rN9WyWEWQo6hJIPEXXKYUq2/social-images/social-1757677580507-WPIX New logo-02.png",
          "description": "Full-spectrum creative-tech agency in New Delhi. Content, brand design, 360° VR tours, and film production.",
          "email": "bd@wpixmedia.com",
          "address": { "@type": "PostalAddress", "addressLocality": "New Delhi", "addressCountry": "IN" },
          "sameAs": []
        })}</script>
      </Helmet>
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
