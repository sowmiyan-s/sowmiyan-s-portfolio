import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("site_settings").select("key, value");
      if (cancelled || !data) return;
      const next: SiteSettings = { ...defaults };
      for (const row of data) {
        if (row.key === "show_dividers") next.show_dividers = !!row.value;
        if (row.key === "show_global_ticker") next.show_global_ticker = !!row.value;
      }
      setSettings(next);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}
