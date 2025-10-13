import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.propertyManagement,
  canonicalUrl: '/property-management',
});

export default function PropertyManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
