'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="bg-liberty-base">
      {/* Hero Content */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-liberty-secondary/20 via-liberty-base to-liberty-base"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold text-liberty-background mb-6">
              Take Control of Your{' '}
              <span className="text-liberty-accent">Property</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-liberty-background/70 mb-8 max-w-4xl mx-auto">
              We turn frustrated leaseholders into empowered commonholders through technology, transparency, and real results.
            </p>
            
            {/* Stats Bar */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12 text-sm sm:text-base">
              <div className="text-center">
                <div className="text-2xl font-reckless font-bold text-liberty-primary">3.6M</div>
                <div className="text-liberty-background/60">Leaseholders Need Help</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-liberty-secondary"></div>
              <div className="text-center">
                <div className="text-2xl font-reckless font-bold text-liberty-primary">£1.2B</div>
                <div className="text-liberty-background/60">Market Savings Potential</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-liberty-secondary"></div>
              <div className="text-center">
                <div className="text-2xl font-reckless font-bold text-liberty-primary">100%</div>
                <div className="text-liberty-background/60">Legal Protection</div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                <Link href="/get-started" className="flex items-center gap-2 group">
                  Start Your Journey to Freedom
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
                <Link href="/commonhold-guide">
                  Download Free Commonhold Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <Image
            src="/london.png"
            alt="Modern apartment building representing property ownership freedom"
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  )
}