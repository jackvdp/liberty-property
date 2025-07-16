'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getHeroContent } from '@/content/heroes'

export default function HeroMinimalCentered() {
  const content = getHeroContent('minimal-centered')

  return (
    <section className="min-h-screen bg-liberty-base relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage}
          alt={content.backgroundImageAlt}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-liberty-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-reckless font-bold text-liberty-base mb-6">
              {content.title.split(content.subtitle)[0]}
              <span className="text-liberty-accent">
                {content.subtitle}
              </span>
            </h1>
            
            <div className="w-24 h-1 bg-liberty-accent mx-auto mb-8" />
            
            <p className="text-xl md:text-2xl text-liberty-base/90 mb-12 max-w-2xl mx-auto">
              {content.description}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button size="xl" asChild className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background px-8 py-4 text-lg">
              <Link href={content.primaryCTA.href} className="flex items-center gap-3 group">
                {content.primaryCTA.text}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild className="border-liberty-base text-liberty-base hover:bg-liberty-base hover:text-liberty-background px-8 py-4 text-lg">
              <Link href={content.secondaryCTA.href}>
                {content.secondaryCTA.text}
              </Link>
            </Button>
          </motion.div>

          {/* Floating elements - more purposeful positioning */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute top-20 right-20 w-4 h-4 bg-liberty-accent rounded-full opacity-60"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-32 left-16 w-6 h-6 bg-liberty-accent/40 rounded-full opacity-60"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-1/3 left-8 w-3 h-3 bg-liberty-accent/60 rounded-full opacity-80"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-liberty-base/60 flex flex-col items-center gap-2"
      >
        <span className="text-sm">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-liberty-base/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-liberty-base/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
