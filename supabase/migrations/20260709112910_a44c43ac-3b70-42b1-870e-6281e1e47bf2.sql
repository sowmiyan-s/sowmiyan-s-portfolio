
CREATE TABLE public.site_votes (
  voter_id text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_votes TO anon, authenticated;
GRANT ALL ON public.site_votes TO service_role;

ALTER TABLE public.site_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read votes" ON public.site_votes FOR SELECT TO public USING (true);
-- No public insert/update/delete policies; writes go through the edge function using service role.

CREATE OR REPLACE VIEW public.votes_count AS
  SELECT count(*)::int AS count FROM public.site_votes;

GRANT SELECT ON public.votes_count TO anon, authenticated;

ALTER TABLE public.site_votes REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_votes;
