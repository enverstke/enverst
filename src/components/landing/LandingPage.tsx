import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Building2, Wallet, Users, Shield, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { RoleSelectionModal } from './RoleSelectionModal';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Shield,
    title: 'Verified Partners',
    description: 'All EPCs and financiers are thoroughly vetted for quality and reliability.',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Bidding',
    description: 'Get multiple bids from qualified contractors and compare proposals easily.',
  },
  {
    icon: Wallet,
    title: 'Flexible Financing',
    description: 'Access lease, loan, and PPA options from trusted financial institutions.',
  },
  {
    icon: Zap,
    title: 'Smart Matching',
    description: 'Our platform matches your needs with the right partners automatically.',
  },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '50MW+', label: 'Installed Capacity' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '30%', label: 'Average Savings' },
];

export function LandingPage() {
  const [showRoleModal, setShowRoleModal] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-light">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo variant="dark" size="md" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline">
              How It Works
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground animated-underline">
              About
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
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-float animation-delay-200" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent-gold/5 rounded-full blur-2xl animate-float animation-delay-400" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Zap size={16} className="fill-current" />
                Kenya's Premier Solar Energy Marketplace
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold hero-text-gradient mb-6 leading-tight"
            >
              Power Your Future with Solar Energy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-primary-foreground/80 mb-8 max-w-2xl"
            >
              Connect with verified EPCs and access flexible financing options. 
              From residential to commercial projects, we make going solar simple and transparent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => setShowRoleModal(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg group"
              >
                Start Your Solar Journey
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="py-24 bg-background" id="how-it-works">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Choose Your Path
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking to install solar, provide EPC services, or finance projects, 
              we have the right solution for you.
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
              <h3 className="text-xl font-display font-semibold mb-3">I'm a Client</h3>
              <p className="text-muted-foreground mb-6">
                Looking to install solar for your home or business? Get competitive bids from verified EPCs and access financing options.
              </p>
              <ul className="space-y-2 mb-6">
                {['Request quotes easily', 'Compare multiple bids', 'Access financing'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="group-hover:text-accent">
                Get Started <ArrowRight size={16} className="ml-2" />
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
              <h3 className="text-xl font-display font-semibold mb-3">I'm an EPC</h3>
              <p className="text-muted-foreground mb-6">
                Expand your business by accessing a marketplace of qualified solar project opportunities.
              </p>
              <ul className="space-y-2 mb-6">
                {['Access project leads', 'Submit proposals', 'Grow your business'].map((item, i) => (
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
              <h3 className="text-xl font-display font-semibold mb-3">I'm a Financier</h3>
              <p className="text-muted-foreground mb-6">
                Access a pipeline of vetted solar projects and grow your renewable energy portfolio.
              </p>
              <ul className="space-y-2 mb-6">
                {['Vetted projects', 'Risk-scored deals', 'Standardized packs'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="group-hover:text-accent-blue">
                Finance Projects <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/50" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Why Choose Enverst?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built the most comprehensive solar marketplace in Kenya, 
              connecting all stakeholders in the renewable energy ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero" id="about">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Ready to Go Solar?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who have made the switch to clean, 
              renewable energy with Enverst.
            </p>
            <Button
              size="lg"
              onClick={() => setShowRoleModal(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-6 text-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo variant="light" size="sm" />
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Enverst. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm">
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
