'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

/**
 * Vercel Analytics and Speed Insights
 * Tracks page views, custom events, and performance metrics
 */
export function VercelAnalytics() {
  return (
    <>
      {/* Analytics - tracks events and conversions */}
      <Analytics />
      
      {/* Speed Insights - tracks Core Web Vitals and performance */}
      <SpeedInsights />
    </>
  )
}
