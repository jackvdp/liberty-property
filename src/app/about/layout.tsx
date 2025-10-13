import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.about,
  canonicalUrl: '/about',
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
