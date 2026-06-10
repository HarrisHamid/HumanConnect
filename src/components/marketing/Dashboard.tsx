import { Phone, Sparkles, Clock, TrendingUp, Activity, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

// Marketing teaser only. The real, per-industry dashboards live at
// /:vertical/:locationSlug (config-driven, Supabase-backed). This section
// is an illustrative, vertical-agnostic preview that funnels into the
// industry picker — so it uses static demo rows, not live data.

type Outcome = "Booked" | "Routed" | "Missed";

interface DemoRow {
  id: string;
  caller: string;
  is_new: boolean;
  ai_notes: string;
  outcome: Outcome;
  call_duration: number;
  created_at: string;
}

const outcomeStyles: Record<Outcome, string> = {
  Booked: "bg-success/10 text-success border-success/25",
  Routed: "bg-warning/10 text-warning border-warning/25",
  Missed: "bg-destructive/10 text-destructive border-destructive/25",
};

const avatarColors = [
  "from-primary to-accent",
  "from-accent to-primary-glow",
  "from-sky-400 to-blue-600",
  "from-violet-500 to-purple-600",
  "from-teal-400 to-cyan-600",
  "from-rose-400 to-pink-500",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${pad(s)}s`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

const DEMO_ROWS: DemoRow[] = [
  {
    id: "d1",
    caller: "Margaret Johnson",
    is_new: false,
    ai_notes: "Booked a follow-up for Thursday. Confirmed preferred time and verified details.",
    outcome: "Booked",
    call_duration: 184,
    created_at: "2026-06-09T10:30:00",
  },
  {
    id: "d2",
    caller: "James Rivera",
    is_new: true,
    ai_notes: "New customer. Collected details and scheduled a first appointment for Monday.",
    outcome: "Booked",
    call_duration: 247,
    created_at: "2026-06-09T09:58:00",
  },
  {
    id: "d3",
    caller: "Patricia Osei",
    is_new: false,
    ai_notes: "Time-sensitive request flagged. Routed to the on-call team with full context.",
    outcome: "Routed",
    call_duration: 95,
    created_at: "2026-06-09T09:41:00",
  },
  {
    id: "d4",
    caller: "David Kim",
    is_new: false,
    ai_notes: "Quoted pricing and sent the estimate by text. Customer will confirm tomorrow.",
    outcome: "Booked",
    call_duration: 203,
    created_at: "2026-06-09T09:12:00",
  },
  {
    id: "d5",
    caller: "Lena Marchetti",
    is_new: true,
    ai_notes: "Asked about availability and services. Added to follow-up list for a callback.",
    outcome: "Routed",
    call_duration: 138,
    created_at: "2026-06-09T08:40:00",
  },
  {
    id: "d6",
    caller: "Thomas Adeyemi",
    is_new: false,
    ai_notes: "Disconnected while on hold elsewhere. Callback flagged so nothing slips.",
    outcome: "Missed",
    call_duration: 42,
    created_at: "2026-06-09T08:05:00",
  },
];

const STATS = {
  total: DEMO_ROWS.length,
  bookedPct: Math.round(
    (DEMO_ROWS.filter((r) => r.outcome === "Booked").length / DEMO_ROWS.length) * 100,
  ),
  avgDuration: Math.round(
    DEMO_ROWS.reduce((s, r) => s + r.call_duration, 0) / DEMO_ROWS.length,
  ),
  newCustomers: DEMO_ROWS.filter((r) => r.is_new).length,
};

export function Dashboard() {
  return (
    <section id="dashboard" className="py-32 relative">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary">
              The dashboard
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
              Every call, accounted for.
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground font-light">
              The moment a call ends it's logged, categorized, and on your dashboard —
              tuned to how your industry actually works.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-success/25 bg-success/8 text-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-success animate-[pulse-ring_1.8s_ease-out_infinite]" />
              <span className="relative rounded-full size-2.5 bg-success" />
            </span>
            <span className="text-success font-medium">Live preview</span>
          </div>
        </Reveal>

        {/* Stats strip */}
        <Reveal delay={50}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Today's Calls", value: String(STATS.total), icon: Phone },
              { label: "Booked Rate", value: `${STATS.bookedPct}%`, icon: TrendingUp },
              { label: "Avg Duration", value: formatDuration(STATS.avgDuration), icon: Clock },
              { label: "New Customers", value: String(STATS.newCustomers), icon: Activity },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-white px-5 py-4"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">{label}</span>
                  <span className="size-7 rounded-lg bg-primary/8 border border-primary/15 grid place-items-center">
                    <Icon className="size-3.5 text-primary" />
                  </span>
                </div>
                <div className="text-2xl font-semibold text-foreground tabular-nums">{value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Table panel */}
        <Reveal delay={100}>
          <div
            className="rounded-2xl border border-border bg-white overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Panel header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-secondary/30">
              <div className="flex items-center gap-3">
                <span className="size-8 rounded-lg bg-primary/8 border border-primary/15 grid place-items-center text-primary">
                  <Phone className="size-4" />
                </span>
                <div>
                  <h3 className="font-semibold leading-none text-foreground">Recent call log</h3>
                  <p className="text-xs text-muted-foreground mt-1">Last few hours · AI-processed</p>
                </div>
              </div>
              <span className="text-[11px] text-muted-foreground/60 border border-border rounded-md px-2.5 py-1 bg-secondary/50">
                Sample data
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/20">
                    {["Caller", "AI Notes", "Outcome", "Duration", "Time"].map((col, i) => (
                      <th
                        key={col}
                        className={`py-3 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/70 ${
                          i === 0 ? "text-left px-6" : i >= 3 ? "text-right px-6" : "text-left px-4"
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {DEMO_ROWS.map((row, i) => (
                    <tr key={row.id} className="hover:bg-secondary/30 transition-colors duration-100">
                      {/* Caller */}
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`size-7 rounded-full bg-gradient-to-br ${
                              avatarColors[i % avatarColors.length]
                            } grid place-items-center text-white text-[10px] font-bold shrink-0`}
                          >
                            {initials(row.caller)}
                          </div>
                          <span className="font-medium text-foreground text-[13px]">{row.caller}</span>
                          {row.is_new && (
                            <span className="inline-flex text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                              New
                            </span>
                          )}
                        </div>
                      </td>

                      {/* AI notes */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-start gap-1.5 max-w-[340px]">
                          <Sparkles className="size-3 text-primary/70 mt-0.5 shrink-0" />
                          <span className="text-[11.5px] text-muted-foreground line-clamp-2 leading-relaxed">
                            {row.ai_notes}
                          </span>
                        </div>
                      </td>

                      {/* Outcome */}
                      <td className="px-4 py-3.5 text-right">
                        <span
                          className={`inline-flex text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                            outcomeStyles[row.outcome]
                          }`}
                        >
                          {row.outcome}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="px-4 py-3.5 text-right">
                        <span className="text-[11.5px] text-muted-foreground tabular-nums">
                          {formatDuration(row.call_duration)}
                        </span>
                      </td>

                      {/* Time */}
                      <td className="px-6 py-3.5 text-right">
                        <span className="text-[11.5px] text-muted-foreground/80 tabular-nums">
                          {formatTime(row.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer CTA into the picker */}
            <div className="px-6 py-4 border-t border-border/50 bg-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                <Sparkles className="size-3 text-primary/50" />
                <span>This is a preview — the real dashboards run on live call data.</span>
              </div>
              <a
                href="#industries"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                Open a live dashboard for your industry
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
