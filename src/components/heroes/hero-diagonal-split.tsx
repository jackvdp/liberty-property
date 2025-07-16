'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { getHeroContent } from '@/content/heroes'

export default function HeroDiagonalSplit() {
  const content = getHeroContent('diagonal-split')

  const benefits = [
    "No upfront costs",
    "Expert legal support",
    "Technology-driven process",
    "Transparent pricing"
  ]

  return (
    <section className="min-h-screen bg-liberty-base relative overflow-hidden">
      {/* Diagonal Background */}
      <div className="absolute inset-0">
        {/* Left side - solid color */}
        <div className="absolute inset-0 bg-liberty-background" />
        
        {/* Right side - image with diagonal cut */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-liberty-background via-liberty-background to-transparent"
          style={{
            clipPath: 'polygon(0 0, 60% 0, 45% 100%, 0% 100%)'
          }}
        />
        
        {/* Image section */}
        <div 
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 30% 100%)'
          }}
        >
          <Image
            src={content.backgroundImage}
            alt={content.backgroundImageAlt}
            fill
            className="object-cover"
            priority
          />
          {/* Image overlay */}
          <div className="absolute inset-0 bg-liberty-accent/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:pr-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-block bg-liberty-accent/20 text-liberty-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                  Revolutionary Technology
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-reckless font-bold text-liberty-base mb-6">
                  {content.title.split(content.subtitle)[0]}
                  <span className="text-liberty-accent">
                    {content.subtitle}
                  </span>
                </h1>
                
                <p className="text-xl text-liberty-base/90 mb-8 leading-relaxed">
                  {content.description}
                </p>
                
                {/* Benefits List */}
                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 text-liberty-base/80"
                    >
                      <CheckCircle size={20} className="text-liberty-accent" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
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
              </motion.div>
            </div>

            {/* Right Content - Overlapping the image */}
            <div className="lg:pl-12">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="relative"
              >
                {/* Floating Card */}
                <div className="bg-liberty-base/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-liberty-base/20 relative">
                  <h3 className="text-2xl font-bold text-liberty-background mb-6">
                    Get Started Today
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-liberty-secondary/20 rounded-lg">
                      <span className="text-liberty-background/80">Free consultation</span>
                      <CheckCircle className="text-liberty-accent" size={20} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-liberty-secondary/20 rounded-lg">
                      <span className="text-liberty-background/80">Property assessment</span>
                      <CheckCircle className="text-liberty-accent" size={20} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-liberty-secondary/20 rounded-lg">
                      <span className="text-liberty-background/80">Custom roadmap</span>
                      <CheckCircle className="text-liberty-accent" size={20} />
                    </div>
                  </div>
                  
                  <Button asChild className="w-full bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                    <Link href="/consultation">
                      Book Free Consultation
                    </Link>
                  </Button>
                  
                  <p className="text-center text-liberty-background/60 text-sm mt-4">
                    No obligation • 30-minute call
                  </p>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-8 h-8 border-2 border-liberty-accent/30 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-liberty-accent/40 rounded-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-liberty-accent/10 rounded-full blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-liberty-accent/20 rounded-full blur-lg"
      />
    </section>
  )
}
