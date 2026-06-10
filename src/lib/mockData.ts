import type { Call, Sentiment } from "@/types/database";
import type { LocationDef, VerticalConfig } from "@/config/verticals";

// ---------------------------------------------------------------
// Last-resort fallback data. Used only when Supabase is unavailable
// (env vars missing or initial fetch fails). Shapes + outcome
// vocabulary mirror 02_seed.sql so the dashboard looks identical to
// the real thing, just smaller (~44 calls per location).
// Fully config-driven: outcomes come from the vertical config, so a
// new vertical needs no changes here.
// ---------------------------------------------------------------

const FIRST_NAMES = [
  "James", "Maria", "David", "Sarah", "Michael", "Jennifer", "Robert", "Linda",
  "Kevin", "Emily", "Brian", "Jessica", "Daniel", "Ashley", "Carlos", "Priya",
  "Tom", "Rachel", "Sean", "Nicole", "Luis", "Megan", "Olivia", "Greg",
];
const LAST_NAMES = [
  "Smith", "Johnson", "Garcia", "Chen", "Patel", "Murphy", "Sullivan", "Nguyen",
  "Brown", "Davis", "Rodriguez", "Kim", "Walsh", "Santos", "Lee", "Russo",
  "Kelly", "Tran", "Costa", "Doyle", "Burke",
];

// Summary lines keyed by outcome — covers both verticals' vocabularies.
const SUMMARIES: Record<string, string[]> = {
  booked: [
    "Booked a cleaning for next week",
    "Scheduled a new patient exam",
    "Booked a filling appointment",
    "Booked a 6-month checkup",
  ],
  rescheduled: [
    "Moved Thursday appointment to Friday",
    "Rescheduled cleaning to next month",
    "Pushed appointment back one week",
  ],
  estimate_sent: [
    "Sent estimate for brake pad replacement",
    "Quoted oil change and tire rotation",
    "Estimate for check engine diagnostic",
    "Sent estimate for AC repair",
  ],
  checked_in: [
    "Checked in vehicle for inspection",
    "Scheduled drop-off for tomorrow morning",
    "Checked in for scheduled oil change",
  ],
  inquiry: [
    "Asked about insurance coverage",
    "Asked about hours and availability",
    "Question about pricing",
    "Asked whether they accept new customers",
  ],
  no_booking: [
    "Caller will call back later",
    "Asked for pricing, did not book",
    "Wrong number",
  ],
  no_action: [
    "Caller comparing prices, will call back",
    "Wrong number",
    "Asked for a service the shop does not offer",
  ],
};

const POSITIVE_OUTCOMES = new Set([
  "booked", "rescheduled", "estimate_sent", "checked_in",
]);

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function weightedOutcome(outcomes: string[]): string {
  // Mirrors the seed's rough shape: primary heaviest, tail lightest.
  const weights = [0.4, 0.25, 0.22, 0.13];
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < outcomes.length; i++) {
    acc += weights[i] ?? 1 / outcomes.length;
    if (r < acc) return outcomes[i];
  }
  return outcomes[outcomes.length - 1];
}

function durationFor(outcome: string): number {
  switch (outcome) {
    case "booked": return 120 + Math.floor(Math.random() * 300);
    case "rescheduled": return 90 + Math.floor(Math.random() * 180);
    case "estimate_sent": return 150 + Math.floor(Math.random() * 330);
    case "checked_in": return 90 + Math.floor(Math.random() * 210);
    case "inquiry": return 60 + Math.floor(Math.random() * 180);
    default: return 30 + Math.floor(Math.random() * 120);
  }
}

function sentimentFor(outcome: string): Sentiment {
  const r = Math.random();
  if (POSITIVE_OUTCOMES.has(outcome)) {
    return r < 0.7 ? "positive" : r < 0.95 ? "neutral" : "negative";
  }
  if (outcome === "inquiry") {
    return r < 0.4 ? "positive" : r < 0.9 ? "neutral" : "negative";
  }
  return r < 0.1 ? "positive" : r < 0.65 ? "neutral" : "negative";
}

function recentTimestamp(index: number): string {
  // First few calls within the last few hours; the rest spread over 30 days
  // during business hours (8am–6pm).
  if (index < 6) {
    return new Date(Date.now() - Math.floor(Math.random() * 240) * 60_000).toISOString();
  }
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 30));
  d.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60), 0, 0);
  return d.toISOString();
}

/**
 * Generate ~44 plausible calls for a location, scoped to the vertical's
 * outcome vocabulary. Deterministic enough to look real, random per call.
 */
export function getMockCalls(vertical: VerticalConfig, location: LocationDef): Call[] {
  const outcomes = Object.keys(vertical.outcomes);
  const count = 44;

  const calls: Call[] = Array.from({ length: count }, (_, i) => {
    const outcome = weightedOutcome(outcomes);
    const summaries = SUMMARIES[outcome] ?? SUMMARIES.inquiry;
    return {
      id: `mock-${location.slug}-${i}`,
      location_id: location.id,
      caller_name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
      caller_phone: `(617) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
      started_at: recentTimestamp(i),
      duration_seconds: durationFor(outcome),
      outcome,
      is_new_customer: Math.random() < 0.4,
      sentiment: sentimentFor(outcome),
      transcript_summary: pick(summaries),
      vapi_call_id: `mock_${location.slug}_${i}`,
      created_at: new Date().toISOString(),
    };
  });

  // newest first, matching fetchCalls' ordering
  return calls.sort((a, b) => b.started_at.localeCompare(a.started_at));
}
