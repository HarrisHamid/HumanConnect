// Shapes for Vapi's server webhook payloads (end-of-call-report).
// Vapi has shipped the same fields at slightly different paths across
// versions, so call metadata is read defensively from several spots.

export interface VapiCustomer {
  number?: string;
  name?: string;
}

export interface VapiCallInfo {
  id?: string;
  assistantId?: string;
  phoneNumberId?: string;
  customer?: VapiCustomer;
  startedAt?: string;
}

export interface VapiMessage {
  type: string;
  transcript?: string;
  durationSeconds?: number;
  startedAt?: string;
  endedAt?: string;
  call?: VapiCallInfo;
  customer?: VapiCustomer;
  assistant?: { id?: string };
  phoneNumber?: { id?: string; number?: string };
}

export interface VapiWebhookBody {
  message?: VapiMessage;
}

/** What Claude extracts from a transcript — mirrors the `calls` table. */
export interface ExtractedCallData {
  caller_name: string | null;
  /** Must be one of the vertical's outcome ids (validated after extraction) */
  outcome: string;
  is_new_customer: boolean | null;
  sentiment: "positive" | "neutral" | "negative";
  transcript_summary: string;
}
