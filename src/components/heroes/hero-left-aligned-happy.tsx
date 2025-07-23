'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getHeroContent } from '@/content/heroes'

export default function HeroLeftAlignedHappy() {
  const content = getHeroContent('left-aligned-happy')

  return (
    <section className="min-h-screen bg-liberty-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto min-h-screen">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Content - Text */}
          <div className="flex items-center px-8 lg:px-16 py-16 lg:py-0">
            <div className="max-w-xl">
              {/* Success Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <Star className="text-green-600" size={16} />
                Join 12,000+ Happy Property Owners
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-4xl lg:text-5xl xl:text-6xl font-reckless font-bold text-liberty-background mb-6 leading-tight"
              >
                Finally, Take Control of Your{' '}
                <span className="text-liberty-accent">Property</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg lg:text-xl text-liberty-background/70 mb-8 leading-relaxed"
              >
                {content.description}
              </motion.p>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="grid grid-cols-3 gap-6 mb-8"
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-liberty-accent">98%</div>
                  <div className="text-sm text-liberty-background/60">Success Rate</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-liberty-accent">£45k</div>
                  <div className="text-sm text-liberty-background/60">Avg. Savings</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-liberty-accent">6 mo</div>
                  <div className="text-sm text-liberty-background/60">Avg. Time</div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="xl" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                  <Link href={content.primaryCTA.href} className="flex items-center gap-3 group">
                    {content.primaryCTA.text}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
                  <Link href={content.secondaryCTA.href}>
                    {content.secondaryCTA.text}
                  </Link>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="flex items-center gap-6 mt-8 text-sm text-liberty-background/60"
              >
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-liberty-accent" />
                  No upfront fees
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-liberty-accent" />
                  Proven results
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Content - Happy Leaseholders Image */}
          <div className="relative lg:min-h-screen">
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* Placeholder for happy leaseholders image */}
              <div className="w-full h-full bg-gradient-to-br from-liberty-accent/20 to-liberty-primary/20 flex items-center justify-center relative overflow-hidden">
                {/* Temporary placeholder - replace with actual image */}
                <Image
                  src={content.backgroundImage}
                  alt={content.backgroundImageAlt}
                  fill
                  className="object-cover opacity-30"
                  priority
                />
                
                {/* Overlay content suggesting happy people */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 bg-liberty-base/90 backdrop-blur-sm rounded-2xl shadow-xl max-w-sm">
                    <div className="text-6xl mb-4">😊</div>
                    <h3 className="text-xl font-bold text-liberty-background mb-2">
                      Happy Leaseholders
                    </h3>
                    <p className="text-liberty-background/70 text-sm">
                      Replace with actual photo of satisfied customers celebrating their property freedom
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-liberty-base/10" />
            </motion.div>

            {/* Floating testimonial */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-8 left-8 right-8 lg:left-8 lg:right-16"
            >
              <div className="bg-liberty-base/95 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-liberty-secondary/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-liberty-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="text-liberty-accent" size={20} />
                  </div>
                  <div>
                    <p className="text-liberty-background/80 text-sm mb-2">
                      "We finally own our property! No more ground rent, no more managing agent problems. Liberty Bell made it so simple."
                    </p>
                    <div className="font-medium text-liberty-background text-sm">
                      Sarah & Mike Thompson
                    </div>
                    <div className="text-liberty-background/60 text-xs">
                      Manchester Apartment Block
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
