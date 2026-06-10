import { KpiCard } from "./KpiCard";
import { formatKpiValue } from "@/config/verticals";
import type { ComputedKpi } from "@/hooks/useKpis";

interface KpiGridProps {
  kpis: ComputedKpi[];
}

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard
          key={kpi.id}
          label={kpi.label}
          value={formatKpiValue(kpi.value, kpi.format)}
          hint={kpi.hint}
        />
      ))}
    </div>
  );
}
