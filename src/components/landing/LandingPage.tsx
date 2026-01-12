import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Building2,
  Wallet,
  Users,
  Shield,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Globe2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { RoleSelectionModal } from './RoleSelectionModal';
import { Link } from 'react-router-dom';

const heroImage =
  'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80';

const features = [
  {
    icon: Shield,
    title: 'Verified EPCs & Financiers',
    description: 'End-to-end KYC + QA so you only work with vetted, insured partners.',
  },
  {
    icon: TrendingUp,
    title: 'Smart Project Scoring',
    description: 'AI-assisted sizing, risk scoring, and ROI views for every request.',
  },
  {
    icon: Wallet,
    title: 'Flexible Capital',
    description: 'Leasing, loans, PPAs, and green funds matched to each project profile.',
  },
  {
    icon: Sparkles,
    title: 'AI Design Packs',
    description: 'Auto-generated concept renders, BoMs, and proposal-ready docs in minutes.',
  },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '50MW+', label: 'Installed Capacity' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '30%', label: 'Avg. Cost Savings' },
];

const steps = [
  {
    title: 'Tell us about the site',
    detail: 'Upload roof/ground details, bills, and goals. AI sizes the system instantly.',
  },
  {
    title: 'Get verified bids',
    detail: 'Matched EPCs submit standardized proposals with comparable pricing.',
  },
  {
    title: 'Secure financing',
    detail: 'We line up capital partners with the best-fit instruments for your project.',
  },
  {
    title: 'Install, monitor, save',
    detail: 'Track milestones, QA, and live performance from one command center.',
  },
];

const testimonials = [
  {
    name: 'Aisha, Facility Manager',
    quote:
      'Enverst compressed our procurement cycle from months to days, with clean, comparable proposals and financing ready.',
  },
  {
    name: 'David, EPC Director',
    quote:
      'The lead quality and standardized packs are excellent. We spend more time installing and less time chasing scope.',
  },
  {
    name: 'Mina, Project Finance',
    quote:
      'Their risk scoring and data room made underwriting straightforward. We scaled our solar portfolio faster.',
  },
];

const partners = ['Safaritech', 'SunGrid Africa', 'GreenCap', 'VoltEdge', 'Skyline EPC'];

