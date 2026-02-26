import React, { useEffect, useRef } from 'react';
import {
  TrendingUp, Instagram, Youtube, BarChart3, Users, Zap, ArrowRight,
  Bot, Sparkles, Globe, Play, ChevronRight, Brain, Target, Layers,
  VideoIcon, Mic2, Languages, Cpu, LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/hooks/useScrollReveal';

// Animated floating orb background
const MotionBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
    <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] bg-primary/4 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
    <div className="absolute bottom-[-5%] left-[30%] w-[25rem] h-[25rem] bg-accent/30 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
  </div>
);

// Social content card mock
const SocialCard = ({ platform, label, engagement, delay }: { platform: string; label: string; engagement: string; delay: number }) => (
  <div
    className="flex-shrink-0 w-64 bg-card rounded-2xl border border-border overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-1"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="aspect-[4/5] bg-gradient-to-br from-accent to-muted flex flex-col items-center justify-center gap-3 relative">
      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
        {platform === 'Instagram' ? <Instagram className="h-5 w-5 text-primary" /> : <Youtube className="h-5 w-5 text-primary" />}
      </div>
      <div className="text-center px-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{platform}</p>
      </div>
      <div className="absolute bottom-3 right-3 bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5 text-xs text-primary font-medium">{engagement}</div>
    </div>
    <div className="p-4">
      <div className="h-2 bg-muted rounded-full mb-2 w-4/5" />
      <div className="h-2 bg-muted rounded-full w-3/5" />
    </div>
  </div>
);

// YouTube mock card
const YouTubeMock = ({ title, views }: { title: string; views: string }) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-0.5">
    <div className="aspect-video bg-gradient-to-br from-accent to-muted flex items-center justify-center relative">
      <div className="w-14 h-14 bg-primary/90 rounded-full flex items-center justify-center shadow-lg">
        <Play className="h-6 w-6 text-primary-foreground ml-1" fill="currentColor" />
      </div>
      <div className="absolute top-2 right-2 bg-foreground/80 text-background text-xs px-2 py-0.5 rounded">12:34</div>
    </div>
    <div className="p-4">
      <p className="font-medium text-sm text-foreground line-clamp-2">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{views} views</p>
    </div>
  </div>
);

// Simple performance chart mock
const PerformanceMock = () => (
  <div className="bg-card rounded-2xl border border-border p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-sm text-muted-foreground">Campaign Performance</p>
        <p className="text-2xl font-bold text-foreground">6.8× ROAS</p>
      </div>
      <div className="flex items-center gap-1 text-primary text-sm font-medium">
        <TrendingUp className="h-4 w-4" />
        +224%
      </div>
    </div>
    {/* Bar chart */}
    <div className="flex items-end gap-2 h-24 mb-3">
      {[35, 52, 45, 68, 55, 80, 72, 90, 85, 100, 95, 110].map((h, i) => (
        <div key={i} className="flex-1 rounded-t-sm transition-all duration-500" style={{ height: `${h}%`, backgroundColor: i > 8 ? 'hsl(var(--primary))' : 'hsl(var(--primary)/0.25)' }} />
      ))}
    </div>
    <div className="flex justify-between text-xs text-muted-foreground">
      <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
    </div>
    <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-border">
      {[{ label: 'CTR', val: '4.2%' }, { label: 'CPC', val: '₹12' }, { label: 'Conv.', val: '8.7%' }].map(m => (
        <div key={m.label} className="text-center">
          <p className="text-base font-bold text-primary">{m.val}</p>
          <p className="text-xs text-muted-foreground">{m.label}</p>
        </div>
      ))}
    </div>
  </div>
);

// AI Avatar mock
const AIAvatarMock = () => (
  <div className="relative bg-gradient-to-br from-accent/60 to-muted rounded-2xl border border-border p-6 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent" />
    <div className="relative flex flex-col items-center gap-4">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 flex items-center justify-center">
        <Bot className="h-10 w-10 text-primary" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground">AI Brand Spokesperson</p>
        <p className="text-xs text-muted-foreground mt-1">Powered by VYBE AI Engine</p>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {['English', 'Hindi', 'Telugu', 'Bengali'].map(lang => (
          <span key={lang} className="text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-0.5">{lang}</span>
        ))}
      </div>
      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '70%' }} />
      </div>
      <p className="text-xs text-muted-foreground">Generating content... 70%</p>
    </div>
  </div>
);

