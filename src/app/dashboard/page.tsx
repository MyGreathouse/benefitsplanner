import type { Metadata } from "next";
import { DashboardApp } from "@/components/dashboard/DashboardApp";

export const metadata: Metadata = {
  title: "My Benefits Dashboard",
  description: "See your eligibility check results, planner progress, evidence gathered, and upcoming deadlines in one place.",
};

export default function DashboardPage() {
  return <DashboardApp />;
}
