// src/config/verticals.ts
// ---------------------------------------------------------------
// THE single source of truth for everything vertical-specific.
//
// Dashboard components never branch on `if (vertical === 'dental')`.
// They read this config. Adding a third vertical (HVAC, salon, ...)
// means: one entry here + one theme block in themes.css + seed data.
//
// Location ids/slugs match 02_seed.sql exactly — slugs are the URL
// contract, UUIDs are convenience for client-side filtering.
// ---------------------------------------------------------------

import type { Call } from '../types/database';

export const VERTICAL_IDS = ['dental', 'mechanic'] as const;
export type VerticalId = (typeof VERTICAL_IDS)[number];

export function isVerticalId(value: string | undefined): value is VerticalId {
  return VERTICAL_IDS.includes(value as VerticalId);
}

// ---------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------

export type KpiFormat = 'count' | 'duration' | 'percent';

export interface KpiDef {
  id: string;
  label: string;
  format: KpiFormat;
  /** Receives calls already scoped to location + timeframe by useCalls */
  compute: (calls: Call[]) => number;
  /** Small caption under the value, e.g. "vs. all calls" */
  hint?: string;
}

export interface OutcomeDef {
  label: string;
  /** Drives badge styling in CallsTable — maps to CSS classes, not colors */
  tone: 'success' | 'info' | 'neutral' | 'muted';
}

export interface LocationDef {
  /** UUID — matches 02_seed.sql */
  id: string;
  /** URL segment: /:vertical/:locationSlug */
  slug: string;
  businessName: string;
  name: string;
  city: string;
  phone: string;
}

export interface VerticalConfig {
  id: VerticalId;
  displayName: string;
  /** Short noun for inline copy: "your clinic", "your shop" */
  shortNoun: string;
  /** Picker card copy */
  tagline: string;
  pickerBlurb: string;
  /** The outcome that counts as a "win" — used for conversion-rate UI */
  primaryOutcome: string;
  outcomes: Record<string, OutcomeDef>;
  kpis: KpiDef[];
  locations: LocationDef[];
  /** Wire up later: per-vertical Vapi assistant for the live demo call */
  vapiAssistantId?: string;
}

// ---------------------------------------------------------------
// Shared compute helpers
// ---------------------------------------------------------------

const countWhere = (calls: Call[], pred: (c: Call) => boolean): number =>
  calls.reduce((n, c) => (pred(c) ? n + 1 : n), 0);

const avgDurationSeconds = (calls: Call[]): number => {
  const withDuration = calls.filter((c) => c.duration_seconds != null);
  if (withDuration.length === 0) return 0;
  const total = withDuration.reduce((s, c) => s + (c.duration_seconds ?? 0), 0);
  return Math.round(total / withDuration.length);
};

const rateOf = (calls: Call[], pred: (c: Call) => boolean): number =>
  calls.length === 0 ? 0 : Math.round((countWhere(calls, pred) / calls.length) * 100);

// ---------------------------------------------------------------
// Config
// ---------------------------------------------------------------