const VYBE = () => {
  const socialScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = socialScrollRef.current;
    if (!el) return;
    let frame: number;
    let pos = 0;
    const scroll = () => {
      pos += 0.4;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  const socialPosts = [
    { platform: 'Instagram', label: 'Brand Story Reel', engagement: '2.3K ❤️' },
    { platform: 'Instagram', label: 'Product Launch Post', engagement: '5.1K ❤️' },
    { platform: 'Youtube', label: 'Founder Story Ep.1', engagement: '18K 👁' },
    { platform: 'Instagram', label: 'Hook Carousel', engagement: '3.8K ❤️' },
    { platform: 'Youtube', label: 'Brand Documentary', engagement: '42K 👁' },
    { platform: 'Instagram', label: 'Trending Audio Reel', engagement: '9.2K ❤️' },
  ];

  const ytContent = [
    { title: 'How We Built a Brand from ₹0 to ₹1 Crore — Founder Story', views: '48K' },
    { title: 'The Truth About [Niche] — Episodic Series Ep. 3', views: '22K' },
    { title: 'Behind the Brand: A Day at [Company]', views: '31K' },
    { title: 'Product Deep Dive — Everything You Need to Know', views: '15K' },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── SECTION 1: HERO ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center py-24 overflow-hidden">
        <MotionBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="fade-down" duration={700}>
              <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary font-medium mb-8">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Content & Growth Division
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" duration={800} delay={100}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">VYBE</span>
                <span className="text-foreground"> - Where Content</span>
                <br />
                <span className="text-foreground">Becomes </span>
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Growth.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" duration={800} delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                An AI-powered content and performance engine built for brands that want attention, authority, and measurable growth.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" duration={700} delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => window.location.href = '/#contact'}
                  className="text-base px-8"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Build My Growth System
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-base px-8"
                >
                  Explore Services
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHAT IS VYBE ──────────────────────────── */}
      <section id="services" className="py-20 bg-card/40 border-y border-border">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">What is VYBE?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">VYBE (Visibility • Yield • Brand Engagement)</span> is WPIX Media's growth division focused on high-engagement storytelling, IP creation, AI-powered content systems, and performance-led distribution.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: 'Engagement Engine', icon: <Zap className="h-3.5 w-3.5" /> },
                { label: 'AI Content Systems', icon: <Brain className="h-3.5 w-3.5" /> },
                { label: 'Performance & LLM Growth', icon: <TrendingUp className="h-3.5 w-3.5" /> },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-full px-5 py-2.5 text-sm font-medium text-primary">
                  {b.icon}
                  {b.label}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 3: ENGAGEMENT CONTENT SYSTEMS ───────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <ScrollReveal animation="fade-right">
              <div>
                <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
                  <Instagram className="h-4 w-4" /> Social Content
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">High-Engagement Social Content</h2>
                <p className="text-muted-foreground mb-8 text-lg">We don't manage pages. We engineer attention.</p>
                <ul className="space-y-3">
                  {[
                    'Platform-specific content strategy',
                    'Reels-first content production',
                    'Storytelling carousels',
                    'Hook-based scripting',
                    'Trend-adaptive content system',
                    'Caption engineering (not generic captions)',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="h-3 w-3 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Scrolling social cards */}
            <ScrollReveal animation="fade-left">
              <div className="overflow-hidden rounded-2xl" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <div ref={socialScrollRef} className="flex gap-4 overflow-x-hidden pb-2 cursor-default select-none">
                  {[...socialPosts, ...socialPosts].map((post, i) => (
                    <SocialCard key={i} platform={post.platform} label={post.label} engagement={post.engagement} delay={i * 100} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: IP & YOUTUBE ──────────────────────────── */}
      <section className="py-20 bg-card/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* YouTube grid mock */}
            <ScrollReveal animation="fade-right">
              <div className="grid grid-cols-2 gap-3">
                {ytContent.map((v, i) => (
                  <YouTubeMock key={i} title={v.title} views={v.views} />
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left">
              <div>
                <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
                  <Youtube className="h-4 w-4" /> Brand IP
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">IP & Evergreen Brand Content</h2>
                <p className="text-muted-foreground mb-8 text-lg">We build content that compounds, not content that expires.</p>
                <ul className="space-y-3">
                  {[
                    'Recurring content series',
                    'Founder-led storytelling formats',
                    'Episodic content planning',
                    'Branded YouTube channel setup',
                    'Long-form + short-form funnel system',
                    'Thumbnail & title psychology',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="h-3 w-3 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: AI-A-UGC ─────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <ScrollReveal animation="fade-right">
              <div>
                <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
                  <Bot className="h-4 w-4" /> AI Content
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">AI-A-UGC</h2>
                <p className="text-primary font-medium mb-4">AI Avatar User Generated Content</p>
                <p className="text-muted-foreground mb-8 text-lg">Scale authentic content without depending on creators every time.</p>
                <ul className="space-y-3">
                  {[
                    'AI brand spokesperson videos',
                    'AI product explainers',
                    'Multilingual avatar content',
                    'Script-to-video automation',
                    'Ad creative variations at scale',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="h-3 w-3 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-left">
              <AIAvatarMock />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: PERFORMANCE & LLM ─────────────────────── */}
      <section className="py-20 bg-card/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Performance mock */}
            <ScrollReveal animation="fade-right">
              <PerformanceMock />
            </ScrollReveal>

            <ScrollReveal animation="fade-left">
              <div>
                <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
                  <Target className="h-4 w-4" /> Performance
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Growth Performance Engine</h2>
                <p className="text-muted-foreground mb-8 text-lg">We optimize for humans and algorithms — including AI.</p>
                <ul className="space-y-3">
                  {[
                    'Meta Ads management',
                    'Google Ads & YouTube Ads',
                    'Full-funnel retargeting',
                    'GA4 & conversion tracking',
                    'LLM visibility optimization',
                    'AI-search structured content strategy',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="h-3 w-3 text-primary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: CREATOR NETWORK (VYBE X) ─────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="zoom-in">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-6">
                <Users className="h-4 w-4" /> Creator Network
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Creator & Influencer Network</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Access our curated micro-creator marketplace through <span className="font-semibold text-primary">VYBE X</span>.
              </p>
              <p className="text-muted-foreground mb-8">
                Instagram Story promotions with verified 5k–50k creators.
              </p>
              {/* Influencer avatar row */}
              <div className="flex justify-center gap-3 mb-8 flex-wrap">
                {[
                  { image: '/lovable-uploads/definite-official-logo.jpg', name: 'DefiniteOfficial', followers: '76.2K' },
                  { image: '/lovable-uploads/beatthehunger-logo.jpg', name: 'Beat The Hunger', followers: '112K' },
                  { image: '/lovable-uploads/influencer-merapittara.png', name: 'Mera Pittara', followers: '277K' },
                  { image: '/lovable-uploads/influencer-vikin.png', name: 'Vikin.ing', followers: '232K' },
                ].map((inf, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/30 hover:ring-primary transition-all">
                      <img src={inf.image} alt={inf.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-foreground truncate max-w-[70px]">{inf.name}</p>
                      <p className="text-xs text-primary">{inf.followers}</p>
                    </div>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">+40</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-muted-foreground">More</p>
                    <p className="text-xs text-muted-foreground">creators</p>
                  </div>
                </div>
              </div>
              <Button
                variant="hero"
                size="lg"
                onClick={() => window.open('https://vybex.wpixmedia.com', '_blank')}
                className="text-base px-8"
              >
                Explore VYBE X
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SECTION 8: CTA BLOCK ─────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-primary/8 via-background to-accent/20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="zoom-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ready to Build Content<br />
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">That Converts?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Let VYBE design your engagement and growth system.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => window.location.href = '/#contact'}
              className="text-base px-10"
            >
              Book a Discovery Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default VYBE;
