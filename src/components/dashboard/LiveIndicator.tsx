import type { CallsStatus } from "@/hooks/useCalls";

interface LiveIndicatorProps {
  status: CallsStatus;
}

const CONFIG: Record<CallsStatus, { label: string; dot: string; pulse: boolean }> = {
  loading: { label: "Connecting…", dot: "bg-ink-muted", pulse: false },
  live: { label: "Live", dot: "bg-emerald-400", pulse: true },
  polling: { label: "Live · polling", dot: "bg-emerald-400", pulse: false },
  mock: { label: "Demo data", dot: "bg-amber-400", pulse: false },
  error: { label: "Offline", dot: "bg-red-400", pulse: false },
};

export function LiveIndicator({ status }: LiveIndicatorProps) {
  const { label, dot, pulse } = CONFIG[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-badge border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted">
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span className={`absolute inline-flex h-full w-full rounded-full ${dot} opacity-60 animate-ping`} />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {label}
    </span>
  );
}
