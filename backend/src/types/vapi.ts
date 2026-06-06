export interface VapiMessage {
  type: string;
  transcript?: string;
  durationSeconds?: number;
}

export interface VapiWebhookBody {
  message: VapiMessage;
}

export interface ExtractedCallData {
  patient_name: string;
  status: "Booked" | "Transferred" | "Missed";
  ai_summary: string;
  appointment: {
    doctor: string | null;
    datetime: string | null;
    type: "New Patient" | "Follow-Up" | "Urgent" | "General";
    booked_via_ai: boolean;
  } | null;
}
