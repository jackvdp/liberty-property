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
    title: 'Register Your Building',
    subtitle: 'Secure your spot',
    description: 'Join our pilot programme and register your building details. We\'ll create your case file and connect you with neighbours who want to take control too. No commitment required at this stage.',
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
    title: 'We Analyze Your Situation',
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
      { icon: Home, label: 'Enfranchise', color: 'text-liberty-accent' },
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

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
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                          <div>
                            <Clock className="w-4 h-4 text-liberty-accent mb-1" />
                            <p className="text-sm text-gray-600">Timeline</p>
                            <p className="text-sm font-semibold text-liberty-standard">{pathway.timeframe}</p>
                          </div>
                          <div>
                            <Coins className="w-4 h-4 text-liberty-accent mb-1" />
                            <p className="text-sm text-gray-600">Cost</p>
                            <p className="text-sm font-semibold text-liberty-standard">{pathway.cost}</p>
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
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 top-0 bottom-0 bg-liberty-secondary overflow-hidden rounded-2xl">
                  <motion.div
                    className="w-full h-full bg-liberty-primary origin-top"
                    style={{ scaleY: scrollYProgress }}
                  />
                </div>
                
                {/* Journey Steps */}
                <div className="-space-y-16 relative pb-8">
                  {journeySteps.map((step, index) => {
                    const Icon = step.icon;
                    const animationX = step.position === 'left' ? -100 : 100;
                    
                    return (
                      <motion.div
                        key={step.number}
                        initial={{ opacity: 0, x: animationX }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                        className="relative"
                        style={{ zIndex: 50 - (index * 10) }}
                      >
                        <div className="hidden md:flex items-center relative z-10">
                          {step.position === 'left' ? (
                            <>
                              <div className="w-5/12 pr-8">
                                <Card className="bg-white border-liberty-secondary p-6 shadow-sm transition-shadow hover:shadow-md">
                                  <div className="flex items-start justify-between mb-4">
                                    <div>
                                      <h3 className="!text-xl font-bold !text-liberty-standard mb-1">
                                        {step.title}
                                      </h3>
                                      <p className="text-sm text-liberty-primary font-medium">
                                        {step.subtitle}
                                      </p>
                                    </div>
                                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                                  </div>
                                  <p className="text-sm text-gray-600 mb-4">
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
                                    <div className="flex gap-4 text-xs text-gray-500">
                                      {step.badges.map((badge, i) => {
                                        const BadgeIcon = badge.icon;
                                        return (
                                          <span key={i} className="flex items-center">
                                            <BadgeIcon className={`w-3 h-3 mr-1 ${badge.color || ''}`} />
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
                                        return (
                                          <div key={i} className="text-center p-2 bg-gray-50 rounded">
                                            <OptionIcon className={`w-4 h-4 mx-auto mb-1 ${option.color}`} />
                                            {option.label}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </Card>
                              </div>
                              
                              <div className="w-2/12 flex justify-center">
                                <div className="w-16 h-16 bg-liberty-primary rounded-full flex items-center justify-center shadow-lg relative z-10">
                                  <span className="text-2xl font-bold text-white">{step.number}</span>
                                </div>
                              </div>
                              
                              <div className="w-5/12" />
                            </>
                          ) : (
                            <>
                              <div className="w-5/12" />
                              
                              <div className="w-2/12 flex justify-center">
                                <div className="w-16 h-16 bg-liberty-primary rounded-full flex items-center justify-center shadow-lg relative z-10">
                                  <span className="text-2xl font-bold text-white">{step.number}</span>
                                </div>
                              </div>

                              <div className="w-5/12 pl-8">
                                <Card className="bg-white border-liberty-secondary p-6 shadow-sm transition-shadow hover:shadow-md">
                                  <div className="flex items-start justify-between mb-4">
                                    <div>
                                      <h3 className="!text-xl font-bold !text-liberty-standard mb-1">
                                        {step.title}
                                      </h3>
                                      <p className="text-sm text-liberty-primary font-medium">
                                        {step.subtitle}
                                      </p>
                                    </div>
                                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                                  </div>
                                  <p className="text-sm text-gray-600 mb-4">
                                    {step.description}
                                  </p>
                                  
                                  {step.badges && step.badges.length > 0 && (
                                    <div className="flex gap-4 text-xs text-gray-500">
                                      {step.badges.map((badge, i) => {
                                        const BadgeIcon = badge.icon;
                                        return (
                                          <span key={i} className="flex items-center">
                                            <BadgeIcon className={`w-3 h-3 mr-1 ${badge.color || ''}`} />
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
                                        return (
                                          <div key={i} className="text-center p-2 bg-gray-50 rounded">
                                            <OptionIcon className={`w-4 h-4 mx-auto mb-1 ${option.color}`} />
                                            {option.label}
                                          </div>
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
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="space-y-32">
              {pathways.map((pathway, index) => {
                const PathwayIcon = pathway.icon;
                
                return (
                  <motion.div
                    key={pathway.id}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}>
                      {/* Content */}
                      <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                        <motion.div
                          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className={`inline-block px-4 py-2 rounded-full ${pathway.color} mb-4`}>
                            <span className={`text-sm font-semibold ${pathway.id === 'rtm' ? 'text-white' : 'text-liberty-standard'}`}>
                              Option {index + 1}
                            </span>
                          </div>
                          
                          <h2 className="!text-4xl font-reckless !text-liberty-standard mb-2">
                            {pathway.title}
                          </h2>
                          <p className="text-xl text-liberty-primary mb-4">
                            {pathway.subtitle}
                          </p>
                          <p className="text-lg text-gray-700 mb-8">
                            {pathway.description}
                          </p>

                          {/* Key Info */}
                          <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-liberty-secondary rounded-lg p-4">
                              <Clock className="w-5 h-5 text-liberty-primary mb-2" />
                              <p className="text-sm text-gray-600">Timeline</p>
                              <p className="text-lg font-semibold text-liberty-standard">{pathway.timeframe}</p>
                            </div>
                            <div className="bg-liberty-secondary rounded-lg p-4">
                              <Coins className="w-5 h-5 text-liberty-primary mb-2" />
                              <p className="text-sm text-gray-600">Typical Cost</p>
                              <p className="text-lg font-semibold text-liberty-standard">{pathway.cost}</p>
                            </div>
                          </div>

                          {/* Benefits & Limitations */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                              <h4 className="!font-semibold !text-liberty-standard mb-3 flex items-center">
                                <CheckCircle2 className="w-5 h-5 text-liberty-accent mr-2" />
                                Benefits
                              </h4>
                              <ul className="space-y-2">
                                {pathway.benefits.map((benefit, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-sm text-gray-700 flex items-start"
                                  >
                                    <Sparkles className="w-4 h-4 text-liberty-accent mr-2 mt-0.5 flex-shrink-0" />
                                    {benefit}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="!font-semibold !text-liberty-standard mb-3">
                                Considerations
                              </h4>
                              <ul className="space-y-2">
                                {pathway.limitations.map((limitation, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-sm text-gray-600"
                                  >
                                    • {limitation}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Best For */}
                          <div className="bg-liberty-secondary rounded-lg p-4 mb-6">
                            <p className="text-sm font-semibold text-liberty-primary mb-1">Best For:</p>
                            <p className="text-gray-700">{pathway.bestFor}</p>
                          </div>

                          <Button size="xl" onClick={() => setSelectedPathway(pathway.id)}
                                  className={`${pathway.color} ${pathway.id === 'rtm' ? 'text-white' : 'text-liberty-standard'} hover:opacity-90 group`}>
                              Learn More About {pathway.title}
                              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </motion.div>
                      </div>

                      {/* Image */}
                      <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                          whileHover={{ scale: 1.05 }}
                          className="relative"
                        >
                          <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                            <Image
                              src={pathway.image}
                              alt={pathway.title}
                              width={600}
                              height={400}
                              className="rounded-lg w-full h-auto"
                            />
                            
                            {/* Floating icon */}
                            <motion.div
                              animate={{
                                y: [0, -10, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className={`absolute -top-4 -right-4 ${pathway.color} p-3 rounded-full shadow-lg`}
                            >
                              <PathwayIcon className={`w-6 h-6 ${pathway.iconColor}`} />
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Decision Helper */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 bg-liberty-secondary"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="!text-3xl md:!text-4xl font-reckless !text-liberty-standard mb-8">
                Not Sure Which Path Is Right for You?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {decisionCards.map((card, index) => {
                  const CardIcon = card.icon;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: card.delay }}
                    >
                      <Card className="bg-white p-6 shadow-lg border-0 flex flex-col h-full">
                        <CardIcon className="w-12 h-12 text-liberty-accent mb-4" />
                        <h3 className="!text-lg !font-semibold !text-liberty-standard mb-2">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">
                          {card.description}
                        </p>
                        <div className="text-liberty-primary font-semibold mb-3">{card.suggestion}</div>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white mt-auto"
                        >
                          <Link href={card.link.href}>
                            {card.link.text}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  asChild
                  size="xl"
                  className="bg-liberty-primary text-white hover:bg-liberty-primary/90"
                >
                  <Link href="/eligibility-check" className={"group"}>
                    Check Your Eligibility
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white"
                >
                  <Link href="/contact">
                    Get Expert Advice
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

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
                        className="bg-liberty-accent text-liberty-standard hover:bg-liberty-accent/90"
                      >
                        <Link href="/eligibility-check">
                          Start Your Journey
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPathway(null)}
                        className="border-liberty-primary text-liberty-standard"
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
