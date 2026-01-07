import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, GraduationCap, Users, Briefcase, CheckCircle, Calendar, Award, Lightbulb, TrendingUp, Video, Palette, BarChart3, ClipboardList, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const areaOfInterestOptions = [
  { value: 'social-media-content', label: 'Social Media & Content' },
  { value: 'video-editing-motion', label: 'Video Editing & Motion Graphics' },
  { value: 'graphic-brand-design', label: 'Graphic & Brand Design' },
  { value: 'performance-marketing', label: 'Performance Marketing' },
  { value: 'project-coordination', label: 'Project Coordination' },
  { value: 'other', label: 'Other' }
];

const Fellowship = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    otherInterest: '',
    reason: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, areaOfInterest: value, otherInterest: value !== 'other' ? '' : prev.otherInterest }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const skillInterest = formData.areaOfInterest === 'other' 
      ? formData.otherInterest 
      : areaOfInterestOptions.find(opt => opt.value === formData.areaOfInterest)?.label || formData.areaOfInterest;

    try {
      const { error } = await supabase.from('fellowship_applications').insert({
        full_name: formData.name,
        email_encrypted: formData.email,
        phone_encrypted: formData.phone,
        skill_interest: skillInterest,
        motivation: formData.reason
      });

      if (error) throw error;

      toast.success("Application submitted successfully! We'll be in touch soon.");
      setFormData({ name: '', email: '', phone: '', areaOfInterest: '', otherInterest: '', reason: '' });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tracks = [
    { title: 'Social Media & Content', icon: Users, description: 'Create engaging content strategies and manage social presence' },
    { title: 'Video Editing & Motion Graphics', icon: Video, description: 'Craft compelling visual stories through video and animation' },
    { title: 'Graphic & Brand Design', icon: Palette, description: 'Design stunning visuals and build memorable brand identities' },
    { title: 'Performance Marketing', icon: BarChart3, description: 'Master paid advertising and data-driven marketing' },
    { title: 'Project Coordination', icon: ClipboardList, description: 'Lead projects and manage client relationships effectively' }
  ];

  const benefits = [
    'Hands-on agency experience',
    'Live client project exposure',
    'Structured mentorship & training',
    'Performance-based earning opportunity',
    'Certificate of Completion from WPIX Media',
    'Opportunity to work with WPIX post-fellowship (freelance / part-time / full-time)'
  ];

  const timeline = [
    { month: 'Month 1', title: 'Learning & Shadowing', description: 'Tool training, process understanding, internal tasks, and guided practice.' },
    { month: 'Month 2–3', title: 'Assisted Project Work', description: 'Working on real projects under supervision with performance tracking.' },
    { month: 'Month 4', title: 'Earn, Evaluate & Grow', description: 'Ownership of tasks, performance review, certification, and paid opportunities.' }
  ];

  const eligibility = [
    { icon: GraduationCap, text: 'Students & freshers' },
    { icon: TrendingUp, text: 'Career switchers' },
    { icon: Lightbulb, text: 'Self-taught creatives & marketers' },
    { icon: Briefcase, text: 'Anyone serious about learning and building a career' }
  ];

  const applicationFormContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Your full name"
          className="bg-background"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="your@email.com"
          className="bg-background"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
          placeholder="+91 XXXXX XXXXX"
          className="bg-background"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="areaOfInterest">Area of Interest *</Label>
        <Select value={formData.areaOfInterest} onValueChange={handleSelectChange} required>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select your area of interest" />
          </SelectTrigger>
          <SelectContent>
            {areaOfInterestOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {formData.areaOfInterest === 'other' && (
        <div className="space-y-2">
          <Label htmlFor="otherInterest">Please specify *</Label>
          <Input
            id="otherInterest"
            name="otherInterest"
            value={formData.otherInterest}
            onChange={handleInputChange}
            required
            placeholder="Describe your area of interest"
            className="bg-background"
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="reason">Why do you want to join? *</Label>
        <Textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          required
          placeholder="Tell us about your motivation..."
          rows={4}
          className="bg-background resize-none"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <GraduationCap className="h-4 w-4" />
                <span>4-Month Fellowship Program</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Learn Skills. Build Real Experience.{' '}
                <span className="text-primary">Earn With WPIX.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                A 4-month structured learning and work-based fellowship designed for passionate individuals who want to build real-world skills while working on live projects.
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="group">
                    Apply for Fellowship
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Fellowship Application</DialogTitle>
                  </DialogHeader>
                  {applicationFormContent}
                </DialogContent>
              </Dialog>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About the Program */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
                About the Program
              </h2>
              <div className="glass-card p-8 md:p-12">
                <p className="text-lg text-foreground/80 leading-relaxed text-center">
                  The WPIX Learn & Earn Fellowship is a training-first, performance-based program created to help beginners, career switchers, and self-learners gain hands-on experience in branding, content, technology, and digital marketing while collaborating with real client projects.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Program Structure Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Program Structure
            </h2>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <ScrollReveal key={index} animation={index % 2 === 0 ? "fade-right" : "fade-left"} delay={index * 150}>
                  <div className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-20 md:pl-0`}>
                      <div className="glass-card p-6 hover:shadow-medium transition-all">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                          <Calendar className="h-3 w-3" />
                          {item.month}
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-background shadow-lg" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Apply */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Who Can Apply
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {eligibility.map((item, index) => (
              <ScrollReveal key={index} animation="zoom-in" delay={index * 100}>
                <div className="glass-card p-6 text-center hover:shadow-medium transition-all group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="text-foreground font-medium">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fellowship Tracks */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Available Fellowship Tracks
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Choose your path and specialize in the area that excites you most
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tracks.map((track, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <div className="glass-card p-6 hover:shadow-medium transition-all group h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <track.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{track.title}</h3>
                  <p className="text-muted-foreground">{track.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              What You'll Get
            </h2>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <ScrollReveal key={index} animation="fade-right" delay={index * 75}>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{benefit}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="max-w-3xl mx-auto">
              <div className="glass-card p-8 border-l-4 border-l-warning">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">Important Note</h3>
                    <ul className="space-y-2 text-foreground/80">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                        This is a learning-first fellowship program, not a traditional job.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                        No guaranteed employment.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                        Earnings and opportunities are performance-based.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="zoom-in">
            <div className="max-w-2xl mx-auto text-center">
              <Award className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-muted-foreground mb-8">
                Take the first step towards building a career in the creative-tech industry.
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="group">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Fellowship Application</DialogTitle>
                  </DialogHeader>
                  {applicationFormContent}
                </DialogContent>
              </Dialog>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fellowship;
