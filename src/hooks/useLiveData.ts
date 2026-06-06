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
    // Initial fetch
    const fetchData = async () => {
      const [{ data: callsData }, { data: apptData }] = await Promise.all([
        supabase.from("calls").select("*").order("created_at", { ascending: false }).limit(20),
        supabase
          .from("appointments")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

      if (callsData) setCalls(callsData);
      if (apptData) setAppointments(apptData);
      setLoading(false);
    };

    fetchData();

    // Real-time subscription for calls
    const callsSub = supabase
      .channel("calls-channel")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "calls" }, (payload) =>
        setCalls((prev) => [payload.new as Call, ...prev]),
      )
      .subscribe();

    // Real-time subscription for appointments
    const apptSub = supabase
      .channel("appointments-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "appointments" },
        (payload) => setAppointments((prev) => [payload.new as Appointment, ...prev]),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(callsSub);
      supabase.removeChannel(apptSub);
    };
  }, []);

  return { calls, appointments, loading };
}
