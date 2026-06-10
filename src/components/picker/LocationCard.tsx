import { Link } from "@tanstack/react-router";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import type { LocationDef, VerticalId } from "@/config/verticals";

interface LocationCardProps {
  location: LocationDef;
  verticalId: VerticalId;
}

export function LocationCard({ location, verticalId }: LocationCardProps) {
  return (
    <Link
      to="/$vertical/$locationSlug"
      params={{ vertical: verticalId, locationSlug: location.slug }}
      data-vertical={verticalId}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-v-accent">
            {location.businessName}
          </p>
          <h3 className="mt-1 text-base font-semibold text-foreground">{location.name}</h3>
        </div>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-v-accent/12 text-v-accent">
          <MapPin className="h-4 w-4" />
        </span>
      </div>

      <div className="space-y-1 text-sm text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 opacity-60" />
          {location.city}
        </p>
        <p className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 opacity-60" />
          {location.phone}
        </p>
      </div>

      <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
        Open dashboard
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
