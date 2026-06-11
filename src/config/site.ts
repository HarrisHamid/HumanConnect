// src/config/site.ts
// ---------------------------------------------------------------
// Site-wide constants for the marketing pages.
//
// DEMO_PHONE is the live Vapi demo line — the single most important
// CTA on the site. Update here, never inline.
// ---------------------------------------------------------------

export const DEMO_PHONE = {
  /** Human-readable, used everywhere the number is shown */
  display: "(609) 256-8360",
  /** tel: href target */
  tel: "+16092568360",
} as const;

export const DEMO_PHONE_HREF = `tel:${DEMO_PHONE.tel}`;
