export function ProgressBar({ percent, label }: { percent: number; label?: string }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-sm text-slate">
          <span>{label}</span>
          <span className="font-medium text-navy-deep">{clamped}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-off-white"
      >
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