export function LandingPage() {
  const [showRoleModal, setShowRoleModal] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-light">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo variant="dark" size="md" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline">
              Platform
            </a>
            <a href="#workflow" className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline">
              Workflow
            </a>
            <a href="#proof" className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline">
              Proof
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Button size="sm" onClick={() => setShowRoleModal(true)} className="bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(16,24,40,0.85) 0%, rgba(16,24,40,0.6) 35%, rgba(32,185,129,0.55) 100%), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent/25 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10 pt-28 pb-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 text-accent font-semibold text-sm"
            >
              <Zap size={16} className="fill-current" />
              Kenya&apos;s Premier Solar Energy Marketplace
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-4xl md:text-6xl font-display font-bold leading-tight"
            >
              Design, finance, and deploy solar projects with AI-speed precision.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
            >
              Enverst connects clients, EPCs, and financiers with verified partners, smart project scoring, and
              proposal-ready AI render packs. Faster bids, clearer risk, better outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => setShowRoleModal(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg group"
              >
                Start your project
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg"
                >
                  Sign in to console
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass rounded-xl p-4 border border-white/10">
                  <div className="text-3xl font-display font-bold">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-card/90 backdrop-blur-xl rounded-2xl shadow-strong border border-white/10 p-6 space-y-4 text-foreground">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">AI project intelligence</p>
                  <p className="font-semibold text-lg">Instant sizing + ROI views</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-accent/12 border border-accent/25">
                  <div className="flex items-center gap-2 mb-1 text-accent">
                    <Sparkles size={16} /> <span className="text-foreground/90">Design</span>
                  </div>
                  <p className="font-semibold text-foreground">Autogenerated render &amp; BoM</p>
                </div>
                <div className="p-4 rounded-xl bg-accent-gold/12 border border-accent-gold/30">
                  <div className="flex items-center gap-2 mb-1 text-accent-gold">
                    <Wallet size={16} /> <span className="text-foreground/90">Finance</span>
                  </div>
                  <p className="font-semibold text-foreground">Matched lenders &amp; PPAs</p>
                </div>
                <div className="p-4 rounded-xl bg-accent-blue/12 border border-accent-blue/30">
                  <div className="flex items-center gap-2 mb-1 text-accent-blue">
                    <Shield size={16} /> <span className="text-foreground/90">Delivery</span>
                  </div>
                  <p className="font-semibold text-foreground">Milestone QA &amp; telemetry</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/70 border border-border">
                  <div className="flex items-center gap-2 mb-1 text-primary">
                    <Globe2 size={16} /> <span className="text-foreground/90">Impact</span>
                  </div>
                  <p className="font-semibold text-foreground">Verified kWh + CO₂ savings</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/85">
                <Globe2 size={16} />
                Serving East Africa with global-grade standards.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-secondary/50 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-sm font-medium text-muted-foreground">Trusted by renewable leaders</p>
            <div className="flex flex-wrap gap-6 text-sm text-foreground/80">
              {partners.map((p) => (
                <span key={p} className="px-3 py-2 rounded-full bg-card shadow-sm border border-border">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="py-24 bg-background" id="workflow">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-display font-bold text-foreground mb-3">Choose your path</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored experiences for clients, EPCs, and financiers—unified by one secure workspace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Client Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="role-card group"
              onClick={() => setShowRoleModal(true)}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <Users size={28} className="text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Clients</h3>
              <p className="text-muted-foreground mb-6">
                Guided scoping, side-by-side proposals, and milestone tracking with quality gates.
              </p>
              <ul className="space-y-2 mb-6">
                {['AI-assisted sizing', 'Verified EPC pool', 'Financing-ready packs'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="group-hover:text-accent">
                Start as client <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>

            {/* EPC Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="role-card group"
              onClick={() => setShowRoleModal(true)}
            >
              <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-6 group-hover:bg-accent-gold transition-colors">
                <Building2 size={28} className="text-accent-gold group-hover:text-accent-gold-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">EPCs</h3>
              <p className="text-muted-foreground mb-6">
                Standardized scopes, prequalified leads, and bid templates that win faster.
              </p>
              <ul className="space-y-2 mb-6">
                {['Project briefs ready-to-quote', 'Auto BoM suggestions', 'Progress billing & QA'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-accent-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="group-hover:text-accent-gold">
                Join as EPC <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>

            {/* Financier Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="role-card group"
              onClick={() => setShowRoleModal(true)}
            >
              <div className="w-14 h-14 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-6 group-hover:bg-accent-blue transition-colors">
                <Wallet size={28} className="text-accent-blue group-hover:text-accent-blue-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">Financiers</h3>
              <p className="text-muted-foreground mb-6">
                Risk-scored projects, unified data rooms, and standardized repayment models.
              </p>
              <ul className="space-y-2 mb-6">
                {['Credit-ready packs', 'Performance telemetry', 'Structured PPA + lease flows'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="group-hover:text-accent-blue">
                Finance projects <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works timeline */}
      <section className="py-24 bg-secondary/50" id="features">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-14 gap-6">
            <div>
              <h2 className="text-4xl font-display font-bold text-foreground mb-3">From scope to savings, faster</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A guided, data-rich journey for every stakeholder—powered by AI sizing, structured bidding, and
                financing that fits.
              </p>
            </div>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setShowRoleModal(true)}>
              Launch my project <ArrowRight className="ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-card shadow-card border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/15 text-accent font-semibold">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-display font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof / Testimonials */}
      <section className="py-24 bg-background" id="proof">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-display font-bold text-foreground mb-3">Real teams, real outcomes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enverst powers faster procurement, cleaner underwriting, and better installation experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card shadow-card border border-border flex flex-col gap-4"
              >
                <div className="flex items-center gap-2 text-accent font-semibold">
                  <Sparkles size={16} />
                  <span>Impact Story</span>
                </div>
                <p className="text-foreground text-base leading-relaxed">“{t.quote}”</p>
                <p className="text-sm text-muted-foreground">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
              Build the future of energy—together.
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get AI-assisted design packs, structured bids, and financing alignment in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setShowRoleModal(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-6 text-lg"
              >
                Get started
                <ArrowRight className="ml-2" />
              </Button>
              <Link to="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="light" size="sm" />
            <p className="text-primary-foreground/70 text-sm">
              © 2024 Enverst. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Role Selection Modal */}
      <RoleSelectionModal open={showRoleModal} onClose={() => setShowRoleModal(false)} />
    </div>
  );
}
