// src/types/database.ts
// ---------------------------------------------------------------
// Hand-written to match 01_schema.sql exactly.
//
// Once the schema is live, replace this file with generated types:
//   npx supabase gen types typescript --project-id <ref> > src/types/database.ts
// and re-export the row types below from the generated Database type.
// ---------------------------------------------------------------

export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface Call {
  id: string;
  location_id: string;
  caller_name: string | null;
  caller_phone: string | null;
  /** ISO 8601 timestamptz string as returned by supabase-js */
  started_at: string;
  duration_seconds: number | null;
  outcome: string;
  is_new_customer: boolean | null;
  sentiment: Sentiment | null;
  transcript_summary: string | null;
  vapi_call_id: string | null;
  created_at: string;
}

export interface LocationRow {
  id: string;
  business_id: string;
  slug: string;
  name: string;
  city: string | null;
  phone: string | null;
  created_at: string;
}

export interface BusinessRow {
  id: string;
  vertical_id: string;
  name: string;
  created_at: string;
}

export interface VerticalRow {
  id: string;
  display_name: string;
}
