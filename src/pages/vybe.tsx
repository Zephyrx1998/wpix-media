import React, { useEffect, useRef, useState } from 'react';
import {
  TrendingUp, Instagram, Youtube, BarChart3, Users, Zap, ArrowRight,
  Bot, Sparkles, Play, ChevronRight, Brain, Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
   MICRO COMPONENTS
───────────────────────────────────────────────────────── */

const MotionBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
    <div className="absolute -top-20 -left-10 w-72 h-72 bg-primary/6 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '6s' }} />
    <div className="absolute top-1/2 -right-10 w-56 h-56 bg-primary/4 rounded-full blur-[60px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
  </div>
);

/** Chip / badge pill */
const Chip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-1.5 bg-primary/8 border border-primary/20 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary select-none">
    {icon}
    {label}
  </div>
);

/** Feature list item */
const Feature = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3">
    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/12 flex items-center justify-center flex-shrink-0">
      <ChevronRight className="h-3 w-3 text-primary" />
    </div>
    <span className="text-sm text-foreground leading-snug">{text}</span>
  </li>
);

/** Section header */
const SectionHeader = ({
  eyebrow, icon, title, subtitle,
}: { eyebrow: string; icon: React.ReactNode; title: string; subtitle: React.ReactNode }) => (
  <div className="mb-8">
    <div className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold mb-3 tracking-wide uppercase">
      {icon} {eyebrow}
    </div>
    <h2 className="text-2xl font-bold text-foreground mb-2 leading-tight">{title}</h2>
    <div className="text-sm text-muted-foreground leading-relaxed">{subtitle}</div>
  </div>
);

/* ─── Social Card ────────────────────────────────────── */
const SocialCard = ({ platform, label, engagement }: { platform: string; label: string; engagement: string }) => (
  <div className="flex-shrink-0 w-48 rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-soft)]">
    <div className="aspect-[4/5] bg-gradient-to-br from-accent/80 to-muted flex flex-col items-center justify-center gap-2 relative p-4">
      <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
        {platform === 'Instagram'
          ? <Instagram className="h-4 w-4 text-primary" />
          : <Youtube className="h-4 w-4 text-primary" />}
      </div>
      <p className="text-xs font-medium text-center text-foreground px-2">{label}</p>
      <div className="absolute bottom-2 right-2 bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5 text-[10px] text-primary font-semibold">{engagement}</div>
    </div>
    <div className="p-3">
      <div className="h-1.5 bg-muted rounded-full mb-1.5 w-4/5" />
      <div className="h-1.5 bg-muted rounded-full w-3/5" />
    </div>
  </div>
);

/* ─── YouTube Card ───────────────────────────────────── */
const YTCard = ({ title, views }: { title: string; views: string }) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden active:scale-[0.98] transition-transform">
    <div className="aspect-video bg-gradient-to-br from-accent/80 to-muted flex items-center justify-center relative">
      <div className="w-10 h-10 bg-primary/90 rounded-full flex items-center justify-center shadow">
        <Play className="h-4 w-4 text-primary-foreground ml-0.5" fill="currentColor" />
      </div>
      <div className="absolute top-1.5 right-1.5 bg-foreground/75 text-background text-[10px] px-1.5 py-0.5 rounded">12:34</div>
    </div>
    <div className="p-3">
      <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug">{title}</p>
      <p className="text-[10px] text-muted-foreground mt-1">{views} views</p>
    </div>
  </div>
);

/* ─── AI Avatar Mock ─────────────────────────────────── */
const AIAvatarMock = () => (
  <div className="bg-gradient-to-br from-accent/60 to-muted rounded-2xl border border-border p-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent" />
    <div className="relative flex flex-col items-center gap-3">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 flex items-center justify-center">
        <Bot className="h-9 w-9 text-primary" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-sm text-foreground">AI Brand Spokesperson</p>
        <p className="text-xs text-muted-foreground mt-0.5">Powered by VYBE AI Engine</p>
      </div>
      <div className="flex gap-1.5 flex-wrap justify-center">
        {['English', 'Hindi', 'Telugu', 'Bengali'].map(lang => (
          <span key={lang} className="text-[10px] bg-primary/10 text-primary border border-primary/20 rounded-full px-2 py-0.5">{lang}</span>
        ))}
      </div>
      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '70%' }} />
      </div>
      <p className="text-[10px] text-muted-foreground">Generating content... 70%</p>
    </div>
  </div>
);

