'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="h-[calc(100vh-64px)] bg-liberty-base relative overflow-hidden">
      <div className="h-full flex">
        {/* Left Content - Text (constrained in container) */}
        <div className="w-full lg:w-1/2 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0 mb-16">
            <div className="max-w-xl">
              {/* Success Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 bg-liberty-accent/10 text-liberty-accent px-4 py-2 rounded-full text-sm font-medium mb-6 border border-liberty-accent/20"
              >
                <CheckCircle size={16} />
                End the Outdated Leasehold System
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-4xl lg:text-5xl xl:text-6xl font-reckless font-bold text-liberty-background mb-6 leading-tight"
              >
                Let us help you take back{' '}
                <span className="text-liberty-accent">control</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg lg:text-xl text-liberty-background/70 mb-8 leading-relaxed"
              >
                Reduce your service charges, save you money and stress. We turn every unhappy leaseholder into a happy and empowered commonholder through technology, transparency, and legal empowerment.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="xl" asChild className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base">
                  <Link href="/eligibility-check" className="flex items-center gap-3 group">
                    Check Your Eligibility
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" asChild className="border-liberty-primary text-liberty-primary hover:bg-liberty-primary hover:text-liberty-base">
                  <Link href="/ai-advisor">
                    Talk to Our AI Advisor
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Content - Image (full width to edge, not constrained by container) */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {/* Main image */}
            <div className="w-full h-full relative overflow-hidden">
              <Image
                src="/family.jpeg"
                alt="Modern apartment building representing property ownership freedom"
                fill
                className="object-cover"
                style={{
                  clipPath: 'polygon(0% 100%, 70% 0%, 100% 0%, 100% 100%)'
                }}
                priority
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-liberty-base/5" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}