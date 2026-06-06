import Anthropic from "@anthropic-ai/sdk";
import { ExtractedCallData } from "../types/vapi";
import dotenv from "dotenv";

dotenv.config();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function analyzeTranscript(transcript: string): Promise<ExtractedCallData> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `You are analyzing a medical clinic phone call transcript.

Extract the following as JSON only — no markdown, no explanation, no backticks:
{
  "patient_name": "first name + last initial if mentioned, else Unknown",
  "status": "Booked" | "Transferred" | "Missed",
  "ai_summary": "one sentence summary of why they called",
  "appointment": {
    "doctor": "doctor name if mentioned, else null",
    "datetime": "ISO string if date/time mentioned, else null",
    "type": "New Patient" | "Follow-Up" | "Urgent" | "General",
    "booked_via_ai": true
  } | null
}

Transcript:
${transcript}`,
      },
    ],
  });

  const raw = response.content[0].type === "text" ? response.content[0].text : "";

  // Strip markdown code fences if Claude adds them
  const cleaned = raw
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  try {
    return JSON.parse(cleaned) as ExtractedCallData;
  } catch {
    throw new Error(`Claude returned invalid JSON: ${cleaned}`);
  }
}
