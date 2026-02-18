import type { Metadata } from "next";
import { Rajdhani, Exo_2, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import LaserFlow from "@/components/LaserFlow";
import { PreloaderProvider } from "@/context/PreloaderContext";

const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-rajdhani" });
const exo2 = Exo_2({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800"], variable: "--font-exo2" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://bharath-portfolio.vercel.app'),
  title: "Bharath | High-Converting Websites for Creators & Businesses",
  description: "Specializing in high-performance landing pages and portfolios that drive results for creators, artists, and business owners. Built with React and Next.js.",
  keywords: ["Freelance Web Developer", "Business Landing Pages", "Creator Portfolios", "Conversion Optimization", "React Developer", "Next.js Portfolio"],
  authors: [{ name: "Bharath Kumar" }],
  creator: "Bharath Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bharath-portfolio.vercel.app/", // Placeholder URL
    title: "Bharath | High-Converting Websites for Creators & Businesses",
    description: "I build websites that tell your story and drive results. Dedicated to help creators and businesses stand out.",
    siteName: "Bharath Portfolio",
    images: [
      {
        url: "/og-image.png", // Assuming existence or placeholder
        width: 1200,
        height: 630,
        alt: "Bharath Portfolio OpenGraph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharath | High-Converting Websites for Creators & Businesses",
    description: "I build websites that tell your story and drive results. Dedicated to help creators and businesses stand out.",
    images: ["/og-image.png"],
    creator: "@bharath_codes", // Placeholder handle
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} ${exo2.variable} ${jetbrainsMono.variable} font-sans bg-transparent text-foreground antialiased selection:bg-accent selection:text-accent-foreground`}>

        {/* Global Fixed Background Video */}
        {/* Global Fixed Background - LaserFlow */}
        <div className="fixed inset-0 z-[-1] min-h-screen w-full overflow-hidden bg-black pointer-events-none">
          <LaserFlow
            wispDensity={1.2}
            flowSpeed={0.4}
            color="#FF6B35" // Cosmic Orange
            fogIntensity={0.6}
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.4}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        </div>

        <SmoothScrolling>
          <PreloaderProvider>
            <Navbar />
            <Preloader />
            <CustomCursor />
            {children}
          </PreloaderProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
