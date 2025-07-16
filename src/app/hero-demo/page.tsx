'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { heroVariants } from '@/content/heroes'
import { 
  HeroOriginal, 
  HeroAggressive, 
  HeroDataDriven, 
  HeroSimple, 
  HeroCommunity,
  HeroSplitScreen,
  HeroMinimalCentered,
  HeroVideoBackground,
  HeroCardOverlay,
  HeroDiagonalSplit
} from '@/components/heroes'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ProblemSolution from "@/components/problem-solution";
import StatsSection from "@/components/stats-section";
import HowItWorks from "@/components/how-it-works";
import FAQSection from "@/components/faq-section";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const heroComponents = {
  'original': HeroOriginal,
  'aggressive': HeroAggressive,
  'data-driven': HeroDataDriven,
  'simple': HeroSimple,
  'community': HeroCommunity,
  'split-screen': HeroSplitScreen,
  'minimal-centered': HeroMinimalCentered,
  'video-background': HeroVideoBackground,
  'card-overlay': HeroCardOverlay,
  'diagonal-split': HeroDiagonalSplit,
}

export default function HeroDemoPage() {
  const [selectedHero, setSelectedHero] = useState<string>('original')
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false)

  const HeroComponent = heroComponents[selectedHero as keyof typeof heroComponents]

  return (
    <div className="min-h-screen bg-liberty-base">

      {/* Hero Selection Bar - Collapsible */}
      <div className="bg-liberty-background text-liberty-base fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out" 
           style={{ transform: isToolbarCollapsed ? 'translateY(-100%)' : 'translateY(0)' }}>
        <div className="p-4">
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
      </div>

      {/* Toggle Button */}
      <Button
        onClick={() => setIsToolbarCollapsed(!isToolbarCollapsed)}
        className="fixed top-4 right-4 z-50 bg-liberty-background/80 hover:bg-liberty-background text-liberty-base border border-liberty-base/20"
        size="sm"
        style={{ 
          transform: isToolbarCollapsed ? 'translateY(0)' : 'translateY(0)',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {isToolbarCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </Button>

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
