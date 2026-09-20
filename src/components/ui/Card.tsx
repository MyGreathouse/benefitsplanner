import { ReactNode } from "react";

export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgba(20,33,61,0.04)] ${
        padded ? "p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
