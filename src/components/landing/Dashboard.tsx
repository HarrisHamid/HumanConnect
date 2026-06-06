import { Phone, Calendar, Sparkles } from "lucide-react";
import { useLiveData } from "../../hooks/useLiveData";
import { Reveal } from "@/components/ui/reveal";

type Status = "Booked" | "Transferred" | "Missed";
type AppointmentType = "New Patient" | "Follow-Up" | "Urgent" | "General";

const statusStyles: Record<Status, string> = {
  Booked: "bg-success/10 text-success border-success/25",
  Transferred: "bg-warning/10 text-warning border-warning/25",
  Missed: "bg-destructive/10 text-destructive border-destructive/25",
};

const typeStyles: Record<AppointmentType, string> = {
  "Follow-Up": "bg-primary/8 text-primary border-primary/20",
  "New Patient": "bg-accent/10 text-accent border-accent/20",
  "Urgent": "bg-destructive/8 text-destructive border-destructive/20",
  "General": "bg-secondary text-muted-foreground border-border",
};

const avatarColors = [
  "from-primary to-accent",
  "from-accent to-primary-glow",
  "from-primary-glow to-primary",
  "from-sky-400 to-blue-500",
];

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function formatTime(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return isToday
    ? `Today, ${time}`
    : date.toLocaleDateString([], { month: "short", day: "numeric" }) + ` · ${time}`;
}

function formatDatetime(iso: string | null) {
  if (!iso) return "TBD";
  const date = new Date(iso);
  return (
    date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) +
    " · " +
    date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function Dashboard() {
  const { calls, appointments, loading } = useLiveData();

  return (
    <section id="dashboard" className="py-32 relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary">
              Live demo
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
              Clinic Dashboard
            </h2>
            <p className="mt-2 text-muted-foreground font-light">
              Real-time calls and appointments — powered by AI.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-success/25 bg-success/8 text-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-success animate-[pulse-ring_1.8s_ease-out_infinite]" />
              <span className="relative rounded-full size-2.5 bg-success" />
            </span>
            <span className="text-success font-medium">Live Connected</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Call log */}
          <Reveal delay={100}>
            <Panel icon={Phone} title="Call Log" subtitle="Last 24 hours">
              {loading ? (
                <LoadingRows />
              ) : calls.length === 0 ? (
                <EmptyState message="No calls yet — waiting for your first AI call" />
              ) : (
                <div className="divide-y divide-border">
                  {calls.map((c) => (
                    <div
                      key={c.id}
                      className="p-5 hover:bg-secondary/50 transition-colors duration-150"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">
                              {c.patient_name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              · {formatDuration(c.duration_seconds)}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {formatTime(c.created_at)}
                          </div>
                        </div>
                        <span
                          className={`shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full border ${statusStyles[c.status]}`}
                        >
                          {c.status}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground flex gap-2 items-start">
                        <Sparkles className="size-3.5 mt-0.5 text-primary shrink-0" />
                        {c.ai_summary}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </Reveal>

          {/* Appointments */}
          <Reveal delay={200}>
            <Panel icon={Calendar} title="Appointments" subtitle="Upcoming">
              {loading ? (
                <LoadingRows />
              ) : appointments.length === 0 ? (
                <EmptyState message="No appointments yet" />
              ) : (
                <div className="p-4 grid gap-3">
                  {appointments.map((a, i) => (
                    <div
                      key={a.id}
                      className="p-4 rounded-xl border border-border bg-white hover:border-primary/20 hover:shadow-[0_2px_16px_-4px_oklch(0.52_0.22_265/12%)] transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-10 rounded-full bg-gradient-to-br ${
                            avatarColors[i % avatarColors.length]
                          } text-white grid place-items-center text-sm font-semibold shadow-sm`}
                        >
                          {initials(a.patient_name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-foreground truncate">
                              {a.patient_name}
                            </span>
                            <span
                              className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${typeStyles[a.type]}`}
                            >
                              {a.type}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {formatDatetime(a.datetime)}
                            {a.doctor ? ` · ${a.doctor}` : ""}
                          </div>
                        </div>
                      </div>
                      {a.booked_via_ai === "true" && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-primary/60">
                          <Sparkles className="size-3 text-primary" />
                          Booked via AI
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LoadingRows() {
  return (
    <div className="divide-y divide-border">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-5 space-y-2.5">
          <div className="h-4 rounded-lg w-1/3 animate-shimmer" />
          <div className="h-3 rounded-lg w-2/3 animate-shimmer" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="p-12 text-center">
      <div className="size-12 rounded-xl bg-secondary border border-border grid place-items-center mx-auto mb-3">
        <Sparkles className="size-5 text-muted-foreground/50" />
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function Panel({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border border-border bg-white overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-secondary/30">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-lg bg-primary/8 border border-primary/15 grid place-items-center text-primary">
            <Icon className="size-4" />
          </span>
          <div>
            <h3 className="font-semibold leading-none text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
        </div>
        <button className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
          View all
        </button>
      </div>
      {children}
    </div>
  );
}
