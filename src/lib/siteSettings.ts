import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeRefetch } from "@/hooks/useRealtimeRefetch";

export interface SiteSettings {
  show_dividers: boolean;
  show_global_ticker: boolean;
}

const defaults: SiteSettings = {
  show_dividers: true,
  show_global_ticker: true,
};

export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(defaults);

  const load = useCallback(async () => {
    const { data } = await supabase.from("site_settings").select("key, value");
    if (!data) return;
    const next: SiteSettings = { ...defaults };
    for (const row of data as any[]) {
      if (row.key === "show_dividers") next.show_dividers = !!row.value;
      if (row.key === "show_global_ticker") next.show_global_ticker = !!row.value;
    }
    setSettings(next);
  }, []);

  useEffect(() => { load(); }, [load]);
  useRealtimeRefetch(["site_settings"], load);

  return settings;
}
