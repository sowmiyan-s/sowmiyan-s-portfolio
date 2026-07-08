import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Subscribes to postgres_changes on the given public tables and calls
 * `refetch` whenever any of them change. Handles cleanup.
 */
export function useRealtimeRefetch(tables: string[], refetch: () => void) {
  useEffect(() => {
    if (!tables.length) return;
    const channel = supabase.channel(`rt-${tables.join("-")}-${Math.random().toString(36).slice(2, 8)}`);
    tables.forEach((table) => {
      (channel as any).on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => refetch(),
      );
    });
    channel.subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tables.join(","), refetch]);
}
