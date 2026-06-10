interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
}

export function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <div className="rounded-card border border-line bg-surface p-5 flex flex-col gap-2">
      <span className="text-sm font-medium text-ink-muted">{label}</span>
      <span className="text-3xl font-semibold tracking-tight text-ink tabular-nums">
        {value}
      </span>
      {hint && <span className="text-xs text-ink-muted/80">{hint}</span>}
    </div>
  );
}
