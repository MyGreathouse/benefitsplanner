export type DeadlineStatus = "upcoming" | "due-soon" | "overdue" | "completed";

const DUE_SOON_WINDOW_DAYS = 14;

/** date: ISO date string (YYYY-MM-DD). completed: whether the item has been manually marked done. */
export function computeDeadlineStatus(date: string, completed: boolean): DeadlineStatus {
  if (completed) return "completed";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "overdue";
  if (diffDays <= DUE_SOON_WINDOW_DAYS) return "due-soon";
  return "upcoming";
}

/** Adds a number of calendar months to an ISO date string, returning an ISO date string. */
export function addMonths(dateStr: string, months: number): string {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}
