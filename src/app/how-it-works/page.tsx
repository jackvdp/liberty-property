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
    color: 'bg-liberty-primary'
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
    color: 'bg-liberty-accent'
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
    color: 'bg-liberty-secondary'
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
    offset: ["start center", "end center"]
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
                  onClick={() => setComparisonMode(!comparisonMode)}
                  variant={comparisonMode ? "default" : "outline"}
                  className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-white"
                >
                  <Scale className="w-4 h-4 mr-2" />
                  {comparisonMode ? 'Exit Comparison' : 'Compare Pathways'}
                </Button>
                <Button
                  asChild
                  className="bg-liberty-accent text-liberty-standard hover:bg-liberty-accent/90"
                >
                  <Link href="/eligibility">
                    Check Your Eligibility
                    <ArrowRight className="w-4 h-4 ml-2" />
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

            <div className="max-w-5xl mx-auto relative">
              {/* Progress Line with Scroll Effect */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-[calc(100%-120px)] bg-liberty-secondary">
                <motion.div
                  className="w-full bg-liberty-primary origin-top"
                  style={{ scaleY: scrollYProgress }}
                />
              </div>
              
              {/* Journey Steps */}
              <div className="space-y-16 relative pb-32">
                {/* Step 1: Check Eligibility */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="hidden md:flex items-center">
                    <div className="w-5/12 pr-8">
                      <Card className="bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="!text-xl font-bold !text-liberty-standard mb-1">
                              Check Your Eligibility
                            </h3>
                            <p className="text-sm text-liberty-primary font-medium">
                              Quick 2-minute assessment
                            </p>
                          </div>
                          <Shield className="w-6 h-6 text-liberty-accent" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Answer a few simple questions about your building to discover which paths are available to you. Our smart wizard instantly tells you if you qualify for RTM, Enfranchisement, or both.
                        </p>
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-liberty-accent text-liberty-standard hover:bg-liberty-accent hover:text-white"
                        >
                          <Link href="/eligibility-check">
                            Start Check
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </Card>
                    </div>
                    
                    <div className="w-2/12 flex justify-center">
                      <div className="w-16 h-16 bg-liberty-primary rounded-full flex items-center justify-center shadow-lg relative z-10">
                        <span className="text-2xl font-bold text-white">1</span>
                      </div>
                    </div>
                    
                    <div className="w-5/12" />
                  </div>
                </motion.div>

                {/* Step 2: Register Your Building */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="hidden md:flex items-center">
                    <div className="w-5/12" />
                    
                    <div className="w-2/12 flex justify-center">
                      <div className="w-16 h-16 bg-liberty-primary rounded-full flex items-center justify-center shadow-lg relative z-10">
                        <span className="text-2xl font-bold text-white">2</span>
                      </div>
                    </div>

                    <div className="w-5/12 pl-8">
                      <Card className="bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="!text-xl font-bold !text-liberty-standard mb-1">
                              Register Your Building
                            </h3>
                            <p className="text-sm text-liberty-primary font-medium">
                              Secure your spot
                            </p>
                          </div>
                          <Building2 className="w-6 h-6 text-liberty-primary" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Join our pilot programme and register your building details. We'll create your case file and connect you with neighbours who want to take control too. No commitment required at this stage.
                        </p>
                        <div className="flex gap-2 text-xs text-gray-500">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>Free registration</span>
                        </div>
                      </Card>
                    </div>
                  </div>
                </motion.div>

                {/* Step 3: We Analyze Your Situation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="hidden md:flex items-center">
                    <div className="w-5/12 pr-8">
                      <Card className="bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="!text-xl font-bold !text-liberty-standard mb-1">
                              We Analyze Your Situation
                            </h3>
                            <p className="text-sm text-liberty-primary font-medium">
                              Expert assessment
                            </p>
                          </div>
                          <TrendingUp className="w-6 h-6 text-liberty-accent" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Our experts review your building's specifics, current service charges, and ownership structure. We calculate potential savings and identify the best path forward for your unique situation.
                        </p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            Expert review
                          </span>
                          <span className="flex items-center">
                            <Coins className="w-3 h-3 mr-1" />
                            Savings calculated
                          </span>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="w-2/12 flex justify-center">
                      <div className="w-16 h-16 bg-liberty-primary rounded-full flex items-center justify-center shadow-lg relative z-10">
                        <span className="text-2xl font-bold text-white">3</span>
                      </div>
                    </div>
                    
                    <div className="w-5/12" />
                  </div>
                </motion.div>

                {/* Step 4: Choose Your Path Together */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="hidden md:flex items-center">
                    <div className="w-5/12" />
                    
                    <div className="w-2/12 flex justify-center">
                      <div className="w-16 h-16 bg-liberty-primary rounded-full flex items-center justify-center shadow-lg relative z-10">
                        <span className="text-2xl font-bold text-white">4</span>
                      </div>
                    </div>

                    <div className="w-5/12 pl-8">
                      <Card className="bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="!text-xl font-bold !text-liberty-standard mb-1">
                              Choose Your Path Together
                            </h3>
                            <p className="text-sm text-liberty-primary font-medium">
                              Tailored recommendation
                            </p>
                          </div>
                          <Scale className="w-6 h-6 text-liberty-accent" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Based on our analysis, we'll recommend whether RTM, Enfranchisement, or Commonhold is best for you. We present the options clearly so you and your neighbours can make an informed decision.
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <Key className="w-4 h-4 mx-auto mb-1 text-liberty-primary" />
                            RTM
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <Home className="w-4 h-4 mx-auto mb-1 text-liberty-accent" />
                            Enfranchise
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <Building2 className="w-4 h-4 mx-auto mb-1 text-liberty-primary" />
                            Commonhold
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </motion.div>

                {/* Step 5: We Handle Everything */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="hidden md:flex items-center">
                    <div className="w-5/12 pr-8">
                      <Card className="bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="!text-xl font-bold !text-liberty-standard mb-1">
                              We Handle Everything
                            </h3>
                            <p className="text-sm text-liberty-primary font-medium">
                              Full service support
                            </p>
                          </div>
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Once you decide, we manage the entire process. Legal notices, paperwork, negotiations - we handle it all. You stay informed with regular updates while we do the heavy lifting.
                        </p>
                        <div className="flex gap-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Shield className="w-3 h-3 mr-1" />
                            Legal support
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Regular updates
                          </span>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="w-2/12 flex justify-center">
                      <div className="w-16 h-16 bg-liberty-primary rounded-full flex items-center justify-center shadow-lg relative z-10">
                        <span className="text-2xl font-bold text-white">5</span>
                      </div>
                    </div>
                    
                    <div className="w-5/12" />
                  </div>
                </motion.div>
              </div>

              {/* Final Step - Success (moved outside to avoid line overlap) */}
              <div className="relative pt-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-liberty-accent rounded-full shadow-xl mb-4">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="!text-2xl font-bold !text-liberty-standard mb-2">
                    Control Achieved!
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    You're now in control of your building. Enjoy reduced service charges, better management, and the freedom to make decisions that benefit all residents.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-liberty-accent text-liberty-standard hover:bg-liberty-accent/90"
                  >
                    <Link href="/eligibility-check">
                      Start Your Journey
                      <ArrowRight className="w-4 h-4 ml-2" />
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
              {pathways.map((pathway, index) => (
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
                              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
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

                        <Button
                          onClick={() => setSelectedPathway(pathway.id)}
                          className={`${pathway.color} ${pathway.id === 'rtm' ? 'text-white' : 'text-liberty-standard'} hover:opacity-90`}
                        >
                          Learn More About {pathway.title.split(' ')[0]}
                          <ArrowRight className="w-4 h-4 ml-2" />
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
                            {pathway.id === 'rtm' && <Key className={`w-6 h-6 ${pathway.id === 'rtm' ? 'text-white' : 'text-white'}`} />}
                            {pathway.id === 'enfranchisement' && <Home className="w-6 h-6 text-white" />}
                            {pathway.id === 'commonhold' && <Building2 className="w-6 h-6 text-liberty-standard" />}
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                <Card className="bg-white p-6 shadow-lg border-0 flex flex-col">
                  <Zap className="w-12 h-12 text-liberty-accent mb-4" />
                  <h3 className="!text-lg !font-semibold !text-liberty-standard mb-2">
                    Want Quick Results?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    RTM can give you management control in just 4-6 months
                  </p>
                  <div className="text-liberty-primary font-semibold mt-auto">→ Consider RTM</div>
                </Card>
                
                <Card className="bg-white p-6 shadow-lg border-0 flex flex-col">
                  <Trophy className="w-12 h-12 text-liberty-accent mb-4" />
                  <h3 className="!text-lg !font-semibold !text-liberty-standard mb-2">
                    Want Maximum Control?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    Own your building and eliminate ground rent forever
                  </p>
                  <div className="text-liberty-primary font-semibold mt-auto">→ Consider Enfranchisement</div>
                </Card>
                
                <Card className="bg-white p-6 shadow-lg border-0 flex flex-col">
                  <Rocket className="w-12 h-12 text-liberty-accent mb-4" />
                  <h3 className="!text-lg !font-semibold !text-liberty-standard mb-2">
                    Want Future-Proof Ownership?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    Join the new era with perpetual ownership and no leases
                  </p>
                  <div className="text-liberty-primary font-semibold mt-auto">→ Consider Commonhold</div>
                </Card>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-liberty-accent text-liberty-standard hover:bg-liberty-accent/90"
                >
                  <Link href="/eligibility-check">
                    Check Your Eligibility
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
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
                        <Link href="/register">
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