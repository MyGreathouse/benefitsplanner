import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benefitsplanner.co.uk"),
  title: {
    default: "BenefitsPlanner — Know what you may be entitled to",
    template: "%s | BenefitsPlanner",
  },
  description:
    "Explore UK benefits and support, check what may apply to your circumstances, prepare applications, organise evidence, and keep track of what happens next.",
  openGraph: {
    title: "BenefitsPlanner",
    description: "Know what you may be entitled to. Plan what to do next.",
    url: "https://benefitsplanner.co.uk",
    siteName: "BenefitsPlanner",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BenefitsPlanner",
    description: "Know what you may be entitled to. Plan what to do next.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-navy-deep">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
