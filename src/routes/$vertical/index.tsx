import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getVertical } from "@/config/verticals";
import { LocationCard } from "@/components/picker/LocationCard";

export const Route = createFileRoute("/$vertical/")({
  // Validate against config, not the DB. Unknown vertical → home.
  beforeLoad: ({ params }) => {
    if (!getVertical(params.vertical)) {
      throw redirect({ to: "/" });
    }
  },
  component: LocationPicker,
});

function LocationPicker() {
  const { vertical: verticalId } = Route.useParams();
  const vertical = getVertical(verticalId)!;

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All industries
        </Link>

        <div className="mt-8 mb-10" data-vertical={vertical.id}>
          <p className="text-sm font-medium uppercase tracking-wider text-v-accent">
            {vertical.displayName}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground">
            {vertical.tagline}
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{vertical.pickerBlurb}</p>
        </div>

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Pick a location to open its live dashboard
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vertical.locations.map((loc) => (
            <LocationCard key={loc.slug} location={loc} verticalId={vertical.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
