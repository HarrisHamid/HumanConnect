import { supabase } from "./supabase";
import type { Call } from "@/types/database";

/**
 * Fetch recent calls for a single location, newest first.
 * Scoped by location_id (the UUID from config/verticals.ts) and the
 * last `sinceDays` days. Returns [] if Supabase isn't configured or errors —
 * callers (useCalls) decide whether to fall back to mock data.
 */
export async function fetchCalls(locationId: string, sinceDays = 30): Promise<Call[]> {
  if (!supabase) return [];

  const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("calls")
    .select("*")
    .eq("location_id", locationId)
    .gte("started_at", since)
    .order("started_at", { ascending: false });

  if (error) {
    console.error("fetchCalls error:", error.message);
    throw error;
  }

  return (data ?? []) as Call[];
}
