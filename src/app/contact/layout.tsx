import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.contact,
  canonicalUrl: '/contact',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
