import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://libertybellenfranchise.co.uk'),
  title: {
    default: "Liberty Bell - Ethical Enfranchisement for Leaseholders",
    template: "%s | Liberty Bell Ethical Enfranchisement",
  },
  description: "Turn every unhappy leaseholder into a happy and empowered commonholder through technology, transparency, and legal empowerment. Property Institute accredited.",
  keywords: [
    "right to manage",
    "collective enfranchisement",
    "leasehold property",
    "freehold purchase",
    "leaseholder rights",
    "RTM company",
    "property management",
    "leasehold reform",
  ],
  authors: [{ name: "Liberty Bell Ethical Enfranchisement" }],
  creator: "Liberty Bell Ethical Enfranchisement",
  publisher: "Liberty Bell Ethical Enfranchisement",
  
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'android-chrome', url: '/favicons/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/favicons/android-chrome-512x512.png', sizes: '512x512' }
    ]
  },
  
  manifest: '/favicons/site.webmanifest',
  
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'Liberty Bell Ethical Enfranchisement',
    title: 'Liberty Bell - Take Back Control of Your Building',
    description: 'Help leaseholders across England & Wales gain legal control through Right to Manage and Collective Enfranchisement. Property Institute accredited.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Liberty Bell Ethical Enfranchisement',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@libertybellpm',
    creator: '@libertybellpm',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    // Add your verification codes after registering with search engines
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicons/android-chrome-512x512.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </head>
      <body className={`${inter.variable} font-inter antialiased`}>
        {children}
      </body>
    </html>
  );
}