'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getHeroContent } from '@/content/heroes'

export default function HeroVideoBackground() {
  const content = getHeroContent('video-background')

  return (
    <section className="min-h-screen bg-liberty-background relative overflow-hidden">
      {/* Background Image with animation */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={content.backgroundImage}
          alt={content.backgroundImageAlt}
          fill
          className="object-cover"
          priority
        />
        {/* Animated overlay */}
        <motion.div 
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-t from-liberty-background via-liberty-background/40 to-liberty-background/20"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-reckless font-bold text-liberty-base mb-6">
                  {content.title.split(content.subtitle)[0]}
                  <span className="text-liberty-accent block">
                    {content.subtitle}
                  </span>
                </h1>
                
                <p className="text-xl text-liberty-base/90 mb-8 leading-relaxed">
                  {content.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="xl" asChild className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background">
                    <Link href={content.primaryCTA.href} className="flex items-center gap-3 group">
                      {content.primaryCTA.text}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="xl" variant="outline" asChild className="border-liberty-base text-liberty-base hover:bg-liberty-base hover:text-liberty-background">
                    <Link href={content.secondaryCTA.href}>
                      {content.secondaryCTA.text}
                    </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 text-liberty-base/80">
                  <div>
                    <div className="text-2xl font-bold text-liberty-accent">12,000+</div>
                    <div className="text-sm">Leaseholders Helped</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-liberty-accent">£2.3M</div>
                    <div className="text-sm">Money Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-liberty-accent">98%</div>
                    <div className="text-sm">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Video/Demo Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative bg-liberty-base/10 backdrop-blur-sm rounded-2xl p-8 border border-liberty-base/20">
                <div className="aspect-video bg-liberty-background/20 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                  <Image
                    src={content.backgroundImage}
                    alt="Demo preview"
                    fill
                    className="object-cover opacity-60"
                  />
                  <Button
                    size="lg"
                    className="bg-liberty-accent hover:bg-liberty-accent/90 text-liberty-background rounded-full p-6 relative z-10"
                  >
                    <Play size={24} className="ml-1" />
                  </Button>
                </div>
                
                <h3 className="text-xl font-bold text-liberty-base mb-3">
                  See Liberty Bell in Action
                </h3>
                <p className="text-liberty-base/80 mb-4">
                  Watch how our platform simplifies the enfranchisement process
                </p>
                
                <div className="flex items-center gap-4 text-sm text-liberty-base/70">
                  <span>3 min watch</span>
                  <span>•</span>
                  <span>No signup required</span>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-liberty-accent/30 rounded-full"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-liberty-accent/40 rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
