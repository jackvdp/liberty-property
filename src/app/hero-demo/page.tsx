'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { heroVariants } from '@/content/heroes'
import { 
  HeroOriginal, 
  HeroAggressive, 
  HeroDataDriven,
  HeroSplitScreen,
  HeroMinimalCentered,
  HeroVideoBackground,
  HeroCardOverlay,
  HeroDiagonalSplit
} from '@/components/heroes'
import ProblemSolution from "@/components/problem-solution";
import StatsSection from "@/components/stats-section";
import HowItWorks from "@/components/how-it-works";
import FAQSection from "@/components/faq-section";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

const heroComponents = {
  'original': HeroOriginal,
  'aggressive': HeroAggressive,
  'data-driven': HeroDataDriven,
  'split-screen': HeroSplitScreen,
  'minimal-centered': HeroMinimalCentered,
  'video-background': HeroVideoBackground,
  'card-overlay': HeroCardOverlay,
  'diagonal-split': HeroDiagonalSplit,
}

export default function HeroDemoPage() {
  const [selectedHero, setSelectedHero] = useState<string>('original')

  const HeroComponent = heroComponents[selectedHero as keyof typeof heroComponents]

  return (
    <div className="min-h-screen bg-liberty-base">
      {/* Hero Selection Bar */}
      <div className="bg-liberty-background text-liberty-base p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <span className="text-sm font-medium mr-4">Hero Variants:</span>
            {heroVariants.map((variant) => (
              <Button
                key={variant.id}
                size="sm"
                variant={selectedHero === variant.id ? "default" : "outline"}
                onClick={() => setSelectedHero(variant.id)}
                className={selectedHero === variant.id 
                  ? "bg-liberty-accent text-liberty-background" 
                  : "border-liberty-base/30 text-liberty-base/70 hover:bg-liberty-base/10"
                }
              >
                {variant.id}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Hero */}
      <HeroComponent />

      {/* Content Info */}

      <ProblemSolution />
      <StatsSection />
      <HowItWorks />
      <FAQSection />
      <ContactForm />
      <Footer />
    </div>
  )
}
