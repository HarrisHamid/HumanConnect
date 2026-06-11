import { VerticalId, isVerticalId } from "../config/verticals";

// Maps an incoming Vapi call to a tenant location. This is the
// multi-business seam: one backend, many businesses, routed by which
// Vapi phone number / assistant took the call.
//
// Config via env:
//   VAPI_LOCATION_MAP   JSON: { "<vapi phoneNumberId or assistantId>":
//                               { "locationId": "<uuid>", "vertical": "dental" } }
//   DEMO_LOCATION_ID    fallback location uuid (default: Bright Smile Boston, 02_seed.sql)
//   DEMO_VERTICAL       fallback vertical id (default: "dental")

export interface LocationRoute {
  locationId: string;
  vertical: VerticalId;
}

function parseLocationMap(): Record<string, LocationRoute> {
  const raw = process.env.VAPI_LOCATION_MAP;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, { locationId?: string; vertical?: string }>;
    const map: Record<string, LocationRoute> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (value?.locationId && isVerticalId(value.vertical)) {
        map[key] = { locationId: value.locationId, vertical: value.vertical };
      } else {
        console.warn(`VAPI_LOCATION_MAP: skipping invalid entry for "${key}"`);
      }
    }
    return map;
  } catch (err) {
    console.error("VAPI_LOCATION_MAP is not valid JSON — ignoring it.", err);
    return {};
  }
}

const LOCATION_MAP = parseLocationMap();

const DEFAULT_ROUTE: LocationRoute = {
  // Bright Smile Dental — Boston, from supabase/seed/02_seed.sql
  locationId: process.env.DEMO_LOCATION_ID ?? "b1000000-0000-0000-0000-000000000001",
  vertical: isVerticalId(process.env.DEMO_VERTICAL) ? process.env.DEMO_VERTICAL : "dental",
};

/**
 * Resolve the location for a call. Tries each key (phoneNumberId,
 * assistantId, ...) against the map, then falls back to the demo route
 * so the public demo line always lands somewhere visible.
 */
export function resolveLocation(...keys: (string | undefined)[]): LocationRoute {
  for (const key of keys) {
    if (key && LOCATION_MAP[key]) return LOCATION_MAP[key];
  }
  return DEFAULT_ROUTE;
}
