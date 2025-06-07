
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import SiteHeader from '@/components/shared/SiteHeader';
import SiteFooter from '@/components/shared/SiteFooter';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Define a base URL

export const metadata: Metadata = {
  title: {
    default: 'Jayant Studio - Wedding Photography',
    template: '%s | Jayant Studio', // For page-specific titles
  },
  description: 'Capturing timeless moments with artistic wedding photography. Jayant Studio showcases beautiful wedding photos in various categories like pre-wedding, haldi, and candid shots.',
  keywords: ['wedding photography', 'Jayant Studio', 'photographer', 'Indian wedding', 'pre-wedding shoot', 'candid photography', 'wedding albums', 'event photography'],
  authors: [{ name: 'Jayant Pal', url: siteUrl }],
  creator: 'Jayant Pal',
  publisher: 'Jayant Studio',
  openGraph: {
    title: 'Jayant Studio - Wedding Photography',
    description: 'Timeless wedding photography by Jayant Studio. Explore our portfolio of beautiful pre-wedding, haldi, and candid moments.',
    url: siteUrl,
    siteName: 'Jayant Studio',
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Jayant Studio - Wedding Photography Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jayant Studio - Wedding Photography',
    description: 'Discover stunning wedding photography by Jayant Studio. We capture your special day with artistry and passion.',
    // images: [`${siteUrl}/twitter-image.png`], // Replace with your actual Twitter image URL
    // creator: '@YourTwitterHandle', // Optional: if you have a Twitter handle
  },
  robots: { // Basic robots meta tag
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
  // manifest: `${siteUrl}/site.webmanifest`, // Optional: if you have a PWA manifest
  // icons: { // Optional: Favicon and apple-touch-icon
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
