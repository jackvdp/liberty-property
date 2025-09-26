'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Home, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ScrollEligibilityModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already seen the modal this session
    const hasSeenModal = sessionStorage.getItem('eligibilityModalSeen')
    if (hasSeenModal === 'true') {
      return
    }

    let hasTriggered = false

    const handleScroll = () => {
      // Only trigger once
      if (hasTriggered || isOpen) return

      // Get scroll percentage
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      const scrollPercentage = (scrollPosition / scrollHeight) * 100

      // Trigger at 30% scroll depth or 500px, whichever comes first
      if (scrollPercentage > 30 || scrollPosition > 500) {
        hasTriggered = true
        setIsOpen(true)
        sessionStorage.setItem('eligibilityModalSeen', 'true')
      }
    }

    // Add scroll listener with throttling
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Start listening after a delay to avoid immediate trigger
    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', scrollListener)
      // Check immediately in case user has already scrolled
      handleScroll()
    }, 2000) // 2 second delay

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', scrollListener)
    }
  }, [isOpen])

  const closeModal = () => {
    setIsOpen(false)
    sessionStorage.setItem('eligibilityModalSeen', 'true')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={closeModal}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-liberty-base rounded-2xl shadow-2xl z-[101] mx-4"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-liberty-background/60 hover:text-liberty-background transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-8 md:p-10 text-center">
              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-reckless font-bold text-liberty-background mb-4"
              >
                Ready to <span className="text-liberty-accent">Take Control?</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-liberty-background/70 mb-8 px-4"
              >
                Find out if your building qualifies for Right to Manage or Collective Enfranchisement in just 2 minutes.
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3 mb-8 text-left max-w-md mx-auto px-4"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-liberty-accent mt-0.5 flex-shrink-0" />
                  <span className="text-liberty-background/80 text-sm sm:text-base">
                    Instant assessment of your legal rights
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-liberty-accent mt-0.5 flex-shrink-0" />
                  <span className="text-liberty-background/80 text-sm sm:text-base">
                    No obligation - just helpful information
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-liberty-accent mt-0.5 flex-shrink-0" />
                  <span className="text-liberty-background/80 text-sm sm:text-base">
                    Get a clear path to control your building
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              >
                <Button
                  size="xl"
                  asChild
                  className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base"
                >
                  <Link href="/eligibility-check" className="flex items-center justify-center gap-2">
                    Check Eligibility Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  onClick={closeModal}
                  className="border-liberty-background/20 text-liberty-background hover:bg-liberty-secondary/10"
                >
                  Maybe Later
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
