type Status =
  | "worth-exploring"
  | "possibly-relevant"
  | "unlikely"
  | "upcoming"
  | "due-soon"
  | "completed"
  | "overdue";

const STYLES: Record<Status, string> = {
  "worth-exploring": "bg-success-bg text-success",
  "possibly-relevant": "bg-warning-bg text-warning",
  unlikely: "bg-off-white text-slate",
  upcoming: "bg-off-white text-slate",
  "due-soon": "bg-warning-bg text-warning",
  completed: "bg-success-bg text-success",
  overdue: "bg-error-bg text-error",
};

const LABELS: Record<Status, string> = {
  "worth-exploring": "Worth exploring",
  "possibly-relevant": "Possibly relevant",
  unlikely: "Unlikely to apply",
  upcoming: "Upcoming",
  "due-soon": "Due soon",
  completed: "Completed",
  overdue: "Overdue",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
