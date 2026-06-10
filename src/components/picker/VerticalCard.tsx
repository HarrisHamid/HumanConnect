import { Link } from "@tanstack/react-router";
import { ArrowRight, PhoneCall } from "lucide-react";
import type { VerticalConfig } from "@/config/verticals";

interface VerticalCardProps {
  vertical: VerticalConfig;
}

export function VerticalCard({ vertical }: VerticalCardProps) {
  return (
    <Link
      to="/$vertical"
      params={{ vertical: vertical.id }}
      // data-vertical exposes this vertical's accent (teal / amber) via --accent,
      // surfaced through the text-v-accent / bg-v-accent utilities below.
      data-vertical={vertical.id}
      className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-v-accent/12 text-v-accent">
        <PhoneCall className="h-5 w-5" />
      </span>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground">{vertical.displayName}</h3>
        <p className="mt-1 text-sm font-medium text-v-accent">{vertical.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {vertical.pickerBlurb}
        </p>
      </div>

      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
        See the live dashboard
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
