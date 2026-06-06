import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.ts";

export interface Call {
  id: number;
  patient_name: string;
  duration_seconds: number;
  status: "Booked" | "Transferred" | "Missed";
  ai_summary: string;
  created_at: string;
}

export interface Appointment {
  id: number;
  patient_name: string;
  doctor: string | null;
  datetime: string | null;
  type: "New Patient" | "Follow-Up" | "Urgent" | "General";
  booked_via_ai: string;
  created_at: string;
}

export function useLiveData() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = supabase;
    if (!db) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const [{ data: callsData }, { data: apptData }] = await Promise.all([
        db.from("calls").select("*").order("created_at", { ascending: false }).limit(20),
        db.from("appointments").select("*").order("created_at", { ascending: false }).limit(20),
      ]);

      if (callsData) setCalls(callsData);
      if (apptData) setAppointments(apptData);
      setLoading(false);
    };

    fetchData();

    const callsSub = db
      .channel("calls-channel")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "calls" }, (payload) =>
        setCalls((prev) => [payload.new as Call, ...prev]),
      )
      .subscribe();

    const apptSub = db
      .channel("appointments-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "appointments" },
        (payload) => setAppointments((prev) => [payload.new as Appointment, ...prev]),
      )
      .subscribe();

    return () => {
      db.removeChannel(callsSub);
      db.removeChannel(apptSub);
    };
  }, []);

  return { calls, appointments, loading };
}
