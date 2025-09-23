'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  ArrowRight, 
  Building2, 
  Users, 
  Shield, 
  TrendingUp,
  Clock,
  Coins,
  CheckCircle2,
  Home,
  Key,
  Scale,
  Sparkles,
  Zap,
  Trophy,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Data for the three pathways
const pathways = [
  {
    id: 'rtm',
    title: 'Right to Manage (RTM)',
    subtitle: 'Quick Control, Keep Structure',
    description: 'Take control of your building\'s management without buying the freehold',
    image: '/how-1.png',
    timeframe: '4-6 months',
    cost: '£2,000 + VAT',
    control: 65,
    ease: 90,
    detailPage: '/right-to-manage',
    benefits: [
      'No need to prove mismanagement',
      'Choose your own managing agent',
      'Control service charges and maintenance',
      'No compensation to freeholder'
    ],
    limitations: [
      'Freeholder still owns the building',
      'Can\'t make structural changes easily',
      'Ground rent continues'
    ],
    bestFor: 'Buildings wanting immediate management control without the complexity of ownership',
    color: 'bg-liberty-primary',
    icon: Key,
    iconColor: 'text-white'
  },
  {
    id: 'enfranchisement',
    title: 'Collective Enfranchisement',
    subtitle: 'Own Your Building',
    description: 'Purchase the freehold collectively and gain complete ownership',
    image: '/how-2.png',
    timeframe: '9-12 months',
    cost: '£500-2,000 per flat + purchase price',
    control: 85,
    ease: 60,
    detailPage: '/collective-enfranchisement',
    benefits: [
      'Complete ownership of building',
      'Eliminate ground rent',
      'Extend leases to 999 years at no cost',
      'Increase property values',
      'Full control over building development'
    ],
    limitations: [
      'Higher upfront costs',
      'Need 50% participation',
      'More complex legal process'
    ],
    bestFor: 'Buildings ready to invest in long-term ownership and maximum control',
    color: 'bg-liberty-accent',
    icon: Home,
    iconColor: 'text-standard'
  },
  {
    id: 'commonhold',
    title: 'Commonhold',
    subtitle: 'The Future of Ownership',
    description: 'Convert to perpetual ownership with no leases or ground rent',
    image: '/how-3.png',
    timeframe: '12-18 months',
    cost: 'Varies (includes freehold purchase)',
    control: 100,
    ease: 40,
    detailPage: '/commonhold-conversion',
    benefits: [
      'Perpetual ownership - no expiring leases',
      'No ground rent ever',
      'Democratic control through association',
      'Standard rules for all owners',
      'Future-proof your investment'
    ],
    limitations: [
      'Requires 100% agreement currently',
      'New system - less established',
      'Most complex transition'
    ],
    bestFor: 'Forward-thinking buildings ready to embrace the future of property ownership',
    color: 'bg-liberty-secondary',
    icon: Building2,
    iconColor: 'text-liberty-standard'
  }
];

// Journey steps data
import { LucideIcon } from 'lucide-react';

interface Badge {
  icon: LucideIcon;
  text: string;
  color?: string;
}

interface PathOption {
  icon: LucideIcon;
  label: string;
  color: string;
}

interface JourneyStep {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  position: 'left' | 'right';
  link: { text: string; href: string } | null;
  badges?: Badge[];
  pathOptions?: PathOption[];
}

