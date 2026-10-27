import type { Metadata, Viewport } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BackToTop } from "@/components/BackToTop";
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from "@/components/SchemaMarkup";
import { siteConfig } from "@/data/siteConfig";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#094863",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Peter Air Systems - Air Handling Units & Cleanroom Solutions",
    template: "%s | Peter Air Systems",
  },
  description:
    "Peter Air Systems offers high-quality air handling units and cleanroom solutions for pharmaceuticals, healthcare and more. Energy-efficient, and trusted worldwide.",
  keywords: [
    "Air Handling Unit Manufacturer in India",
    "AHU Manufacturer Mumbai",
    "Clean Room Equipment",
    "Air Shower",
    "Static Pass Box",
    "Dynamic Pass Box",
    "Bio Safety Cabinet",
    "HEPA Filter Manufacturer India",
    "Modular Operation Theatre",
    "Modular Cleanroom Solutions",
    "Turnkey Cleanroom EPC"
  ],
  authors: [{ name: "Peter Air Systems" }],
  creator: "Peter Air Systems",
  publisher: "Peter Air Systems",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Peter Air Systems - Air Handling Units & Cleanroom Solutions",
    description:
      "Peter Air Systems offers high-quality air handling units and cleanroom solutions for pharmaceuticals, healthcare and more.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/ahu_banner.png",
        width: 1200,
        height: 630,
        alt: "Peter Air Systems Air Handling Units & Cleanroom Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peter Air Systems - Air Handling Units & Cleanroom Solutions",
    description:
      "Peter Air Systems offers high-quality air handling units and cleanroom solutions for pharmaceuticals, healthcare and more.",
    images: ["/images/ahu_banner.png"],
  },
  icons: {
    icon: "/images/PETER-AIR-LOGO.png",
    shortcut: "/images/PETER-AIR-LOGO.png",
    apple: "/images/PETER-AIR-LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${manrope.variable} ${dmSans.variable}`}>
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
