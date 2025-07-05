'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Transform scroll progress to padding values - responsive
  const paddingXDesktop = useTransform(scrollYProgress, [0, 0.25, 0.5], [256, 128, 0])
  const paddingXMobile = useTransform(scrollYProgress, [0, 0.25, 0.5], [16, 8, 0])
  const borderRadius = useTransform(scrollYProgress, [0, 0.25, 0.5], [16, 8, 0])

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
      
      {/* Hero Image with Scroll Effect */}
      <div ref={containerRef} className="pb-16">
        {/* Desktop - animated padding */}
        <motion.div
          style={{
            paddingLeft: paddingXDesktop,
            paddingRight: paddingXDesktop,
          }}
          className="relative hidden lg:block"
        >
          <motion.div
            style={{
              borderRadius: borderRadius,
            }}
            className="overflow-hidden shadow-xl"
          >
            <Image
              src="/london.png"
              alt="Modern apartment building representing property ownership freedom"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        </motion.div>
        
        {/* Mobile/Tablet - smaller animated padding */}
        <motion.div
          style={{
            paddingLeft: paddingXMobile,
            paddingRight: paddingXMobile,
          }}
          className="relative lg:hidden px-4"
        >
          <motion.div
            style={{
              borderRadius: borderRadius,
            }}
            className="overflow-hidden shadow-xl"
          >
            <Image
              src="/london.png"
              alt="Modern apartment building representing property ownership freedom"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}