const journeySteps: JourneyStep[] = [
  {
    number: 1,
    title: 'Check Your Eligibility',
    subtitle: 'Quick 2-minute assessment',
    description: 'Answer a few simple questions about your building to discover which paths are available to you. Our smart wizard instantly tells you if you qualify for RTM, Enfranchisement, or both.',
    icon: Shield,
    iconColor: 'text-liberty-accent',
    position: 'left',
    link: {
      text: 'Start Check',
      href: '/eligibility-check'
    },
    badges: []
  },
  {
    number: 2,
    title: 'Register',
    subtitle: 'Join the Community',
    description: 'Join our pilot programme and register your building details. We\'ll create your case file and begin the process of helping you take back control. No commitment required at this stage.',
    icon: Building2,
    iconColor: 'text-liberty-accent',
    position: 'right',
    link: null,
    badges: [
      { icon: CheckCircle2, text: 'Free registration', color: 'text-liberty-accent' }
    ]
  },
  {
    number: 3,
    title: 'We Analyse Your Situation',
    subtitle: 'Expert assessment',
    description: 'Our experts review your building\'s specifics, current service charges, and ownership structure. We calculate potential savings and identify the best path forward for your unique situation.',
    icon: TrendingUp,
    iconColor: 'text-liberty-accent',
    position: 'left',
    link: null,
    badges: [
      { icon: Users, text: 'Expert review' },
      { icon: Coins, text: 'Savings calculated' }
    ]
  },
  {
    number: 4,
    title: 'Choose Your Path Together',
    subtitle: 'Tailored recommendation',
    description: 'Based on our analysis, we\'ll recommend whether RTM, Enfranchisement, or Commonhold is best for you. We present the options clearly so you and your neighbours can make an informed decision.',
    icon: Scale,
    iconColor: 'text-liberty-accent',
    position: 'right',
    link: null,
    badges: [],
    pathOptions: [
      { icon: Key, label: 'RTM', color: 'text-liberty-primary' },
      { icon: Home, label: 'Enfranchise', color: 'text-liberty-primary' },
      { icon: Building2, label: 'Commonhold', color: 'text-liberty-primary' }
    ]
  },
  {
    number: 5,
    title: 'We Handle Everything',
    subtitle: 'Full service support',
    description: 'Once you decide, we manage the entire process. Legal notices, paperwork, negotiations - we handle it all. You stay informed with regular updates while we do the heavy lifting.',
    icon: CheckCircle2,
    iconColor: 'text-liberty-accent',
    position: 'left',
    link: null,
    badges: [
      { icon: Shield, text: 'Legal support' },
      { icon: Clock, text: 'Regular updates' }
    ]
  }
];

// Decision helper cards data
const decisionCards = [
  {
    icon: Zap,
    title: 'Want Quick Results?',
    description: 'RTM can give you management control in just 4-6 months',
    suggestion: '→ Consider RTM',
    link: {
      href: '/right-to-manage',
      text: 'Learn More'
    },
    delay: 0
  },
  {
    icon: Trophy,
    title: 'Want Maximum Control?',
    description: 'Own your building and eliminate ground rent forever',
    suggestion: '→ Consider Enfranchisement',
    link: {
      href: '/collective-enfranchisement',
      text: 'Learn More'
    },
    delay: 0.2
  },
  {
    icon: Rocket,
    title: 'Want Future-Proof Ownership?',
    description: 'Join the new era with perpetual ownership and no leases',
    suggestion: '→ Consider Commonhold',
    link: {
      href: '/commonhold-conversion',
      text: 'Learn More'
    },
    delay: 0.4
  }
];

