import { getOutcome, type VerticalConfig, type OutcomeDef } from "@/config/verticals";
import type { Call } from "@/types/database";

function formatDuration(seconds: number | null): string {
  if (seconds == null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, "0")}s` : `${s}s`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const TONE_BADGE: Record<OutcomeDef["tone"], string> = {
  success: "bg-emerald-400/12 text-emerald-300 ring-emerald-400/20",
  info: "bg-sky-400/12 text-sky-300 ring-sky-400/20",
  neutral: "bg-ink-muted/15 text-ink ring-line",
  muted: "bg-ink-muted/8 text-ink-muted ring-line/60",
};

interface CallsTableProps {
  calls: Call[];
  vertical: VerticalConfig;
}

export function CallsTable({ calls, vertical }: CallsTableProps) {
  const recent = calls.slice(0, 15);

  return (
    <div className="rounded-card border border-line bg-surface overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <h3 className="text-sm font-semibold text-ink">Recent calls</h3>
        <span className="text-xs text-ink-muted">{calls.length.toLocaleString()} in last 30 days</span>
      </div>

      {recent.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-ink-muted">
          No calls yet. New calls will appear here the moment they come in.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-ink-muted">
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Caller</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Summary</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Duration</th>
                <th className="px-5 py-3 font-medium text-right">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {recent.map((call) => {
                const outcome = getOutcome(vertical, call.outcome);
                return (
                  <tr key={call.id} className="hover:bg-surface-raised transition-colors">
                    <td className="px-5 py-3 whitespace-nowrap text-ink-muted">
                      {formatTime(call.started_at)}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ink">{call.caller_name ?? "Unknown"}</span>
                        {call.is_new_customer && (
                          <span className="rounded-badge bg-v-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-v-accent">
                            New
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 max-w-xs truncate text-ink-muted hidden md:table-cell">
                      {call.transcript_summary ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-ink-muted hidden sm:table-cell tabular-nums">
                      {formatDuration(call.duration_seconds)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span
                        className={`inline-flex rounded-badge px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${TONE_BADGE[outcome.tone]}`}
                      >
                        {outcome.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
