'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Users, Calculator, FileText, Building, Award, Heart, ChevronRight, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const steps = [
  {
    id: 1,
    title: "Discover Your Options",
    icon: Search,
    description: "Learn about your rights as a leaseholder",
    details: "Most leaseholders don't know they have powerful legal rights. You can take control through Right to Manage, Collective Enfranchisement, or transition to Commonhold.",
    timeEstimate: "5 minutes",
    didYouKnow: "Over 3.6 million leaseholders in the UK don't know about their legal rights to control their buildings.",
    keyPoints: [
      "Right to Manage - Take control of building management",
      "Collective Enfranchisement - Buy your freehold together", 
      "Commonhold - Own your flat forever with shared management"
    ]
  },
  {
    id: 2,
    title: "Check Your Eligibility",
    icon: Calculator,
    description: "Simple assessment of your building and lease situation",
    details: "Not every building qualifies, but most do. We'll check your building composition, lease length, and qualifying tenant status using simple questions.",
    timeEstimate: "10 minutes",
    didYouKnow: "Over 80% of leaseholders qualify for some form of action, but less than 5% ever take it.",
    keyPoints: [
      "Building must have 2+ flats with long leases",
      "Less than 25% can be commercial space",
      "You need detailed lease information"
    ]
  },
  {
    id: 3,
    title: "Gather Your Neighbors",
    icon: Users,
    description: "Build consensus among fellow leaseholders",
    details: "The biggest barrier isn't legal—it's getting people organized. You need 50%+ participation for collective action, but we help you approach and convince your neighbors.",
    timeEstimate: "2-4 weeks",
    didYouKnow: "The biggest barrier to enfranchisement isn't legal complexity—it's getting neighbors to work together.",
    keyPoints: [
      "Need 50%+ participation for collective enfranchisement",
      "100% needed for commonhold conversion",
      "We provide templates and guidance for neighbor outreach"
    ]
  },
  {
    id: 4,
    title: "Understand the Costs",
    icon: FileText,
    description: "Get transparent pricing for your specific situation",
    details: "Traditional lawyers charge £15,000-£30,000 per building. With our automated approach we can reduce costs by 70% while providing robust legal protection.",
    timeEstimate: "1 day",
    didYouKnow: "Technology can reduce legal costs by 70% because these are procedural frameworks, not complex litigation.",
    keyPoints: [
      "Traditional legal costs: £15,000-£30,000",
      "With automation: £3,000-£8,000",
      "Plus valuation and freeholder costs"
    ]
  },
  {
    id: 5,
    title: "Navigate the Legal Process",
    icon: Building,
    description: "Handle statutory notices, documentation, and compliance",
    details: "These are procedural frameworks—perfect for automation. We have done this many times before and so are able to generate the statutory notices, manage timelines, and handle freeholder responses automatically.",
    timeEstimate: "3-6 months",
    didYouKnow: "The legal process is mostly procedural paperwork — ideal for automation rather than expensive lawyers.",
    keyPoints: [
      "Statutory notices generated automatically",
      "Timeline management and reminders",
      "Freeholder negotiation support"
    ]
  },
  {
    id: 6,
    title: "Complete the Transfer",
    icon: Award,
    description: "Company formation, legal completion, ownership transfer",
    details: "You're not just buying property—you're joining a community. We handle company formation, legal completion, and set up your new ownership structure.",
    timeEstimate: "2-4 weeks",
    didYouKnow: "Once you own your freehold, you become part of an exclusive community with higher property values and lower costs.",
    keyPoints: [
      "RTM or freehold company formation",
      "Legal completion and ownership transfer",
      "New lease extensions (often 999 years)"
    ]
  },
  {
    id: 7,
    title: "Enjoy Your Freedom",
    icon: Heart,
    description: "Manage your building, control costs, increase value",
    details: "Commonhold properties appreciate while leasehold properties depreciate. You now control your building management, eliminate ground rent, and increase your property value.",
    timeEstimate: "Forever",
    didYouKnow: "Commonhold properties appreciate in value while leasehold properties with short leases depreciate.",
    keyPoints: [
      "No more ground rent payments",
      "Control over building management",
      "Increased property values"
    ]
  }
]

// Common component that contains all the shared logic
interface HowItWorksContentProps {
  enableScrollTracking?: boolean
}

