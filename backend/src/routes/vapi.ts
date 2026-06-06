import { Router, Request, Response } from "express";
import { VapiWebhookBody } from "../types/vapi";
import { analyzeTranscript } from "../lib/claude";
import { supabase } from "../lib/supabase";

const router = Router();

router.post("/", async (req: Request<{}, {}, VapiWebhookBody>, res: Response) => {
  const { message } = req.body;

  // Acknowledge non-report events immediately
  if (message?.type !== "end-of-call-report") {
    res.json({ received: true });
    return;
  }

  const transcript = message.transcript ?? "";
  const durationSeconds = message.durationSeconds ?? 0;

  try {
    const extracted = await analyzeTranscript(transcript);

    // Insert call record
    const { error: callError } = await supabase.from("calls").insert({
      patient_name: extracted.patient_name,
      duration_seconds: durationSeconds,
      status: extracted.status,
      ai_summary: extracted.ai_summary,
    });

    if (callError) throw new Error(`Supabase calls insert failed: ${callError.message}`);

    // Insert appointment if one was booked
    if (extracted.appointment) {
      const { error: apptError } = await supabase.from("appointments").insert({
        patient_name: extracted.patient_name,
        doctor: extracted.appointment.doctor,
        datetime: extracted.appointment.datetime,
        type: extracted.appointment.type,
        booked_via_ai: String(extracted.appointment.booked_via_ai),
      });

      if (apptError) throw new Error(`Supabase appointments insert failed: ${apptError.message}`);
    }

    res.json({ success: true, patient: extracted.patient_name });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook error:", message);
    res.status(500).json({ error: message });
  }
});

export default router;
