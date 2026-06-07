import { Phone, Sparkles, Clock, TrendingUp, Activity } from "lucide-react";
import { useLiveData } from "../../hooks/useLiveData";
import type { Call, Appointment } from "../../hooks/useLiveData";
import { Reveal } from "@/components/ui/reveal";

type PatientStatus = "New Patient" | "Returning" | "Walk-in";
type VisitType = "Check-up" | "Urgent" | "Follow-Up" | "Specialist" | "General";
type Outcome = "Booked" | "Transferred" | "Missed";

interface UnifiedRow {
  id: string;
  patient_name: string;
  patient_status: PatientStatus;
  visit_type: VisitType;
  chief_complaint: string;
  ai_notes: string;
  doctor: string | null;
  datetime: string | null;
  outcome: Outcome;
  call_duration: number;
  created_at: string;
}

const outcomeStyles: Record<Outcome, string> = {
  Booked:      "bg-success/10 text-success border-success/25",
  Transferred: "bg-warning/10 text-warning border-warning/25",
  Missed:      "bg-destructive/10 text-destructive border-destructive/25",
};

const visitTypeStyles: Record<VisitType, string> = {
  "Check-up":   "bg-primary/8 text-primary border-primary/20",
  "Follow-Up":  "bg-sky-50 text-sky-700 border-sky-200",
  "Urgent":     "bg-red-50 text-red-700 border-red-200",
  "Specialist": "bg-violet-50 text-violet-700 border-violet-200",
  "General":    "bg-secondary text-muted-foreground border-border",
};

const patientStatusStyles: Record<PatientStatus, string> = {
  "New Patient": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Returning":   "bg-blue-50 text-blue-600 border-blue-200",
  "Walk-in":     "bg-amber-50 text-amber-700 border-amber-200",
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

function formatDatetime(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  const now = new Date();
  const time = date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return date.toDateString() === now.toDateString()
    ? `Today, ${time}`
    : date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) + ` · ${time}`;
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("");
}

const DEMO_ROWS: UnifiedRow[] = [
  {
    id: "d1",
    patient_name: "Margaret Johnson",
    patient_status: "Returning",
    visit_type: "Follow-Up",
    chief_complaint: "Hypertension management",
    ai_notes: "Medications effective. Requested Dr. Patel. Insurance verified.",
    doctor: "Dr. Patel",
    datetime: "2026-06-09T10:30:00",
    outcome: "Booked",
    call_duration: 184,
    created_at: "2026-06-06T11:48:00",
  },
  {
    id: "d2",
    patient_name: "James Rivera",
    patient_status: "New Patient",
    visit_type: "Check-up",
    chief_complaint: "Annual wellness visit",
    ai_notes: "Referred by Dr. Chen. Demographics collected, new patient intake scheduled.",
    doctor: "Dr. Nguyen",
    datetime: "2026-06-10T09:00:00",
    outcome: "Booked",
    call_duration: 247,
    created_at: "2026-06-06T11:22:00",
  },
  {
    id: "d3",
    patient_name: "Patricia Osei",
    patient_status: "Returning",
    visit_type: "Urgent",
    chief_complaint: "Chest discomfort, shortness of breath",
    ai_notes: "Urgent triage flagged. Transferred to on-call nurse. ER advised if symptoms worsen.",
    doctor: "On-call",
    datetime: null,
    outcome: "Transferred",
    call_duration: 95,
    created_at: "2026-06-06T09:48:00",
  },
  {
    id: "d4",
    patient_name: "David Kim",
    patient_status: "Returning",
    visit_type: "Follow-Up",
    chief_complaint: "Post-surgical recovery check",
    ai_notes: "3-week post-op follow-up. Wound healing noted. Surgeon clearance visit booked.",
    doctor: "Dr. Okonkwo",
    datetime: "2026-06-11T14:15:00",
    outcome: "Booked",
    call_duration: 203,
    created_at: "2026-06-06T09:30:00",
  },
  {
    id: "d5",
    patient_name: "Lena Marchetti",
    patient_status: "New Patient",
    visit_type: "Specialist",
    chief_complaint: "Dermatology referral — skin lesion eval",
    ai_notes: "Referred by PCP. Insurance pre-auth required, flagged for billing staff.",
    doctor: "Dr. Shah",
    datetime: "2026-06-13T11:00:00",
    outcome: "Booked",
    call_duration: 318,
    created_at: "2026-06-06T08:00:00",
  },
  {
    id: "d6",
    patient_name: "Thomas Adeyemi",
    patient_status: "Walk-in",
    visit_type: "General",
    chief_complaint: "Prescription refill request",
    ai_notes: "Disconnected after hold. Callback flagged for staff follow-up.",
    doctor: null,
    datetime: null,
    outcome: "Missed",
    call_duration: 42,
    created_at: "2026-06-06T06:30:00",
  },
];

