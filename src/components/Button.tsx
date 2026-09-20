import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-navy-deep text-white hover:bg-navy-dark",
  secondary: "bg-white text-navy-deep border border-border hover:border-navy-deep",
  ghost: "text-navy-deep hover:bg-off-white",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </Link>
  );
}
