'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { websiteContent } from '@/data/website-content'

export default function WhyLibertyBell() {
  return (
    <section className="pt-16 sm:pt-24 lg:pt-32 bg-liberty-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="relative h-[300px] lg:h-[500px]">
            <Image
              src={websiteContent.whyLibertyBell.image.src}
              alt={websiteContent.whyLibertyBell.image.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-liberty-primary/80 via-liberty-primary/60 to-transparent" />
            
            {/* Banner Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-2xl px-8 lg:px-16">
                <h2 className="text-3xl lg:text-4xl font-reckless font-bold !text-white mb-4 leading-tight">
                  {websiteContent.whyLibertyBell.title}
                </h2>
                <div className="space-y-2 text-white/90 text-base lg:text-lg mb-6 tex-bold">
                  {websiteContent.whyLibertyBell.messages.map((message, index) => (
                    <p key={index}>{message}</p>
                  ))}
                </div>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild 
                  className="border-white text-white hover:bg-white hover:text-liberty-background"
                >
                  <Link href={websiteContent.whyLibertyBell.cta.link}>
                    {websiteContent.whyLibertyBell.cta.text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}