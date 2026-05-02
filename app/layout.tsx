import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { getLogoByName } from "@/app/lib/notion";

// Inter 폰트 로드 (Google Fonts에서 자동으로 가져옴)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AEML - Advanced Energy Materials Laboratory",
  description: "Advanced Energy Materials Laboratory at Hongik University, led by Professor Dongwook Lee. Engineering advanced materials for next-generation energy storage.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainLogo = await getLogoByName("AEML Logo - Main");
  const footerLogo = await getLogoByName("AEML Logo - White");
  const hongikLogo = await getLogoByName("Hongik University Logo");

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased flex flex-col min-h-screen">
        <Navigation logoUrl={mainLogo?.imageUrl ?? null} />
        <main id="top" className="flex-1">
          {children}
        </main>
        <Footer
          logoUrl={footerLogo?.imageUrl ?? null}
          hongikLogoUrl={hongikLogo?.imageUrl ?? null}
        />
      </body>
    </html>
  );
}