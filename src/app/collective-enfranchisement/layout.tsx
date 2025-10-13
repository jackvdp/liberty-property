import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.collectiveEnfranchisement,
  canonicalUrl: '/collective-enfranchisement',
});

export default function CollectiveEnfranchisementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
