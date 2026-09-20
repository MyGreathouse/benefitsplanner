import type { Metadata } from "next";
import { DeadlinePlannerApp } from "@/components/deadline-planner/DeadlinePlannerApp";

export const metadata: Metadata = {
  title: "Deadline & Review Planner",
  description: "Track every important date across your benefits — applications, assessments, decisions, Mandatory Reconsideration and appeal deadlines — in one place.",
};

export default function DeadlinePlannerPage() {
  return <DeadlinePlannerApp />;
}
