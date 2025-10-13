/**
 * Unified Analytics System
 * Sends events to both Meta Pixel and Vercel Analytics
 */

import { track as vercelTrack } from '@vercel/analytics'
import { metaPixelEvents } from './meta-pixel'

/**
 * Time tracking utility
 */
class TimeTracker {
  private startTimes: Map<string, number> = new Map()

  start(key: string) {
    this.startTimes.set(key, Date.now())
  }

  end(key: string): number {
    const startTime = this.startTimes.get(key)
    if (!startTime) return 0
    
    const duration = Math.floor((Date.now() - startTime) / 1000) // Convert to seconds
    this.startTimes.delete(key)
    return duration
  }

  getDuration(key: string): number {
    const startTime = this.startTimes.get(key)
    if (!startTime) return 0
    return Math.floor((Date.now() - startTime) / 1000)
  }
}

const timeTracker = new TimeTracker()

/**
 * Unified analytics tracking - sends to all platforms
 */
export const analytics = {
  /**
   * Start time tracking for a session/activity
   */
  startTimer: (key: string) => {
    timeTracker.start(key)
  },

  /**
   * Get duration without ending timer
   */
  getDuration: (key: string): number => {
    return timeTracker.getDuration(key)
  },

  /**
   * End time tracking and get duration
   */
  endTimer: (key: string): number => {
    return timeTracker.end(key)
  },

  /**
   * Track page view with time tracking
   */
  trackPageView: (pageName: string) => {
    // Start time tracking for this page
    timeTracker.start(`page_${pageName}`)
    
    // Meta Pixel handles this automatically
    // Vercel Analytics handles this automatically
    console.log('Page view tracked:', pageName)
  },

  /**
   * Track page exit with time spent
   */
  trackPageExit: (pageName: string) => {
    const timeSpent = timeTracker.end(`page_${pageName}`)
    
    if (timeSpent > 0) {
      vercelTrack('Page Exit', {
        page: pageName,
        timeSpent,
        timestamp: new Date().toISOString(),
      })
    }
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
   * Track eligibility wizard opened
   */
  trackEligibilityWizardOpened: () => {
    // Start time tracking
    timeTracker.start('eligibility_wizard')
    
    // Send to Meta Pixel
    metaPixelEvents.trackCustomEvent('EligibilityWizardOpened', {
      wizard_type: 'eligibility',
    })
    
    // Send to Vercel Analytics
    vercelTrack('Eligibility Wizard Opened', {
      wizard: 'eligibility',
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track eligibility check started (first question answered)
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
   * Track eligibility wizard progress
   */
  trackEligibilityWizardProgress: (currentStep: number, totalSteps: number) => {
    const progress = Math.round((currentStep / totalSteps) * 100)
    
    vercelTrack('Eligibility Wizard Progress', {
      currentStep,
      totalSteps,
      progress,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track eligibility check completed
   */
  trackCompletedEligibilityCheck: (params: {
    status: string
    recommendedPath?: string
    questionCount?: number
  }) => {
    const timeSpent = timeTracker.end('eligibility_wizard')
    
    // Send to Meta Pixel
    metaPixelEvents.trackCompletedEligibilityCheck(params)
    
    // Send to Vercel Analytics
    vercelTrack('Completed Eligibility Check', {
      status: params.status,
      recommendedPath: params.recommendedPath || 'unknown',
      questionCount: params.questionCount || null,
      timeSpent,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track eligibility wizard abandoned
   */
  trackEligibilityWizardAbandoned: (currentStep: number, totalSteps: number) => {
    const timeSpent = timeTracker.end('eligibility_wizard')
    
    vercelTrack('Eligibility Wizard Abandoned', {
      currentStep,
      totalSteps,
      progress: Math.round((currentStep / totalSteps) * 100),
      timeSpent,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track registration wizard opened
   */
  trackRegistrationWizardOpened: (eligibilityId?: string) => {
    // Start time tracking
    timeTracker.start('registration_wizard')
    
    // Send to Meta Pixel
    metaPixelEvents.trackCustomEvent('RegistrationWizardOpened', {
      has_eligibility: !!eligibilityId,
    })
    
    // Send to Vercel Analytics
    vercelTrack('Registration Wizard Opened', {
      hasEligibilityCheck: !!eligibilityId,
      eligibilityId: eligibilityId || 'none',
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track registration started (first field filled)
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
   * Track registration wizard progress
   */
  trackRegistrationWizardProgress: (currentStep: number, totalSteps: number) => {
    const progress = Math.round((currentStep / totalSteps) * 100)
    
    vercelTrack('Registration Wizard Progress', {
      currentStep,
      totalSteps,
      progress,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track registration completed
   */
  trackCompletedRegistration: (params?: {
    process?: string
    userId?: string
    stepCount?: number
  }) => {
    const timeSpent = timeTracker.end('registration_wizard')
    
    // Send to Meta Pixel
    metaPixelEvents.trackCompletedRegistration(params)
    
    // Send to Vercel Analytics
    vercelTrack('Completed Registration', {
      process: params?.process || 'unknown',
      hasUserId: !!params?.userId,
      stepCount: params?.stepCount || null,
      timeSpent,
      timestamp: new Date().toISOString(),
    })
  },

  /**
   * Track registration wizard abandoned
   */
  trackRegistrationWizardAbandoned: (currentStep: number, totalSteps: number) => {
    const timeSpent = timeTracker.end('registration_wizard')
    
    vercelTrack('Registration Wizard Abandoned', {
      currentStep,
      totalSteps,
      progress: Math.round((currentStep / totalSteps) * 100),
      timeSpent,
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
      value: params?.value || null,
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
