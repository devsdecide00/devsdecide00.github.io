import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { PROMO, REGULAR_PRICE, formatPrice } from "@/lib/offer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devsdecide.com'),
  title: 'AI Tools Assessment for Small Business | Developers Decide',
  description: "One 45-minute conversation, 3 to 7 AI tools you can use right away, and 5 to 10 hours back every week. If I can't find 5 hours, you get your money back.",
  openGraph: {
    title: 'AI Tools Assessment for Small Business | Developers Decide',
    description: "One 45-minute conversation, 3 to 7 AI tools you can use right away, and 5 to 10 hours back every week. If I can't find 5 hours, you get your money back.",
    url: 'https://devsdecide.com',
    siteName: 'Developers Decide',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Assessment for Small Business | Developers Decide',
    description: "One 45-minute conversation, 3 to 7 AI tools you can use right away, and 5 to 10 hours back every week. If I can't find 5 hours, you get your money back.",
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
      className={`${newsreader.variable} h-full antialiased`}
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
              description: 'AI tools assessments that save small business owners 5 to 10 hours a week.',
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
