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
    default: "Benefits Planner UK | Benefits Calculator & Eligibility Checker",
    template: "%s | BenefitsPlanner",
  },
  description:
    "Check what UK benefits you may be entitled to with our free benefits calculator and eligibility checker. Explore PIP, Universal Credit, Carer's Allowance and more.",
  alternates: { canonical: "/" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BenefitsPlanner",
              url: "https://benefitsplanner.co.uk",
              description:
                "An independent UK benefits-planning platform helping people explore what support may apply to their circumstances, prepare applications, organise evidence, and track next steps.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BenefitsPlanner",
              url: "https://benefitsplanner.co.uk",
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
