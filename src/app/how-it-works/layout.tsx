import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.howItWorks,
  canonicalUrl: '/how-it-works',
});

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
