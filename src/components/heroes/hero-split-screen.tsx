'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getHeroContent } from '@/content/heroes'

export default function HeroSplitScreen() {
  const content = getHeroContent('split-screen')

  return (
    <section className="min-h-screen bg-liberty-base flex items-center">
      <div className="w-full max-w-none">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Content */}
          <div className="flex items-center justify-center px-8 lg:px-16 py-16 lg:py-0 relative z-10">
            <div className="max-w-lg">
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl lg:text-5xl xl:text-6xl font-reckless font-bold text-liberty-background mb-6"
              >
                {content.title.split(content.subtitle)[0]}
                <span className="text-liberty-accent block mt-2">
                  {content.subtitle}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg lg:text-xl text-liberty-background/70 mb-8 leading-relaxed"
              >
                {content.description}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
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

              {/* Decorative element */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute -top-4 -left-4 w-20 h-20 bg-liberty-accent/20 rounded-full blur-xl"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:min-h-screen">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={content.backgroundImage}
                alt={content.backgroundImageAlt}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-liberty-base/20 via-transparent to-liberty-background/10" />
            </motion.div>

            {/* Text overlay creeping over image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-liberty-base/95 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-md">
                <h3 className="text-2xl font-bold text-liberty-background mb-4">
                  Why Choose Liberty Bell?
                </h3>
                <ul className="space-y-2 text-liberty-background/80">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-liberty-accent rounded-full" />
                    Technology-first approach
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-liberty-accent rounded-full" />
                    Transparent pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-liberty-accent rounded-full" />
                    Expert legal support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-liberty-accent rounded-full" />
                    Proven track record
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