export const VERTICALS: Record<VerticalId, VerticalConfig> = {
  dental: {
    id: 'dental',
    displayName: 'Dental Clinic',
    shortNoun: 'clinic',
    tagline: 'Every call answered. Every chair filled.',
    pickerBlurb:
      'Books appointments, answers insurance questions, and fills cancellations — even when the front desk is with a patient.',
    primaryOutcome: 'booked',
    outcomes: {
      booked:      { label: 'Booked',       tone: 'success' },
      rescheduled: { label: 'Rescheduled',  tone: 'info' },
      inquiry:     { label: 'Inquiry',      tone: 'neutral' },
      no_booking:  { label: 'No booking',   tone: 'muted' },
    },
    kpis: [
      {
        id: 'appointments_booked',
        label: 'Appointments booked',
        format: 'count',
        compute: (calls) => countWhere(calls, (c) => c.outcome === 'booked'),
      },
      {
        id: 'new_patients',
        label: 'New patients',
        format: 'count',
        compute: (calls) =>
          countWhere(calls, (c) => c.outcome === 'booked' && c.is_new_customer === true),
        hint: 'first-time callers who booked',
      },
      {
        id: 'returning_patients',
        label: 'Returning patients',
        format: 'count',
        compute: (calls) =>
          countWhere(calls, (c) => c.outcome === 'booked' && c.is_new_customer === false),
        hint: 'existing patients who booked',
      },
      {
        id: 'booking_rate',
        label: 'Booking rate',
        format: 'percent',
        compute: (calls) => rateOf(calls, (c) => c.outcome === 'booked'),
        hint: 'of all answered calls',
      },
    ],
    locations: [
      {
        id: 'b1000000-0000-0000-0000-000000000001',
        slug: 'bright-smile-boston',
        businessName: 'Bright Smile Dental',
        name: 'Boston',
        city: 'Boston, MA',
        phone: '(617) 555-0134',
      },
      {
        id: 'b1000000-0000-0000-0000-000000000002',
        slug: 'bright-smile-cambridge',
        businessName: 'Bright Smile Dental',
        name: 'Cambridge',
        city: 'Cambridge, MA',
        phone: '(617) 555-0188',
      },
      {
        id: 'b1000000-0000-0000-0000-000000000003',
        slug: 'charles-river-brookline',
        businessName: 'Charles River Dental',
        name: 'Brookline',
        city: 'Brookline, MA',
        phone: '(617) 555-0142',
      },
    ],
  },

  mechanic: {
    id: 'mechanic',
    displayName: 'Auto Mechanic Shop',
    shortNoun: 'shop',
    tagline: 'Hands on the engine. AI on the phone.',
    pickerBlurb:
      'Sends service estimates, schedules drop-offs, and checks vehicles in while your techs stay under the hood.',
    primaryOutcome: 'estimate_sent',
    outcomes: {
      estimate_sent: { label: 'Estimate sent', tone: 'success' },
      checked_in:    { label: 'Checked in',    tone: 'info' },
      inquiry:       { label: 'Inquiry',       tone: 'neutral' },
      no_action:     { label: 'No action',     tone: 'muted' },
    },
    kpis: [
      {
        id: 'estimates_sent',
        label: 'Service estimates sent',
        format: 'count',
        compute: (calls) => countWhere(calls, (c) => c.outcome === 'estimate_sent'),
      },
      {
        id: 'vehicles_checked_in',
        label: 'Vehicles checked in',
        format: 'count',
        compute: (calls) => countWhere(calls, (c) => c.outcome === 'checked_in'),
      },
      {
        id: 'avg_call_duration',
        label: 'Avg call duration',
        format: 'duration',
        compute: avgDurationSeconds,
      },
      {
        id: 'calls_handled',
        label: 'Calls handled',
        format: 'count',
        compute: (calls) => calls.length,
        hint: 'zero missed, zero hold time',
      },
    ],
    locations: [
      {
        id: 'b1000000-0000-0000-0000-000000000004',
        slug: 'route-9-newton',
        businessName: 'Route 9 Auto',
        name: 'Newton',
        city: 'Newton, MA',
        phone: '(617) 555-0167',
      },
      {
        id: 'b1000000-0000-0000-0000-000000000005',
        slug: 'route-9-framingham',
        businessName: 'Route 9 Auto',
        name: 'Framingham',
        city: 'Framingham, MA',
        phone: '(508) 555-0121',
      },
      {
        id: 'b1000000-0000-0000-0000-000000000006',
        slug: 'beacon-garage-somerville',
        businessName: 'Beacon Garage',
        name: 'Somerville',
        city: 'Somerville, MA',
        phone: '(617) 555-0195',
      },
    ],
  },
};

// Convenience iterable for picker grids etc.
export const verticalList = Object.values(VERTICALS);

// ---------------------------------------------------------------
// Lookups — validate route params against config, never the DB
// ---------------------------------------------------------------

export function getVertical(id: string | undefined): VerticalConfig | null {
  return isVerticalId(id) ? VERTICALS[id] : null;
}

export function getLocation(
  vertical: VerticalConfig,
  slug: string | undefined
): LocationDef | null {
  return vertical.locations.find((l) => l.slug === slug) ?? null;
}

export function getOutcome(vertical: VerticalConfig, outcome: string): OutcomeDef {
  return vertical.outcomes[outcome] ?? { label: outcome, tone: 'neutral' };
}

// ---------------------------------------------------------------
// Display formatting for KPI values
// ---------------------------------------------------------------

export function formatKpiValue(value: number, format: KpiFormat): string {
  switch (format) {
    case 'duration': {
      const m = Math.floor(value / 60);
      const s = value % 60;
      return m > 0 ? `${m}m ${s.toString().padStart(2, '0')}s` : `${s}s`;
    }
    case 'percent':
      return `${value}%`;
    case 'count':
      return value.toLocaleString();
  }
}
