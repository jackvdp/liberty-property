/**
 * Robots.txt Configuration
 * Tells search engines which pages to crawl and where to find the sitemap
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://libertybellpm.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/*',
          '/admin-dashboard/*',
          '/api/*',
          '/login',
          '/register',
          '/auth/*',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
