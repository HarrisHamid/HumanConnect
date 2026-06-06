import { Phone, Calendar, Sparkles } from "lucide-react";

type Status = "Booked" | "Transferred" | "Missed";

const calls: { name: string; time: string; duration: string; status: Status; summary: string }[] = [
  { name: "Sarah M.", time: "Today, 2:14 PM", duration: "1m 42s", status: "Booked", summary: "Requested evening appointment for eye exam" },
  { name: "James T.", time: "Today, 1:48 PM", duration: "2m 11s", status: "Booked", summary: "Follow-up for blood pressure check with Dr. Chen" },
  { name: "Linda R.", time: "Today, 12:30 PM", duration: "0m 56s", status: "Transferred", summary: "Insurance question — routed to billing team" },
  { name: "Mark D.", time: "Today, 11:02 AM", duration: "0m 12s", status: "Missed", summary: "Caller hung up before connection established" },
];

const appointments: { name: string; initials: string; when: string; doctor: string; type: "Follow-Up" | "New Patient" | "Urgent" }[] = [
  { name: "Sarah Mitchell", initials: "SM", when: "Mon Jun 9 · 4:30 PM", doctor: "Dr. Patel", type: "Follow-Up" },
  { name: "James Torres", initials: "JT", when: "Mon Jun 9 · 5:15 PM", doctor: "Dr. Chen", type: "New Patient" },
  { name: "Aisha Khan", initials: "AK", when: "Tue Jun 10 · 9:00 AM", doctor: "Dr. Patel", type: "Urgent" },
  { name: "Robert Liu", initials: "RL", when: "Tue Jun 10 · 11:30 AM", doctor: "Dr. Singh", type: "Follow-Up" },
];

const statusStyles: Record<Status, string> = {
  Booked: "bg-success/15 text-success border-success/30",
  Transferred: "bg-warning/15 text-warning border-warning/30",
  Missed: "bg-destructive/15 text-destructive border-destructive/30",
};

const typeStyles = {
  "Follow-Up": "bg-primary/15 text-primary border-primary/30",
  "New Patient": "bg-accent/15 text-accent border-accent/30",
  "Urgent": "bg-destructive/15 text-destructive border-destructive/30",
} as const;

export function Dashboard() {
  return (
    <section id="dashboard" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-primary">Live demo</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
              Live Clinic Dashboard
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-success/30 bg-success/10 text-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-success animate-[pulse-ring_1.8s_ease-out_infinite]" />
              <span className="relative rounded-full size-2.5 bg-success" />
            </span>
            <span className="text-success font-medium">Connected</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Call log */}
          <Panel icon={Phone} title="Call Log" subtitle="Last 24 hours">
            <div className="divide-y divide-border">
              {calls.map((c) => (
                <div key={c.name + c.time} className="p-5 hover:bg-secondary/40 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{c.name}</span>
                        <span className="text-xs text-muted-foreground">· {c.duration}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.time}</div>
                    </div>
                    <span className={`shrink-0 text-[11px] font-medium px-2 py-1 rounded-full border ${statusStyles[c.status]}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground flex gap-2 items-start">
                    <Sparkles className="size-3.5 mt-0.5 text-primary shrink-0" />
                    {c.summary}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          {/* Appointments */}
          <Panel icon={Calendar} title="Appointments" subtitle="Upcoming">
            <div className="p-4 grid gap-3">
              {appointments.map((a) => (
                <div
                  key={a.name + a.when}
                  className="p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground grid place-items-center text-sm font-semibold">
                      {a.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium truncate">{a.name}</span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${typeStyles[a.type]}`}>
                          {a.type}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {a.when} · {a.doctor}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="size-3 text-primary" />
                    Booked via AI
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </section>
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
    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden shadow-[var(--shadow-card)]">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="size-8 rounded-lg bg-secondary grid place-items-center text-primary">
            <Icon className="size-4" />
          </span>
          <div>
            <h3 className="font-semibold leading-none">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">View all</button>
      </div>
      {children}
    </div>
  );
}
