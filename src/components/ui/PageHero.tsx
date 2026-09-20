import { ReactNode } from "react";
import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  standfirst,
  children,
}: {
  eyebrow?: string;
  title: string;
  standfirst?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(45% 60% at 90% 0%, rgba(225,193,109,0.16) 0%, rgba(225,193,109,0) 60%)",
        }}
      />
      <Container className="relative py-14 sm:py-16">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        {standfirst && <p className="mt-4 max-w-2xl text-white/75">{standfirst}</p>}
        {children}
      </Container>
    </section>
  );
}
