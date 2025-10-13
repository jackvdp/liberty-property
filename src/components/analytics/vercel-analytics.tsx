'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { analytics } from '@/lib/analytics'

/**
 * Vercel Analytics with automatic time tracking
 * Tracks page views (automatic) + time spent on each page
 */
export function VercelAnalytics() {
  const pathname = usePathname()
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    // Reset start time when page changes
    startTimeRef.current = Date.now()

    // Track page view with our analytics system
    const pageName = pathname === '/' ? 'homepage' : pathname.slice(1).replace(/\//g, '-')
    analytics.startTimer(`page_${pageName}`)

    // Track time spent when user leaves page
    return () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
      
      if (timeSpent > 0) {
        analytics.trackCustomEvent('Page Time Spent', {
          page: pageName,
          pathname: pathname,
          timeSpent: timeSpent,
          timestamp: new Date().toISOString(),
        })
      }
    }
  }, [pathname])

  return (
    <>
      {/* Analytics - tracks events and conversions */}
      <Analytics />
      
      {/* Speed Insights - tracks Core Web Vitals and performance */}
      <SpeedInsights />
    </>
  )
}
