'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Users, TrendingUp, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getHeroContent } from '@/content/heroes'

export default function HeroLeftAlignedBold() {
  const content = getHeroContent('left-aligned-happy')

  return (
    <section className="min-h-screen bg-gradient-to-br from-liberty-background via-gray-900 to-liberty-background relative overflow-hidden">
      <div className="min-h-screen flex">
        {/* Left Content - Bold Dark Text */}
        <div className="w-full lg:w-1/2 flex items-center">
          <div className="w-full max-w-7xl mx-auto pl-8 lg:pl-24 pr-8 lg:pr-16 py-16 lg:py-0">
            <div className="max-w-xl">
              {/* Bold Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 bg-liberty-accent/20 backdrop-blur-sm border border-liberty-accent/30 text-liberty-accent px-6 py-3 rounded-full text-sm font-bold mb-8 uppercase tracking-wider"
              >
                <Star className="text-liberty-accent" size={16} />
                12,000+ Success Stories
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-4xl lg:text-6xl xl:text-7xl font-reckless font-black text-white mb-6 leading-tight"
              >
                FINALLY,<br />
                Take Control of Your{' '}
                <span className="text-liberty-accent drop-shadow-lg">
                  PROPERTY
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-xl text-gray-300 mb-10 leading-relaxed font-medium"
              >
                {content.description}
              </motion.p>

              {/* Bold Stats Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="grid grid-cols-3 gap-4 mb-10"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-black text-liberty-accent">98%</div>
                  <div className="text-xs text-gray-300 font-medium">SUCCESS</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-black text-liberty-accent">£45k</div>
                  <div className="text-xs text-gray-300 font-medium">SAVINGS</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-black text-liberty-accent">6mo</div>
                  <div className="text-xs text-gray-300 font-medium">TIME</div>
                </div>
              </motion.div>
              
              {/* Bold CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="xl" asChild className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background font-bold text-lg px-8 py-4 rounded-lg shadow-xl">
                  <Link href={content.primaryCTA.href} className="flex items-center gap-3 group">
                    {content.primaryCTA.text.toUpperCase()}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 py-4 rounded-lg backdrop-blur-sm">
                  <Link href={content.secondaryCTA.href} className="flex items-center gap-3">
                    <Play size={18} />
                    WATCH DEMO
                  </Link>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="flex items-center gap-8 mt-8 text-sm text-gray-400 font-medium"
              >
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-liberty-accent" />
                  NO UPFRONT FEES
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-liberty-accent" />
                  GUARANTEED RESULTS
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Content - Bold Image with Overlay */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src={content.backgroundImage}
                alt={content.backgroundImageAlt}
                fill
                className="object-cover"
                priority
              />
              
              {/* Bold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-liberty-accent/20 via-transparent to-liberty-background/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
