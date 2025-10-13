import { generateMetadata as generateSEOMetadata, seoConfig } from '@/lib/seo/metadata'

export const metadata = generateSEOMetadata({
  ...seoConfig.rightToManage,
  canonicalUrl: '/right-to-manage',
});

export default function RightToManageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
