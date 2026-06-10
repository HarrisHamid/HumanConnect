import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Phone } from "lucide-react";
import { getVertical, getLocation } from "@/config/verticals";
import { useCalls } from "@/hooks/useCalls";
import { useKpis } from "@/hooks/useKpis";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { CallsTable } from "@/components/dashboard/CallsTable";
import { CallVolumeChart } from "@/components/dashboard/CallVolumeChart";
import { LiveIndicator } from "@/components/dashboard/LiveIndicator";

export const Route = createFileRoute("/$vertical/$locationSlug")({
  // Validate against config, not the DB.
  //   unknown vertical → home; unknown location → that vertical's picker.
  beforeLoad: ({ params }) => {
    const vertical = getVertical(params.vertical);
    if (!vertical) throw redirect({ to: "/" });
    if (!getLocation(vertical, params.locationSlug)) {
      throw redirect({ to: "/$vertical", params: { vertical: vertical.id } });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  const { vertical: verticalId, locationSlug } = Route.useParams();
  const vertical = getVertical(verticalId)!;
  const location = getLocation(vertical, locationSlug)!;

  const { calls, status } = useCalls(vertical, location);
  const kpis = useKpis(vertical, calls);
  const loading = status === "loading";

  return (
    <main data-vertical={vertical.id} className="min-h-screen bg-base px-6 py-10 text-ink">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              to="/$vertical"
              params={{ vertical: vertical.id }}
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              {vertical.displayName}
            </Link>
            <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
              {location.businessName} · {location.name}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 opacity-60" />
                {location.city}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 opacity-60" />
                {location.phone}
              </span>
            </div>
          </div>
          <LiveIndicator status={status} />
        </header>

        {/* KPIs */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: vertical.kpis.length }).map((_, i) => (
              <div key={i} className="h-28 rounded-card border border-line bg-surface animate-pulse" />
            ))}
          </div>
        ) : (
          <KpiGrid kpis={kpis} />
        )}

        {/* Chart */}
        {loading ? (
          <div className="h-[244px] rounded-card border border-line bg-surface animate-pulse" />
        ) : (
          <CallVolumeChart calls={calls} />
        )}

        {/* Recent calls */}
        {loading ? (
          <div className="h-80 rounded-card border border-line bg-surface animate-pulse" />
        ) : (
          <CallsTable calls={calls} vertical={vertical} />
        )}
      </div>
    </main>
  );
}
