import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mama Afrika | Afrikanisches Restaurant Hamburg – Authentische Küche",
  description:
    "Mama Afrika – Ihr afrikanisches Restaurant in Hamburg. Erleben Sie authentische Westafrikanische Küche, von Jollof Rice bis Suya. Jetzt Tisch reservieren!",
  keywords: [
    "afrikanisches Restaurant Hamburg",
    "afrikanisches Essen Hamburg",
    "westafrikanische Küche Hamburg",
    "Jollof Rice Hamburg",
    "afrikanisches Catering Hamburg",
    "Mama Afrika Hamburg",
    "afrikanisches Essen bestellen Hamburg",
    "nigerianisches Restaurant Hamburg",
  ],
  openGraph: {
    title: "Mama Afrika | Afrikanisches Restaurant Hamburg",
    description:
      "Authentische westafrikanische Küche im Herzen Hamburgs. Frische Zutaten, traditionelle Rezepte, unvergessliche Erlebnisse.",
    locale: "de_DE",
    type: "website",
  },
  alternates: {
    canonical: "https://mama-afrika.de",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Mama Afrika",
  description:
    "Authentisches afrikanisches Restaurant in Hamburg mit westafrikanischer Küche.",
  url: "https://mama-afrika.de",
  telephone: "+49 40 123 456789",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Musterstraße 123",
    addressLocality: "Hamburg",
    postalCode: "20099",
    addressCountry: "DE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 53.5499,
    longitude: 10.0027,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "22:00",
    },
  ],
  servesCuisine: ["Afrikanisch", "Westafrikanisch", "Nigerianisch", "Ghanaisch"],
  priceRange: "€€",
  image: "https://mama-afrika.de/hero.png",
  hasMenu: "https://mama-afrika.de/menu",
  reservations: "https://mama-afrika.de/reservations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <CartSidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
