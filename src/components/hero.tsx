'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import HeroOverlay from './hero-overlay'

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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            {/* Main headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-reckless font-bold text-liberty-background mb-6"
            >
              Take Control of Your{' '}
              <span className="text-liberty-accent">Property</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl sm:text-2xl text-liberty-background/70 mb-8 max-w-4xl mx-auto"
            >
              We help frustrated leaseholders become empowered commonholders through technology, transparency, and real results.
            </motion.p>
            
            {/* Clear Mission Statement */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mb-12 text-center"
            >
              
              <p className="text-lg text-liberty-background/70 mb-8 max-w-3xl mx-auto">
                Liberty Bell is dedicated to assisting leaseholders in all areas of leasehold enfranchisement, from acquiring the freehold of their building and Right to Manage to Commonhold conversion. Our technology-driven, end-to-end services provide comprehensive support throughout your property ownership journey.
              </p>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="xl" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                <Link href="/get-started" className="flex items-center gap-3 group">
                  Find Out How
                  <ArrowRight size={20} className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 ease-out" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
                <Link href="/commonhold-guide">
                  Get Your Commonhold Guide
                </Link>
              </Button>
            </motion.div>
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
              <HeroOverlay isMobile={false} />
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
              <HeroOverlay isMobile={true} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}