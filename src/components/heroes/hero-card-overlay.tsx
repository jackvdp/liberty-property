'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Zap, Users, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getHeroContent } from '@/content/heroes'

export default function HeroCardOverlay() {
  const content = getHeroContent('card-overlay')

  const features = [
    { icon: Shield, title: "Secure & Legal", description: "Full legal compliance" },
    { icon: Zap, title: "Fast Process", description: "Average 6 months" },
    { icon: Users, title: "Expert Team", description: "Dedicated support" },
    { icon: Trophy, title: "Proven Results", description: "98% success rate" }
  ]

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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-liberty-background/80 via-liberty-background/60 to-liberty-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-reckless font-bold text-liberty-base mb-6">
                  {content.title.split(content.subtitle)[0]}
                  <span className="text-liberty-accent">
                    {content.subtitle}
                  </span>
                </h1>
                
                <p className="text-xl text-liberty-base/90 mb-8 leading-relaxed max-w-2xl">
                  {content.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
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

                {/* Feature Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 text-liberty-base/80"
                    >
                      <feature.icon size={20} className="text-liberty-accent" />
                      <div>
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-sm text-liberty-base/60">{feature.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="bg-liberty-base/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-liberty-base/20"
              >
                <h3 className="text-2xl font-bold text-liberty-background mb-4">
                  Free Property Assessment
                </h3>
                <p className="text-liberty-background/70 mb-6">
                  Get a personalized analysis of your enfranchisement options and potential savings.
                </p>
                <Button asChild className="w-full bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                  <Link href="/assessment">
                    Start Assessment
                  </Link>
                </Button>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="bg-liberty-accent/10 backdrop-blur-sm rounded-2xl p-6 border border-liberty-accent/20"
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-liberty-base">£45k</div>
                    <div className="text-sm text-liberty-base/70">Avg. Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-liberty-base">6 months</div>
                    <div className="text-sm text-liberty-base/70">Avg. Timeline</div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="bg-liberty-base/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-liberty-base/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-liberty-accent/20 rounded-full flex items-center justify-center">
                    <Users className="text-liberty-accent" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-liberty-background">Sarah M.</div>
                    <div className="text-sm text-liberty-background/60">London Leaseholder</div>
                  </div>
                </div>
                <p className="text-liberty-background/80 text-sm">
                  "Liberty Bell made the entire process seamless. We saved £30,000 and now have full control of our building."
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
