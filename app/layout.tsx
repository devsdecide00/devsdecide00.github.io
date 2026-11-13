import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { OFFER_NAME, currentPrice, formatPrice } from "@/lib/offer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
  display: "swap",
});

const title = 'Get 5 Hours a Week Back | Developers Decide';
const description =
  'A paid AI Tools Assessment for small businesses. A 45-minute interview, a written report with 3 to 7 tools, and a review call. Full refund if I can\'t find 5 hours a week.';

export const metadata: Metadata = {
  metadataBase: new URL('https://devsdecide.com'),
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://devsdecide.com',
    siteName: 'Devs Decide',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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
      className={`${bricolage.variable} h-full antialiased`}
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
              alternateName: 'Devs Decide',
              description:
                'A paid AI Tools Assessment for small businesses. Full refund if it can\'t find realistic ways to save at least 5 hours a week.',
              url: 'https://devsdecide.com',
              email: 'support@devsdecide.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hoover',
                addressRegion: 'AL',
                addressCountry: 'US',
              },
              areaServed: 'Alabama',
              serviceType: OFFER_NAME,
              priceRange: formatPrice(currentPrice()),
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
