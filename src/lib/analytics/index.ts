/**
 * Unified Analytics System
 * Sends events to both Meta Pixel and Vercel Analytics
 */

import { track as vercelTrack } from '@vercel/analytics'
import { metaPixelEvents } from './meta-pixel'

/**
 * Unified analytics tracking - sends to all platforms
 */
export const analytics = {
  /**
   * Track page view
   * Automatically handled by components, but can be called manually
   */
  trackPageView: (pageName: string) => {
    // Meta Pixel handles this automatically
    // Vercel Analytics handles this automatically
    console.log('Page view tracked:', pageName)
  },

  /**
   * Track contact form submission
   */
  trackContact: () => {
    // Send to Meta Pixel
    metaPixelEvents.trackContact()
    
    // Send to Vercel Analytics
    vercelTrack('Contact Form Submitted', {
      form: 'contact',
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track eligibility check started
   */
  trackStartedEligibilityCheck: () => {
    // Send to Meta Pixel
    metaPixelEvents.trackStartedEligibilityCheck()
    
    // Send to Vercel Analytics
    vercelTrack('Started Eligibility Check', {
      step: 'initial',
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track eligibility check completed
   */
  trackCompletedEligibilityCheck: (params: {
    status: string
    recommendedPath?: string
  }) => {
    // Send to Meta Pixel
    metaPixelEvents.trackCompletedEligibilityCheck(params)
    
    // Send to Vercel Analytics
    vercelTrack('Completed Eligibility Check', {
      status: params.status,
      recommendedPath: params.recommendedPath || 'unknown',
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track registration started
   */
  trackStartedRegistration: (eligibilityId?: string) => {
    // Send to Meta Pixel
    metaPixelEvents.trackStartedRegistration()
    
    // Send to Vercel Analytics
    vercelTrack('Started Registration', {
      hasEligibilityCheck: !!eligibilityId,
      eligibilityId: eligibilityId || 'none',
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track registration completed
   */
  trackCompletedRegistration: (params?: {
    process?: string
    userId?: string
  }) => {
    // Send to Meta Pixel
    metaPixelEvents.trackCompletedRegistration(params)
    
    // Send to Vercel Analytics
    vercelTrack('Completed Registration', {
      process: params?.process || 'unknown',
      hasUserId: !!params?.userId,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track lead generation
   */
  trackLead: (params?: {
    source?: string
    value?: number
    currency?: string
  }) => {
    // Send to Meta Pixel
    metaPixelEvents.trackLead({
      content_name: params?.source || 'website',
      value: params?.value,
      currency: params?.currency || 'GBP',
    })
    
    // Send to Vercel Analytics
    vercelTrack('Lead Generated', {
      source: params?.source || 'website',
      value: params?.value,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track view content events
   */
  trackViewContent: (params: {
    contentName: string
    contentCategory?: string
  }) => {
    // Send to Meta Pixel
    metaPixelEvents.trackViewContent({
      content_name: params.contentName,
      content_category: params.contentCategory,
    })
    
    // Send to Vercel Analytics
    vercelTrack('Viewed Content', {
      contentName: params.contentName,
      contentCategory: params.contentCategory || 'general',
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track button/CTA clicks
   */
  trackCTAClick: (params: {
    ctaName: string
    location: string
    destination?: string
  }) => {
    // Send to Meta Pixel
    metaPixelEvents.trackCustomEvent('CTAClick', {
      cta_name: params.ctaName,
      location: params.location,
      destination: params.destination,
    })
    
    // Send to Vercel Analytics
    vercelTrack('CTA Clicked', {
      ctaName: params.ctaName,
      location: params.location,
      destination: params.destination || 'unknown',
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track file downloads
   */
  trackDownload: (params: {
    fileName: string
    fileType: string
    fileCategory?: string
  }) => {
    // Send to Meta Pixel
    metaPixelEvents.trackCustomEvent('FileDownload', {
      file_name: params.fileName,
      file_type: params.fileType,
      file_category: params.fileCategory,
    })
    
    // Send to Vercel Analytics
    vercelTrack('File Downloaded', {
      fileName: params.fileName,
      fileType: params.fileType,
      fileCategory: params.fileCategory || 'general',
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track search queries
   */
  trackSearch: (searchQuery: string) => {
    // Send to Meta Pixel
    metaPixelEvents.trackSearch(searchQuery)
    
    // Send to Vercel Analytics
    vercelTrack('Search Performed', {
      query: searchQuery,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track errors
   */
  trackError: (params: {
    errorType: string
    errorMessage: string
    location: string
  }) => {
    // Only send to Vercel Analytics (Meta Pixel doesn't need errors)
    vercelTrack('Error Occurred', {
      errorType: params.errorType,
      errorMessage: params.errorMessage,
      location: params.location,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track custom events
   * Use this for any event not covered above
   */
  trackCustomEvent: (eventName: string, params?: Record<string, unknown>) => {
    // Send to Meta Pixel
    metaPixelEvents.trackCustomEvent(eventName, params)
    
    // Send to Vercel Analytics
    vercelTrack(eventName, {
      ...params,
      timestamp: new Date().toISOString(),
    })
  },
}

// Export individual platforms if needed
export { metaPixelEvents } from './meta-pixel'
export { track as vercelTrack } from '@vercel/analytics'
