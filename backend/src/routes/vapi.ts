import { Router, Request, Response } from "express";
import { VapiMessage, VapiWebhookBody } from "../types/vapi";
import { analyzeTranscript } from "../lib/claude";
import { resolveLocation } from "../lib/locations";
import { FALLBACK_OUTCOME } from "../config/verticals";
import { supabase } from "../lib/supabase";

const router = Router();

// Vapi end-of-call-report → calls row.
//
// Flow: validate → ack 200 immediately (Vapi retries slow webhooks) →
// process in the background. The dashboard picks the row up via
// Supabase realtime (postgres_changes INSERT on calls).

router.post("/", (req: Request<{}, {}, VapiWebhookBody>, res: Response) => {
  const message = req.body?.message;

  if (message?.type !== "end-of-call-report") {
    res.json({ received: true });
    return;
  }

  // Ack before the (slow) Claude call so Vapi never times out / retries.
  res.json({ received: true });

  processEndOfCallReport(message).catch((err) => {
    console.error("Webhook processing error:", err instanceof Error ? err.message : err);
  });
});

async function processEndOfCallReport(message: VapiMessage): Promise<void> {
  const call = message.call;
  const vapiCallId = call?.id ?? null;

  const route = resolveLocation(
    call?.phoneNumberId,
    message.phoneNumber?.id,
    call?.assistantId,
    message.assistant?.id
  );

  const transcript = message.transcript ?? "";
  const startedAt = message.startedAt ?? call?.startedAt ?? new Date().toISOString();
  const durationSeconds =
    message.durationSeconds != null ? Math.round(message.durationSeconds) : null;
  const callerPhone = call?.customer?.number ?? message.customer?.number ?? null;

  // Extract with Claude; if that fails, still log the call so the demo
  // dashboard never silently drops one.
  let extracted;
  try {
    extracted = await analyzeTranscript(transcript, route.vertical);
  } catch (err) {
    console.error(
      "Transcript analysis failed, inserting fallback row:",
      err instanceof Error ? err.message : err
    );
    extracted = {
      caller_name: call?.customer?.name ?? null,
      outcome: FALLBACK_OUTCOME[route.vertical],
      is_new_customer: null,
      sentiment: "neutral" as const,
      transcript_summary: transcript
        ? `Call received (summary unavailable): ${transcript.slice(0, 140)}`
        : "Call received — no transcript available",
    };
  }

  // vapi_call_id is unique in the schema — ignoreDuplicates makes Vapi
  // webhook retries idempotent.
  const { error } = await supabase.from("calls").upsert(
    {
      location_id: route.locationId,
      caller_name: extracted.caller_name,
      caller_phone: callerPhone,
      started_at: startedAt,
      duration_seconds: durationSeconds,
      outcome: extracted.outcome,
      is_new_customer: extracted.is_new_customer,
      sentiment: extracted.sentiment,
      transcript_summary: extracted.transcript_summary,
      vapi_call_id: vapiCallId,
    },
    { onConflict: "vapi_call_id", ignoreDuplicates: true }
  );

  if (error) {
    throw new Error(`Supabase calls upsert failed: ${error.message}`);
  }

  console.log(
    `✅ Call logged: ${extracted.outcome} at ${route.locationId} (${route.vertical})` +
      (vapiCallId ? ` vapi=${vapiCallId}` : "")
  );
}

export default router;
