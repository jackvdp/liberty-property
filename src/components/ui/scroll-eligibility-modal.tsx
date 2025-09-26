'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, X } from 'lucide-react'
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Store original body overflow
      const originalOverflow = document.body.style.overflow
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore original overflow
        document.body.style.overflow = originalOverflow
      }
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
            style={{ pointerEvents: 'auto' }}
          />
          
          {/* Modal - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-2xl bg-liberty-base rounded-t-3xl sm:rounded-2xl shadow-2xl z-[101]"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Mobile drag indicator */}
            <div className="sm:hidden w-12 h-1 bg-liberty-background/20 rounded-full mx-auto mt-3" />
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 sm:top-4 sm:right-4 text-liberty-background/60 hover:text-liberty-background transition-colors z-10 p-2"
              style={{ pointerEvents: 'auto' }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Content - Optimized for mobile */}
            <div className="p-6 sm:p-8 md:p-10 text-center max-h-[85vh] sm:max-h-none overflow-y-auto">
              {/* Heading - Smaller on mobile */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl font-reckless font-bold text-liberty-background mb-3 sm:mb-4 px-8"
              >
                Ready to Take <span className="text-liberty-accent">Control?</span>
              </motion.h2>

              {/* Description - Smaller on mobile */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg text-liberty-background/70 mb-6 sm:mb-8 px-2 sm:px-4"
              >
                Find out if your building qualifies for Right to Manage or Collective Enfranchisement in just 2 minutes.
              </motion.p>

              {/* Benefits - Compact on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-left max-w-md mx-auto px-2 sm:px-4"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-liberty-accent mt-0.5 flex-shrink-0" />
                  <span className="text-liberty-background/80 text-xs sm:text-sm md:text-base">
                    Instant assessment of your legal rights
                  </span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-liberty-accent mt-0.5 flex-shrink-0" />
                  <span className="text-liberty-background/80 text-xs sm:text-sm md:text-base">
                    No obligation - just helpful information
                  </span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-liberty-accent mt-0.5 flex-shrink-0" />
                  <span className="text-liberty-background/80 text-xs sm:text-sm md:text-base">
                    Get a clear path to control your building
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons - Stack on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-4"
              >
                <Button
                  size="xl"
                  asChild
                  className="bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base w-full sm:w-auto text-sm sm:text-base"
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
                  className="border-liberty-background/20 text-liberty-background hover:bg-liberty-secondary/10 w-full sm:w-auto text-sm sm:text-base"
                >
                  Maybe Later
                </Button>
              </motion.div>

              {/* Extra padding at bottom for mobile gesture area */}
              <div className="h-2 sm:hidden" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
