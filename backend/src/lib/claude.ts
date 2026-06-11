import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import { ExtractedCallData } from "../types/vapi";
import {
  FALLBACK_OUTCOME,
  OUTCOME_DESCRIPTIONS,
  OUTCOMES,
  VERTICAL_CONTEXT,
  VerticalId,
} from "../config/verticals";

dotenv.config();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SENTIMENTS = ["positive", "neutral", "negative"] as const;

function extractionSchema(vertical: VerticalId) {
  return {
    type: "object",
    properties: {
      caller_name: {
        type: ["string", "null"],
        description: "Caller's name as stated on the call (e.g. 'Maria Lopez'), or null if never given",
      },
      outcome: {
        type: "string",
        enum: [...OUTCOMES[vertical]],
        description: "What actually happened on the call",
      },
      is_new_customer: {
        type: ["boolean", "null"],
        description: "true if clearly a first-time caller, false if clearly returning, null if unknown",
      },
      sentiment: { type: "string", enum: [...SENTIMENTS] },
      transcript_summary: {
        type: "string",
        description: "One sentence, past tense, e.g. 'Booked a cleaning for Thursday 2:30 PM'",
      },
    },
    required: ["caller_name", "outcome", "is_new_customer", "sentiment", "transcript_summary"],
    additionalProperties: false,
  } as const;
}

function buildPrompt(transcript: string, vertical: VerticalId): string {
  const outcomes = OUTCOMES[vertical]
    .map((o) => `- "${o}": ${OUTCOME_DESCRIPTIONS[vertical][o]}`)
    .join("\n");

  return `You are analyzing a phone call answered by an AI receptionist for ${VERTICAL_CONTEXT[vertical]}.

Classify the call into exactly one outcome:
${outcomes}

Base everything strictly on the transcript — do not invent details. If the transcript is empty or unintelligible, use the least-action outcome and say so in the summary.

Transcript:
${transcript}`;
}

/**
 * Extract structured call data from a transcript, scoped to the
 * vertical's outcome vocabulary. Throws on API/parse failure — the
 * webhook route decides how to fall back.
 */
export async function analyzeTranscript(
  transcript: string,
  vertical: VerticalId
): Promise<ExtractedCallData> {
  const response = await anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    output_config: {
      format: {
        type: "json_schema",
        schema: extractionSchema(vertical),
      },
    },
    messages: [{ role: "user", content: buildPrompt(transcript, vertical) }],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("Claude declined to analyze this transcript");
  }

  const text = response.content.find((b) => b.type === "text")?.text ?? "";
  const extracted = JSON.parse(text) as ExtractedCallData;

  // Belt and suspenders: never let an off-vocabulary outcome reach the DB.
  if (!OUTCOMES[vertical].includes(extracted.outcome)) {
    extracted.outcome = FALLBACK_OUTCOME[vertical];
  }

  return extracted;
}
