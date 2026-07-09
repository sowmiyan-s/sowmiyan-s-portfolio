
-- featured_projects
DROP POLICY IF EXISTS "Auth insert featured" ON public.featured_projects;
DROP POLICY IF EXISTS "Auth update featured" ON public.featured_projects;
DROP POLICY IF EXISTS "Auth delete featured" ON public.featured_projects;
CREATE POLICY "Auth insert featured" ON public.featured_projects FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update featured" ON public.featured_projects FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete featured" ON public.featured_projects FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- hidden_projects
DROP POLICY IF EXISTS "Authenticated users can insert hidden projects" ON public.hidden_projects;
DROP POLICY IF EXISTS "Authenticated users can delete hidden projects" ON public.hidden_projects;
CREATE POLICY "Authenticated users can insert hidden projects" ON public.hidden_projects FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete hidden projects" ON public.hidden_projects FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- site_settings
DROP POLICY IF EXISTS "Auth upsert settings" ON public.site_settings;
DROP POLICY IF EXISTS "Auth update settings" ON public.site_settings;
DROP POLICY IF EXISTS "Auth delete settings" ON public.site_settings;
CREATE POLICY "Auth upsert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth update settings" ON public.site_settings FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Auth delete settings" ON public.site_settings FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- skills
DROP POLICY IF EXISTS "Authenticated users can insert skills" ON public.skills;
DROP POLICY IF EXISTS "Authenticated users can delete skills" ON public.skills;
CREATE POLICY "Authenticated users can insert skills" ON public.skills FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete skills" ON public.skills FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);
