import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.privacy,
  canonicalUrl: '/privacy',
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
