'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Calculator, FileText, ChevronRight, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { content } from '@/data/home/content'

const iconMap = [
  Search,    // Step 1: Check Your Eligibility
  FileText,  // Step 2: We Do The Legal Work
  Calculator // Step 3: Choose Your Management Path
]

// Common component that contains all the shared logic
interface HowItWorksContentProps {
  enableScrollTracking?: boolean
}

function HowItWorksContent({ enableScrollTracking = false }: HowItWorksContentProps) {
  const [activeStep, setActiveStep] = useState(1)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const currentStep = content.howItWorks.steps.find(step => step.id === activeStep) || content.howItWorks.steps[0]

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
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-liberty-secondary/20">
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
            {content.howItWorks.header.title} <span className="text-liberty-accent">{content.howItWorks.header.titleHighlight}</span>
          </h2>
          <p className="text-lg text-liberty-background/70 max-w-3xl mx-auto">
            {content.howItWorks.header.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Step Navigation */}
          <div className="space-y-4 lg:h-screen">
            <h3 className="text-2xl font-reckless font-bold text-liberty-background mb-6">
              {content.howItWorks.processTitle}
            </h3>
            
            {content.howItWorks.steps.map((step, index) => {
              const StepIcon = iconMap[index]
              return (
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
                          <StepIcon className="w-6 h-6" />
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
                                    <span className="text-liberty-background/70">
                                      {point.includes('Right to Manage') ? (
                                        <>
                                          Instant assessment for{' '}
                                          <Link href="/right-to-manage" className="text-liberty-primary hover:text-liberty-primary/80 underline">
                                            Right to Manage
                                          </Link>{' '}
                                          eligibility
                                        </>
                                      ) : point.includes('Collective Enfranchisement') ? (
                                        <>
                                          Check if you qualify for{' '}
                                          <Link href="/collective-enfranchisement" className="text-liberty-primary hover:text-liberty-primary/80 underline">
                                            Collective Enfranchisement
                                          </Link>
                                        </>
                                      ) : (
                                        point
                                      )}
                                    </span>
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
              )
            })}
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
                    {React.createElement(iconMap[currentStep.id - 1], { className: "w-8 h-8 text-liberty-background" })}
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
                            <span className="text-liberty-background/70">
                              {point.includes('Right to Manage') ? (
                                <>
                                  Instant assessment for{' '}
                                  <Link href="/right-to-manage" className="text-liberty-primary hover:text-liberty-primary/80 underline">
                                    Right to Manage
                                  </Link>{' '}
                                  eligibility
                                </>
                              ) : point.includes('Collective Enfranchisement') ? (
                                <>
                                  Check if you qualify for{' '}
                                  <Link href="/collective-enfranchisement" className="text-liberty-primary hover:text-liberty-primary/80 underline">
                                    Collective Enfranchisement
                                  </Link>
                                </>
                              ) : (
                                point
                              )}
                            </span>
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
          <Card className="bg-liberty-background !text-liberty-base max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="!text-liberty-secondary text-2xl font-reckless font-bold mb-4">
                {content.howItWorks.cta.title}
              </h3>
              <p className="text-liberty-secondary mb-6">
                {content.howItWorks.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="xl" 
                  asChild
                  className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background"
                >
                  <Link href={content.howItWorks.cta.button.href}>
                    {content.howItWorks.cta.button.text}
                  </Link>
                </Button>
                <Button 
                  size="xl" 
                  variant="outline"
                  asChild
                  className="border-liberty-base text-liberty-base hover:bg-liberty-base hover:text-liberty-background"
                >
                  <Link href={content.howItWorks.cta.secondaryButton.href}>
                    {content.howItWorks.cta.secondaryButton.text}
                  </Link>
                </Button>
              </div>
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