/* ─── Performance Mini Chart ─────────────────────────── */
const PerfMock = () => (
  <div className="bg-card rounded-2xl border border-border p-4">
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-[11px] text-muted-foreground">Campaign ROAS</p>
        <p className="text-xl font-bold text-foreground">6.8×</p>
      </div>
      <div className="flex items-center gap-1 text-primary text-xs font-semibold bg-primary/10 rounded-full px-2.5 py-1">
        <TrendingUp className="h-3 w-3" /> +224%
      </div>
    </div>
    <div className="flex items-end gap-1 h-16 mb-2">
      {[35, 52, 45, 68, 55, 80, 72, 90, 85, 100, 95, 110].map((h, i) => (
        <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: i > 8 ? 'hsl(var(--primary))' : 'hsl(var(--primary)/0.2)' }} />
      ))}
    </div>
    <div className="flex justify-between text-[10px] text-muted-foreground mb-3">
      <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
    </div>
    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
      {[{ l: 'CTR', v: '4.2%' }, { l: 'CPC', v: '₹12' }, { l: 'Conv.', v: '8.7%' }].map(m => (
        <div key={m.l} className="text-center">
          <p className="text-sm font-bold text-primary">{m.v}</p>
          <p className="text-[10px] text-muted-foreground">{m.l}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────
   SERVICE TABS (horizontal scroll tabs for mobile)
───────────────────────────────────────────────────────── */
const services: { id: string; tab: string; icon: React.ReactNode; eyebrow: string; title: string; subtitle: React.ReactNode; features: string[]; visual: string }[] = [
  {
    id: 'social',
    tab: 'Social',
    icon: <Instagram className="h-4 w-4" />,
    eyebrow: 'Social Content',
    title: 'High-Engagement Social Content',
    subtitle: "We don't manage pages. We engineer attention.",
    features: [
      'Platform-specific content strategy',
      'Reels-first content production',
      'Storytelling carousels',
      'Hook-based scripting',
      'Trend-adaptive content system',
      'Caption engineering (not generic captions)',
    ],
    visual: 'social',
  },
  {
    id: 'ip',
    tab: 'IP & YouTube',
    icon: <Youtube className="h-4 w-4" />,
    eyebrow: 'Brand IP',
    title: 'IP & Evergreen Brand Content',
    subtitle: 'We build content that compounds, not content that expires.',
    features: [
      'Recurring content series',
      'Founder-led storytelling formats',
      'Episodic content planning',
      'Branded YouTube channel setup',
      'Long-form + short-form funnel system',
      'Thumbnail & title psychology',
    ],
    visual: 'youtube',
  },
  {
    id: 'ai',
    tab: 'AI-A-UGC',
    icon: <Bot className="h-4 w-4" />,
    eyebrow: 'AI Content',
    title: 'AI-A-UGC',
    subtitle: 'Scale authentic content without depending on creators every time.',
    features: [
      'AI brand spokesperson videos',
      'AI product explainers',
      'Multilingual avatar content',
      'Script-to-video automation',
      'Ad creative variations at scale',
    ],
    visual: 'ai',
  },
  {
    id: 'perf',
    tab: 'Performance',
    icon: <Target className="h-4 w-4" />,
    eyebrow: 'Performance',
    title: 'Growth Performance Engine',
    subtitle: 'We optimize for humans and algorithms — including AI.',
    features: [
      'Meta Ads management',
      'Google Ads & YouTube Ads',
      'Full-funnel retargeting',
      'GA4 & conversion tracking',
      'LLM visibility optimization',
      'AI-search structured content strategy',
    ],
    visual: 'perf',
  },
];

const socialPosts = [
  { platform: 'Instagram', label: 'Brand Story Reel', engagement: '2.3K ❤️' },
  { platform: 'Instagram', label: 'Product Launch Post', engagement: '5.1K ❤️' },
  { platform: 'Youtube', label: 'Founder Story', engagement: '18K 👁' },
  { platform: 'Instagram', label: 'Hook Carousel', engagement: '3.8K ❤️' },
  { platform: 'Youtube', label: 'Brand Doc', engagement: '42K 👁' },
  { platform: 'Instagram', label: 'Trending Reel', engagement: '9.2K ❤️' },
];

const ytContent = [
  { title: 'How We Built a Brand from ₹0 to ₹1 Crore — Founder Story', views: '48K' },
  { title: 'The Truth About [Niche] — Series Ep. 3', views: '22K' },
  { title: 'Behind the Brand: A Day at [Company]', views: '31K' },
  { title: 'Product Deep Dive — Everything You Need to Know', views: '15K' },
];

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
const VYBE = () => {
  const [activeTab, setActiveTab] = useState(0);
  const socialScrollRef = useRef<HTMLDivElement>(null);
  const tabScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll social cards
  useEffect(() => {
    const el = socialScrollRef.current;
    if (!el) return;
    let frame: number;
    let pos = 0;
    const scroll = () => {
      pos += 0.5;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(scroll);
    };
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [activeTab]);

  // Scroll active tab into view
  useEffect(() => {
    const el = tabScrollRef.current;
    if (!el) return;
    const activeBtn = el.children[activeTab] as HTMLElement;
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  const cur = services[activeTab];

  return (
    <div
      className="min-h-screen bg-background"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col justify-center pt-20 pb-10 px-5 overflow-hidden">
        <MotionBackground />

        <div className="relative z-10 max-w-lg mx-auto w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Chip icon={<Sparkles className="h-3 w-3" />} label="AI-Powered Content & Growth" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-4"
          >
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">VYBE</span>
            <span className="text-foreground"> - Where Content<br />Becomes </span>
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Growth.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground mb-8 leading-relaxed"
          >
            An AI-powered content and performance engine built for brands that want attention, authority, and measurable growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <Button
              variant="hero"
              size="lg"
              onClick={() => window.location.href = '/#contact'}
              className="w-full h-14 text-base font-semibold rounded-2xl active:scale-[0.98] transition-transform"
            >
              <Zap className="mr-2 h-5 w-5" />
              Build My Growth System
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full h-12 text-sm rounded-2xl active:scale-[0.98] transition-transform"
            >
              Explore Services
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-3 mt-10"
          >
            {[
              { val: '3×', label: 'Avg Revenue Lift' },
              { val: '6.8×', label: 'ROAS Delivered' },
              { val: '500K+', label: 'Reach Generated' },
            ].map(s => (
              <div key={s.val} className="bg-card/70 border border-border rounded-2xl p-3 text-center">
                <p className="text-lg font-bold text-primary">{s.val}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS VYBE ───────────────────────────────── */}
      <section className="px-5 py-10 bg-card/40 border-y border-border">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-foreground mb-3">What is VYBE?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            <span className="font-semibold text-foreground">VYBE (Visibility • Yield • Brand Engagement)</span> is WPIX Media's growth division focused on high-engagement storytelling, IP creation, AI-powered content systems, and performance-led distribution.
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip icon={<Zap className="h-3 w-3" />} label="Engagement Engine" />
            <Chip icon={<Brain className="h-3 w-3" />} label="AI Content Systems" />
            <Chip icon={<TrendingUp className="h-3 w-3" />} label="Performance & LLM Growth" />
          </div>
        </div>
      </section>

      {/* ── SERVICES (TABBED) ──────────────────────────── */}
      <section id="services-section" className="py-10">
        <div className="max-w-lg mx-auto w-full">
          {/* Tab Bar */}
          <div
            ref={tabScrollRef}
            className="flex gap-2 overflow-x-auto px-5 pb-3 hide-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(i)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                  activeTab === i
                    ? 'bg-primary text-primary-foreground shadow-[var(--shadow-soft)]'
                    : 'bg-card border border-border text-muted-foreground'
                }`}
              >
                {s.icon}
                {s.tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="px-5 pt-5"
            >
              {/* Visual */}
              <div className="mb-6">
                {cur.visual === 'social' && (
                  <div
                    className="overflow-hidden rounded-2xl"
                    style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
                  >
                    <div ref={socialScrollRef} className="flex gap-3 overflow-x-hidden select-none">
                      {[...socialPosts, ...socialPosts].map((p, i) => (
                        <SocialCard key={i} {...p} />
                      ))}
                    </div>
                  </div>
                )}
                {cur.visual === 'youtube' && (
                  <div className="grid grid-cols-2 gap-3">
                    {ytContent.map((v, i) => <YTCard key={i} {...v} />)}
                  </div>
                )}
                {cur.visual === 'ai' && <AIAvatarMock />}
                {cur.visual === 'perf' && <PerfMock />}
              </div>

              {/* Text */}
              <SectionHeader
                eyebrow={cur.eyebrow}
                icon={cur.icon}
                title={cur.title}
                subtitle={cur.visual === 'ai'
                  ? <>
                      <span className="text-primary font-medium text-xs block mb-1">AI Avatar User Generated Content</span>
                      {cur.subtitle}
                    </>
                  : cur.subtitle
                }
              />
              <ul className="space-y-2.5">
                {cur.features.map(f => <Feature key={f} text={f} />)}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CREATOR NETWORK ─────────────────────────────── */}
      <section className="px-5 py-10 bg-card/40 border-t border-border">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-1.5 text-primary text-[11px] font-semibold mb-3 uppercase tracking-wide">
            <Users className="h-3.5 w-3.5" /> Creator Network
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">VYBE X Creator Network</h2>
          <p className="text-sm text-muted-foreground mb-1">Access our curated micro-creator marketplace through <span className="font-semibold text-primary">VYBE X</span>.</p>
          <p className="text-xs text-muted-foreground mb-6">Instagram Story promotions with verified 5k–50k creators.</p>

          {/* Influencer avatars */}
          <div className="flex gap-4 mb-6 overflow-x-auto hide-scrollbar pb-1">
            {[
              { img: '/lovable-uploads/definite-official-logo.jpg', name: 'DefiniteOfficial', followers: '76.2K' },
              { img: '/lovable-uploads/beatthehunger-logo.jpg', name: 'BeatTheHunger', followers: '112K' },
              { img: '/lovable-uploads/influencer-merapittara.png', name: 'Mera Pittara', followers: '277K' },
              { img: '/lovable-uploads/influencer-vikin.png', name: 'Vikin.ing', followers: '232K' },
            ].map((inf, i) => (
              <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1.5">
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/25">
                  <img src={inf.img} alt={inf.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-[10px] font-medium text-foreground text-center w-16 truncate">{inf.name}</p>
                <p className="text-[10px] text-primary font-semibold">{inf.followers}</p>
              </div>
            ))}
            <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-full bg-primary/8 border-2 border-dashed border-primary/25 flex items-center justify-center">
                <span className="text-primary font-bold text-xs">+40</span>
              </div>
              <p className="text-[10px] text-muted-foreground">More</p>
            </div>
          </div>

          <Button
            variant="hero"
            className="w-full h-12 rounded-2xl text-sm font-semibold active:scale-[0.98] transition-transform"
            onClick={() => window.open('https://vybex.wpixmedia.com', '_blank')}
          >
            Explore VYBE X
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="px-5 py-14 bg-gradient-to-br from-primary/8 via-background to-accent/20 border-t border-border">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3 leading-tight">
            Ready to Build Content<br />
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">That Converts?</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-8">Let VYBE design your engagement and growth system.</p>
          <Button
            variant="hero"
            size="lg"
            onClick={() => window.location.href = '/#contact'}
            className="w-full h-14 text-base font-semibold rounded-2xl active:scale-[0.98] transition-transform"
          >
            Book a Discovery Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* ── STICKY BOTTOM CTA BAR (mobile-only) ─────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/90 backdrop-blur-md border-t border-border px-4 py-3 flex gap-3"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <Button
          variant="outline"
          className="flex-1 h-11 rounded-xl text-xs font-semibold active:scale-[0.97] transition-transform"
          onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Services
        </Button>
        <Button
          variant="hero"
          className="flex-1 h-11 rounded-xl text-xs font-semibold active:scale-[0.97] transition-transform"
          onClick={() => window.location.href = '/#contact'}
        >
          <Zap className="mr-1 h-3.5 w-3.5" /> Let's Build
        </Button>
      </div>

      {/* Bottom spacer so sticky bar doesn't overlap content */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default VYBE;