export default function HowItWorksPage() {
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 50%", "end 80%"]
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-liberty-base">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative py-24 bg-liberty-secondary"
        >
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="!text-5xl md:!text-6xl font-reckless !text-liberty-standard mb-6">
                Your Path to<br/><span className="text-liberty-accent">Property Freedom</span>
              </h1>
              <p className="text-xl text-liberty-standard/80 mb-8">
                Three proven routes to take control of your building. Choose the path that fits your goals, timeline, and community.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                    size="xl"
                    onClick={() => setComparisonMode(!comparisonMode)}
                    variant={comparisonMode ? "default" : "outline"}
                    className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white"
                >
                  <Scale className="w-4 h-4 mr-2" />
                  {comparisonMode ? 'Exit Comparison' : 'Compare Pathways'}
                </Button>

                <Button size="xl" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                  <Link href="/eligibility-check" className="flex items-center gap-3 group">
                    Check Your Eligibility
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Comparison Mode */}
        <AnimatePresence>
          {comparisonMode && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-12 bg-gray-50"
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pathways.map((pathway) => (
                    <motion.div
                      key={pathway.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                    >
                      <div className={`h-2 rounded-full ${pathway.color} mb-4`} />
                      <h3 className="!text-xl font-bold !text-liberty-standard mb-4">{pathway.title}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Ease of Process</span>
                            <span className="text-liberty-primary font-semibold">{pathway.ease}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pathway.ease}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-liberty-accent"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Level of Control</span>
                            <span className="text-liberty-primary font-semibold">{pathway.control}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pathway.control}%` }}
                              transition={{ duration: 1, delay: 0.4 }}
                              className="h-full bg-liberty-primary"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-liberty-accent" />
                            <p className="text-sm text-gray-600">Timeline:</p>
                            <p className="text-sm font-semibold text-liberty-standard">{pathway.timeframe}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Interactive Vertical Journey Section */}
        <section ref={sectionRef} className="py-20 bg-gray-50 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="!text-3xl md:!text-4xl font-reckless !text-liberty-standard mb-4"
              >
                Your Journey with <span className="text-liberty-accent">Liberty Bell</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-600"
              >
                We guide you every step of the way to find your perfect solution
              </motion.p>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Journey Steps Container with Line */}
              <div className="relative">
                {/* Progress Line with Scroll Effect */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-0.5 top-0 bottom-0 bg-liberty-secondary/30">
                  <motion.div
                    className="hidden md:flex w-full bg-liberty-primary/70 origin-top"
                    style={{ 
                      scaleY: scrollYProgress,
                      height: '100%'
                    }}
                  />
                </div>
                
                {/* Journey Steps */}
                <div className="space-y-8 md:-space-y-16 relative pb-8">
                  {journeySteps.map((step, index) => {
                    const animationX = step.position === 'left' ? -100 : 100;
                    
                    return (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, x: animationX }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                        className="relative"
                        style={{ zIndex: 50 - (index * 10) }}
                      >
                        {/* Mobile view */}
                        <div className="flex md:hidden items-center relative z-10">
                          <div className="flex-1">
                            <Card className="bg-liberty-accent/5 border border-liberty-accent/20 p-6 hover:bg-liberty-accent/10 transition-colors duration-300 mx-4">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-liberty-base border-2 border-liberty-primary/40 rounded-full flex items-center justify-center shadow-sm">
                                  <span className="text-xl font-reckless font-bold text-liberty-primary">{step.number}</span>
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-liberty-background text-lg mb-1">
                                    {step.title}
                                  </h3>
                                  <p className="text-sm text-liberty-primary">
                                    {step.subtitle}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-liberty-background/70 leading-relaxed mb-4">
                                {step.description}
                              </p>
                              
                              {step.link && (
                                <Button
                                  asChild
                                  size="sm"
                                  variant="outline"
                                  className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white"
                                >
                                  <Link href={step.link.href}>
                                    {step.link.text}
                                    <ArrowRight className="w-3 h-3 ml-1" />
                                  </Link>
                                </Button>
                              )}
                              
                              {step.badges && step.badges.length > 0 && (
                                <div className="flex flex-wrap gap-3 text-xs text-liberty-background/60 mt-4">
                                  {step.badges.map((badge, i) => {
                                    const BadgeIcon = badge.icon;
                                    return (
                                      <span key={i} className="flex items-center">
                                        <BadgeIcon className={`w-3 h-3 mr-1 ${badge.color || 'text-liberty-accent'}`} />
                                        {badge.text}
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                              
                              {step.pathOptions && (
                                <div className="grid grid-cols-3 gap-2 text-xs mt-4">
                                  {step.pathOptions.map((option, i) => {
                                    const OptionIcon = option.icon;
                                    const pathwayId = option.label === 'RTM' ? 'rtm' : 
                                                     option.label === 'Enfranchise' ? 'enfranchisement' : 
                                                     'commonhold';
                                    return (
                                      <button
                                        key={i}
                                        onClick={() => setSelectedPathway(pathwayId)}
                                        className="text-center p-2 bg-gray-50 rounded hover:bg-gray-100 hover:shadow-sm transition-all cursor-pointer group"
                                      >
                                        <OptionIcon className={`w-4 h-4 mx-auto mb-1 ${option.color} group-hover:scale-110 transition-transform`} />
                                        <span className="group-hover:text-liberty-primary transition-colors">{option.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </Card>
                          </div>
                        </div>

                        {/* Desktop view */}
                        <div className="hidden md:flex items-center relative z-10">
                          {step.position === 'left' ? (
                            <>
                              <div className="w-5/12 pr-8">
                                <Card className="bg-liberty-accent/5 border border-liberty-accent/20 p-6 hover:bg-liberty-accent/10 transition-colors duration-300">
                                  <div className="flex items-start justify-between mb-4">
                                    <div>
                                      <h3 className="font-semibold text-liberty-background text-lg mb-1">
                                        {step.title}
                                      </h3>
                                      <p className="text-sm text-liberty-primary">
                                        {step.subtitle}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-sm text-liberty-background/70 leading-relaxed mb-4">
                                    {step.description}
                                  </p>
                                  
                                  {step.link && (
                                    <Button
                                      asChild
                                      size="sm"
                                      variant="outline"
                                      className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white"
                                    >
                                      <Link href={step.link.href}>
                                        {step.link.text}
                                        <ArrowRight className="w-3 h-3 ml-1" />
                                      </Link>
                                    </Button>
                                  )}
                                  
                                  {step.badges && step.badges.length > 0 && (
                                    <div className="flex gap-4 text-xs text-liberty-background/60">
                                      {step.badges.map((badge, i) => {
                                        const BadgeIcon = badge.icon;
                                        return (
                                          <span key={i} className="flex items-center">
                                            <BadgeIcon className={`w-3 h-3 mr-1 ${badge.color || 'text-liberty-accent'}`} />
                                            {badge.text}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  )}
                                  
                                  {step.pathOptions && (
                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                      {step.pathOptions.map((option, i) => {
                                        const OptionIcon = option.icon;
                                        const pathwayId = option.label === 'RTM' ? 'rtm' : 
                                                         option.label === 'Enfranchise' ? 'enfranchisement' : 
                                                         'commonhold';
                                        return (
                                          <button
                                            key={i}
                                            onClick={() => setSelectedPathway(pathwayId)}
                                            className="text-center p-2 bg-gray-50 rounded hover:bg-gray-100 hover:shadow-sm transition-all cursor-pointer group"
                                          >
                                            <OptionIcon className={`w-4 h-4 mx-auto mb-1 ${option.color} group-hover:scale-110 transition-transform`} />
                                            <span className="group-hover:text-liberty-primary transition-colors">{option.label}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </Card>
                              </div>
                              
                              <div className="w-2/12 flex justify-center">
                                <div className="w-14 h-14 bg-liberty-base border-2 border-liberty-primary/40 rounded-full flex items-center justify-center shadow-sm relative z-10">
                                  <span className="text-2xl font-reckless font-bold text-liberty-primary">{step.number}</span>
                                </div>
                              </div>
                              
                              <div className="w-5/12" />
                            </>
                          ) : (
                            <>
                              <div className="w-5/12" />
                              
                              <div className="w-2/12 flex justify-center">
                                <div className="w-14 h-14 bg-liberty-base border-2 border-liberty-primary/40 rounded-full flex items-center justify-center shadow-sm relative z-10">
                                  <span className="text-2xl font-reckless font-bold text-liberty-primary">{step.number}</span>
                                </div>
                              </div>

                              <div className="w-5/12 pl-8">
                                <Card className="bg-liberty-accent/5 border border-liberty-accent/20 p-6 hover:bg-liberty-accent/10 transition-colors duration-300">
                                  <div className="flex items-start justify-between mb-4">
                                    <div>
                                      <h3 className="font-semibold text-liberty-background text-lg mb-1">
                                        {step.title}
                                      </h3>
                                      <p className="text-sm text-liberty-primary">
                                        {step.subtitle}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-sm text-liberty-background/70 leading-relaxed mb-4">
                                    {step.description}
                                  </p>
                                  
                                  {step.badges && step.badges.length > 0 && (
                                    <div className="flex gap-4 text-xs text-liberty-background/60">
                                      {step.badges.map((badge, i) => {
                                        const BadgeIcon = badge.icon;
                                        return (
                                          <span key={i} className="flex items-center">
                                            <BadgeIcon className={`w-3 h-3 mr-1 ${badge.color || 'text-liberty-accent'}`} />
                                            {badge.text}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  )}
                                  
                                  {step.pathOptions && (
                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                      {step.pathOptions.map((option, i) => {
                                        const OptionIcon = option.icon;
                                        const pathwayId = option.label === 'RTM' ? 'rtm' : 
                                                         option.label === 'Enfranchise' ? 'enfranchisement' : 
                                                         'commonhold';
                                        return (
                                          <button
                                            key={i}
                                            onClick={() => setSelectedPathway(pathwayId)}
                                            className="text-center p-2 bg-gray-50 rounded hover:bg-gray-100 hover:shadow-sm transition-all cursor-pointer group"
                                          >
                                            <OptionIcon className={`w-4 h-4 mx-auto mb-1 ${option.color} group-hover:scale-110 transition-transform`} />
                                            <span className="group-hover:text-liberty-primary transition-colors">{option.label}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </Card>
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Final Step - Success (completely separate from line) */}
              <div className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-liberty-accent rounded-full shadow-xl mb-4 relative z-10">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="!text-2xl font-bold !text-liberty-standard mb-2">
                    Control Achieved!
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    You're now in control of your building. Enjoy reduced service charges, better management, and the freedom to make decisions that benefit all residents.
                  </p>

                  <Button size="xl" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                    <Link href="/eligibility-check" className="flex items-center gap-3 group">
                      Start Your Journey
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pathways Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-liberty-base">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
                Three Paths to <span className="text-liberty-accent">Property Control</span>
              </h2>
              <p className="text-lg text-liberty-background/70 max-w-3xl mx-auto">
                Each route offers different benefits and timelines. We'll help you choose the right path for your building and circumstances.
              </p>
            </motion.div>

            {/* Pathways Cards */}
            <div className="space-y-20">
              {pathways.map((pathway, index) => {
                return (
                  <motion.div
                    key={pathway.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}>
                      {/* Content */}
                      <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                        <motion.div
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                          viewport={{ once: true }}
                        >
                          {/* Option Badge */}
                          <div className="inline-flex items-center gap-2 mb-4">
                            <span className="text-sm font-medium px-3 py-1 bg-liberty-accent/10 text-liberty-accent rounded-full">
                              Option {index + 1}
                            </span>
                            <span className="text-sm text-liberty-background/60">
                              • {pathway.timeframe}
                            </span>
                          </div>
                          
                          <h3 className="text-3xl sm:text-4xl font-reckless font-bold text-liberty-background mb-2">
                            {pathway.title}
                          </h3>
                          <p className="text-xl text-liberty-primary mb-4">
                            {pathway.subtitle}
                          </p>
                          <p className="text-liberty-background/70 leading-relaxed mb-8">
                            {pathway.description}
                          </p>

                          {/* Benefits List */}
                          <div className="space-y-4 mb-8">
                            <h4 className="font-semibold text-liberty-background flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-liberty-accent" />
                              Key Benefits
                            </h4>
                            <div className="space-y-3">
                              {pathway.benefits.slice(0, 3).map((benefit, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                                  viewport={{ once: true }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-2 h-2 bg-liberty-accent rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-liberty-background/70">
                                    {benefit}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Best For Section */}
                          <div className="p-4 bg-liberty-secondary/20 border border-liberty-secondary/30 rounded-lg mb-8">
                            <p className="text-sm font-semibold text-liberty-primary mb-1">Best For:</p>
                            <p className="text-liberty-background/70 text-sm">{pathway.bestFor}</p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                              size="lg" 
                              asChild
                              className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
                            >
                              <Link href={pathway.detailPage} className="flex items-center gap-2">
                                Learn About {pathway.title}
                                <ArrowRight size={20} />
                              </Link>
                            </Button>
                            <Button 
                              size="lg" 
                              variant="outline"
                              onClick={() => setSelectedPathway(pathway.id)}
                              className="border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"
                            >
                              Quick View Details
                            </Button>
                          </div>
                        </motion.div>
                      </div>

                      {/* Image */}
                      <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
                        >
                          <Image
                            src={pathway.image}
                            alt={pathway.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          
                          {/* Control Level Indicator */}
                          <div className="absolute bottom-4 left-4 right-4 bg-liberty-base/95 backdrop-blur-sm p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-liberty-background">Level of Control</span>
                              <span className="text-sm font-bold text-liberty-accent">{pathway.control}%</span>
                            </div>
                            <div className="h-2 bg-liberty-secondary/30 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${pathway.control}%` }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="h-full bg-liberty-accent"
                              />
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <p className="text-liberty-background/70 mb-6 text-lg">
                Not sure which path is right for your building?
              </p>
              <Button 
                size="xl" 
                asChild 
                className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
              >
                <Link href="/eligibility-check" className="flex items-center gap-3 group">
                  Check Your Eligibility
                  <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Decision Helper */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-liberty-secondary/20 to-liberty-base">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-6">
                Not Sure Which Path Is <span className="text-liberty-accent">Right for You?</span>
              </h2>
              <p className="text-lg text-liberty-background/70 max-w-3xl mx-auto">
                Answer these simple questions to find your ideal route to property control
              </p>
            </motion.div>
            
            {/* Decision Cards */}
            <div className="max-w-4xl mx-auto space-y-4 mb-16">
              {decisionCards.map((card, index) => {
                const CardIcon = card.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 bg-liberty-accent/5 border border-liberty-accent/20 rounded-lg hover:bg-liberty-accent/10 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-liberty-accent/10 rounded-full flex items-center justify-center">
                      <CardIcon className="w-5 h-5 text-liberty-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-liberty-background mb-2 text-lg">
                        {card.title}
                      </h3>
                      <p className="text-liberty-background/70 text-sm leading-relaxed mb-3">
                        {card.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-liberty-primary font-medium">
                          {card.suggestion}
                        </span>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-liberty-primary hover:text-liberty-primary/80 hover:bg-transparent p-0"
                        >
                          <Link href={card.link.href} className="flex items-center gap-1">
                            {card.link.text}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto mb-16"
            >
              <div className="bg-liberty-base border border-liberty-secondary/20 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-4 gap-px bg-liberty-secondary/20">
                  {/* Header */}
                  <div className="bg-liberty-base p-4">
                    <p className="font-semibold text-liberty-background text-sm">Compare Options</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <p className="font-semibold text-liberty-background text-sm">RTM</p>
                    <p className="text-xs text-liberty-background/60 mt-1">Quick Control</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <p className="font-semibold text-liberty-background text-sm">Enfranchisement</p>
                    <p className="text-xs text-liberty-background/60 mt-1">Own Building</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <p className="font-semibold text-liberty-background text-sm">Commonhold</p>
                    <p className="text-xs text-liberty-background/60 mt-1">Future Proof</p>
                  </div>
                </div>
                
                {/* Comparison Rows */}
                <div className="grid grid-cols-4 gap-px bg-liberty-secondary/20">
                  <div className="bg-liberty-base p-4">
                    <p className="text-sm text-liberty-background/70">Timeline</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <p className="text-sm font-medium text-liberty-accent">4-6 months</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <p className="text-sm font-medium text-liberty-primary">9-12 months</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <p className="text-sm font-medium text-liberty-standard/70">12-18 months</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-px bg-liberty-secondary/20">
                  <div className="bg-liberty-base p-4">
                    <p className="text-sm text-liberty-background/70">Control Level</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <p className="text-sm font-medium text-liberty-standard">65%</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <p className="text-sm font-medium text-liberty-standard">85%</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <p className="text-sm font-medium text-liberty-accent">100%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-px bg-liberty-secondary/20">
                  <div className="bg-liberty-base p-4">
                    <p className="text-sm text-liberty-background/70">Complexity</p>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <div className="flex justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-liberty-accent"></div>
                      <div className="w-2 h-2 rounded-full bg-liberty-secondary"></div>
                      <div className="w-2 h-2 rounded-full bg-liberty-secondary"></div>
                    </div>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <div className="flex justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-liberty-accent"></div>
                      <div className="w-2 h-2 rounded-full bg-liberty-accent"></div>
                      <div className="w-2 h-2 rounded-full bg-liberty-secondary"></div>
                    </div>
                  </div>
                  <div className="bg-liberty-base p-4 text-center">
                    <div className="flex justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-liberty-accent"></div>
                      <div className="w-2 h-2 rounded-full bg-liberty-accent"></div>
                      <div className="w-2 h-2 rounded-full bg-liberty-accent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-xl text-liberty-background/70 mb-8">
                Let us help you find the perfect path for your building
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="xl"
                  className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
                >
                  <Link href="/eligibility-check" className="flex items-center gap-3 group">
                    Check Your Eligibility
                    <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="border-liberty-secondary text-liberty-standard hover:bg-liberty-secondary/10"
                >
                  <Link href="/contact">
                    Get Expert Advice
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Detailed Modal */}
        <AnimatePresence>
          {selectedPathway && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPathway(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {pathways.find(p => p.id === selectedPathway) && (
                  <>
                    <h3 className="!text-2xl font-reckless !text-liberty-standard mb-4">
                      {pathways.find(p => p.id === selectedPathway)?.title}
                    </h3>
                    <p className="text-gray-700 mb-6">
                      {pathways.find(p => p.id === selectedPathway)?.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="!font-semibold !text-liberty-standard mb-2">The Process</h4>
                        <p className="text-gray-600">
                          Our expert team will guide you through every step, from initial eligibility checks 
                          to final implementation. We handle the complex legal work while you focus on 
                          building consensus with your neighbors.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="!font-semibold !text-liberty-standard mb-2">Success Stories</h4>
                        <p className="text-gray-600">
                          Join hundreds of buildings that have already taken control. Our clients typically 
                          save 20-30% on service charges while improving quality of services.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-8">
                      <Button
                        asChild
                        size="lg"
                        className="bg-liberty-accent text-liberty-standard hover:bg-liberty-accent/90 group"
                      >
                        <Link href="/eligibility-check">
                          Start Your Journey
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white group"
                      >
                        <Link href={pathways.find(p => p.id === selectedPathway)?.detailPage || '#'}>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setSelectedPathway(null)}
                        className="border-liberty-standard text-liberty-standard hover:bg-gray-100"
                      >
                        Close
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}
