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
  const borderRadius = useTransform(scrollYProgress, [0, 0.25, 0.5], [32, 16, 0])
  
  // Text fade in animation - starts later and fades in quickly
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.45], [0, 0, 1])
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.45], [30, 15, 0])
  
  // Dark overlay that increases as we scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.5], [0, 0, 0.2, 0.4])

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
              <Button size="xl" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                <Link href="/get-started" className="flex items-center gap-2 group">
                  Start Your Journey to Freedom
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
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
            className="overflow-hidden shadow-xl relative h-[100vh] min-h-[300px]"
          >
            <Image
              src="/london.png"
              alt="Modern apartment building representing property ownership freedom"
              width={1200}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
            {/* Dark Overlay */}
            <motion.div
              style={{
                opacity: overlayOpacity,
              }}
              className="absolute inset-0 bg-black"
            />
            {/* Overlay Text */}
            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
              }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="text-center px-8">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-reckless font-black mb-4 drop-shadow-2xl !text-white">
                  Your Property Freedom
                </h2>
                <p className="text-xl sm:text-2xl lg:text-3xl opacity-95 drop-shadow-xl max-w-2xl mx-auto text-white">
                  Join thousands who've taken control of their buildings and eliminated ground rent forever
                </p>
              </div>
            </motion.div>
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
            className="overflow-hidden shadow-xl relative h-[60vh]"
          >
            <Image
              src="/london.png"
              alt="Modern apartment building representing property ownership freedom"
              width={1200}
              height={800}
              className="w-full h-full"
              priority
            />
            {/* Dark Overlay */}
            <motion.div
              style={{
                opacity: overlayOpacity,
              }}
              className="absolute inset-0 bg-black"
            />
            {/* Overlay Text - Mobile */}
            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
              }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="text-center px-4">
                <h2 className="text-3xl sm:text-4xl font-reckless font-black mb-3 drop-shadow-2xl !text-white">
                  Your Property Freedom
                </h2>
                <p className="text-base sm:text-lg font-bold opacity-95 drop-shadow-xl text-white">
                  Join thousands who've taken control of their buildings
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}