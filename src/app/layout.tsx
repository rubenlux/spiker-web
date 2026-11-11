import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL("https://spiker.network"),
  title: {
    default: "SPIKER — Communication without Internet",
    template: "%s | SPIKER",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "offline messaging app",
    "communication without internet",
    "bluetooth messaging",
    "wifi direct communication",
    "peer-to-peer communication",
    "mesh communication",
    "off-grid chat",
    "emergency communication technology",
    "direct RF protocol",
  ],
  authors: [{ name: "SPIKER Technology Platform" }],
  creator: "SPIKER",
  publisher: "SPIKER",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: "SPIKER — Stay connected when the world goes offline",
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1376,
        height: 768,
        alt: "SPIKER Offline Direct Radio Communication Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SPIKER — Communication without Internet",
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  icons: {
    icon: "/images/branding/spiker-icon.png",
    apple: "/images/branding/spiker-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SPIKER",
    applicationCategory: "CommunicationApplication",
    operatingSystem: "Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: SITE_CONFIG.description,
    headline: SITE_CONFIG.headline,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#05070D] text-on-surface antialiased min-h-screen flex flex-col font-sans selection:bg-secondary-container/20 selection:text-secondary-container">
        <Header />
        <main className="flex-1 w-full pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
