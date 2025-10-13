import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.terms,
  canonicalUrl: '/terms',
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
