'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { content } from '@/data/home/content'

export default function Hero() {
  return (
    <section className="h-[calc(100vh-64px)] bg-liberty-base relative overflow-hidden flex flex-col">
      <div className="flex-1 flex">
        {/* Left Content - Text extending into diagonal white space */}
        <div className="w-full lg:w-1/2 flex items-center relative z-10">
          <div className="w-full max-w-xl ml-auto pr-4 pl-8 sm:pl-12 lg:pl-16 py-16">
              {/* Success Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Link
                  href={content.hero.badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-liberty-accent/10 text-liberty-accent px-4 py-2 rounded-full text-sm font-medium mb-6 border border-liberty-accent/20 hover:bg-liberty-accent/20 hover:scale-105 transition-all duration-300"
                >
                  <CheckCircle size={16} />
                  <strong>{content.hero.badge.text}</strong>
                </Link>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-4xl lg:text-5xl xl:text-6xl font-reckless font-bold text-liberty-background mb-6 leading-tight"
              >
                {content.hero.headline.main}{' '}
                <span className="text-liberty-accent">{content.hero.headline.highlight}</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg lg:text-xl text-liberty-background/70 mb-8 leading-relaxed"
              >
                {content.hero.description}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="xl" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                  <Link href={content.hero.buttons.primary.href} className="flex items-center gap-3 group">
                    {content.hero.buttons.primary.text}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
                  <Link href={content.hero.buttons.secondary.href}>
                    {content.hero.buttons.secondary.text}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

        {/* Right Content - Image (full width to edge, not constrained by container) */}
        <div className="hidden lg:block lg:w-2/3 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {/* Main image with parallax inside fixed diagonal mask */}
            <div className="w-full h-full relative overflow-hidden"
                 style={{
                   clipPath: 'polygon(0% 100%, 40% 0%, 100% 0%, 100% 100%)'
                 }}>
              <motion.div
                className="w-full h-full"
              >
                <Image
                  src={content.hero.image.src}
                  alt={content.hero.image.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-liberty-base/5" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Proof - Partners */}
      {/*<motion.div*/}
      {/*  initial={{ opacity: 0, y: 30 }}*/}
      {/*  animate={{ opacity: 1, y: 0 }}*/}
      {/*  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}*/}
      {/*  className="relative z-10 bg-liberty-base/95 backdrop-blur-sm border-t border-liberty-secondary/30 px-4 sm:px-6 lg:px-8 py-6"*/}
      {/*>*/}
      {/*  <div className="max-w-7xl mx-auto">*/}
      {/*    <div className="flex flex-col items-center">*/}
      {/*      <p className="text-sm text-liberty-background/60 mb-4 text-center">*/}
      {/*        {content.hero.partners.subtitle}*/}
      {/*      </p>*/}
      {/*      <div className="flex items-center justify-center gap-8 lg:gap-24 flex-wrap">*/}
      {/*        {content.hero.partners.items.map((partner, index) => (*/}
      {/*          <motion.div*/}
      {/*            key={partner.name}*/}
      {/*            initial={{ opacity: 0, y: 20 }}*/}
      {/*            animate={{ opacity: 1, y: 0 }}*/}
      {/*            transition={{ duration: 0.6, delay: 0.6 + index * 0.2, ease: "easeOut" }}*/}
      {/*            className="relative"*/}
      {/*          >*/}
      {/*            <Link*/}
      {/*              href={partner.url}*/}
      {/*              target="_blank"*/}
      {/*              rel="noopener noreferrer"*/}
      {/*              className="block relative h-8 w-24 sm:h-10 sm:w-32 group transition-all duration-300"*/}
      {/*            >*/}
      {/*              <Image*/}
      {/*                src={partner.image}*/}
      {/*                alt={partner.alt}*/}
      {/*                fill*/}
      {/*                className="object-contain transition-all duration-300 group-hover:scale-105 filter grayscale brightness-0 opacity-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100"*/}
      {/*              />*/}
      {/*            </Link>*/}
      {/*          </motion.div>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</motion.div>*/}
    </section>
  )
}