import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { PROMO, REGULAR_PRICE, formatPrice } from "@/lib/offer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
  display: "swap",
});

const title = 'Get 5 Hours a Week Back | Developers Decide';
const description =
  'One 45-minute conversation. 3 to 7 AI tools you can use this week, and 5 hours a week back or your money back. Book a call.';

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
              description: 'A 45-minute AI tools assessment. 5 hours a week back, or your money back.',
              url: 'https://devsdecide.com',
              email: 'solomon@devsdecide.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Hoover',
                addressRegion: 'AL',
                addressCountry: 'US',
              },
              areaServed: 'Alabama',
              serviceType: 'AI Tools Assessment',
              priceRange: `${formatPrice(PROMO.price)}–${formatPrice(REGULAR_PRICE)}`,
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
