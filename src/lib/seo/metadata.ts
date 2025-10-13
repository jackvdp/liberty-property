/**
 * SEO Metadata Utility
 * Centralized utility for generating consistent SEO metadata across all pages
 */

import type { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  noindex?: boolean;
}

const siteConfig = {
  name: 'Liberty Bell Property Management',
  description: 'Turn every unhappy leaseholder into a happy and empowered commonholder through technology, transparency, and legal empowerment.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://libertybellpm.com',
  ogImage: '/og-image.png',
  twitterHandle: '@libertybellpm',
};

/**
 * Generate comprehensive SEO metadata for a page
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage = siteConfig.ogImage,
    ogType = 'website',
    canonicalUrl,
    noindex = false,
  } = config;

  // Create full title
  const fullTitle = title.includes('Liberty Bell') 
    ? title 
    : `${title} | Liberty Bell Property Management`;

  // Create absolute URL for canonical and OG
  const absoluteUrl = canonicalUrl 
    ? `${siteConfig.url}${canonicalUrl}`
    : siteConfig.url;

  // Create absolute image URL
  const absoluteImageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${siteConfig.url}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: 'Liberty Bell Property Management' }],
    
    // Robots
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },

    // Canonical URL
    alternates: {
      canonical: absoluteUrl,
    },

    // Open Graph
    openGraph: {
      type: ogType,
      locale: 'en_GB',
      url: absoluteUrl,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: fullTitle,
      description,
      images: [absoluteImageUrl],
    },

    // Additional meta tags
    other: {
      'application-name': siteConfig.name,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': siteConfig.name,
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
    },
  };
}

/**
 * Common metadata configurations for different page types
 */
export const seoConfig = {
  home: {
    title: 'Liberty Bell - Ethical Enfranchisement',
    description: 'Help leaseholders across England & Wales gain legal control through Right to Manage and Collective Enfranchisement. Property Institute accredited. Fixed fees, expert guidance.',
    keywords: [
      'right to manage',
      'collective enfranchisement',
      'leasehold property',
      'freehold purchase',
      'leaseholder rights',
      'RTM company',
      'buy freehold',
      'leasehold reform',
      'property management',
      'service charges',
    ],
  },

  about: {
    title: 'About Us - Leaseholders Helping Leaseholders',
    description: 'We\'re leaseholders who\'ve been through the system. Property Institute accredited experts helping you take control through RTM and Collective Enfranchisement.',
    keywords: [
      'about liberty bell',
      'property institute accredited',
      'leaseholder support',
      'RTM experts',
      'enfranchisement specialists',
    ],
  },

  howItWorks: {
    title: 'How It Works - 3 Simple Steps to Take Control',
    description: 'Our simple 3-step process: Check eligibility, we handle the legal work, choose your management path. Fixed fees, expert guidance, proven results.',
    keywords: [
      'RTM process',
      'how to buy freehold',
      'enfranchisement process',
      'take control steps',
      'leasehold to freehold',
    ],
  },

  rightToManage: {
    title: 'Right to Manage (RTM) - Take Control of Your Building',
    description: 'Take over building management without buying the freehold. Control repairs, service charges, and contractors. Legal right for qualifying leaseholders.',
    keywords: [
      'right to manage',
      'RTM process',
      'RTM company',
      'building management control',
      'leasehold management',
      'take over management',
    ],
  },

  collectiveEnfranchisement: {
    title: 'Collective Enfranchisement - Buy Your Freehold Together',
    description: 'Buy your building\'s freehold collectively. Eliminate ground rent, extend leases to 999 years, increase property value. Expert guidance, fixed fees.',
    keywords: [
      'collective enfranchisement',
      'buy freehold',
      'freehold purchase',
      'eliminate ground rent',
      'lease extension',
      'increase property value',
    ],
  },

  rmcProcess: {
    title: 'RMC Takeover - Control Your Existing Structure',
    description: 'Take control of your existing Residents Management Company. Improve service quality, reduce costs, transparent management.',
    keywords: [
      'RMC takeover',
      'residents management company',
      'RMC control',
      'building management',
    ],
  },

  commonholdConversion: {
    title: 'Commonhold Conversion - Future of Property Ownership',
    description: 'Convert to commonhold ownership. Perpetual freehold, no ground rent, equal ownership. The future of flat ownership in England & Wales.',
    keywords: [
      'commonhold conversion',
      'commonhold ownership',
      'leasehold to commonhold',
      'perpetual ownership',
      'commonhold association',
    ],
  },

  propertyManagement: {
    title: 'Property Management Services - Professional Building Care',
    description: 'Professional property management for leaseholder-controlled buildings. Transparent costs, quality service, ongoing support.',
    keywords: [
      'property management',
      'building management services',
      'leaseholder management',
      'professional building care',
    ],
  },

  contact: {
    title: 'Contact Us - Get Expert Advice',
    description: 'Get in touch with our Property Institute accredited team. Free initial consultation. Expert guidance on RTM and Collective Enfranchisement.',
    keywords: [
      'contact liberty bell',
      'RTM advice',
      'enfranchisement consultation',
      'leasehold help',
    ],
  },

  eligibilityCheck: {
    title: 'Check Your Eligibility - Start Your Journey',
    description: 'Quick 2-minute eligibility check. Find out if you qualify for Right to Manage or Collective Enfranchisement. Free, no obligation.',
    keywords: [
      'RTM eligibility',
      'enfranchisement eligibility',
      'check qualification',
      'leasehold rights check',
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    description: 'How Liberty Bell Property Management collects, uses, and protects your personal information. GDPR compliant.',
    keywords: ['privacy policy', 'data protection', 'GDPR'],
    noindex: true,
  },

  terms: {
    title: 'Terms & Conditions',
    description: 'Terms and conditions for using Liberty Bell Property Management services and website.',
    keywords: ['terms and conditions', 'terms of service'],
    noindex: true,
  },
};