function HowItWorksContent({ enableScrollTracking = false }: HowItWorksContentProps) {
  const [activeStep, setActiveStep] = useState(1)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const currentStep = steps.find(step => step.id === activeStep) || steps[0]

  useEffect(() => {
    if (!enableScrollTracking) return

    const observers: IntersectionObserver[] = []

    // Create intersection observer for each step
    stepRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Only update if we're scrolling within the section
              const sectionRect = sectionRef.current?.getBoundingClientRect()
              if (sectionRect && sectionRect.top <= 100 && sectionRect.bottom >= 100) {
                setActiveStep(index + 1)
              }
            }
          })
        },
        {
          rootMargin: '-40% 0px -40% 0px', // Trigger when step is in middle 20% of viewport
          threshold: 0
        }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [enableScrollTracking])

  // Function to handle manual step click
  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId)
    
    // Use native anchor scrolling
    if (!enableScrollTracking) {
      // Mobile: Use a small delay to allow expansion animation
      setTimeout(() => {
        const element = document.getElementById(`step-${stepId}`)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
    // Desktop with scroll tracking doesn't need manual scrolling
    // as the intersection observer handles active state
  }

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-liberty-secondary/20 via-liberty-base to-liberty-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-4">
            How it <span className="text-liberty-accent">Works</span>
          </h2>
          <p className="text-xl sm:text-2xl text-liberty-background/70 max-w-3xl mx-auto">
            The proven path from frustrated leaseholder to empowered commonholder
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Step Navigation */}
          <div className="space-y-4">
            <h3 className="text-2xl font-reckless font-bold text-liberty-background mb-6">
              The 7-Step Journey
            </h3>
            
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                id={`step-${step.id}`}
                ref={(el) => {
                  stepRefs.current[index] = el
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="scroll-mt-20 lg:scroll-mt-28"
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    activeStep === step.id 
                      ? 'bg-liberty-accent/10 border-liberty-accent shadow-lg' 
                      : 'bg-liberty-base border-liberty-secondary/30 hover:bg-liberty-secondary/10'
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Step Number & Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        activeStep === step.id
                          ? 'bg-liberty-accent text-liberty-background'
                          : 'bg-liberty-secondary text-liberty-background'
                      }`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      
                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-liberty-accent">
                            Step {step.id}
                          </span>
                          <span className="text-xs text-liberty-background/60">
                            {step.timeEstimate}
                          </span>
                        </div>
                        <h4 className="font-reckless font-bold text-liberty-background mb-1">
                          {step.title}
                        </h4>
                        <p className="text-liberty-background/70 text-sm">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Expand Indicator */}
                      <ChevronRight 
                        className={`w-5 h-5 text-liberty-background/40 transition-transform ${
                          activeStep === step.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Mobile Details - Show below each step */}
                <AnimatePresence>
                  {activeStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="lg:hidden mt-4 space-y-4"
                    >
                      {/* Step Details */}
                      <Card className="bg-liberty-base border-liberty-secondary/30">
                        <CardContent className="p-6">
                          <p className="text-liberty-background/80 leading-relaxed mb-6">
                            {step.details}
                          </p>
                          
                          <div className="space-y-4">
                            <h4 className="font-reckless font-bold text-liberty-background">
                              Key Points:
                            </h4>
                            <ul className="space-y-2">
                              {step.keyPoints.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-liberty-accent rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-liberty-background/70">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Did You Know - Mobile */}
                      <Card className="bg-liberty-accent/5 border-liberty-accent/20">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-reckless font-bold text-liberty-background mb-2">
                                Did You Know?
                              </h4>
                              <p className="text-liberty-background/70">
                                {step.didYouKnow}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Step Details - Desktop Only */}
          <div className="hidden lg:block lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Current Step Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-liberty-accent rounded-full flex items-center justify-center">
                    <currentStep.icon className="w-8 h-8 text-liberty-background" />
                  </div>
                  <div>
                    <div className="text-liberty-accent font-medium mb-1">
                      Step {currentStep.id} • {currentStep.timeEstimate}
                    </div>
                    <h3 className="text-2xl font-reckless font-bold text-liberty-background">
                      {currentStep.title}
                    </h3>
                  </div>
                </div>

                {/* Step Details */}
                <Card className="bg-liberty-base border-liberty-secondary/30">
                  <CardContent className="p-6">
                    <p className="text-liberty-background/80 leading-relaxed mb-6">
                      {currentStep.details}
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-reckless font-bold text-liberty-background">
                        Key Points:
                      </h4>
                      <ul className="space-y-2">
                        {currentStep.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-liberty-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-liberty-background/70">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Did You Know */}
                <Card className="bg-liberty-accent/5 border-liberty-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-6 h-6 text-liberty-accent flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-reckless font-bold text-liberty-background mb-2">
                          Did You Know?
                        </h4>
                        <p className="text-liberty-background/70">
                          {currentStep.didYouKnow}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="bg-liberty-background text-liberty-base max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-reckless font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-liberty-secondary mb-6">
                Join thousands who've already taken control of their property destiny
              </p>
              <Button 
                size="xl" 
                className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background"
              >
                Check Your Eligibility Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

// Main component that renders mobile and desktop versions
export default function HowItWorks() {
  return (
    <>
      {/* Mobile version - no scroll tracking */}
      <div className="block lg:hidden">
        <HowItWorksContent enableScrollTracking={false} />
      </div>
      
      {/* Desktop version - with scroll tracking */}
      <div className="hidden lg:block">
        <HowItWorksContent enableScrollTracking={true} />
      </div>
    </>
  )
}
