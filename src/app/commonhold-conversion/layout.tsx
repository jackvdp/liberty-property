import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.commonholdConversion,
  canonicalUrl: '/commonhold-conversion',
});

export default function CommonholdConversionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
