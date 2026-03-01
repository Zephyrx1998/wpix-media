import React, { useEffect, useRef, useState } from 'react';
import {
  TrendingUp, Instagram, Youtube, BarChart3, Users, Zap, ArrowRight,
  Bot, Sparkles, Play, ChevronRight, Brain, Target, CheckCircle2 } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   SHARED MICRO COMPONENTS
═══════════════════════════════════════════════════════════ */

const VybeBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
    {/* Large primary orb — top left */}
    <div
      className="absolute rounded-full animate-float-slow"
      style={{
        width: 560, height: 560,
        background: 'radial-gradient(circle, hsl(153 65% 35% / 0.18) 0%, transparent 70%)',
        left: '-8%', top: '-5%',
        filter: 'blur(90px)',
        willChange: 'transform',
      }}
    />
    {/* Mid accent orb — right center */}
    <div
      className="absolute rounded-full animate-float-medium"
      style={{
        width: 420, height: 420,
        background: 'radial-gradient(circle, hsl(153 80% 25% / 0.14) 0%, transparent 70%)',
        right: '-5%', top: '40%',
        filter: 'blur(100px)',
        willChange: 'transform',
      }}
    />
    {/* Small accent orb — bottom center */}
    <div
      className="absolute rounded-full animate-float-slow"
      style={{
        width: 300, height: 300,
        background: 'radial-gradient(circle, hsl(153 45% 55% / 0.12) 0%, transparent 70%)',
        left: '35%', bottom: '10%',
        filter: 'blur(80px)',
        animationDelay: '3s',
        willChange: 'transform',
      }}
    />
    {/* Mesh gradient overlay */}
    <div
      className="absolute inset-0 opacity-30"
      style={{
        background: `
          radial-gradient(ellipse at 15% 25%, hsl(153 65% 35% / 0.07) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 75%, hsl(153 80% 25% / 0.06) 0%, transparent 55%),
          radial-gradient(ellipse at 50% 50%, hsl(153 45% 55% / 0.04) 0%, transparent 60%)
        `,
      }}
    />
    {/* Floating particles */}
    {[
      { x: 12, y: 18, s: 4, dur: 22, del: 0 },
      { x: 78, y: 8,  s: 3, dur: 28, del: 1.5 },
      { x: 45, y: 35, s: 5, dur: 20, del: 3 },
      { x: 88, y: 55, s: 3, dur: 25, del: 0.5 },
      { x: 22, y: 72, s: 4, dur: 30, del: 2 },
      { x: 60, y: 80, s: 3, dur: 24, del: 4 },
      { x: 5,  y: 50, s: 4, dur: 26, del: 1 },
      { x: 95, y: 25, s: 3, dur: 32, del: 2.5 },
      { x: 35, y: 92, s: 5, dur: 21, del: 3.5 },
      { x: 70, y: 15, s: 3, dur: 27, del: 0.8 },
    ].map((p, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-float-particle"
        style={{
          width: p.s, height: p.s,
          left: `${p.x}%`, top: `${p.y}%`,
          background: 'hsl(153 65% 35% / 0.25)',
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.del}s`,
          willChange: 'transform, opacity',
        }}
      />
    ))}
  </div>
);

/* Kept as alias for sections that use it inline */
const MotionBackground = () => null;


const Chip = ({ icon, label }: {icon: React.ReactNode;label: string;}) =>
<div className="flex items-center gap-1.5 bg-primary/8 border border-primary/20 rounded-full px-3.5 py-1.5 text-xs font-semibold text-primary select-none">
    {icon}{label}
  </div>;


const Feature = ({ text }: {text: string;}) =>
<li className="flex items-start gap-3">
    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
    <span className="text-sm text-foreground leading-snug">{text}</span>
  </li>;


/* ─── Social Card ─────────────────────────────────────── */
const SocialCard = ({ platform, label, engagement }: {platform: string;label: string;engagement: string;}) =>
<div className="flex-shrink-0 w-44 rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
    <div className="aspect-[4/5] bg-gradient-to-br from-accent/80 to-muted flex flex-col items-center justify-center gap-2 relative p-3">
      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
        {platform === 'Instagram' ? <Instagram className="h-4 w-4 text-primary" /> : <Youtube className="h-4 w-4 text-primary" />}
      </div>
      <p className="text-xs font-medium text-center text-foreground px-1">{label}</p>
      <div className="absolute bottom-2 right-2 bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5 text-[10px] text-primary font-semibold">{engagement}</div>
    </div>
    <div className="p-2.5">
      <div className="h-1.5 bg-muted rounded-full mb-1.5 w-4/5" />
      <div className="h-1.5 bg-muted rounded-full w-3/5" />
    </div>
  </div>;


/* ─── YouTube Card ────────────────────────────────────── */
const YTCard = ({ title, views }: {title: string;views: string;}) =>
<div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
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
  </div>;


/* ─── AI Avatar Mock ──────────────────────────────────── */
const AIAvatarMock = () =>
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
        {['English', 'Hindi', 'Telugu', 'Bengali'].map((lang) =>
      <span key={lang} className="text-[10px] bg-primary/10 text-primary border border-primary/20 rounded-full px-2 py-0.5">{lang}</span>
      )}
      </div>
      <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '70%' }} />
      </div>
      <p className="text-[10px] text-muted-foreground">Generating content... 70%</p>
    </div>
  </div>;


/* ─── Performance Mock ────────────────────────────────── */
const PerfMock = () =>
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
      {[35, 52, 45, 68, 55, 80, 72, 90, 85, 100, 95, 110].map((h, i) =>
    <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: i > 8 ? 'hsl(var(--primary))' : 'hsl(var(--primary)/0.2)' }} />
    )}
    </div>
    <div className="flex justify-between text-[10px] text-muted-foreground mb-3">
      <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
    </div>
    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
      {[{ l: 'CTR', v: '4.2%' }, { l: 'CPC', v: '₹12' }, { l: 'Conv.', v: '8.7%' }].map((m) =>
    <div key={m.l} className="text-center">
          <p className="text-sm font-bold text-primary">{m.v}</p>
          <p className="text-[10px] text-muted-foreground">{m.l}</p>
        </div>
    )}
    </div>
  </div>;


/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const services = [
{
  id: 'social', tab: 'Social',
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
  'Caption engineering (not generic captions)'],

  visual: 'social'
},
{
  id: 'ip', tab: 'IP & YouTube',
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
  'Thumbnail & title psychology'],

  visual: 'youtube'
},
{
  id: 'ai', tab: 'AI-A-UGC',
  icon: <Bot className="h-4 w-4" />,
  eyebrow: 'AI Content',
  title: 'AI-A-UGC Engine',
  subtitle: 'Scale authentic content without depending on creators every time.',
  features: [
  'AI brand spokesperson videos',
  'AI product explainers',
  'Multilingual avatar content',
  'Script-to-video automation',
  'Ad creative variations at scale'],

  visual: 'ai'
},
{
  id: 'perf', tab: 'Performance',
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
  'AI-search structured content strategy'],

  visual: 'perf'
}];


const socialPosts = [
{ platform: 'Instagram', label: 'Brand Story Reel', engagement: '2.3K ❤️' },
{ platform: 'Instagram', label: 'Product Launch Post', engagement: '5.1K ❤️' },
{ platform: 'Youtube', label: 'Founder Story', engagement: '18K 👁' },
{ platform: 'Instagram', label: 'Hook Carousel', engagement: '3.8K ❤️' },
{ platform: 'Youtube', label: 'Brand Doc', engagement: '42K 👁' },
{ platform: 'Instagram', label: 'Trending Reel', engagement: '9.2K ❤️' }];


const ytContent = [
{ title: 'How We Built a Brand from ₹0 to ₹1 Crore — Founder Story', views: '48K' },
{ title: 'The Truth About [Niche] — Series Ep. 3', views: '22K' },
{ title: 'Behind the Brand: A Day at [Company]', views: '31K' },
{ title: 'Product Deep Dive — Everything You Need to Know', views: '15K' }];


const stats = [
{ val: '3×', label: 'Avg Revenue Lift' },
{ val: '6.8×', label: 'ROAS Delivered' },
{ val: '500K+', label: 'Reach Generated' }];


const influencers = [
{ img: '/lovable-uploads/definite-official-logo.jpg', name: 'DefiniteOfficial', followers: '76.2K' },
{ img: '/lovable-uploads/beatthehunger-logo.jpg', name: 'BeatTheHunger', followers: '112K' },
{ img: '/lovable-uploads/influencer-merapittara.png', name: 'Mera Pittara', followers: '277K' },
{ img: '/lovable-uploads/influencer-vikin.png', name: 'Vikin.ing', followers: '232K' }];


/* ═══════════════════════════════════════════════════════════
   SERVICE VISUAL (shared renderer)
═══════════════════════════════════════════════════════════ */
const ServiceVisual = ({ visual }: {visual: string;}) => {
  if (visual === 'social') return (
    <div
      className="overflow-hidden rounded-2xl w-full"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
      <div className="flex gap-3 select-none w-max animate-social-scroll">
        {[...socialPosts, ...socialPosts, ...socialPosts].map((p, i) => <SocialCard key={i} {...p} />)}
      </div>
    </div>);

  if (visual === 'youtube') return (
    <div className="grid grid-cols-2 gap-3">
      {ytContent.map((v, i) => <YTCard key={i} {...v} />)}
    </div>);

  if (visual === 'ai') return <AIAvatarMock />;
  if (visual === 'perf') return <PerfMock />;
  return null;
};

/* ═══════════════════════════════════════════════════════════
   MOBILE VIEW  (< md)
═══════════════════════════════════════════════════════════ */
const MobileVYBE = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tabScrollRef.current;
    if (!el) return;
    const btn = el.children[activeTab] as HTMLElement;
    btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeTab]);

  const cur = services[activeTab];

  return (
    <div className="min-h-[100svh] bg-background relative" style={{ WebkitTapHighlightColor: 'transparent' }}>
      <VybeBackground />
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col justify-center pt-20 pb-10 px-5 overflow-hidden">
        <MotionBackground />
        <div className="relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-5">
            <Chip icon={<Sparkles className="h-3 w-3" />} label="AI-Powered Content & Growth" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold leading-tight tracking-tight mb-4">

            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">VYBE</span>
            <span className="text-foreground"> - Where Content<br />Becomes </span>
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Growth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground mb-7 leading-relaxed">

            An AI-powered content and performance engine built for brands that want attention, authority, and measurable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3">

            <Button variant="hero" size="lg" onClick={() => window.location.href = '/#contact'}
            className="w-full h-14 text-base font-semibold rounded-2xl active:scale-[0.98] transition-transform">
              <Zap className="mr-2 h-5 w-5" /> Build My Growth System
            </Button>
            <Button variant="outline" size="lg"
            onClick={() => document.getElementById('mobile-services')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full h-12 text-sm rounded-2xl active:scale-[0.98] transition-transform">
              Explore Services <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-3 mt-10">

            {stats.map((s) =>
            <div key={s.val} className="bg-card/70 border border-border rounded-2xl p-3 text-center">
                <p className="text-lg font-bold text-primary">{s.val}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* WHAT IS VYBE */}
      <section className="px-5 py-10 bg-card/40 border-y border-border">
        <h2 className="text-xl font-bold text-foreground mb-3">What is VYBE?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          <span className="font-semibold text-foreground">VYBE (Visibility • Yield • Brand Engagement)</span> is WPIX Media's growth division focused on high-engagement storytelling, IP creation, AI-powered content systems, and performance-led distribution.
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip icon={<Zap className="h-3 w-3" />} label="Engagement Engine" />
          <Chip icon={<Brain className="h-3 w-3" />} label="AI Content Systems" />
          <Chip icon={<TrendingUp className="h-3 w-3" />} label="Performance & LLM Growth" />
        </div>
      </section>

      {/* SERVICES — TABBED (app-style) */}
      <section id="mobile-services" className="py-8">
        {/* Horizontal tab pills */}
        <div ref={tabScrollRef} className="flex gap-2 overflow-x-auto px-5 pb-3" style={{ scrollbarWidth: 'none' }}>
          {services.map((s, i) =>
          <button key={s.id} onClick={() => setActiveTab(i)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
          activeTab === i ?
          'bg-primary text-primary-foreground shadow-sm' :
          'bg-card border border-border text-muted-foreground'}`
          }>
              {s.icon}{s.tab}
            </button>
          )}
        </div>

        {/* Content panel with slide animation */}
        <AnimatePresence mode="wait">
          <motion.div key={cur.id}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="px-5 pt-5">

            <div className="mb-5">
              <ServiceVisual visual={cur.visual} />
            </div>
            <div className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold mb-2 tracking-wide uppercase">
              {cur.icon} {cur.eyebrow}
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">{cur.title}</h2>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{cur.subtitle}</p>
            <ul className="space-y-2.5">
              {cur.features.map((f) => <Feature key={f} text={f} />)}
            </ul>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CREATOR NETWORK */}
      <section className="px-5 py-10 bg-card/40 border-t border-border">
        <div className="inline-flex items-center gap-1.5 text-primary text-[11px] font-semibold mb-3 uppercase tracking-wide">
          <Users className="h-3.5 w-3.5" /> Creator Network
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">VYBE X Creator Network</h2>
        <p className="text-sm text-muted-foreground mb-1">Access our curated micro-creator marketplace through <span className="font-semibold text-primary">VYBE X</span>.</p>
        <p className="text-xs text-muted-foreground mb-6">Instagram Story promotions with verified 5k–50k creators.</p>
        <div className="flex gap-4 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {influencers.map((inf, i) =>
          <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/25">
                <img src={inf.img} alt={inf.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-[10px] font-medium text-foreground text-center w-16 truncate">{inf.name}</p>
              <p className="text-[10px] text-primary font-semibold">{inf.followers}</p>
            </div>
          )}
          <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
            <div className="w-14 h-14 rounded-full bg-primary/8 border-2 border-dashed border-primary/25 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">+40</span>
            </div>
            <p className="text-[10px] text-muted-foreground">More</p>
          </div>
        </div>
        <Button variant="hero" className="w-full h-12 rounded-2xl text-sm font-semibold active:scale-[0.98] transition-transform"
        onClick={() => window.open('https://vybex.wpixmedia.com', '_blank')}>
          Explore VYBE X <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      {/* CTA BLOCK */}
      <section className="px-5 py-14 bg-gradient-to-br from-primary/8 via-background to-accent/20 border-t border-border">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3 leading-tight">
            Ready to Build Content<br />
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">That Converts?</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-8">Let VYBE design your engagement and growth system.</p>
          <Button variant="hero" size="lg" onClick={() => window.location.href = '/#contact'}
          className="w-full h-14 text-base font-semibold rounded-2xl active:scale-[0.98] transition-transform">
            Book a Discovery Call <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* STICKY BOTTOM BAR */}
      










      <div className="h-20" />
    </div>);

};

