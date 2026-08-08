import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Farah Mokhtari — Senior Product Manager · AI & Data Product Manager";
const description =
  "Product Owner freelance à Paris, spécialisée en product strategy, product roadmap et agile methodology (Scrum) — missions AI product manager et data product manager pour produits SaaS, B2C et B2B, avec expertise en product design et user experience design.";

export const metadata: Metadata = {
  metadataBase: new URL("https://farahmokhtari.com"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "https://farahmokhtari.com",
    siteName: "Farah Mokhtari",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
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
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
