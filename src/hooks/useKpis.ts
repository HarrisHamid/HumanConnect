import { useMemo } from "react";
import type { Call } from "@/types/database";
import type { KpiDef, VerticalConfig } from "@/config/verticals";

export interface ComputedKpi extends KpiDef {
  value: number;
}

/**
 * Runs each vertical's KPI `compute` over the scoped calls.
 * No hardcoded aggregation — adding/renaming a KPI is a config change.
 */
export function useKpis(vertical: VerticalConfig, calls: Call[]): ComputedKpi[] {
  return useMemo(
    () => vertical.kpis.map((kpi) => ({ ...kpi, value: kpi.compute(calls) })),
    [vertical, calls],
  );
}