/* ═══════════════════════════════════════════════════════════
   DESKTOP VIEW  (>= md)
═══════════════════════════════════════════════════════════ */
const DesktopVYBE = () => {
  const [activeService, setActiveService] = useState(0);


  const cur = services[activeService];

  return (
    <div className="min-h-screen bg-background relative">
      <VybeBackground />
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
        <MotionBackground />
        <div className="relative z-10 container mx-auto px-8 xl:px-16 grid grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-7">
              <Chip icon={<Sparkles className="h-3 w-3" />} label="AI-Powered Content & Growth Division" />
            </div>
            <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">VYBE</span>
              <span className="text-foreground"> - Where<br />Content Becomes </span>
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Growth.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
              An AI-powered content and performance engine built for brands that want attention, authority, and measurable growth.
            </p>
            <div className="flex gap-4">
              <Button variant="hero" size="lg" onClick={() => window.location.href = '/#contact'}
              className="h-14 px-8 text-base font-semibold rounded-2xl hover:scale-[1.02] transition-transform">
                <Zap className="mr-2 h-5 w-5" /> Build My Growth System
              </Button>
              <Button variant="outline" size="lg"
              onClick={() => document.getElementById('desktop-services')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 px-8 text-base rounded-2xl hover:scale-[1.02] transition-transform">
                Explore Services <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right — stats grid */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 gap-5">
            {[
            { val: '3×', label: 'Avg Revenue Lift', icon: <TrendingUp className="h-5 w-5 text-primary" /> },
            { val: '6.8×', label: 'ROAS Delivered', icon: <BarChart3 className="h-5 w-5 text-primary" /> },
            { val: '500K+', label: 'Reach Generated', icon: <Users className="h-5 w-5 text-primary" /> },
            { val: '4', label: 'Content Engines', icon: <Brain className="h-5 w-5 text-primary" /> }].
            map((s) =>
            <div key={s.val} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="mb-3">{s.icon}</div>
                <p className="text-3xl font-bold text-primary mb-1">{s.val}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT IS VYBE ─────────────────────────────────── */}
      <section className="bg-card/40 border-y border-border py-16">
        <div className="container mx-auto px-8 xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground mb-5">What is VYBE?</h2>
            <p className="text-base xl:text-lg text-muted-foreground leading-relaxed mb-8">
              <span className="font-semibold text-foreground">VYBE (Visibility • Yield • Brand Engagement)</span> is WPIX Media's growth division focused on high-engagement storytelling, IP creation, AI-powered content systems, and performance-led distribution.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Chip icon={<Zap className="h-3 w-3" />} label="Engagement Engine" />
              <Chip icon={<Brain className="h-3 w-3" />} label="AI Content Systems" />
              <Chip icon={<TrendingUp className="h-3 w-3" />} label="Performance & LLM Growth" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES — DESKTOP SIDEBAR LAYOUT ───────────── */}
      <section id="desktop-services" className="py-20">
        <div className="container mx-auto px-8 xl:px-16">
          <div className="text-center mb-14">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Our Capabilities</p>
            <h2 className="text-3xl xl:text-4xl font-bold text-foreground">Four Growth Engines in One Division</h2>
          </div>

          <div className="grid grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 items-start">
            {/* Sidebar nav */}
            <div className="sticky top-28 space-y-2">
              {services.map((s, i) =>
              <button key={s.id} onClick={() => setActiveService(i)}
              className={`w-full text-left flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${
              activeService === i ?
              'bg-primary text-primary-foreground shadow-md' :
              'bg-card border border-border text-foreground hover:border-primary/40 hover:bg-accent/30'}`
              }>
                  <span className={activeService === i ? 'text-primary-foreground' : 'text-primary'}>{s.icon}</span>
                  <div>
                    <p className="font-semibold text-sm">{s.tab}</p>
                    <p className={`text-xs mt-0.5 ${activeService === i ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{s.eyebrow}</p>
                  </div>
                  <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${activeService === i ? 'rotate-90' : ''}`} />
                </button>
              )}
            </div>

            {/* Content panel */}
            <AnimatePresence mode="wait">
              <motion.div key={cur.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-3xl p-8 xl:p-10 overflow-hidden min-w-0">

                <div className="mb-8">
                  <ServiceVisual visual={cur.visual} />
                </div>
                <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold mb-3 uppercase tracking-widest">
                  {cur.icon} {cur.eyebrow}
                </div>
                <h3 className="text-2xl xl:text-3xl font-bold text-foreground mb-3">{cur.title}</h3>
                <p className="text-base text-muted-foreground mb-7 leading-relaxed">{cur.subtitle}</p>
                <ul className="grid grid-cols-2 gap-3">
                  {cur.features.map((f) => <Feature key={f} text={f} />)}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CREATOR NETWORK ──────────────────────────────── */}
      <section className="py-20 bg-card/40 border-t border-border">
        <div className="container mx-auto px-8 xl:px-16">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold mb-4 uppercase tracking-widest">
                <Users className="h-4 w-4" /> Creator Network
              </div>
              <h2 className="text-3xl xl:text-4xl font-bold text-foreground mb-4">VYBE X Creator Network</h2>
              <p className="text-base text-muted-foreground mb-2 leading-relaxed">
                Access our curated micro-creator marketplace through <span className="font-semibold text-primary">VYBE X</span>.
              </p>
              <p className="text-sm text-muted-foreground mb-8">Instagram Story promotions with verified 5k–50k creators.</p>
              <Button variant="hero" size="lg"
              onClick={() => window.open('https://vybex.wpixmedia.com', '_blank')}
              className="h-14 px-8 text-base rounded-2xl hover:scale-[1.02] transition-transform">
                Explore VYBE X <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {influencers.map((inf, i) =>
              <div key={i} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <img src={inf.img} alt={inf.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/25 flex-shrink-0" loading="lazy" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{inf.name}</p>
                    <p className="text-xs text-primary font-bold mt-0.5">{inf.followers}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Verified Creator</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BLOCK ────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-primary/8 via-background to-accent/20 border-t border-border">
        <div className="container mx-auto px-8 xl:px-16 text-center max-w-3xl">
          <h2 className="text-4xl xl:text-5xl font-bold text-foreground mb-5 leading-tight">
            Ready to Build Content<br />
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">That Converts?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">Let VYBE design your engagement and growth system.</p>
          <Button variant="hero" size="lg" onClick={() => window.location.href = '/#contact'}
          className="h-16 px-12 text-lg font-semibold rounded-2xl hover:scale-[1.02] transition-transform">
            Book a Discovery Call <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>);

};

/* ═══════════════════════════════════════════════════════════
   ROOT — switches between desktop & mobile via CSS breakpoint
═══════════════════════════════════════════════════════════ */
const VYBE = () =>
<>
    {/* Mobile: hidden on md+ */}
    <div className="block md:hidden">
      <MobileVYBE />
    </div>
    {/* Desktop: hidden below md */}
    <div className="hidden md:block">
      <DesktopVYBE />
    </div>
  </>;


export default VYBE;