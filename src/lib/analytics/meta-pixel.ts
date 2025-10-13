/**
 * Meta Pixel Analytics Helper
 * Helper functions to track custom events with Meta Pixel
 */

declare global {
  interface Window {
    fbq: (action: string, eventName: string, params?: Record<string, unknown>) => void
  }
}

/**
 * Track a custom event with Meta Pixel
 */
export function trackMetaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params)
  }
}

/**
 * Track standard Meta Pixel events
 */
export const metaPixelEvents = {
  // Lead generation
  trackLead: (params?: { content_name?: string; value?: number; currency?: string }) => {
    trackMetaEvent('Lead', params)
  },

  // Contact form submission
  trackContact: () => {
    trackMetaEvent('Contact')
  },

  // Eligibility check completion
  trackCompleteRegistration: (params?: { content_name?: string; status?: string }) => {
    trackMetaEvent('CompleteRegistration', params)
  },

  // User submitted eligibility form
  trackSubmitApplication: (params?: { content_name?: string }) => {
    trackMetaEvent('SubmitApplication', params)
  },

  // Custom event: Started eligibility check
  trackStartedEligibilityCheck: () => {
    trackMetaEvent('StartedEligibilityCheck', { content_name: 'Eligibility Wizard' })
  },

  // Custom event: Completed eligibility check
  trackCompletedEligibilityCheck: (params: { status: string; recommendedPath?: string }) => {
    trackMetaEvent('CompletedEligibilityCheck', {
      content_name: 'Eligibility Check',
      ...params,
    })
  },

  // Custom event: Started registration
  trackStartedRegistration: () => {
    trackMetaEvent('StartedRegistration', { content_name: 'Registration Form' })
  },

  // Custom event: Completed registration
  trackCompletedRegistration: (params?: { process?: string }) => {
    trackMetaEvent('CompleteRegistration', {
      content_name: 'Registration',
      status: 'completed',
      ...params,
    })
  },

  // View content events
  trackViewContent: (params: { content_name: string; content_category?: string }) => {
    trackMetaEvent('ViewContent', params)
  },

  // Search
  trackSearch: (searchString: string) => {
    trackMetaEvent('Search', { search_string: searchString })
  },

  // Button/link clicks
  trackCustomEvent: (eventName: string, params?: Record<string, unknown>) => {
    trackMetaEvent(eventName, params)
  },
}
