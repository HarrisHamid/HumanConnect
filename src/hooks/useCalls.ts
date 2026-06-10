import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { fetchCalls } from "@/lib/queries";
import { getMockCalls } from "@/lib/mockData";
import type { Call } from "@/types/database";
import type { LocationDef, VerticalConfig } from "@/config/verticals";

export type CallsStatus = "loading" | "live" | "polling" | "mock" | "error";

const POLL_MS = 30_000;

/**
 * Loads calls for one location and keeps them fresh.
 *
 * Order of preference (realtime is an enhancement, never a dependency):
 *   1. fetch on mount by location_id
 *   2. subscribe to postgres_changes INSERT (status: "live")
 *   3. on channel error, fall back to 30s polling (status: "polling")
 *   4. if the initial fetch fails / no client, use mock data (status: "mock")
 */
export function useCalls(vertical: VerticalConfig, location: LocationDef) {
  const [calls, setCalls] = useState<Call[]>([]);
  const [status, setStatus] = useState<CallsStatus>("loading");

  // keep latest location for the poll closure without re-subscribing
  const locationRef = useRef(location);
  locationRef.current = location;

  useEffect(() => {
    let cancelled = false;
    let pollTimer: ReturnType<typeof setInterval> | null = null;
    let channel: ReturnType<NonNullable<typeof supabase>["channel"]> | null = null;

    const useMock = () => {
      if (cancelled) return;
      setCalls(getMockCalls(vertical, location));
      setStatus("mock");
    };

    const startPolling = () => {
      if (cancelled || pollTimer) return;
      setStatus("polling");
      pollTimer = setInterval(async () => {
        try {
          const fresh = await fetchCalls(locationRef.current.id);
          if (!cancelled) setCalls(fresh);
        } catch {
          /* keep showing the last good data; try again next tick */
        }
      }, POLL_MS);
    };

    const init = async () => {
      setStatus("loading");

      if (!supabase) {
        useMock();
        return;
      }

      try {
        const data = await fetchCalls(location.id);
        if (cancelled) return;
        setCalls(data);
        setStatus("live");
      } catch {
        useMock();
        return;
      }

      // Realtime enhancement — only after a successful fetch.
      channel = supabase
        .channel(`calls-${location.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "calls",
            filter: `location_id=eq.${location.id}`,
          },
          (payload) => {
            if (!cancelled) setCalls((prev) => [payload.new as Call, ...prev]);
          },
        )
        .subscribe((channelStatus) => {
          if (cancelled) return;
          if (channelStatus === "SUBSCRIBED") {
            setStatus("live");
          } else if (
            channelStatus === "CHANNEL_ERROR" ||
            channelStatus === "TIMED_OUT" ||
            channelStatus === "CLOSED"
          ) {
            startPolling();
          }
        });
    };

    init();

    return () => {
      cancelled = true;
      if (pollTimer) clearInterval(pollTimer);
      if (channel) supabase?.removeChannel(channel);
    };
    // re-run when the target location changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vertical.id, location.id]);

  return { calls, status };
}
