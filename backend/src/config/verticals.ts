// Backend copy of the per-vertical outcome vocabulary.
// KEEP IN SYNC with src/config/verticals.ts (frontend) and the outcome
// comments in supabase/migrations/01_schema.sql.

export const VERTICAL_IDS = ["dental", "mechanic"] as const;
export type VerticalId = (typeof VERTICAL_IDS)[number];

export function isVerticalId(value: string | undefined): value is VerticalId {
  return VERTICAL_IDS.includes(value as VerticalId);
}

/** Valid `calls.outcome` values per vertical. */
export const OUTCOMES: Record<VerticalId, readonly string[]> = {
  dental: ["booked", "rescheduled", "inquiry", "no_booking"],
  mechanic: ["estimate_sent", "checked_in", "inquiry", "no_action"],
};

/** Used when extraction fails or returns an outcome outside the vocabulary. */
export const FALLBACK_OUTCOME: Record<VerticalId, string> = {
  dental: "no_booking",
  mechanic: "no_action",
};

/** One-line business context so the extraction prompt speaks the vertical's language. */
export const VERTICAL_CONTEXT: Record<VerticalId, string> = {
  dental:
    "a dental practice front desk: patients call to book cleanings/exams/procedures, reschedule, or ask about insurance and hours",
  mechanic:
    "an auto repair shop front desk: customers call for service estimates, to schedule drop-offs/check-ins, or ask about repairs and pricing",
};

/** What each outcome means, for the extraction prompt. */
export const OUTCOME_DESCRIPTIONS: Record<VerticalId, Record<string, string>> = {
  dental: {
    booked: "an appointment was scheduled on this call",
    rescheduled: "an existing appointment was moved or cancelled-and-rebooked",
    inquiry: "the caller asked questions (insurance, hours, pricing) but no appointment changed",
    no_booking: "nothing actionable happened (wrong number, hang-up, caller will call back)",
  },
  mechanic: {
    estimate_sent: "a service estimate/quote was given or sent to the customer",
    checked_in: "a vehicle drop-off or check-in was scheduled or completed",
    inquiry: "the caller asked questions but no estimate or check-in happened",
    no_action: "nothing actionable happened (wrong number, hang-up, caller will call back)",
  },
};