function mergeToRows(calls: Call[], appointments: Appointment[]): UnifiedRow[] {
  const apptMap = new Map(appointments.map(a => [a.patient_name.toLowerCase().trim(), a]));

  return calls.map(call => {
    const appt = apptMap.get(call.patient_name.toLowerCase().trim());
    let visit_type: VisitType = "General";
    let patient_status: PatientStatus = "Returning";

    if (appt) {
      if (appt.type === "Urgent") visit_type = "Urgent";
      else if (appt.type === "Follow-Up") visit_type = "Follow-Up";
      else if (appt.type === "New Patient") {
        visit_type = "Check-up";
        patient_status = "New Patient";
      }
    }

    return {
      id: `call-${call.id}`,
      patient_name: call.patient_name,
      patient_status,
      visit_type,
      chief_complaint: "—",
      ai_notes: call.ai_summary,
      doctor: appt?.doctor ?? null,
      datetime: appt?.datetime ?? null,
      outcome: call.status,
      call_duration: call.duration_seconds,
      created_at: call.created_at,
    };
  });
}

function computeStats(rows: UnifiedRow[]) {
  const total = rows.length;
  const booked = rows.filter(r => r.outcome === "Booked").length;
  const bookedPct = total > 0 ? Math.round((booked / total) * 100) : 0;
  const avgDuration =
    total > 0 ? Math.round(rows.reduce((sum, r) => sum + r.call_duration, 0) / total) : 0;
  const newPatients = rows.filter(r => r.patient_status === "New Patient").length;
  return { total, booked, bookedPct, avgDuration, newPatients };
}

