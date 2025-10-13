import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.rmcProcess,
  canonicalUrl: '/rmc-process',
});

export default function RMCProcessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
