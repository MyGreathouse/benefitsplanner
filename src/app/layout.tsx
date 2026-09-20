import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
export const metadata: Metadata = { metadataBase: new URL("https://benefitsplanner.co.uk"), title: "BenefitsPlanner", description: "test" };
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (<html lang="en" className="h-full antialiased"><body className="flex min-h-full flex-col bg-white text-navy-deep"><Header /><main className="flex-1">{children}</main><Footer /></body></html>);
}