export function Dashboard() {
  const { calls, appointments, loading } = useLiveData();
  const hasRealData = calls.length > 0;
  const rows: UnifiedRow[] = hasRealData ? mergeToRows(calls, appointments) : DEMO_ROWS;
  const stats = computeStats(rows);

  return (
    <section id="dashboard" className="py-32 relative">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
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

        {/* Stats strip */}
        <Reveal delay={50}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Today's Calls",  value: String(stats.total),              icon: Phone       },
              { label: "Booked Rate",    value: `${stats.bookedPct}%`,            icon: TrendingUp  },
              { label: "Avg Duration",   value: formatDuration(stats.avgDuration), icon: Clock       },
              { label: "New Patients",   value: String(stats.newPatients),         icon: Activity    },
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
                  <h3 className="font-semibold leading-none text-foreground">
                    Call &amp; Appointment Log
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last 24 hours · AI-processed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!hasRealData && (
                  <span className="text-[11px] text-muted-foreground/60 border border-border rounded-md px-2.5 py-1 bg-secondary/50">
                    Demo data
                  </span>
                )}
                <button className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200">
                  View all
                </button>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <TableLoadingRows />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] text-sm">
                  <thead>
                    <tr className="border-b border-border/60 bg-secondary/20">
                      {[
                        "Patient",
                        "Status",
                        "Visit Type",
                        "Reason for Visit",
                        "AI Notes",
                        "Doctor",
                        "Appointment",
                        "Outcome",
                        "Duration",
                      ].map((col, i) => (
                        <th
                          key={col}
                          className={`py-3 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/70 ${
                            i === 0 ? "text-left px-6" : i === 8 ? "text-right px-6" : "text-left px-4"
                          }`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {rows.map((row, i) => (
                      <TableRow key={row.id} row={row} colorIndex={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border/50 bg-secondary/20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                <span>Showing {rows.length} entries</span>
                <span>·</span>
                <Sparkles className="size-3 text-primary/50" />
                <span>AI-processed</span>
              </div>
              <span className="text-[11px] text-muted-foreground/50 font-medium tracking-wide">
                HIPAA-compliant display
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TableRow({ row, colorIndex }: { row: UnifiedRow; colorIndex: number }) {
  return (
    <tr className="hover:bg-secondary/30 transition-colors duration-100">
      {/* Patient */}
      <td className="px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div
            className={`size-7 rounded-full bg-gradient-to-br ${
              avatarColors[colorIndex % avatarColors.length]
            } grid place-items-center text-white text-[10px] font-bold shrink-0`}
          >
            {initials(row.patient_name)}
          </div>
          <span className="font-medium text-foreground text-[13px]">{row.patient_name}</span>
        </div>
      </td>

      {/* Patient status */}
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
            patientStatusStyles[row.patient_status]
          }`}
        >
          {row.patient_status}
        </span>
      </td>

      {/* Visit type */}
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
            visitTypeStyles[row.visit_type]
          }`}
        >
          {row.visit_type === "Urgent" && <span aria-hidden>⚡</span>}
          {row.visit_type}
        </span>
      </td>

      {/* Reason for visit (HIPAA-safe chief complaint) */}
      <td className="px-4 py-3.5 max-w-[150px]">
        <span className="text-[12.5px] text-foreground/70">{row.chief_complaint}</span>
      </td>

      {/* AI notes */}
      <td className="px-4 py-3.5">
        <div className="flex items-start gap-1.5 max-w-[200px]">
          <Sparkles className="size-3 text-primary/70 mt-0.5 shrink-0" />
          <span className="text-[11.5px] text-muted-foreground line-clamp-2 leading-relaxed">
            {row.ai_notes}
          </span>
        </div>
      </td>

      {/* Doctor */}
      <td className="px-4 py-3.5">
        <span className="text-[12.5px] text-foreground/75">{row.doctor ?? "—"}</span>
      </td>

      {/* Appointment datetime */}
      <td className="px-4 py-3.5">
        <span className="text-[11.5px] text-foreground/65">{formatDatetime(row.datetime)}</span>
      </td>

      {/* Outcome */}
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
            outcomeStyles[row.outcome]
          }`}
        >
          {row.outcome}
        </span>
      </td>

      {/* Duration */}
      <td className="px-6 py-3.5 text-right">
        <span className="text-[11.5px] text-muted-foreground tabular-nums">
          {formatDuration(row.call_duration)}
        </span>
      </td>
    </tr>
  );
}

function TableLoadingRows() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px]">
        <tbody className="divide-y divide-border/50">
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-full animate-shimmer shrink-0" />
                  <div className="h-3.5 rounded-lg w-28 animate-shimmer" />
                </div>
              </td>
              <td className="px-4 py-4"><div className="h-5 rounded-full w-20 animate-shimmer" /></td>
              <td className="px-4 py-4"><div className="h-5 rounded-full w-16 animate-shimmer" /></td>
              <td className="px-4 py-4"><div className="h-3.5 rounded-lg w-28 animate-shimmer" /></td>
              <td className="px-4 py-4"><div className="h-3.5 rounded-lg w-36 animate-shimmer" /></td>
              <td className="px-4 py-4"><div className="h-3.5 rounded-lg w-20 animate-shimmer" /></td>
              <td className="px-4 py-4"><div className="h-3.5 rounded-lg w-24 animate-shimmer" /></td>
              <td className="px-4 py-4"><div className="h-5 rounded-full w-16 animate-shimmer" /></td>
              <td className="px-6 py-4"><div className="h-3.5 rounded-lg w-12 ml-auto animate-shimmer" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
