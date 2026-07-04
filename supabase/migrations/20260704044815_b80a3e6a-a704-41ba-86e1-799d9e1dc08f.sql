
CREATE TABLE public.featured_projects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  github_repo_id integer NOT NULL UNIQUE,
  repo_name text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.featured_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.featured_projects TO authenticated;
GRANT ALL ON public.featured_projects TO service_role;
ALTER TABLE public.featured_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read featured" ON public.featured_projects FOR SELECT USING (true);
CREATE POLICY "Auth insert featured" ON public.featured_projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update featured" ON public.featured_projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete featured" ON public.featured_projects FOR DELETE TO authenticated USING (true);

CREATE TABLE public.site_settings (
  key text NOT NULL PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Auth upsert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update settings" ON public.site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth delete settings" ON public.site_settings FOR DELETE TO authenticated USING (true);

INSERT INTO public.site_settings (key, value) VALUES
  ('show_dividers', 'true'::jsonb),
  ('show_global_ticker', 'true'::jsonb)
ON CONFLICT (key) DO NOTHING;
