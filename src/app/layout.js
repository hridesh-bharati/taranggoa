import './globals.css';
import Script from 'next/script';
import { AuthProvider } from '@/context/AuthContext';
export const metadata = {
  title: {
    default: 'Tarang Goa - Empowering Women Entrepreneurs & MSMEs',
    template: '%s | Tarang Goa'
  },
  description: 'Official platform of Tarang Goa - Supporting Self Help Groups (SHGs), women entrepreneurs, local artisans, exhibitions, and pop-up bazaars across Goa.',
  keywords: [
    'Tarang Goa',
    'Tarang Utsav',
    'Goa Women Entrepreneurs',
    'Self Help Groups Goa',
    'SHG Goa',
    'Exhibitions in Goa',
    'Pop-Up Bazaar Panaji',
    'Local Artisans Goa',
    'Handicrafts Goa',
    'Swayampoorna Goa',
    'GSRLM DRDA Goa'
  ].join(', '),
  authors: [{ name: 'Hridesh' }],
  creator: 'Tarang Goa Team',
  publisher: 'Tarang Goa',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://taranggoa.com'),
  openGraph: {
    title: 'Tarang Goa - Empowering Women Entrepreneurs',
    description: 'Discover vibrant exhibitions, felicitations, and bazaars celebrating local Goan talent and women entrepreneurs.',
    url: 'https://taranggoa.com',
    siteName: 'Tarang Goa',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tarang Goa Exhibitions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarang Goa - Empowering Women Entrepreneurs',
    description: 'Promoting local Goan brands, SHGs, and small businesses.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="TarangGoa" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>

        {/* Bootstrap JS load karne ka sahi tareeka Next.js me */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}