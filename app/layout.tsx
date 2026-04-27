import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devsdecide.com'),
  title: 'AI Automation for Alabama Small Business | Developers Decide',
  description: 'Developers Decide builds AI automation tools for Alabama small businesses — HVAC, construction, staffing, and more. Flat-rate, month-to-month.',
  openGraph: {
    title: 'AI Automation for Alabama Small Business | Developers Decide',
    description: 'Developers Decide builds AI automation tools for Alabama small businesses — HVAC, construction, staffing, and more. Flat-rate, month-to-month.',
    url: 'https://devsdecide.com',
    siteName: 'Developers Decide',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation for Alabama Small Business | Developers Decide',
    description: 'Developers Decide builds AI automation tools for Alabama small businesses. Flat-rate, month-to-month.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9CW7YMWGJX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9CW7YMWGJX');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Developers Decide LLC',
              description: 'AI automation consulting for small service businesses in Alabama.',
              url: 'https://devsdecide.com',
              email: 'solomon@devsdecide.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hoover',
                addressRegion: 'AL',
                addressCountry: 'US',
              },
              areaServed: 'Alabama',
              serviceType: 'AI Automation Consulting',
              priceRange: '$1,500–$2,500/mo',
            }),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
